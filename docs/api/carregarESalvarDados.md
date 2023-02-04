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

# Carregar e salvar dados

Esta página reúne as API calls relacionadas ao registro e carregamento de dados 


## Parâmetros de pré-ensaio

### get_auto_stop_params()

!!! quote ""
    Retorna os parâmetros de [`autoStopParams`](./tiposDeDados.md#autostopparams) (parada automática) do equipamento.

    ``` js
    let myStopParams = eel.get_auto_stop_params();
    ```

### set_auto_stop_params()

!!! quote ""
    Seta os parâmetros de [`autoStopParams`](./tiposDeDados.md#autostopparams) (parada automática) do equipamento.

    ``` js
    const autoStopParams = {
        forceLossLimit: 20, // Caso a força exercida caia mais de 20% o experimento será parado
        maxForce: 10000,    // Limite de força maxima em newtons
        maxTravel: 100,     // Limite de deslocamento em mm
        maxTime: 600        // Tempo máximo de ensaio em segundos
    };

    eel.set_auto_stop_params(autoStopParams);
    ```

### set_experiment_settings( settings )

!!! quote ""
    Seta a [`experimentSettings`](./tiposDeDados.md#experimentsettings) (configuração do ensaio).

    ``` js
    const experimentSettings = {
        compress: true,    // (Moverá para cima ou para baixo?) Se verdadeiro o teste sera feito "Apertando" o experimento, do contrário será "Puxando".
        zAxisSpeed: 5,  // Velocidade do eixo z durante o experimento em mm/s 
    };

    eel.set_experiment_settings(experimentSettings);
    ```

### set_experiment_body_params( experiment_body_params )

!!! quote ""
    Seta os parâmetros do [`ExperimentBodyParams`](./tiposDeDados.md#experimentbodyparams) (parâmetros do corpo de prova) que será testado.
    
    ``` js
    const experimentBodyParams = new ExperimentBodyParams();

    eel.set_experiment_body_params(experimentBodyParams);
    ```
___

## Dados durante ensaio

### get_experiment_data( experiment_index )

!!! quote ""
    Retorna uma `array` de [`DataPoint`](./tiposDeDados.md#datapoint) de um determinado experimento.

    ``` js
    experimentData = await eel.get_experiment_data(2);
    ```
    
### get_new_experiment_data( experiment_index, data_index )

!!! quote ""
    Retorna uma `array` de [`DataPoint`](./tiposDeDados.md#datapoint) de um determinado experimento a partir de um `data_index`.

    Este método é útil para realizar o *fetch* de dados sem precisar gastar recursos com o carregamento de dados já recebidos.

    ``` js
    newData = await eel.get_new_experiment_data(2, 354);
    ```

___

## Parâmetros do equipamento

### get_calibration_params()

!!! quote ""
    Retorna os parâmetros de calibração.

### get_equipment_params()

!!! quote ""
    Retorna os parâmetros do equipamento

### set_equipment_params()

!!! quote ""
    Seta os parâmetros do equipamento
___

## Manipulação da base de dados de materiais

### get_material_data( material_index )

!!! quote ""
    Retorna os dados de um [`MaterialData`](./tiposDeDados.md#materialdata), retorna `NULL` caso o material não exista.
    
    ``` js
    materialDataAtIndex = await eel.get_material_data(2);
    ```

### set_material_data( material, material_index )

!!! quote ""
    Seta dos dados do [`MaterialData`](./tiposDeDados.md#materialdata) em um index específico

    ``` js
    materialData = new MaterialData()

    eel.set_material_data(materialData);
    ```

### get_material_list( filter )

!!! quote ""
    Encontra e retorna a lista completa de [`MaterialData`](./tiposDeDados.md#materialdata).

    Podem ser passado `filter` para busca com filtros

    Retorna `NULL` caso não encontre.
    ``` js
    materialsList = await eel.get_material_list(name="Madeira");
    ```

