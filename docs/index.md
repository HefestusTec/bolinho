# Home

Documentation of the FullStack solution **bolinho**.

This documentation automatically generates a {==PDF file==} from it's content. You can download it [here](https://github.com/HefestusTec/bolinho/raw/gh-pages/pdf/document.pdf).

## You can see the React [Front-end HERE!](src/web/build/index.html)
> This is a static version of the app, without access to the server, therefore most features won't work.

> !!! info
    Remember that you need to build the app for it to show on the static page, so run `npm run buildWeb` or something similar to build it.



Use the **Tabs** above to navigate through the documentation.

___

## Running

As for running the program we have a few options:

* Run only the frontend `npm run startWeb`

* Run only the backend `npm run startEel`

* Serve the full application `npm run serve`
    
    > This command will start the eel as headless and start the web serve, it doesn't need to build the front end before executing. **Less performant**.


* Run the full application `npm run start`
    
    > With this command it will first build the react front end, then run the python script.

* Build the react frontend `npm run buildWeb`

* Build binaries. `npm run buildBin`

    > * You can build the "binaries", more like a python environment wrapper, it uses [PyInstaller](https://pyinstaller.org/en/stable/) to generate the bins.
    > * The output path is `bolinho/src/dist/`

!!! info ""

    Did you like this documentation? You can check out the repo [ZRafaF/ReadTheDocksBase](https://github.com/ZRafaF/ReadTheDocksBase) for more info :smile:.