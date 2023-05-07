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
# Backend API

This page gathers all the API calls that can be used by the front end.

> Front end -> Backend

## Global configuration

### `#!javaScript saveConfigParams(configParams)`:
!!! quote ""

    Saves the config parameters to the persistent file

    ``` javaScript title="React usage example"
    import { saveConfigParams } from "./api/backend-api";
    
    saveConfigParams(globalConfig);
    ```

### `#!javaScript loadConfigParams()`:
!!! quote ""

    Loads the config parameters from the persistent file

    ``` javaScript title="React usage example"
    import { loadConfigParams } from "./api/backend-api";
    
    globalConfig = loadConfigParams();
    ```

## Data base

### `#!javaScript getMaterialList()`:
!!! quote ""

    **TODO**
    
    ``` javaScript title="React usage example"
    import { getMaterialList } from "./api/backend-api";
    
    globalConfig = getMaterialList();
    ```

### `#!javaScript getExperimentDate()`:
!!! quote ""

    **TODO**
    
    ``` javaScript title="React usage example"
    import { getExperimentDate } from "./api/backend-api";
    
    globalConfig = getExperimentDate();
    ```

### `#!javaScript getExperimentObjectList()`:
!!! quote ""

    **TODO**
    
    ``` javaScript title="React usage example"
    import { getExperimentObjectList } from "./api/backend-api";
    
    globalConfig = getExperimentObjectList();
    ```