function getAllDataValues(table) {
  var spreadsheet = SpreadsheetApp.getActive();
  var DB = spreadsheet.getSheetByName(table);

  return DB.getRange(1, 1, DB.getMaxRows(), DB.getMaxColumns())
    .getValues()
    .filter((el) => el[0]);
}

/**
 * Find Values / Filter
 * return array
 **/
function find({ table, filter } = { table: "Banco de dados", filter: null }) {
  console.log(`Vamos filtrar os dados de ${table} com o filtro: `, filter);

  const values = getAllDataValues(table);

  var objsValues = getJsonArrayFromData(values);

  const entriesFilter = Object.entries(filter);

  const filterQuery = (obj) => {
    return entriesFilter.every(([col, val]) => obj[col] == val);
  };

  var arrayFiltered = filter ? objsValues.filter(filterQuery) : objsValues;

  console.log("valores do array", arrayFiltered);

  return JSON.stringify(arrayFiltered);
}

/**
 * Ger Values / Filter
 * return array
 **/
function select({ table, filter } = { table: "Banco de dados", filter: null }) {
  if (!filter) {
    console.log(`Informe um filtro: `, filter);
    return [];
  }
  console.log(`Vamos pegar os dados de ${table} com o filtro: `, filter);

  var arrayFiltered = JSON.parse(find({ table, filter }));

  return JSON.stringify(arrayFiltered[0] || []);
}

/**
 * Teste Filter
 * return array
 **/
function testeFilter() {
  console.log(
    JSON.parse(
      getValuesDB({
        table: "Banco de dados",
        filter: function (data) {
          return data["ES"] == "Entrada";
        },
      })
    )
  );
}

/**
 * Append Value
 * return boolean
 **/
function save({ data, table } = { data: objTeste, table: "Banco de dados" }) {
  let spreadsheet = SpreadsheetApp.getActive();
  let DB = spreadsheet.getSheetByName(table);

  // Pegar ordem e titulos das colunas
  let titles = DB.getRange(1, 1, 1, DB.getMaxColumns()).getValues()[0];

  // Gera valores de entrada para objeto template
  let entries = titles
    .filter((el) => el.trim() != "")
    .map((title) => [title, null]);

  // Cria um novo objeto vazio
  let templateObj = Object.fromEntries(entries);

  const getDateTime = () =>
    new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");

  // Percorrer o array de objetos
  data.forEach((el) => {
    try {
      // Novo objeto
      let newObj = JSON.parse(JSON.stringify(templateObj));

      // Mescla os dados, para garantir a ordem dos dados
      Object.assign(newObj, el);

      console.log(newObj);

      // Data de Atualização
      newObj["Atualizado em"] = getDateTime();

      // Se tem ID deve atualizar
      if (newObj.ID) {
        // Retorna a "linha - 1" do ID encontrado
        let row = DB.getRange(1, 1, DB.getMaxRows(), DB.getMaxColumns())
          .getValues()
          .findIndex((val) => val[0] == newObj.ID);

        // Se não encontrado
        if (row == -1) {
          // Append Element
          newObj["Criado em"] = getDateTime();
          let values_tmp = Object.values(newObj);

          console.log("ID not found, append Element, ", values_tmp);

          DB.appendRow(values_tmp);
          return true;
        } else {
          // Append Element
          let values_tmp = Object.values(newObj);

          console.log("Insert Element, " + (row + 1), values_tmp);

          DB.getRange(row + 1, 1, 1, values_tmp.length).setValues([values_tmp]);
          return true;
        }
      } else {
        newObj["Criado em"] = getDateTime();
        let values_tmp = Object.values(newObj);

        console.log("Append Element, not fount ID", values_tmp);

        // Append Element
        values_tmp[0] = getDateTime();
        DB.appendRow(values_tmp);
        return true;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  });
}
