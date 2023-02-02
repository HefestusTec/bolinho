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

# Tipos de Dados

Aqui serão apresentados todos os tipos de dados customizados

## DataPoint
!!! quote ""
    ``` js title=""
    class DataPoint {
        constructor(force=0, pos=0) {
            this.force = force;
            this.pos = pos;
        }
    }
    ```
    > * `force`: Força instantânea no momento de medição
        * tipo: `float`
        * unidade: `N`
    * `pos`: Posição instantânea no momento de medição
        * tipo: `float`
        * unidade: `mm`

___

## autoStopParams

!!! quote ""
    ``` js title=""
    const autoStopParams = {
        forceLossLimit: 20, // Caso a força exercida caia mais de 20% o experimento será parado
        maxForce: 10000,    // Limite de força maxima em newtons
        maxTravel: 100,     // Limite de deslocamento em mm
        maxTime: 600        // Tempo máximo de ensaio em segundos
    };
    ```
    > * `forceLossLimit`: Informa o limite máximo de queda de força para a parada automática do ensaio
        * tipo: `float`
        * unidade: `%`
    * `maxForce`: Informa o limite de força máxima para parada automática do ensaio
        * tipo: `float`
        * unidade: `N`
    * `maxTravel`: Informa a distância maxima que o cabeçote poderá percorrer durante o ensaio.
        * tipo: `float`
        * unidade: `mm`
    * `maxTime`: Informa o limite de tempo parada automática do ensaio
        * tipo: `float`
        * unidade: `s`

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
        * tipo: `bool`
        * unidade: N/A
    * `zAxisSpeed`: Velocidade que o eixo z se moverá durante o experimento
        * tipo: `float`
        * unidade: `mm/s`

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
        * tipo: `int`
        * unidade: N/A
    * `paramA`: Parâmetro 'a' do corpo
        * Retângulo = largura
        * Cilindro = Diâmetro Externo
        * Tubo = Diâmetro Externo
        * tipo: `float`
        * unidade: `mm`
    * `paramB`: Parâmetro 'b' do corpo
        * Retângulo = profundidade
        * Cilindro = NULL
        * Tubo = Diâmetro Interno
        * tipo: `float`
        * unidade: `mm`
    * `height`: Altura do corpo de prova
        * tipo: `float`
        * unidade: `mm`

___

## MaterialData
!!! quote ""
    Esta classe é um *template* do tipo de material que um experimento pode ter
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
        * tipo: `String`
        * unidade: N/A
    * `batch`: Lote do material
        * tipo: `int`
        * unidade: N/A    
    * `index`: Índice do material na db de materiais
        * tipo: `int`
        * unidade: N/A

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
        * tipo: [`MaterialData`](#materialdata)
        * unidade: N/A
    * `reading`: Data points da leitura do experimento
        * tipo: [`array[DataPoint]`](#datapoint)
        * unidade: N/A    
    * `index`: Índice do experimento na db de experimento
        * tipo: `int`
        * unidade: N/A