# google-sheet-finances

Este projeto tem a finalidade de integrar as tecnologias VUE com o google script e WebApp. Os relatórios são gerados com o Google Data Studio.

## Projeto em desenvolvimento

### Project setup

```
npm install
```

#### Compiles and hot-reloads for development

```
npm run serve
```

#### Run your unit tests

```
npm run test:unit
```

# PrintSC

<a href="https://marcoantonioq.github.io/finances/">
    <p align="center" width="100%">
        <img src="https://raw.githubusercontent.com/marcoantonioq/google-sheet-finances/main/demo/printsc.png"> 
    </p>
</a>

<p align="center" width="100%">
    <img src="https://raw.githubusercontent.com/marcoantonioq/google-sheet-finances/main/demo/sheet.png"> 
</p>

# Back-end

```js
// Google Sheet
function doGet(e) {
  ...
    var template = HtmlService.createTemplateFromFile('WebApp');
    var pageData = template.evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    return pageData;

```

[Leia mais ...](https://github.com/marcoantonioq/google-sheet-finances/blob/main/google/)

# Ongoing tasks

- [x] Componente para selecionar escola
- [ ] Filtrar dados por escola
- [ ] Fila de processos em segundo plano lib/Queue

## [Demo: https://marcoantonioq.github.io/finances/](https://marcoantonioq.github.io/finances/)
