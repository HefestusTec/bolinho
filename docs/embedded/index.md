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

# Embedded

Bolinho uses a microcontroller [esp32-s3](https://www.espressif.com/en/products/socs/esp32-s3) for controlling the hardware.

For more info check the [Granulado repository](https://github.com/HefestusTec/granulado).

## Serial communication
The microcontroller communicates via serial to the host, and is responsible for reading the load cell and controlling the stepper motor.

This communication is done via interrogation, so that the host **prompts** the peripheral for data and it complies.

### Protocol:

These are the available commands for the communication between the host and the peripheral.

A instruction is divided in three parts:

`command` `data` `\n`


* `command` is a **1 byte** `character`.
* `data` is the payload as a `string` it can be also empty.
* `\n` is the **line terminator** to identify the end of an instruction.

####  Bolinho -> Granulado

* `p` -> Ping 

* `m[str]` -> Moves stepper motor x millimeters. 
> str is an `int` in `string` format.

* `s` -> Stop 

* `t` -> Move to top 

* `g` -> Get motor position millimeters. 

* `r` -> Get instantaneous reading. 

* `@` -> Tare load cell 

* `w` -> Calibrate known weight 

* `x[str]` -> Set known weight 
> str is an `int` with the weight in `grams` in `string` format.

* `y[str]` -> Set z-axis length 
> str is an `int` with the length of the z-axis in `millimeters` in `string` format.

* `j` -> Get z-axis length 

* `z` -> Calibrate z-axis 

* `d` -> Get delta load 

* `l[str]` -> Set max load 
> str is an `int` with the maximum experiment load in `grams` in `string` format.

* `v[str]` -> Set max travel 
> str is an `int` with the maximum experiment travel in `mm` in `string` format.

* `a[str]` -> Set max delta load 
> str is an `int` with the maximum experiment delta load in `grams / second` in `string` format.

* `-` -> Nothing

####  Granulado -> Bolinho
* `p` -> Ping Response

* `e[str]` -> Erro.
> str is an `string` with the description of the error.

* `r[str]` -> Returns current reading
> str is an `int` in `grams` in `string` format.

* `g[str]` -> Returns current position in millimeters
> str is an `int` in `string` format.

* `j[str]` -> Returns z-axis length
> str is an `int` in `string` format.

* `b` -> Bottom interrupt was triggered

* `t` -> Top interrupt was triggered

* `d[str]` -> Returns delta load
> str is an `int` in `string` format.

* `s` -> Response to the stop command

* `i[str]` -> Debug info
> str is any `string` to be shown on the terminal.
