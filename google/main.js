function doGet(e) {
  const services = {
    datasets: () => {
      return ContentService.createTextOutput(FieldsDataSets()).setMimeType(
        ContentService.MimeType.JSON
      );
    },
    info: (e) => {
      console.log(e.parameter.action);
      var myJSON = JSON.stringify({
        params: getInfoWebApp(),
      });
      return ContentService.createTextOutput(myJSON).setMimeType(
        ContentService.MimeType.JSON
      );
    },
  };

  try {
    return services[e.parameter.action](e);
  } catch (e) {
    var template = HtmlService.createTemplateFromFile("WebApp");
    var pageData = template
      .evaluate()
      .setTitle("Atualizar inventário")
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .addMetaTag("viewport", "width=device-width, initial-scale=1")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    return pageData;
  }
}
