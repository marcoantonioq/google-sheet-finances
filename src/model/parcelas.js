const moment = require("moment");

export function createParcelas(values) {
  let countParcelas = Number(values["Parcelas"]);
  let parcelas = [];
  if (countParcelas) {
    for (let i = 0; i < countParcelas; i++) {
      let obj = Object.assign({}, values);
      obj["Pago em"] = "";
      obj["Vencimento"] = moment(obj["Vencimento"]).add(i, "months");
      obj["Outras Observações"] = `Parcela ${i + 1}/${countParcelas}`;
      parcelas.push(obj);
    }
    parcelas[0]["Pago em"] = values["Pago em"];
  }
  return parcelas;
}
