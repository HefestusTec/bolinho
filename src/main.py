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

# from os import system

import eel
from argparse import ArgumentParser
import expose_db  # não remover

from bolinho_api import core_api, ui_api

parser = ArgumentParser()
parser.add_argument(
    "-d",
    "--development",
    help="Run as headless server, useful for development. (it doesn't need to build the webview)",
    default=False,
    action="store_true",
)

run_as_development = parser.parse_args().development


def start_eel():
    app = "chrome"

    eel.init("web/build", [".tsx", ".ts", ".jsx", ".js", ".html"])

    eel_kwargs = dict(
        host="localhost",
        port=8080,
        shutdown_delay=3,
        # size=(1280, 800),
    )
    page_name = "index.html"

    # enable hardware acceleration
    eel_cmdline_args = "--kiosk --enable-features=WebComponentsV0Enabled --enable-webgl-draft-extensions --enable-accelerated-2d-canvas --enable-gpu-rasterization --enable-threaded-compositing --enable-native-gpu-memory-buffers --enable-zero-copy --enable-gpu-compositing --enable-oop-rasterization"

    try:
        if run_as_development:
            eel.start(**eel_kwargs, cmdline_args=[eel_cmdline_args])
        else:
            eel.start(
                page_name, mode=app, **eel_kwargs, cmdline_args=[eel_cmdline_args]
            )
    except:
        raise


def wait_for_connection():
    while True:
        try:
            if core_api.ping():
                break
            pass
        except:
            eel.sleep(1)


if __name__ == "__main__":
    # system("taskkill /im chrome.exe /f") # Podemos colocar isso para fechar o chrome antes de rodar o eel
    eel.spawn(start_eel)  # Inicializando eel em outro thread

    # Will stay in a infinite loop until connected to the front end
    # You can only use front end functions after the connection
    wait_for_connection()

    while True:
        eel.sleep(1)
