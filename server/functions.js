function sPago(pagamento, vencimento){
    if(new Date(pagamento)){
      return "Paga"
    } else {
      return "Não pago"
    }
}

function getUserEmail(){
//  Logger.log(Session.getActiveUser().getEmail())
  return Session.getEffectiveUser().getEmail();
  
}


function getIndexColByName(sheet, name) {
  return sheet.getRange("A1:1")
    .getValues()[0].indexOf(name)
}

function getRowByID(sheet, id) {
  return sheet
    .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn() )
    .getValues()
    .filter(row => row[0] == id )
}
