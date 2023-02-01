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

# Operação

Esta página reúne as API calls relacionadas à operação do equipamento.

> Por exemplo, controle manual, inicio de tarefas etc.

## Controle Manual

### manual_control_head_up()

!!! quote ""
    Envia uma solicitação para levantar o cabeçote de prova

    > Caso essa solicitação seja enviada durante um **ensaio automático** este irá ser interrompido, e aguardará o comando para reiniciar


### manual_control_head_down()

!!! quote ""
    Envia uma solicitação para descer o cabeçote de prova

    > Caso essa solicitação seja enviada durante um **ensaio automático** este irá ser interrompido, e aguardará o comando para reiniciar
___

## Calibração

### start_z_axis_calibration()

!!! quote ""
    Inicia a calibração do eixo Z

### start_load_cell_calibration()

!!! quote ""
    Inicia a calibração da célula de carga.
___

## Controle de experimento

### start_auto_experiment()

!!! quote ""
    Inicia o experimento automático

### pause_experiment()

!!! quote ""
    Pausa o experimento e aguarda o comando do usuário


### resume_experiment()

!!! quote ""
    Retorna o experimento.

### end_experiment()

!!! quote ""
    Encerra o experimento.