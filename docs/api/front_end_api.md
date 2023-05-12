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

### `#!python def ping()`:
!!! quote ""

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

### `#!python def get_config_params()`:
!!! quote ""
    
    
    Tries to ping the bolinho front-end, returns 1 if it worked

    ``` python title="Python usage example"
    from bolinho_api.core import core_api
    
    config = core_api.get_config_params()
    current_save_version = config["configVersion"]
    print(current_save_version)
    ```
    > This function is located at `src/web/src/App.js`


### `#!python def go_to_experiment_page()`:
!!! quote ""

    Asks the front end to go to the experiment page.

    Returns 1 if succeeded.

    ``` python title="Python usage example"
    from bolinho_api.core import core_api

    change_pages = True
    if change_pages:
        core_api.go_to_experiment_page()
    ```


## UI API

Collection of all functions/API calls available to the backend for UI in general. You can find them in the `bolinho_api/ui.py` file.

The JavaScript file can be found in the api folder.

### `#!python def success_alert(text)`:
!!! quote ""

    Uses [React-Toastify](https://github.com/fkhadra/react-toastify) to create an success alert.

    ``` python title="Python usage example"
    from bolinho_api.ui import ui_api

    ui_api.success_alert("Success!")
    ```

### `#!python def error_alert(text)`:
!!! quote ""

    Uses [React-Toastify](https://github.com/fkhadra/react-toastify) to create an error alert.

    ``` python title="Python usage example"
    from bolinho_api.ui import ui_api

    UIapi.error_alert("Error!")
    ```

### `#!python def prompt_user(description, options, callback_func)`:
!!! quote ""
    Prompts the user with a 'description', and shows the 'options' to the user.

    The result is passed to the callback_function

    ``` python title="Python usage example"
    from bolinho_api.ui import ui_api

    def get_result(result):
        if result == "yes":
            print("The user chose yes")
        print("The user chose no")

    UIapi.prompt_user(
        description="Do you want to pay 1000?", 
        options=["yes", "no"], 
        callback_func= get_result,
        )
    ```