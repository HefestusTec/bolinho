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

## Experimentos

### get_experiment_data(experiment_index)

!!! quote ""
    Retorna os dados de um determinado experimento.

    ``` python
    return(db[experiment_index])
    ```

### get_new_experiment_data(experiment_index, data_index)

!!! quote ""
    Retorna os dados de um determinado experimento a partir do `data_index`.

    ``` python
    return(new_data)
    ```

___

## Dados do usuário

### get_user_settings()

!!! quote ""
    Retorna a configuração global do usuário.

### set_user_settings(user_settings)

!!! quote ""
    Seta a configuração global do usuário.

___

## Parâmetros de ensaio

### get_auto_stop_params()

!!! quote ""
    Retorna os parâmetros de parada automática do equipamento.

### set_auto_stop_params()

!!! quote ""
    Seta os parâmetros de parada automática do equipamento.

### set_experiment_settings(settings)

!!! quote ""
    Seta a configuração do ensaio.

    * Direção
    * Velocidade
    * Tipo de ensaio

### set_experiment_body_params(experiment_body_params)

!!! quote ""
    Seta os parâmetros do **corpo de prova** que será testado.

    * Formato (Retângulo, cilindro, Tubo)
    * Area (Largura x profundidade ou diâmetro interno / externo)

___

## Parâmetros do equipamento

### get_calibration_params()

!!! quote ""
    Retorna os parâmetros de calibração.

### get_equipment_params()

!!! quote ""
    Retorna os parâmetros do equipamento

___

## Manipulação de materiais

### get_material_data(material_index)

!!! quote ""
    Retorna os dados de um material, retorna valor especifico caso o material não exista

### set_material_data(material, material_index)

!!! quote ""
    Seta dos dados do material em um index específico

### find_materials_by_batch(material_batch)

!!! quote ""
    Encontra e retorna uma lista de materiais com um lote específico

### find_materials_by_name(material_name)

!!! quote ""
    Encontra e retorna uma lista de materiais com um nome específico
