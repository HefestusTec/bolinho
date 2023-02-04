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


@eel.expose
def get_one():
    return 1


def start_eel():
    app = "chrome"

    eel.init("web/build", [".tsx", ".ts", ".jsx", ".js", ".html"])

    eel_kwargs = dict(
        host="localhost",
        port=8080,
        # size=(1280, 800),
    )
    page_name = "index.html"

    # enable hardware acceleration
    eel_cmdline_args = "--kiosk --enable-features=WebComponentsV0Enabled --enable-webgl-draft-extensions --enable-accelerated-2d-canvas --enable-gpu-rasterization --enable-threaded-compositing --enable-native-gpu-memory-buffers --enable-zero-copy --enable-gpu-compositing --enable-oop-rasterization"

    try:
        eel.start(page_name, mode=app, **eel_kwargs, cmdline_args=[eel_cmdline_args])
    except:
        raise


if __name__ == "__main__":
    # system("taskkill /im chrome.exe /f") # Podemos colocar isso para fechar o chrome antes de rodar o eel
    eel.spawn(start_eel)  # Inicializando eel em outro thread
    while True:
        eel.sleep(1)
