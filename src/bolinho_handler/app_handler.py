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
import bolinho_api.experiment as b_experiment
import bolinho_api.classes as b_classes
import bolinho_api.core as b_core
import eel
from state_class import StateE
from state_class import app_state




class AppHandler:
    """
    Main class that handles all the app logic
    """
    def __init__(self):
        self.gran = Granulado()

    def process(self):
        print(f"current state: {app_state.state}")
        match app_state.state:
            case StateE.INSPECTING:
                self.__update_ui_readings()
                eel.sleep(0.2) # 5 FPS refresh rate
            case StateE.RUNNING_EXPERIMENT:
                self.gran.loop()
                self.__update_ui_readings()
                b_core.core_api.refresh_data()


    def __update_ui_readings(self):
        """
        Updates the UI with the latest readings
        """
        new_readings = b_classes.Readings(status="Desconectado")
        if(self.gran.is_connected()):
            [current_load, current_pos] = self.gran.get_readings()
            new_readings.current_load = current_load
            new_readings.z_axis_pos = current_pos
            new_readings.status = "Conectado"

        b_experiment.experiment_api.set_readings(new_readings)



app = AppHandler()
