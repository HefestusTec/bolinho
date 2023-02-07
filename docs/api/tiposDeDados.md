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

# Data types

All different data types will be shown in this page

## DataPoint
!!! quote ""
    ``` js title=""
    class DataPoint {
        constructor(x=0, y=0) {
            this.x = x; // The label "x" HAS to be a STRING
            this.y = y;
        }
    }
    ```
    > * `x`: Position at the mesure moment
        * type: `String`
        * Unity: `mm`
    * `y`: Force at the mesure moment
        * Type: `float`
        * Unity: `N`

___

## autoStopParams

!!! quote ""
    ``` js title=""
    const autoStopParams = {
        forceLossLimit: 20, // Max force loss to trigger auto-stop
        maxForce: 10000,    // Max force limit
        maxTravel: 100,     // Travel limit
        maxTime: 600        // Experiment time limit
    };
    ```
    > * `forceLossLimit`: Max force loss to trigger auto-stop.
        * Type: `float`
        * Unity: `%`
    * `maxForce`: Max force limit to trigger auto-stop.
        * Type: `float`
        * Unity: `N`
    * `maxTravel`: Max distance the experiment head can travel during the experiment.
        * Type: `float`
        * Unity: `mm`
    * `maxTime`: Experiment time limit.
        * Type: `float`
        * Unity: `s`

___

## experimentSettings

!!! quote ""
    ``` js title=""
    const experimentSettings = {
        compress: true,
        zAxisSpeed: 5
    };
    ```
    > * `compress`: Informa qual a direção o experimento ocorrerá, podendo esse ser "descendo" ou seja comprimindo o corpo de prova, ou "subindo" expandindo o corpo de prova
        * Type: `bool`
        * Unity: N/A
    * `zAxisSpeed`: Velocidade que o eixo z se moverá durante o experimento
        * Type: `float`
        * Unity: `mm/s`

___

## ExperimentBodyParams

!!! quote ""
    ``` js title=""
    class ExperimentBodyParams {
        constructor(type=0, paramA=0, paramB=0, height=0) {
            this.type = type;       // Formato do corpo | 1 = Retângulo | 2 = Cilindro | 3 = Tubo
            this.paramA = paramA;   // Parâmetro 'a' do corpo | Retângulo = largura | Cilindro = Diam. Externo | Tubo = Diam. Externo
            this.paramB = paramB;   // Parâmetro 'b' do corpo | Retângulo = profundidade | Cilindro = NULL | Tubo = Diam. Interno
            this.height = height;   // Altura do corpo de prova
        }
    }
    ```
    > * `type`: Formato do corpo
        * 1 = Retângulo
        * 2 = Cilindro
        * 3 = Tubo
        * Type: `int`
        * Unity: N/A
    * `paramA`: Parâmetro 'a' do corpo
        * Retângulo = largura
        * Cilindro = Diâmetro Externo
        * Tubo = Diâmetro Externo
        * Type: `float`
        * Unity: `mm`
    * `paramB`: Parâmetro 'b' do corpo
        * Retângulo = profundidade
        * Cilindro = NULL
        * Tubo = Diâmetro Interno
        * Type: `float`
        * Unity: `mm`
    * `height`: Altura do corpo de prova
        * Type: `float`
        * Unity: `mm`

___

## MaterialData
!!! quote ""
    Esta classe é um *template* do Type de material que um experimento pode ter
    ``` js title=""
    class MaterialData {
        constructor(name="Padrão", batch=0, index=0) {
            this.name = name;
            this.batch = batch;
            this.index = index;
        }
    }
    ```
    > * `name`: Nome do material
        * Type: `String`
        * Unity: N/A
    * `batch`: Lote do material
        * Type: `int`
        * Unity: N/A    
    * `index`: Índice do material na db de materiais
        * Type: `int`
        * Unity: N/A

___

## Experiment
!!! quote ""
    Esta classe é um *template* de um experimento completo

    ``` js title=""
    class Experiment {
        constructor(material=new MaterialData(), reading=[], index=0) {
            this.material = material;
            this.reading = reading
            this.index = index;
        }
    }
    ```
    > * `material`: Material que esse experimento foi feito
        * Type: [`MaterialData`](#materialdata)
        * Unity: N/A
    * `reading`: Data points da leitura do experimento
        * Type: [`array[DataPoint]`](#datapoint)
        * Unity: N/A    
    * `index`: Índice do experimento na db de experimento
        * Type: `int`
        * Unity: N/A