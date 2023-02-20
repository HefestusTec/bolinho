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

# Alerts

This project is using [react-toastify](https://github.com/fkhadra/react-toastify) to handle alerts. If you want more in-depth info about them please refer to the [documentation](https://fkhadra.github.io/react-toastify/introduction).

## Usage

Here is an exemple of how you can create an alert.

``` js
import React from "react";
import { toast } from "react-toastify";

export default function myComponent() {
    const iWasPressed = () => {
        // This will show an error alert.
        toast.error("Não foi possível acessar o backend");
    };

    return(
        <button onClick={iWasPressed}>
            Press me :D
        </button>
    );
}
```