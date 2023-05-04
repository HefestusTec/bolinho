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

# UIapi

This page is a collection of all functions/API calls available to the backend for UI in general. You can find them in the `UIapi.py` file.

!!! warning
    The functions can only be called if they are available on the `web/build` directory, therefore if you make a change using `npm run serve` won't show it, you will need to rebuild the front end with `npm run buildWeb` or by using `npm run start`.

!!! note
    These functions can only be called after eel is initiated with `eel.init()`.

## `#!python def success_alert(text)`:
!!! quote ""

    Uses [React-Toastify](https://github.com/fkhadra/react-toastify) to create an success alert.

    ### Usage example

    ``` python
    import UIapi

    UIapi.success_alert("Success!")
    ```

## `#!python def error_alert(text)`:
!!! quote ""

    Uses [React-Toastify](https://github.com/fkhadra/react-toastify) to create an error alert.

    ### Usage example

    ``` python
    import UIapi

    UIapi.error_alert("Error!")
    ```

## `#!python def prompt_user(description, options, callback_func)`:
!!! quote ""
    Prompts the user with a 'description', and shows the 'options' to the user.

    The result is passed to the callback_function

    ### Usage example

    ``` python
    import UIapi

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