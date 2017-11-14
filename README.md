# Requisitos
- NodeJS compatível com versão 8.6.0
- NPMJS compatível com versão 5.3.0
- Python 2.7

# Instalação/Execução
- Abrir a pasta do projeto no terminal/console/cmd/power shell
- Executar comando *npm install* para instalar as dependências
- Ao fim executar *npm start* para iniciar a aplicação

## Plugins podem ser instalados através do menu superior utilizando qualquer um dos *zips* que estão na pasta de *samples*
**Após instalado a ferramenta irá reiniciar.**

## Simulações podem ser rodadas utilizando qualquer arquivo *.brc* também disponíveis na pasta *samples*.

# Validação
Para realizar a validação, é preciso instalar uma biblioteca que funcionará como servidor. Para isso, execute o comando abaixo.
```npm install -g serve```

Logo após, abra a pasta *samples/BrainMiddlewareValidationWeb* no terminal e execute o comando *serve .*.
Logo após acesse em seu navegador a URL exibida no terminal. Ele irá se conectar a aplicação e exibir os dados em forma de gráfico.

**Caso deseje rodar a aplicação com um arduíno compile o código abaixo no arduino**

```c
int cycle = 0;
int size = 33;

char *simulacoes[] = {
  "200,38,27,137927,64256,19078,6148,10412,4107,2472,3300",
  "200,48,27,37572,41717,10172,4161,2625,8133,2208,13202",
  "200,50,11,63780,15588,541,2074,890,2232,1187,1051",
  "200,53,29,16543,2367,12710,2686,8195,2847,2264,1590",
  "200,57,23,466352,44744,5200,6442,8274,5012,1955,3840",
  "200,51,47,8071,3516,9327,13066,3760,1716,2749,2431",
  "200,56,61,8624,12151,2826,10611,7927,5423,1974,2297",
  "200,50,60,8432,8180,2035,10329,3091,1560,772,1285",
  "200,60,60,91770,26759,8317,1309,10325,8840,3540,3863",
  "200,53,34,106256,107723,13540,6897,4888,4515,5501,1629",
  "200,51,34,24856,13011,4199,7343,4604,4438,1491,1776",
  "200,53,14,248781,51695,4304,9076,13091,5476,3679,7169",
  "200,40,40,10879,11296,18345,23901,2480,3800,2075,3941",
  "200,57,54,100213,6755,9711,2832,6796,4542,4175,4339",
  "200,41,66,94965,26032,37939,19694,7468,2359,1689,2499",
  "200,29,57,207558,141818,6027,4878,5560,3995,1764,3686",
  "200,29,35,979207,105494,29693,2345,7727,10160,3516,11122",
  "200,29,26,28933,26205,4965,6466,4220,8425,3373,2522",
  "200,30,7,43110,42194,7971,2255,2621,1680,1237,1128",
  "200,48,23,162992,30454,14983,3309,8343,7312,1604,926",
  "200,60,29,16867,22562,8772,9322,8477,8483,1828,1463",
  "200,37,23,86356,112028,15983,2559,3415,2487,945,686",
  "200,30,35,110035,195905,87436,43036,11422,5704,3173,2405",
  "200,27,43,7857,14457,12563,6185,2798,4067,3756,1738",
  "200,48,75,14425,11236,13053,21751,5558,8262,3047,2250",
  "200,70,64,8579,36366,10600,1674,3214,10464,4467,2999",
  "200,84,54,9798,9187,4946,3427,6017,9600,3690,2379",
  "200,80,50,54102,26451,20475,4590,7063,5307,1449,2728",
  "200,67,27,143205,198783,29948,12942,18509,13013,2900,6001",
  "200,61,30,20374,6422,1503,1688,2302,1080,1325,383",
  "200,24,27,72318,68017,14926,912,4201,793,766,497",
  "200,29,27,180752,22722,6249,22638,17617,7891,2928,5827",
  "200,37,35,22844,37557,12888,3195,5449,6017,5990,3551"
};

void setup() {
  Serial.begin(57600);
}

void loop() {
  Serial.println(simulacoes[cycle++ % size]);
  delay(1000);
}

```
