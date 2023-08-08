# Copyright (C) 2023 Hefestus
#
# This file is part of Bolinho.
#
# Bolinho is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Bolinho is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Bolinho.  If not, see <http://www.gnu.org/licenses/>.

import eel
from typing import List, Callable


class UiAPI:
    def __init__(self):
        self.return_prompt_function: Callable = None

    def prompt_user(
        self,
        description: str = "",
        options: List[str] = ["yes", "no"],
        callback_func: Callable = (),
    ):
        """
        Prompts the user with a 'description', and shows the 'options' to the user.

        The result is passed to the callback_function
        """
        self.return_prompt_function = callback_func
        eel.promptUserJS(description, options)()

    def success_alert(self, text: str):
        """Show a success alert to the user with some 'text'"""
        eel.toastSuccessJS(text)

    def error_alert(self, text: str):
        """Show an error alert to the user with some 'text'"""
        eel.toastErrorJS(text)

    def set_return_prompt_function(self, return_function):
        self.return_prompt_function = return_function

    def set_focus(self, focus_element: str):
        """
        Focus in an specific element on the frontend.

        WARNING Pay attention to the name of the element you are trying to focus

        You can find them at https://github.com/HefestusTec/bolinho/blob/main/src/web/src/api/apiTypes.ts
        """

        eel.setFocusJS(focus_element)


ui_api = UiAPI()
