import { format } from "../helpers/utility";

export const helpsForm = {
  tipo: "Entrada",
  get: function (title) {
    try {
      return this[this.tipo][title];
    } catch (error) {
      error;
    }
  },
  Entrada: {
    Escola: "Selecione a escola onde o dinheiro está entrando",
    Titularidade: "Nome do aluno/cliente que está pagando",
    Tipo: "Selecione o tipo de entrada",
    Discriminação: "Detalhamento do tipo de entrada.",
    ["Local do movimento"]: "Selecione o local que o valor está entrando",
    Valor: "Digite o valor que está entrando",
    "Forma de pagamento": "Selecione a forma de pagamento",
    Parcelas: "Quantidade de parcelas",
    Observações: "Informação relevante para lembrar sobre esse recebimento.",
    "Pago em": "Data de pagamento",
  },
  Saída: {
    Escola: "Selecione a escola onde o dinheiro está saindo",
    Titularidade: "Nome da empresa/pessoa que está recebendo",
    Tipo: "Selecione o tipo de saída",
    Discriminação:
      "Detalhamento do tipo de saída. Ex: Àgua da escola ref. 04/2021",
    ["Local do movimento"]: "Selecione o local onde o valor está saindo",
    Valor: "Digite o valor que está saindo",
    "Forma de pagamento": "Selecione a forma de pagamento",
    Parcelas: "Quantidade de parcelas",
    Observações: "Informação relevante para lembrar sobre esse pagamento",
    "Pago em": "Data de pagamento",
  },
};
export function createInfo(values) {
  if (!values["Valor"]) return "";
  let isPay = values["ES"] == "Saída" ? true : false;

  const replaces = {
    "{es}": isPay ? "Pagando" : "Recebendo",
    "{tipo__pagamento}":
      values["Tipo"].toLowerCase() || "<b class='red'>__tipo de entrada__</b>",
    "{escola}": values["Escola"] || "<b class='red'>__Escola__</b>",
    "{valor}": format.toReal(values["Valor"]),
    "{local__movimento}":
      values["Local do movimento"] || "<b class='red'>__local movimento__</b>",
    "{forma__pagamento}":
      values["Forma de pagamento"] || "<b class='red'>__forma pagamento__</b>",
    "{titular}": values["Titularidade"] || "<b class='red'>__titular__</b>",
  };
  let template = isPay
    ? "{es} {tipo__pagamento} no valor de {valor} para {titular} com {forma__pagamento} / {local__movimento} / {escola}."
    : "{es} {tipo__pagamento} {valor} de {titular} com {forma__pagamento} para {local__movimento} / {escola}.";

  return Object.entries(replaces).reduce((acc, [k, v]) => {
    return acc.replaceAll(k, v);
  }, template);
}
