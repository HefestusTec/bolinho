# NUNCA MAIS EU VOU DORMIR .MICHAEL DOUGLAS

## Home -> começar experimento

### Conexão:
* Fixar BaudRate

### Calibrar:
* Celula de carga:
  * Taragem
    * Guardar leitura sem carga
  * Calibrar leitura 
    * Usuário colocar um peso conhecido 
    * Sistema guarda a leitura para x peso

* Passos por mm
  * Redefinir posição do motor para limite inferior
  * Mover motor para limite superior
  * Contar passos do motor

### Button ensaio:
* Checagens
  * Granulado conectado
  * Limites globais OK
  * Carga atual < threshold
  * Prompt para usuário perguntando se a máquina está calibrada
    * Se não, cancela experimento, e manda usuário para a página de calibração.
    * Se sim, continuar
* Zerar eixo-z
* Tara da carga
* Setup do experimento
  * Selecionar corpo de prova
    * Criar novo corpo de prova
      * Criar novo material 
  * Definir parâmetros do experimento
    * Força máxima
    * Tempo máximo
    * Perca de força máxima
    * Tipo de experimento (compressão ou tração)

* Iniciar experimento


### Funções
* `start_experiment_routine()` -> Inicia a rotina de experimento
* `check_experiment_routine()` -> Checa se a rotina de experimento pode ser iniciada
  * `check_granulado_is_connected()` -> Checa se granulado está conectado
  * `check_global_limits()` -> Checa se os limites globais estão OK
  * `check_current_load()` -> Checa se a carga atual é menor que o threshold
  * `prompt_calibration(machine_is_calibrated_callback)` -> Pergunta se a máquina está calibrada
* `machine_is_calibrated_callback(response)`
  If yes:
  * `reset_z_axis()` -> Reseta o eixo-z
  * `tare_load()` -> Tara a carga
  * `create_new_experiment(create_new_experiment_callback)`
  else:
  * `send_user_to_calibration()`
* `create_new_experiment_callback(response)`

### Funções calibrar:
* Exposed funcs
  * `tare_load()` -> saves the no load reading in the global variables
  * `calibrate_known_weight(weight)` -> saves the calibration parameter [gramas/volt] to the global variables
  * `calibrate_z_axis()` -> chama a rotina de calibração do eixo-z
