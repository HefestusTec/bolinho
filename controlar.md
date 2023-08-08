# Movimento
* `+ Cima`
* `- Baixo`

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

* `0x00 [0 bytes]` -> Stops stepper motor

* `0x01 [4 bytes]` -> Moves stepper motor [4 bytes (signed)] mm 

* `0x02 [0 bytes]` -> Returns stepper motor to top

* `0x03 [1 byte]` -> Continuos move stepper motor (0 up; 1 down)


## Granulado -> Bolinho

* `0x00 [0 bytes]` -> Return when stepper motor stops

* `0x01 [4 bytes]` -> Returns delta millimeters

* `0x02 [4 bytes]` -> Returns current position in millimeters

* `0x03 [0 bytes]` -> Return when triggered stop interrupt top

* `0x04 [0 bytes]` -> Return when triggered stop interrupt bottom
