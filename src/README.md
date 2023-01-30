## Dependências

``` bash
npm install
pip install bottle bottle-websocket future whichcraft pyinstaller eel
```
___

* Construindo o react-app `npm run build`

* Executando o script `python main.py`


## Como executar

Para execução temos algumas opções

* Executar apenas web `npm run start`

* Executar apenas eel `python main.py`

* Executar apenas eel + web `npm run start`
    > Nesse caso primeiro será realizada uma build do web app, e so então executado

* Construir web app `npm run build`

* Construir binários da aplicação completa `npm run buildBin`
    > O *output path* é `/dist/`