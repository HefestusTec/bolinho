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
import bolinho_api.classes as b_classes
import eel
from state_class import StateE
from state_class import app_state
import time
from DBHandler import Reading
from DBHandler import db_handler
import realTimeR
from queue import Queue


class AppHandler:
    """
    Main class that handles all the app logic
    """

    def __init__(self):
        self.gran = Granulado()
        self.__experiment_id: int = (
            -1
        )  # Id of the active experiment -1 means no selected experiment
        self.__started_experiment_time: int = 0
        self.__experiment: list[dict] = []
        self.__time_since_last_refresh = 0.0
        self.__current_readings: b_classes.Readings = b_classes.Readings()

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
        self.gran.loop()

        match app_state.state:
            case StateE.INSPECTING:
                experiment_api.set_readings(self.__current_readings)

                eel.sleep(0.1)  # 10 FPS refresh rate
            case StateE.RUNNING_EXPERIMENT:
                current_time = time.time() * 1000.0

                if (
                    current_time + 100 > self.__time_since_last_refresh
                ):  # ~10 FPS refresh rate
                    self.__time_since_last_refresh = current_time
                    experiment_api.set_readings(self.__current_readings)

                    core_api.refresh_data()  # Asks the UI to fetch new data
                eel.sleep(
                    0
                )  # allows Eel to gracefully shutdown the process when the WebUi is disconnected

    def __update_current_readings(self):
        """
        Updates the UI with the latest readings
        """
        self.__current_readings = b_classes.Readings()
        if self.gran.is_connected():
            [current_load, current_pos] = self.gran.get_readings()

            current_time = int(time.time() * 1000) - self.__started_experiment_time

            self.__current_readings.current_load = current_load
            self.__current_readings.z_axis_pos = current_pos
            self.__current_readings.status = "Conectado"

            # check if is running experiment
            if self.__experiment_id == -1:
                return

            realTimeR.load_over_time_realtime_readings.put_nowait(
                {
                    "load": current_load,
                    "time": current_time,
                }
            )
            realTimeR.load_over_position_realtime_readings.put_nowait(
                {
                    "load": current_load,
                    "z_pos": current_pos,
                }
            )
            self.__experiment.append(
                {
                    "x": current_time,
                    "experiment_id": self.__experiment_id,
                    "load": current_load,
                    "z_pos": current_pos,
                }
            )

    def start_experiment(self, experiment_id: int):
        self.__experiment_id = experiment_id
        app_state.change_state(StateE.RUNNING_EXPERIMENT)
        self.__started_experiment_time = int(time.time() * 1000)
        self.__experiment = []
        realTimeR.load_over_time_realtime_readings = Queue()
        realTimeR.load_over_position_realtime_readings = Queue()

    def end_experiment(self):
        """
        Handles writing the new experiment to persistent memory
        """
        self.__experiment_id = -1
        # send to home page
        app_state.change_state(StateE.INSPECTING)

        # Write data as batch
        db_handler.batch_post_reading(self.__experiment)


bolinho_app = AppHandler()
