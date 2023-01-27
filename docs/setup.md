# Setup

Nessa página serão mostrados o passo a passo para ser possível criar uma *build* deste projeto.

Este projeto assume que você possui a versão mais recente de [Python](https://www.python.org/), de **PIP** e **GIT**, caso precise instalar por favor visite [https://www.python.org/downloads/](https://www.python.org/downloads/).

Este projeto foi testado e desenvolvido com a versão `Python 3.10.x`

Clone o projeto com:

`git clone https://github.com/HefestusTec/bolinho`

e

`cd bolinho`

## Ambiente Virtual


Execute o seguinte comando para criar um ambiente virtual chamando `venv` no diretorio atual

`python -m venv venv`

e para ativar

___

:simple-windows: Windows

`venv\Scripts\activate`
    
___

:simple-linux: Linux

`source venv\bin\activate`

___

## Dependências



___

## Documentação

Para realizar uma build da documentação siga as instruções a seguir

### Dependências

1. [mkdocs-material](https://squidfunk.github.io/mkdocs-material/)
    
    `pip install mkdocs-material`

2. [mkdocs-with-pdf](https://github.com/orzih/mkdocs-with-pdf)
    
    `pip install mkdocs-with-pdf`

3. [mkdocs-pdf-export-plugin](https://github.com/zhaoterryy/mkdocs-pdf-export-plugin)

    `pip install mkdocs-pdf-export-plugin`


### Build

Para criar uma build temos 2 opções:

1. **Servidor local**:
    
    Essa é a opção utilizada para debug, ela irá abir o site estático em uma das portas do localhost.
    
    `mkdocs serve`

1. **Build**:
    
    Essa é a opção cria uma build do projeto e a coloca no diretorio padrão `site`, caso esse não esteja presente ele sera criado automaticamente durante o processo.
    
    `mkdocs build`


para mais informações sobre a documentação visitar [ZRafaF/ReadTheDocksBase](https://github.com/ZRafaF/ReadTheDocksBase)

