/**
 * Teste Filter
 * return array
 **/
function FieldsDataSets() {
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

  getEntries = function (field) {
    let result = db.data.reduce((acc, o) => {
      acc[o[field]] = {
        Escolas: o["Escola"],
        Campo: field,
        "Entrada/Saída": o["ES"],
        Texto: o[field],
      };
      return acc;
    }, {});
    return Object.entries(result).map((obj) => obj[1]);
  };

  // Titularidades
  ds.data = ds.data.concat(getEntries("Titularidade"));

  // Discriminações
  ds.data = ds.data.concat(getEntries("Discriminação"));

  return JSON.stringify(ds);
}
