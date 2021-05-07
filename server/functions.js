function getUserEmail(){
//  Logger.log(Session.getActiveUser().getEmail())
  return Session.getEffectiveUser().getEmail();
  
}
