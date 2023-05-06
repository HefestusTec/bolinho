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


def prompt_user(
    description: str = "",
    options: List[str] = ["yes", "no"],
    callback_func: Callable = (),
):
    """
    Prompts the user with a 'description', and shows the 'options' to the user.

    The result is passed to the callback_function
    """
    eel.promptUserJS(description, options)(callback_func)


def success_alert(text: str):
    """Show a success alert to the user with some 'text'"""
    eel.toastSuccessJS(text)


def error_alert(text: str):
    """Show an error alert to the user with some 'text'"""
    eel.toastErrorJS(text)
