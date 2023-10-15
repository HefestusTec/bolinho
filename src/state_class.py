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
from enum import Enum

class StateE(Enum):
    """
    Possibles states of the state machine
    """
    INSPECTING = 1 # For non critical states, allows the CPU to not be blocking at 100% usage 
    RUNNING_EXPERIMENT = 2

class AppState:
    def __init__(self):
        self.state: StateE = StateE.INSPECTING

    def change_state(self, new_state:StateE):
        """
        Handle state transitions here
        """
        self.state = new_state

app_state = AppState()