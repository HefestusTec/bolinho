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

## Linking stylesheets to a component   

Stylesheets are made with `style.module.css` and imported into the `.jsx` or `.tsx` allowing us to use it as an object to name `className`s.

As for naming convention snake case is being used for styling names

``` react
import styleModule from "./mainPage.module.css";

<div className={styleModule.my_custom_div}>
    Im a styled div
<div>

```

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