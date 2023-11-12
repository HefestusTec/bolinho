// Copyright (C) 2023 Hefestus
//
// This file is part of Bolinho.
//
// Bolinho is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Bolinho is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Bolinho.  If not, see <http://www.gnu.org/licenses/>.
import { toast } from "react-toastify";

export function toastErrorJS(msg: any) {
    toast.error(msg);
}
try {
    window.eel.expose(toastErrorJS, "toastErrorJS");
} catch (error) {}

export function toastSuccessJS(msg: any) {
    toast.success(msg);
}
try {
    window.eel.expose(toastSuccessJS, "toastSuccessJS");
} catch (error) {}

export function toastLoadingJS(msg: any) {
    return toast.loading(msg);
}
try {
    window.eel.expose(toastLoadingJS, "toastLoadingJS");
} catch (error) {}

export function toastUpdateJS(msg: string, success: boolean, id: number) {
    toast.update(id, {
        render: msg,
        type: success ? 'success' : "error",
        isLoading: false,
        autoClose: 5000,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        closeOnClick: true,
    });
}
try {
    window.eel.expose(toastUpdateJS, "toastUpdateJS");
} catch (error) {}