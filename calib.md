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



## Criar NOVO MATERIAl
* NOME (str)
* LOTE (str)
* Supplier name
* supplier contact
* Extra info


## Criar Experimento
* Corpo
    * Tipo (num)
    * Id do material (num)
    * param_a (num)
    * param_b (num)
    * altura (float)
    * informação extra (str)

* Experimento
    * Nome (str)
    * load Loss Limit(float)
    * max load (float)
    * max travel (float)
    * max time (float)
    * compress (bool)
    * z axis speed (float)
    * Extra info
    
### Info setada pelo backend
* datetime
* body id



## Editar experimento (id)
* nome
* extra info


## Editar Material (id)
* Supplier name
* supplier contact
* Extra info

