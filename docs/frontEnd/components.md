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

# Components

Most custom React components are here

## ZoomComponent
!!! quote ""
    Component that enables zooming on it's contents, press and hold to zoom in.
    > It uses the [use-long-press](https://github.com/minwork/use-long-press) rook to handle this action.

    You can enable/disable and change the activation time on the [`GlobalConfigContext`](contexts.md#globalconfigcontext) context.

    ### Props 
    ``` js
    {
        scaleOrigin = "top",
        className = "",
        children,
    }
    ```
    > 
    * `scaleOrigin`: What is the origin point (which direction does it grows).
    * `className`: ClassName of the component.
    * `children`: Children props, Don't worry about it.


    ___

    ### Usage example

    ``` html title=""
    <ZoomComponent
        className={styleModule.experiments_inspector}
        scaleOrigin="bottom left"
    >
        <ExperimentsInspector />
    </ZoomComponent>
    ```