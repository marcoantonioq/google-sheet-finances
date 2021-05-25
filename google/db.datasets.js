/**
 * Cria array de datasets
 * @returns array
 */
function createDataSets() {
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
        Escola: o["Escola"],
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
  return ds;
}
/**
 * Teste Filter
 * return JSON
 **/
function FieldsDataSets() {
  var result = { status: true, data: [], msg: "" };
  let ds = createDataSets().data.filter((obj) => obj["Escolas"]);

  splitValues = (text) => {
    return text.split("/").map((el) => el.trim());
  };
  getValuesToArray = (arr, attr) => {
    return [
      ...new Set(
        arr.reduce((acc, obj) => {
          return [...acc, ...splitValues(obj[attr])];
        }, [])
      ),
    ];
  };

  let escolas = getValuesToArray(ds, "Escolas");
  let campos = getValuesToArray(ds, "Campo");
  let ess = getValuesToArray(ds, "Entrada/Saída");

  // Cria estrutura de dados com Escola > Campo > ES > Texto
  let createObjData = escolas.reduce((acc, escola) => {
    acc[escola] = {};
    campos.forEach((campo) => {
      acc[escola][campo] = {};
      ess.forEach((es) => {
        acc[escola][campo][es] = [];
      });
    });
    return acc;
  }, {});

  // Preenche objeto com os valores
  result.data = ds.reduce((acc, o) => {
    const { Escolas, Campo, Texto } = o;
    const ES = o["Entrada/Saída"];
    splitValues(Escolas).forEach((escola) => {
      splitValues(ES).forEach((es) => {
        acc[escola][Campo][es].push(Texto);
      });
    });
    return acc;
  }, createObjData);

  console.log(result.data);

  return JSON.stringify(result);
}
