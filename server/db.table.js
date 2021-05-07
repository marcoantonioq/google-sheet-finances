Date.prototype.getData = function(lang = "pt-BR") {
    let [dd, mm, yyyy] = this.toLocaleDateString().split('/')
    return (lang === 'en') ?
    `${yyyy}-${mm}-${dd}` :
    `${dd}/${mm}/${yyyy}`
};

Date.prototype.getDataHora = function(lang = "pt-BR") {
    return `${this.getData(lang)} ${this.toLocaleTimeString()}`
};

Date.prototype.addMeses = function(meses){
    this.setMonth(this.getMonth() + meses)
};


/**
 * Pega todos os valores de uma tabela
 * @param {string} table Table name
 * @returns result {status: true, data: [], msg: ""}
 */
function getAllDataValues(table) {
  var spreadsheet = SpreadsheetApp.getActive();
  var DB = spreadsheet.getSheetByName(table);

  return DB.getRange(1, 1, DB.getMaxRows(), DB.getMaxColumns())
    .getValues()
    .filter((el) => el[0]);
}

/**
 * Função retorna array de Titulos da tabela
 * @param {string} table Nome da tabela
 * return array De titulos
 */
function getObjTable(table) {

  let spreadsheet = SpreadsheetApp.getActive();
  let DB = spreadsheet.getSheetByName(table);

  let titles = DB.getRange(1, 1, 1, DB.getMaxColumns()).getValues()[0];

  // Gera valores de entrada para objeto template
  let entries = titles
    .filter((el) => el.trim() != "")
    .map((title) => [title, ""]);

  return Object.fromEntries(entries);
}



/**
 * Find Values / Filter
 * return result {status: true, data: [], msg: ""}
 **/
function find({ table, filter } = { table: "Banco de dados", filter: null }) {

  var result = {status: true, data: [], msg: ""}

  // Pegar todos valores da tabela
  const values = getAllDataValues(table);

  result.data = getJsonArrayFromData(values);
  try{
    // Filtra as informações
    if (filter) {
      result.data = result.data.filter((obj) => {
        return Object.entries(filter)
          .every(([col, val]) => obj[col] == val);
      })
    }
  } catch(e){
    result.status = false;
    result.msg = "Erro ao filtrar informações: " + e
  }
  return JSON.stringify(result);
}

/**
 * Ger Values filter ID
 * return result {status: false, data: [], msg: ""}
 **/
function select(table, id) {
  
  var result = {status: true, data: [], msg: ""}

  if (table && id) {
    result = JSON.parse(find({ table: table, filter: {"ID": id} }));
  } else {
    console.log(`Informe um ID da tabela: `, id);
    result.msg = "Informe Tabela e ID válido!"
    result.status = false;
  }
  return JSON.stringify(result);
}

