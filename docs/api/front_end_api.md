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
# Front end API

This page gathers all the API calls that can be used by the backend.

> Backend -> Front end

!!! warning
    The functions can only be called if they are available on the `web/build` directory, therefore if you make a change using `npm run serve` won't show it, you will need to rebuild the front end with `npm run buildWeb` or by using `npm run start`.

!!! note
    These functions can only be called after eel is initiated with `eel.init()`.


## Core API

Collection of all functions/API calls available to the backend. You can find them in the `bolinho_api/core.py` file.

The JavaScript file can be found in the api folder.

___

### ping()
!!! quote "ping()"

    Tries to ping the bolinho front-end, returns 1 if it worked

    ``` python title="Python usage example"
    from bolinho_api.core import core_api

    while True:
        try:
            if core_api.ping():
                print("got a ping!")
                break
            pass
        except:
            eel.sleep(1)
    ```

___

### get_config_params()
!!! quote "get_config_params()"
    Tries to ping the bolinho front-end, returns 1 if it worked

    ``` python title="Python usage example"
    from bolinho_api.core import core_api
    
    config = core_api.get_config_params()
    current_save_version = config["configVersion"]
    print(current_save_version)
    ```
    > This function is located at `src/web/src/App.js`

___

### go_to_experiment_page()
!!! quote "go_to_experiment_page()"
    Asks the front end to go to the experiment page.

    Returns 1 if succeeded.

    ``` python title="Python usage example"
    from bolinho_api.core import core_api

    change_pages = True
    if change_pages:
        core_api.go_to_experiment_page()
    ```

___

### go_to_home_page()
!!! quote "go_to_home_page()"

    Asks the front end to go to the home page.

    Returns 1 if succeeded.

    ``` python title="Python usage example"
    from bolinho_api.core import core_api

    change_pages = True
    if change_pages:
        core_api.go_to_home_page()
    ```


___

### set_is_connected()
!!! quote "set_is_connected()"
    Sets the variable "isConnected" on the front-end.

    ``` python title="Python usage example"
    from bolinho_api.core import core_api

    core_api.set_is_connected(True)
    ```
___

### refresh_data()
!!! quote "refresh_data()"
    Sets the variable "isConnected" on the front-end.

    ``` python title="Python usage example"
    from bolinho_api.core import core_api

    add_material_to_db() #Arbitrary function that adds a material to the DB   

    core_api.refresh_data()
    ```
___




## UI API

Collection of all functions/API calls available to the backend for UI in general. You can find them in the `bolinho_api/ui.py` file.

The JavaScript file can be found in the api folder.

___

### success_alert(text)
!!! quote "success_alert(text)"

    Uses [React-Toastify](https://github.com/fkhadra/react-toastify) to create an success alert.

    ``` python title="Python usage example"
    from bolinho_api.ui import ui_api

    ui_api.success_alert("Success!")
    ```

___

### error_alert(text)
!!! quote "error_alert(text)"

    Uses [React-Toastify](https://github.com/fkhadra/react-toastify) to create an error alert.

    ``` python title="Python usage example"
    from bolinho_api.ui import ui_api

    ui_api.error_alert("Error!")
    ```

___

### prompt_user(description, options, callback_func)
!!! quote "prompt_user(description, options, callback_func)"
    Prompts the user with a 'description', and shows the 'options' to the user.

    The result is passed to the callback_function

    ``` python title="Python usage example"
    from bolinho_api.ui import ui_api

    def get_result(result):
        if result == "yes":
            print("The user chose yes")
        print("The user chose no")

    ui_api.prompt_user(
        description="Do you want to pay 1000?", 
        options=["yes", "no"], 
        callback_func= get_result,
        )
    ```

___

### set_focus(focus_element: str)
!!! quote "error_alert(focus_element: str)"

    Focus in an specific element on the frontend.

    WARNING Pay attention to the name of the element you are trying to focus

    You can find them at [https://github.com/HefestusTec/bolinho/blob/main/src/web/src/api/apiTypes.ts](https://github.com/HefestusTec/bolinho/blob/main/src/web/src/api/apiTypes.ts)

    ``` python title="Python usage example"
    from bolinho_api.ui import ui_api

    ui_api.set_focus("connection-component")

    ```

___


## Experiment page API
Collection of all functions/API calls available to the backend for the **experiment** routine. You can find them in the `bolinho_api/experiment.py` file.

The JavaScript file can be found at `web/src/api/contexts/ExperimentPageContext.tsx`.

___


### set_time(newValue)
!!! quote "set_time(newValue)"
    Sets the current time of the experiment.

    This variable is shown to the user as value and progress bar.

    ``` python title="Python usage example"
    from bolinho_api.experiment import experiment_api

    experiment_api.set_time(22)

    ```

___

### set_delta_load(newValue)
!!! quote "set_delta_load(newValue)"
    Sets the current delta load.

    This variable is shown to the user as value and progress bar.

    ``` python title="Python usage example"
    from bolinho_api.experiment import experiment_api

    experiment_api.set_delta_load(22)

    ```

___

### get_readings()
!!! quote "get_readings()"
    Asks the front for the current Readings.

    Returns an object of type Readings, this object gathers all the current readings of the machine.
    Such as Current z axis position, current load, and status

    ``` python title="Python usage example"
    from bolinho_api.experiment import experiment_api
    
    reading_obj = experiment_api.get_readings()

    print(reading_obj.status)
    ```

___

### set_readings(newValue)
!!! quote "set_readings(newValue)"
    Sets the current Readings.

    Receives an object of type Readings, this object gathers all the current readings of the machine.
    Such as Current z axis position, current load, and status.

    This function dumps the object to a JSON and sends it to the front end

    ``` python title="Python usage example"
    from bolinho_api.experiment import experiment_api
    from bolinho_api.classes import Readings

    new_machine_readings = Readings(299, 87, 300, "not good")

    experiment_api.set_readings(new_machine_readings)
    ```