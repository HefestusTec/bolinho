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


class AppHandler:
    """
    Main class that handles all the app logic
    """

    def __init__(self):
        self.gran = Granulado()
        self.__experiment_id: int = (
            -1
        )  # Id of the active experiment -1 means no selected experiment
        self.__started_experiment_time = 0.0
        self.__experiment: list[dict] = []
        self.__time_since_last_refresh = 0.0
        self.__last_data_refresh = 0.0
        self.__current_time = 0.0
        self.__current_readings: b_classes.Readings = b_classes.Readings()
        self.__starting_z_axis_pos: int = 0
        self.__delta_load = 0
        self.__n_readings = 0
        self.__max_time = 0
        self.__max_load = 0
        self.__max_pos = 0
        self.__max_delta_load = 0

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
        try:
            self.gran.loop()
        except SerialException:
            ui_api.error_alert(f"Erro de conexão com o Granulado")
            self.gran = Granulado()
            app_state.change_state(StateE.INSPECTING)

        match app_state.state:
            case StateE.INSPECTING:
                experiment_api.set_readings(self.__current_readings)
                eel.sleep(0.1)  # 10 FPS refresh rate
            case StateE.RUNNING_EXPERIMENT:
                if (
                    self.__current_time - 500 > self.__time_since_last_refresh
                ):  # ~2 FPS refresh rate
                    self.__time_since_last_refresh = self.__current_time

                    experiment_api.set_readings(self.__current_readings)
                    experiment_api.set_delta_load(self.__delta_load)
                    experiment_api.set_time(
                        self.__current_time - self.__started_experiment_time
                    )

                    # check stop conditions
                    stop_conditions = [
                        self.__current_time - self.__started_experiment_time
                        > self.__max_time,
                        self.__current_readings.current_load > self.__max_load,
                        self.__current_readings.z_axis_pos > self.__max_pos,
                        self.__delta_load > self.__max_delta_load,
                    ]

                    stop_message = [
                        f"Tempo máximo de {self.__max_time}ms atingido",
                        f"Carga máxima de {self.__max_load} atingida",
                        f"Posição máxima de {self.__max_pos} atingida",
                        f"Variação de carga máxima de {self.__max_delta_load} atingida",
                    ]

                    true_conditions = stop_conditions.index(True)

                    if False:  # any(stop_conditions):
                        ui_api.error_alert(
                            f"Experimento {self.__experiment_id} finalizado. {stop_message[true_conditions]}"
                        )
                        self.end_experiment()
                        return

                    core_api.refresh_realtime_experiment_data()  # Asks the UI to fetch new data
                    # print(f"{(self.__n_readings / (current_time - self.__started_experiment_time)) * 1000 } readings per second")
                eel.sleep(
                    0
                )  # allows Eel to gracefully shutdown the process when the WebUi is disconnected

    # def __check_experiment_limits(self):
    #     if self.__current_readings.current_load >=

    def __update_current_readings(self):
        """
        Updates the UI with the latest readings
        """
        if not self.gran.is_connected():
            self.__current_readings.status = "Desconectado"
            return

        self.__current_readings = b_classes.Readings()

        [current_load, current_pos] = self.gran.get_readings()

        current_delta_load = self.gran.get_delta_load()

        current_pos = current_pos - self.__starting_z_axis_pos
        self.__current_time = (time.time() * 1000) - self.__started_experiment_time

        self.__current_readings.current_load = round(current_load, 2)
        self.__current_readings.z_axis_pos = current_pos
        self.__current_readings.current_delta_load = round(current_delta_load, 2)
        self.__current_readings.status = "Conectado"

        # check if is running experiment
        if self.__experiment_id == -1:
            return

        realTimeR.load_over_time_realtime_readings.put_nowait(
            {
                "y": current_load,
                "x": (int)(self.__current_time),
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
                "x": (int)(self.__current_time),
                "experiment_id": self.__experiment_id,
                "load": current_load,
                "z_pos": current_pos,
            }
        )
        self.__n_readings += 1

        self.__delta_load = self.gran.get_delta_load()

    def set_granulado_configs(
        self,
        globalMaxLoad,
        globalMaxTravel,
        globalMaximumDeltaLoad,
        globalZAxisLength,
        globalMaxTime,
        globalKnownWeight,
    ):
        self.gran.set_max_load(globalMaxLoad)
        self.__max_load = globalMaxLoad
        eel.sleep(0.01)
        self.gran.set_max_travel(globalMaxTravel)
        self.__max_pos = globalMaxTravel
        eel.sleep(0.01)
        self.gran.set_max_delta_load(globalMaximumDeltaLoad)
        self.__max_delta_load = globalMaximumDeltaLoad
        eel.sleep(0.01)
        self.gran.set_z_axis_length(globalZAxisLength)
        eel.sleep(0.01)
        self.gran.set_known_weight(globalKnownWeight)
        eel.sleep(0.01)
        self.__max_time = globalMaxTime

    def start_experiment(self, experiment_id: int, compress: bool, z_axis_length):
        """
        Changes the app state to running experiment, resets the experiment data and starts a new experiment

        Args:
            experiment_id (int): The id of the experiment to be started
        """

        app_state.change_state(StateE.RUNNING_EXPERIMENT)

        [_, current_pos] = self.gran.get_readings()

        self.__experiment_id = experiment_id
        self.__started_experiment_time = int(time.time() * 1000)
        self.__experiment = []
        self.__n_readings = 0
        self.__starting_z_axis_pos = current_pos
        realTimeR.load_over_time_realtime_readings = Queue()
        realTimeR.load_over_position_realtime_readings = Queue()

        move_mm = z_axis_length * 2
        self.gran.move_z_axis_millimeters(move_mm * (-1 if compress else 1))

    def end_experiment(self):
        """
        Handles writing the new experiment to persistent memory
        """
        # stop motor
        self.gran.stop_z_axis()

        # send to home page
        app_state.change_state(StateE.INSPECTING)

        # Write data as batch
        db_handler.batch_post_reading(self.__experiment)
        self.__experiment_id = -1


bolinho_app = AppHandler()
