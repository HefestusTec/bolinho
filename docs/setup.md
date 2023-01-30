# Setup

Nessa página serão mostrados o passo a passo para ser possível criar uma *build* deste projeto.

Este projeto assume que você possui a versão mais recente de [Python](https://www.python.org/), de **PIP** e **GIT**, caso precise instalar por favor visite [https://www.python.org/downloads/](https://www.python.org/downloads/).

Este projeto foi testado e desenvolvido com a versão `Python 3.10.x`

## Clonando o repositório

``` bash
git clone https://github.com/HefestusTec/bolinho

cd bolinho
```

## Criando ambiente virtual

> Esse passo não é obrigatório, mas sim **recomendado**

``` bash
python3 -m pip install --user virtualenv

python -m venv venv
```

Com isso um ambiente virtual chamado `venv` será criado no diretório do projeto.

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

pip install bottle bottle-websocket future whichcraft pyinstaller

pip install eel
```

___

## Documentação

> Esse passo apenas é necessário para quem desejar editar a documentação

Para realizar uma build da documentação siga as instruções a seguir

### Instalando dependências

``` bash
pip install mkdocs

pip install mkdocs-material

pip install mkdocs-with-pdf

pip install mkdocs-pdf-export-plugin
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

