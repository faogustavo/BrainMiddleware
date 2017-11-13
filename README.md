# Requisitos
- NodeJS compatível com versão 8.6.0
- NPMJS compatível com versão 5.3.0

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