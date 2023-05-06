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

# API

In this section you will be able to finde every **API call** available.

These `calls` are exposed to the **front-end** via the `eel` object, giving it access to the **data base**, **systems** and **hardware**. This solutions makes use of the [eel](https://github.com/python-eel/Eel) library to realize the communication between the front-end and back-end;

This API reference will show the methods being called by the front-end in JavaScript, and every call should be made **asynchronously**.

## How to create and expose functions to the backend

``` jsx
function myJsFunction(message){
    console.log(`Got this from the back end ${message}`)
}

// This line exposes the function to the back end, note the second argument, it is the name that the back end needs to call
window.eel.expose(myJsFunction, "myJsFunction");
```

``` python
try:
    eel.myJsFunction("IT'S WORKING")
except:
    pass
```

