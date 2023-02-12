<!--
 Copyright (C) 2023 Hefestus
 
 This file is part of Bolinho.
 
 Bolinho is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 Bolinho is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with Bolinho.  If not, see <http://www.gnu.org/licenses/>.
-->

# Commands

This page gathers all the API calls related to instructions to the equipment.

> Eg. manual control, start tasks etc.

## Manual Control

### manual_control_head( dist )

!!! quote ""
    Sends a **solicitation** to move the experiment head, this movement can be positive or negative.

    > If the solicitation is sent during a **automatic experiment** it will halt the experiment and wait for the restart command.
    este irá ser interrompido, e aguardará o comando para reiniciar

## Calibration

### start_z_axis_calibration()

!!! quote ""
    Starts the calibration of the Z axis.

### start_load_cell_calibration()

!!! quote ""
    Starts the calibration of the load cell.
___

## Experiment commands

### start_auto_experiment()

!!! quote ""
    Starts an automatic experiment.

### pause_experiment()

!!! quote ""
    Pauses the current experiment and awaits the user commands.


### resume_experiment()

!!! quote ""
    Resumes the current experiment.

### end_experiment()

!!! quote ""
    Finishes the current experiment.