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

# Styling

Here we will show some tips and styling techniques used on this project.


## Adding ellipsis

You can add ellipsis to most texts using the following code

``` css
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```

!!! tip
    This **must not be wrapped in a `flex` div**, therefore we recommend you using a div only for the text, for example:
    ``` jsx
    <div className="my-cool-div">
        <div className="my-text">
                This text will add ellipsis when it overflows.
        </div>
    </div>
    ```

    ``` css
    .my-text{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    ```