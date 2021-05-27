const moment = require("moment");

export function createParcelas(values) {
  let countParcelas = Number(values["Parcelas"]);
  let parcelas = [];
  if (countParcelas) {
    for (let i = 0; i < countParcelas; i++) {
      let obj = Object.assign({}, values);
      obj["Pago em"] = "";
      let vencimento = obj["Vencimento"]
        ? moment(obj["Vencimento"]).add(i, "months")
        : moment();
      obj["Vencimento"] = vencimento.format("YYYY-MM-DD");
      obj["Outras Observações"] = `Parcela ${i + 1}/${countParcelas}`;
      parcelas.push(obj);
    }
    parcelas[0]["Pago em"] = values["Pago em"]
      ? moment(values["Pago em"]).format("YYYY-MM-DD HH:MM:SS")
      : values["Pago em"];
  }
  return parcelas;
}
