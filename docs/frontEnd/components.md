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
    ``` jsx
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

    ``` jsx
    import ZoomComponent from "../zoomComponent/zoomComponent";
    import ExperimentsInspector from "./experimentsInspector/experimentsInspector";

    export default function exampleComponent(){
        return(
            <ZoomComponent
                className={styleModule.experiments_inspector}
                scaleOrigin="bottom left"
            >
                <ExperimentsInspector />
            </ZoomComponent>
        );
    } 
    ```


<!--
## MainPage
!!! quote ""
    This is the main page component, it takes care of the data base manipulation, settings, and access to other pages of the application.

    ### `JSX`
    This is a pseudo code of the main page component layout.
    ```html title=""
    <SelectedObjectsContext.Provider>
        <div className={styleModule.content}>
            <ZoomComponent>
                <GraphComponent experimentList={selectedObjectList} />
            </ZoomComponent>
            <ZoomComponent>
                <MaterialSelector materialList={materialList} />
            </ZoomComponent>
            <ZoomComponent>
                <ExperimentsInspector />
            </ZoomComponent>
            <ZoomComponent>
                <ExtraOptions />
            </ZoomComponent>
        </div>
    </SelectedObjectsContext.Provider>
    ```


    ### Props
    It receives a `materialList` from the `app.js`
    ``` js
    {
        materialList
    }
    ```
    > 
    * `materialList`: List of materials stored on the data base.
-->

## ExperimentInspector

!!! quote ""
    This component makes use of the [`SelectedObjectsContext`](./contexts.md#selectedobjectscontext).

    The experiment inspector component holds the following children:

    * `ColorPicker`: Color picker component for choosing the color of the active experiment.
    * `ExperimentButton`: Buttons that make the list of selected experiments.
    * `ExperimentDescription`: Component that parses the description of the active material.

    ### Props
    `none`

    ### Usage example
    ``` jsx hl_lines="16"
    import ExperimentsInspector from "./experimentsInspector/experimentsInspector";

    export default function exampleComponent(){

        const getMaterialList = async () => {
            try {
                const materialList = JSON.parse(await eel.get_material_list()());
                return materialList;
            } catch (error) {
                return [];
            }
        };

        return(
            <SelectedObjectsContext.Provider>
                <ExperimentsInspector />
            </SelectedObjectsContext.Provider>

        );
    } 
    ```

## MaterialSelector

!!! quote ""
    The `MaterialSelector` component holds the following children:

    * `MaterialSelectorButton`: Buttons that make the list of available experiments.
        * `DropdownButton`: Buttons that make a dropdown, so the user can choose which experiment they want to inspect.

    It can be wrapped with the [`ZoomComponent`](#zoomcomponent) to allow zooming.

    ### Props
    ``` jsx
    {
        materialList // List of available materials, fetched from the backend
    }
    ```

    ### Usage example
    ``` jsx
    import MaterialSelector from "./materialSelector/materialSelector";

    export default function exampleComponent(){

        const getMaterialList = async () => {
            try {
                const materialList = JSON.parse(await eel.get_material_list()());
                return materialList;
            } catch (error) {
                return [];
            }
        };

        return(
            <MaterialSelector materialList={getMaterialList} />
        );
    } 
    ```