let dataTemplate = [{"Criado Data/Hora":"2021-05-04T16:52:22.000Z","ATIVO":true,"Situação":"Paga","ES":"Saída","Escola":"Jussara","Titularidade":"José Bueno","Tipo":"Aluguel","Discriminação":"Restante do aluguel","Local do movimento":"Caixa da Escola","Valor":-7.5,"Forma de pagamento":"Dinheiro","Data/Vencimento":"2021-05-04T23:59:59.000Z","Parcelas":1,"Observações":"Foi depositado R$ 800,00 na conta da Jú e o restante tirado do caixa. | Parcela: 1/1","Pago em":"2021-05-04T16:53:56.000Z","Atualizado em":"2021-05-06T12:09:30.020Z","Outras Observações":"","Titular Cheque":"","Conta Cheque":"","Agência Cheque":"","Nº Cheque":"","":""},{"ID":14,"Criado Data/Hora":"2021-05-04T16:52:22.000Z","ATIVO":true,"Situação":"Paga","ES":"Saída","Escola":"Jussara","Titularidade":"José Bueno","Tipo":"Aluguel","Discriminação":"Restante do aluguel","Local do movimento":"Caixa da Escola","Valor":-7.5,"Forma de pagamento":"Dinheiro","Data/Vencimento":"2021-05-04T23:59:59.000Z","Parcelas":1,"Observações":"Foi depositado R$ 800,00 na conta da Jú e o restante tirado do caixa. | Parcela: 1/1","Pago em":"2021-05-04T16:53:56.000Z","Atualizado em":"2021-05-06T12:09:30.020Z","Outras Observações":"","Titular Cheque":"","Conta Cheque":"","Agência Cheque":"","Nº Cheque":"","":""},{"ID":23,"Criado Data/Hora":"2021-05-04T16:52:22.000Z","ATIVO":true,"Situação":"Paga","ES":"Saída","Escola":"Jussara","Titularidade":"José Bueno","Tipo":"Aluguel","Discriminação":"Restante do aluguel","Local do movimento":"Caixa da Escola","Valor":-7.5,"Forma de pagamento":"Dinheiro","Data/Vencimento":"2021-05-04T23:59:59.000Z","Parcelas":1,"Observações":"Foi depositado R$ 800,00 na conta da Jú e o restante tirado do caixa. | Parcela: 1/1","Pago em":"2021-05-04T16:53:56.000Z","Atualizado em":"2021-05-06T12:09:30.020Z","Outras Observações":"","Titular Cheque":"","Conta Cheque":"","Agência Cheque":"","Nº Cheque":"","":""},{"ID":32,"Criado Data/Hora":"2021-05-04T16:52:22.000Z","ATIVO":true,"Situação":"Paga","ES":"Saída","Escola":"Jussara","Titularidade":"José Bueno","Tipo":"Aluguel","Discriminação":"Restante do aluguel","Local do movimento":"Caixa da Escola","Valor":-7.5,"Forma de pagamento":"Dinheiro","Data/Vencimento":"2021-05-04T23:59:59.000Z","Parcelas":1,"Observações":"Foi depositado R$ 800,00 na conta da Jú e o restante tirado do caixa. | Parcela: 1/1","Pago em":"2021-05-04T16:53:56.000Z","Atualizado em":"2021-05-06T12:09:30.020Z","Outras Observações":"","Titular Cheque":"","Conta Cheque":"","Agência Cheque":"","Nº Cheque":""}]
/**
 * Append Value
 * return result {status: true, updated:[], data: [], msg: ""} Onde updated são os valores atualizados
 **/
function save({ data , table } = { data: dataTemplate, table: "Banco de dados" }) {
  
  var result = {status: true, updated: [], created: [], data: [], msg: ""}
  
  let spreadsheet = SpreadsheetApp.getActive();
  let DB = spreadsheet.getSheetByName(table);

  // Cria um novo objeto vazio
  let ObjTemplate = getObjTable(table);

  console.log(ObjTemplate);

  // Percorrer o array de objetos
  data.forEach((el) => {
    try {
      // Novo objeto
      let newObj = JSON.parse(JSON.stringify(ObjTemplate));

      // Mescla os dados, para garantir a ordem dos dados
      Object.assign(newObj, el);

      // Data de Atualização
      if(newObj.hasOwnProperty("Atualizado em")){
        newObj["Atualizado em"] = new Date().getDataHora("en");
      }

      // Se tem ID deve atualizar
      if (newObj.ID) {
        // Retorna a "linha - 1" do ID encontrado
        let row = DB.getRange(1, 1, DB.getMaxRows(), DB.getMaxColumns())
          .getValues()
          .findIndex((val) => val[0] == newObj.ID);

        // Se não encontrado
        if (row == -1) {
          // Append Element
          let values_tmp = Object.values(newObj);

          console.log("ID not found, append Element, ", values_tmp);

          // Random number ID
          values_tmp[0] = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
          DB.appendRow(values_tmp);
          result.created.push(values_tmp)

        } else {
          // Updated Element
          let values_tmp = Object.values(newObj);

          DB.getRange(row + 1, 1, 1, values_tmp.length).setValues([values_tmp]);
          result.updated.push(values_tmp)

        }
      } else {

        if(newObj.hasOwnProperty("Criado em")){
          newObj["Criado em"] = new Date().getDataHora("en");
        } else {
          result.msg = "Crie uma coluna 'Criado em' em sua tabela!"
        }

        // converter para array
        let values_tmp = Object.values(newObj);

        // Random number ID
        values_tmp[0] = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
        DB.appendRow(values_tmp);
        result.created.push(values_tmp)
      }
    } catch (e) {
      console.log(e);
      result.msg = `Erro ao atualizar as informações: ${e}`;
      result.status = false;
    }
  });
  console.log(result.msg)
  return result
}

/**
 * Teste Filter
 * return array
 **/
function testeFilter() {
  console.log(
    JSON.parse(
      find({
        table: "Banco de dados",
        filter: function (data) {
          return data["ES"] == "Entrada";
        },
      })
    )
  );
}
