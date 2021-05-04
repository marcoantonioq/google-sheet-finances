function showAlertar(mensagem){
//  Logger.clear(); Logger.log("");
  
//  Browser.msgBox("DevmediaGAS", "Hello World", Browser.Buttons.OK) 

  var ui = SpreadsheetApp.getUi();

  var result = ui.prompt(
      'Confirmar',
      'Deseja salvar?',
      ui.ButtonSet.OK_CANCEL);

 
  var button = result.getSelectedButton();
  var text = result.getResponseText();
  if (button == ui.Button.OK) {
    ui.alert('Your name is ' + text + '.');
  } else if (button == ui.Button.CANCEL) {
    ui.alert('I didn\'t get your name.');
  } else if (button == ui.Button.CLOSE) {
    ui.alert('You closed the dialog.');
  }

}

function testeCode123(){
  console.log("Ok...")
}
