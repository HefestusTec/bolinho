# Setup

This page will define the step-by-step to build this project.

This project assumes you have the latest version of [Python](https://www.python.org/), **PIP** and **GIT**,

This project was developed using python version `Python 3.10.x`

## Clone the repo

``` bash
git clone https://github.com/HefestusTec/bolinho

cd bolinho
```

## Creating a virtual environment

> The following step isn't mandatory but **recommended**.

``` bash
python -m pip install --user virtualenv

python -m venv venv
```

The a directory `venv` should be created in the root folder.

How to activate:


!!! admonition-windows "**Windows** activation"

    ``` bash title=""
    venv/Scripts/activate
    ```

or

!!! admonition-linux "**Linux** activation"

    ``` bash title=""
    source venv/bin/activate
    ```
___

## Installing dependencies

``` bash
npm install

npm run installDep

pip install -r requirements.txt
```

___

## Documentation

> The following step is only required for those that want to **edit the documentation**.

### Installing dependencies

``` bash
pip install -r docs/requirements.txt
```

### Build

We have two options to create a build:

* **Serve**:
    
    This option is used for debugging, it will open the static page in one of the localhost ports.
    
    ``` bash title=""
    mkdocs serve
    ```

* **Build**:
    
    This option creates a build of the documentation and saves it on de directory `/site/`.
    
    ``` bash title=""
    mkdocs build
    ```

!!! note
    Be aware of the **Environment Variable** `ENABLE_PDF_EXPORT`, it will only generate the PDF if this variable is set to `1`.

    You can change the `mkdocs.yml` file and remove this line if you so choose.


For more info about the documentation please checkout [ZRafaF/ReadTheDocksBase](https://github.com/ZRafaF/ReadTheDocksBase).

