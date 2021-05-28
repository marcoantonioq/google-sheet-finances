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
  var result = { status: true, data: [], msg: "" };

  // Pegar todos valores da tabela
  const values = getAllDataValues(table);

  result.data = getJsonArrayFromData(values);
  try {
    // Filtra as informações
    if (filter) {
      result.data = result.data.filter((obj) => {
        return Object.entries(filter).every(([col, val]) => obj[col] == val);
      });
    }
  } catch (e) {
    result.status = false;
    result.msg = "Erro ao filtrar informações: " + e;
  }
  console.log(result.msg);
  console.log(JSON.stringify(result));
  return JSON.stringify(result);
}

/**
 * Ger Values filter ID
 * return result {status: false, data: [], msg: ""}
 **/
function select(table, id) {
  var result = { status: true, data: [], msg: "" };

  if (table && id) {
    result = JSON.parse(find({ table: table, filter: { ID: id } }));
  } else {
    console.log(`Informe um ID da tabela: `, id);
    result.msg = "Informe Tabela e ID válido!";
    result.status = false;
  }
  console.log(result.msg);
  return JSON.stringify(result);
}

/**
 * Append Value
 * return result {status: true, updated:[], data: [], msg: ""} Onde updated são os valores atualizados
 **/
function save(sendData) {
  const { data, table } = JSON.parse(sendData);

  console.log(table, data);

  var result = { status: true, data: { created: [], updated: [] }, msg: "" };

  if (data) {
    let DB = SpreadsheetApp.getActive().getSheetByName(table);

    let IDs = DB.getRange(1, 1, DB.getMaxRows(), 1)
      .getValues()
      .map((id) => id[0]);

    // Cria um novo objeto vazio
    let obj_template = getObjTable(table);
    let data_to_save = data.reduce(
      (acc, obj) => {
        let newObj = JSON.parse(JSON.stringify(obj_template));
        Object.assign(newObj, obj);

        let is_without_database = newObj["ID"] && IDs.includes(newObj["ID"]);
        if (is_without_database) {
          // Update
          acc.update.push(newObj);
        } else {
          // Create
          acc.create.push(newObj);
        }
        return acc;
      },
      { create: [], update: [] }
    );

    const getRow = (num) => IDs.findIndex((id) => id == num) + 1;

    // Console update
    result.data.updated = data_to_save.update.map((obj) => {
      if (obj.hasOwnProperty("Criado em") && obj["Criado em"] == "") {
        obj["Criado em"] = new Date();
      }
      obj["Atualizado em"] = new Date();
      let val = Object.values(obj);
      DB.getRange(getRow(obj["ID"]), 1, 1, val.length).setValues([val]);
      return obj;
    });

    // Console create
    result.data.created = data_to_save.create.map((obj) => {
      if (obj.hasOwnProperty("Criado em")) {
        obj["Criado em"] = new Date();
      }
      obj["Atualizado em"] = new Date();
      let dt = new Date().getTime().toString(36);
      let rd = Math.random().toString(36).slice(2);
      obj["ID"] = `${dt}${rd}`;

      let val = Object.values(obj);
      DB.appendRow(val);
      return obj;
    });
  } else {
    result.status = false;
    result.msg = "Nenhuma informação para salvar!";
  }

  console.log("Dados atualizados: ", result.data.updated);
  console.log("Dados atualizados: ", result.data.created);
  return JSON.stringify(result);
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
