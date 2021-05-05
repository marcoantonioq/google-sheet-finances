
const onEvents = {
  // Eventos disparados na aplicação ao editar o documento
  'getInfo': function(event){
    
    let range = event.range
    var source = event.source
    let newValue = event.value ? 
      event.value : 
      source
        .getActiveSheet()
        .getRange( range.getRow(), range.getColumn() )
        .getValue()
    
    return {
      col: range.getColumn(),
      oldValue: event.oldValue,
      range: range,
      row: range.getRow(),
      sheetName: source.getSheetName(),
      source: source,
      value: newValue
    }
  },
  'setHistórico': function(tabela, linha, coluna, novo){
    // Histórico de altereção do Bando de Dados
    
    var historico = SpreadsheetApp
      .getActive()
      .getSheetByName('Histórico')
    
    var values = [ 
      new Date().toLocaleString('pt-BR'), 
      getUserEmail(), 
      tabela,
      linha, 
      coluna, 
      novo
    ]
    
    historico.appendRow(values)
    
  },
  'Banco de Dados': function(event){
    //Alterações banco de dados    
    
    let {
      col, 
      oldValue, 
      range, 
      row,
      sheetName, 
      source,
      value
    } = this['getInfo'](event)
    
    let user = getUserEmail()
    const colName = source.getActiveSheet().getRange(1, col).getValue()
    const rowID = source.getActiveSheet().getRange(row, 1).getValue()
    
    // Adcionar notações
    range.setNote('Ultima edição por ' + user + ': ' + new Date().toLocaleString('pt-BR'));
    
    // Adicionar tab Histórico
    onEvents['setHistórico'](sheetName, colName, rowID, value)
    
    // Verifica se foi alterado mais de uma celula
    if( range.getNumRows() > 1 || range.getNumColumns() > 1 ) {
      var ui = SpreadsheetApp.getUi()
      ui.alert('Não temos os controle de todos os valores alterados!!!')
    }
    
    // Atualiza data de Atualização
    try{
      if(range.getRow() > 1){
          source.getActiveSheet().getRange(range.getRow(), 17).setValue([new Date()]);
      }
    }catch(e){Logger.log("erro ao atualizar: ", e)}
    
  }
}

function onEdit(event){  
  
  //SpreadsheetApp.getUi().alert("Plinalha atual: " + event.namedValues )
  
  var ss = SpreadsheetApp.getActive();
    
  try 
  {    
    let sheetName = event.source.getSheetName()
    onEvents[sheetName](event)     
  } 
  catch(error) 
  {
    Logger.log(`Evento não econtrado: ${error} `)
  }
  
}


function view(data) {
  
  var Form = HtmlService.createTemplateFromFile(data.html);
  try {
    
    Form.data = data;
    
  } catch (e) {}
  
  SpreadsheetApp.getUi().showModalDialog(Form.evaluate().setHeight(700),data.title);
  
}

