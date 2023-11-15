# Movimento
* `- Cima`
* `+ Baixo`


# Granulado
## Funções
* `check_granulado_is_connected()` -> Checa se granulado está conectado
* `connect_to_granulado()` -> Conecta ao granulado
* `move_z_axis_millimeters(mm)` -> Move o eixo-z em mm milímetros, 0 é o topo
* `stop_z_axis()` -> Para o eixo-z
* `return_z_axis()` -> Reseta o eixo-z para o topo

<!--
``` python
from bolinho_api.experiment import experiment_api

current_reading = {
    z_axis_pos,
    current_load,
    max_load,
    status
}
# por enquanto não
experiment_api.set_readings(current_reading)
```
temp_ini
[1000]
temp_ens
-->


# Instruction Set
## Bolinho -> Granulado

* `p` -> Ping OK

* `m[str]` -> Moves stepper motor x millimeters. OK
> str is an `int` in `string` format.

* `s` -> Stop OK

* `t` -> Move to top OK

* `g` -> Get motor position millimeters. OK

* `r` -> Get instantaneous reading. OK

* `@` -> Tare load cell OK

* `w` -> Calibrate known weight OK

* `x[str]` -> Set known weight OK
> str is an `int` with the weight in `grams` in `string` format.

* `y[str]` -> Set z-axis length OK
> str is an `int` with the length of the z-axis in `millimeters` in `string` format.

* `j` -> Get z-axis length OK

* `z` -> Calibrate z-axis OK

* `d` -> Get delta load OK

* `l[str]` -> Set max load OK
> str is an `int` with the maximum experiment load in `grams` in `string` format.

* `v[str]` -> Set max travel OK
> str is an `int` with the maximum experiment travel in `mm` in `string` format.

* `a[str]` -> Set max delta load OK
> str is an `int` with the maximum experiment delta load in `grams / second` in `string` format.

* `-` -> NOP OK


## Granulado -> Bolinho

* `p` -> Ping Response OK

* `e[str]` -> Erro. OK
> str is an `string` with the description of the error.

* `r[str]` -> Returns current reading OK
> str is an `int` in `grams` in `string` format.

* `g[str]` -> Returns current position in millimeters OK
> str is an `int` in `string` format.

* `j[str]` -> Returns z-axis length OK
> str is an `int` in `string` format.

* `b` -> Bottom interrupt was triggered OK

* `t` -> Top interrupt was triggered OK

* `d[str]` -> Returns delta load OK
> str is an `int` in `string` format.

* `s` -> Response to the stop command OK

* `i` -> Debug info OK