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
