/**
 * Teste Filter
 * return array
 **/
function testeFilterDS() {
  const ds = JSON.parse(
    find({
      table: "Tipos de Valores",
      filter: {},
    })
  );

  const db = JSON.parse(
    find({
      table: "Banco de dados",
    })
  );

  const result = db.data.reduce((acc, obj) => {
    if (acc.hasOwnProperty("Titularidade")) {
      acc["Titularidade"] = [];
    }
    acc.push(obj["Titularidade"]);
  }, {});

  console.log(result);
  // return result;
}
