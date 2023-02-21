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

# Contexts

This page contains all the [contexts](https://reactjs.org/docs/context.html) used on the application.

## GlobalConfigContext
!!! quote ""
    ``` react
    {
        theme: "light", // light | dark
        animationSpeed: "slow", // fast | slow | off
        animateGraph: "on", // on | off
        enableZoom: true, // Should zooming be enable?
        zoomDelay: 300, // How long [ms] should I press to zoom
        blurOnZoom: true, // Should it blur when zooming?
        absoluteMaximumForce: 10000,
    }
    ```

___

## SelectedObjectsContext
!!! quote ""
    This context is acessible to the children of the `MainPage` component. It holds a list of the selected objects "experiments data".
    ``` react
    {
        material, // material_fragment
        experiment, // experiment_fragment
        data_array, // data_array_fragment,
        color, // color associated to an experiment
    }
    ```
    
___