#  <img src="docs/resources/LogoBolinho512.png" width="45" height="45" alt="Logo"/> Bolinho

Full stack solution for data gathering, processing and interaction.

Bolinho has a frontend made with ReactJs, and a backend running python, it transfer data between them using the python library [eel](https://github.com/python-eel/Eel).

# Documentation

## You can find the documentation in [https://hefestustec.github.io/bolinho/](https://hefestustec.github.io/bolinho/)

* ### [Download automatically generated PDF](https://github.com/HefestusTec/bolinho/raw/gh-pages/pdf/document.pdf)


# Building

First you will need:
* [Python 3](https://www.python.org/)
* pip
* [npm](https://www.npmjs.com/)

Start by installing all the dependencies for the frontend using

`npm run installDep`

After that you can install the necessary python packages with

`pip install -r requirements.txt`

> For more info please check out the [setup](https://hefestustec.github.io/bolinho/setup/) page of the documentation.

# Running

As for running the program we have a few options:

* Run only the frontend `npm run startWeb`

* Run only the backend `npm run startEel`

* Run the full application `npm run start`
    > With this command it will first build the react front end, then run the python script.

* Build the react frontend `npm run buildWeb`

* Build binaries. `npm run buildBin`
> * You can build the "binaries", more like a python environment wrapper, it uses [PyInstaller](https://pyinstaller.org/en/stable/) to generate the bins.
> * The output path is `bolinho/src/dist/`
