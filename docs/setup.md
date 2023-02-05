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
python3 -m pip install --user virtualenv

python -m venv venv
```

The a directory `venv` should be created in the root folder.

Para ativar:


!!! admonition-windows "Ativação no **Windows**"

    ``` bash title=""
    venv/Scripts/activate
    ```

ou

!!! admonition-linux "Ativação no **Linux**"

    ``` bash title=""
    source venv/bin/activate
    ```
___

## Instalando dependências

``` bash
npm install

npm run installDep

pip install -r requirements.txt
```

___

## Documentação

> Esse passo apenas é necessário para quem desejar editar a documentação

Para realizar uma build da documentação siga as instruções a seguir

### Instalando dependências

``` bash
pip install -r docs/requirements.txt
```

### Build

Para criar uma build temos 2 opções:

* **Servidor local**:
    
    Essa é a opção utilizada para debug, ela irá abir o site estático em uma das portas do localhost.
    
    ``` bash title=""
    mkdocs serve
    ```

* **Build**:
    
    Essa é a opção cria uma build do projeto e a coloca no diretório padrão `site`, caso esse não esteja presente ele sera criado automaticamente durante o processo.
    
    ``` bash title=""
    mkdocs build
    ```

!!! note
    O arquivo `mkdocs.yml` está configurado para apenas exportar os PDFs caso a ***environment variable*** `ENABLE_PDF_EXPORT` for `1`

para mais informações sobre a documentação visitar [ZRafaF/ReadTheDocksBase](https://github.com/ZRafaF/ReadTheDocksBase)

