# Copyright (C) 2023 Hefestus
#
# This file is part of Bolinho.
#
# Bolinho is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Bolinho is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Bolinho.  If not, see <http://www.gnu.org/licenses/>.

from granulado.core import Granulado
from bolinho_api.experiment import experiment_api
from bolinho_api.core import core_api
from bolinho_api.ui import ui_api
import bolinho_api.classes as b_classes
import eel
from state_class import StateE
from state_class import app_state
import time
from DBHandler import Reading
from DBHandler import db_handler
import realTimeR
from queue import Queue
from serial import SerialException
import granulado.core


class AppHandler:
    """
    Main class that handles all the app logic
    """

    def __init__(self):
        self.__experiment_id: int = (
            -1
        )  # Id of the active experiment -1 means no selected experiment, -2 means unsaved experiment
        self.__started_experiment_time = 0.0
        self.__experiment: list[dict] = []
        self.__time_since_last_refresh = 0.0
        self.__time_since_last_data_refresh = 0.0
        self.__current_time = 0.0
        self.__current_readings: b_classes.Readings = b_classes.Readings()
        self.__starting_z_axis_pos: int = 0
        self.__delta_load = 0
        self.__n_readings = 0
        self.__max_time = 0
        self.__max_load = 0
        self.__max_pos = 0
        self.__max_delta_load = 0
        self.__db_experiment = None
        self.gran = Granulado(self.forced_stop)

    def forced_stop(self):
        if app_state.state == StateE.RUNNING_EXPERIMENT:
            self.end_experiment()

    def wait_for_connection(self):
        """
        Will stay in a infinite loop until connected to the WebUi
        """
        while True:
            try:
                if core_api.ping():
                    break
            except:
                eel.sleep(1)

    def process(self):
        self.__update_current_readings()

        match app_state.state:
            case StateE.INSPECTING:
                self.gran.loop()

                experiment_api.set_readings(self.__current_readings)
                eel.sleep(0.1)  # 10 FPS refresh rate
            case StateE.RUNNING_EXPERIMENT:
                if (
                    self.__current_time - 500 > self.__time_since_last_refresh
                ):  # ~2 FPS refresh rate
                    self.__time_since_last_refresh = self.__current_time

                    experiment_api.set_readings(self.__current_readings)
                    experiment_api.set_time(self.__current_time / 1000)
                if (
                    self.__current_time - 12.5 > self.__time_since_last_data_refresh
                ):  # 100 ~10Hz refresh rate # 12.5 ~80hz
                    self.__time_since_last_data_refresh = self.__current_time
                    self.gran.loop()

                    is_compress = self.__db_experiment.compress == 1

                    # check stop conditions
                    stop_conditions = [
                        self.__current_time / 1000 > self.__max_time,
                        self.__current_readings.current_load > self.__max_load,
                        abs(self.__current_readings.z_axis_pos) > self.__max_pos,
                        self.__delta_load < -self.__max_delta_load
                        if is_compress
                        else self.__delta_load > self.__max_delta_load,
                    ]

                    stop_message = [
                        f"Tempo máximo de {self.__max_time}s atingido",
                        f"Carga máxima de {self.__max_load}N atingida",
                        f"Posição máxima de {self.__max_pos}mm atingida",
                        f"Variação de carga máxima de {self.__max_delta_load}N/s atingida",
                    ]

                    true_conditions = [
                        i for i in range(len(stop_conditions)) if stop_conditions[i]
                    ]

                    if any(stop_conditions):
                        ui_api.error_alert(
                            f"Experimento {self.__experiment_id} finalizado. {' '.join([stop_message[i] for i in true_conditions])}"
                        )
                        self.end_experiment()
                        return

                    core_api.refresh_realtime_experiment_data()  # Asks the UI to fetch new data
                    # print(f"{(self.__n_readings / (current_time - self.__started_experiment_time)) * 1000 } readings per second")
                eel.sleep(
                    0
                )  # allows Eel to gracefully shutdown the process when the WebUi is disconnected

    def __update_current_readings(self):
        """
        Updates the UI with the latest readings
        """
        if not self.gran.is_connected():
            self.__current_readings.status = "Desconectado"
            return

        self.__current_readings = b_classes.Readings()

        current_load, current_pos, current_delta_load = self.gran.get_readings()

        self.__delta_load = current_delta_load

        current_pos = current_pos - self.__starting_z_axis_pos
        self.__current_time = int(time.time() * 1000) - self.__started_experiment_time

        self.__current_readings.current_load = round(current_load, 2)
        self.__current_readings.z_axis_pos = current_pos
        self.__current_readings.current_delta_load = round(self.__delta_load, 2)
        self.__current_readings.status = "Conectado"

        # check if is running experiment
        if self.__experiment_id == -1 or self.__experiment_id == -2:
            return

        realTimeR.load_over_time_realtime_readings.put_nowait(
            {
                "y": current_load,
                "x": self.__current_time,
            }
        )
        realTimeR.load_over_position_realtime_readings.put_nowait(
            {
                "y": current_load,
                "x": current_pos,
            }
        )
        self.__experiment.append(
            {
                "x": self.__current_time,
                "experiment_id": self.__experiment_id,
                "load": current_load,
                "z_pos": current_pos,
            }
        )
        self.__n_readings += 1

    def set_granulado_configs(
        self,
        globalMaxLoad,
        globalMaxTravel,
        globalMaximumDeltaLoad,
        globalZAxisLength,
        globalMaxTime,
        globalKnownWeight,
        globalMmPerRevolution,
    ):
        self.__max_time = globalMaxTime
        self.gran.mm_per_revolution = globalMmPerRevolution
        self.gran.set_max_load(globalMaxLoad)
        self.__max_load = globalMaxLoad
        eel.sleep(0.1)
        self.gran.set_max_travel(globalMaxTravel)
        self.__max_pos = globalMaxTravel
        eel.sleep(0.1)
        self.gran.set_max_delta_load(globalMaximumDeltaLoad)
        self.__max_delta_load = globalMaximumDeltaLoad
        eel.sleep(0.1)
        self.gran.set_z_axis_length(globalZAxisLength)
        eel.sleep(0.1)
        self.gran.set_known_weight(globalKnownWeight)
        eel.sleep(0.1)

    def set_granulado_experiment_configs(
        self,
        globalMaxLoad,
        globalMaxTravel,
        globalMaximumDeltaLoad,
        globalMaxTime,
    ):
        self.gran.set_max_load(globalMaxLoad)
        self.__max_load = globalMaxLoad
        self.gran.set_max_travel(globalMaxTravel)
        self.__max_pos = globalMaxTravel
        self.gran.set_max_delta_load(globalMaximumDeltaLoad)
        self.__max_delta_load = globalMaximumDeltaLoad
        self.__max_time = globalMaxTime

    def start_experiment(self, experiment_id: int, compress: bool, z_axis_length: int):
        """
        Changes the app state to running experiment, resets the experiment data and starts a new experiment

        Args:
            experiment_id (int): The id of the experiment to be started
        """

        app_state.change_state(StateE.RUNNING_EXPERIMENT)

        [_, current_pos, _] = self.gran.get_readings()

        self.__experiment_id = experiment_id
        self.__started_experiment_time = int(time.time() * 1000)
        self.__experiment = []
        self.__n_readings = 0
        self.__starting_z_axis_pos = current_pos
        realTimeR.load_over_time_realtime_readings = Queue()
        realTimeR.load_over_position_realtime_readings = Queue()
        self.__db_experiment = db_handler.get_experiment_by_id(self.__experiment_id)
        print(f"Z axis speed {self.__db_experiment.z_axis_speed}")
        self.set_granulado_experiment_configs(
            self.__db_experiment.max_load,
            self.__db_experiment.max_travel,
            self.__db_experiment.load_loss_limit,
            self.__db_experiment.max_time,
        )
        print(f"Z axis speed db: {self.__db_experiment.z_axis_speed}")

        if compress:
            print("Compress: moving to bottom")
            self.gran.move_z_axis_millimeters(
                10000, int(self.__db_experiment.z_axis_speed)
            )
        else:
            print("Expand: moving to top")
            self.gran.move_z_axis_millimeters(
                -10000, int(self.__db_experiment.z_axis_speed)
            )

    def reset_granulado_configs(self):
        import exposed_core

        config = exposed_core.load_config_params()
        """
        globalMaxLoad,
        globalMaxTravel,
        globalMaximumDeltaLoad,
        globalMaxTime,
        experimentMotorRPM,
        """
        self.set_granulado_experiment_configs(
            int(config.get("absoluteMaximumLoad", 1000)),
            int(config.get("absoluteMaximumTravel", 1000)),
            int(config.get("absoluteMaximumDeltaLoad", 1000)),
            int(config.get("absoluteMaximumTime", 1000)),
        )

    def end_experiment(self):
        """
        Handles writing the new experiment to persistent memory
        """
        if not app_state.state == StateE.RUNNING_EXPERIMENT:
            return

        # stop motor
        self.gran.stop_z_axis()

        # if not stopped:
        #     ui_api.error_alert(
        #         "Não foi possível parar o eixo Z. O Granulado está conectado?",
        #     )
        self.finalize_experiment()

    def finalize_experiment(self):
        def save_and_end(toast_id):
            app_state.change_state(StateE.INSPECTING)

            # Write data as batch
            db_handler.batch_post_reading(self.__experiment)

            core_api.go_to_home_page()
            # send to home page
            self.__experiment_id = -1
            ui_api.update_alert("Salvo com sucesso!", True, toast_id)

            ui_api.close_frontend()

            import os
            import sys

            python = sys.executable
            os.execl(python, python, *sys.argv)

        self.gran.loop()
        ui_api.loading_alert("AGUARDE! Salvando no banco...", save_and_end)
        self.reset_granulado_configs()

        # bro how many bananas do you have??


bolinho_app = AppHandler()
