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
  let ds = createDataSets();
  return JSON.stringify(ds);
}

function getDataSetsFromEscola() {
  let ds = createDataSets().data;

  let escolas = [];
  ds.filter((obj) => obj["Escolas"]).forEach((obj) => {
    escolas.push(...obj["Escolas"].split("/").map((el) => el.trim()));
  });
  escolas = [...new Set(escolas)];

  let campos = [];
  ds.filter((obj) => obj["Campo"]).forEach((obj) => {
    campos.push(obj["Campo"].trim());
  });
  campos = [...new Set(campos)];

  let ess = [];
  ds.filter((obj) => obj["Entrada/Saída"]).forEach((obj) => {
    ess.push(...obj["Entrada/Saída"].split("/").map((el) => el.trim()));
  });
  ess = [...new Set(ess)];

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

  console.log(createObjData);

  let data = {};
  try {
    data = ds.reduce((acc, o) => {
      console.log(
        "Entrada cidade de goias:",
        acc["Cidade de Goiás"]["Forma de Pagamento"]["Entrada"]
      );
      console.log("Dados", o);

      let ess = o["Entrada/Saída"].split("/").map((el) => el.trim());
      console.log("Tipo ES: ", ess);

      ess.forEach((es) => {
        acc[o["Escolas"]][o["Campo"]][es].push(o["Texto"]);
      });
      return acc;
    }, createObjData);
  } catch (e) {
    console.log("Erro:", e);
  }

  console.log(data);

  return JSON.stringify(data);
}

/**
 * Retorna dados filtrados
 * @param {array} filters Filtro do tipo array de funções match
 * @returns array
 */
function getDataSetsOnFilter(filters = []) {
  try {
    let values = createDataSets().data;
    if (values) {
      filters.forEach((filter) => {
        values = values.filter(filter);
      });
      return values;
    } else {
      throw "Não há DataSets";
    }
  } catch (e) {
    console.error("Erro:", e);
    return [];
  }
}

/**
 * Retorna locaisMovimento
 * @param {string} escola Nome da Escola
 * @param {string} es Tipo Entrada, Saída ou Entrada/Saída
 * @returns array
 */
function tiposMovimento(escola = "Itaberaí", es = "Entrada/Saída") {
  let val = getDataSetsOnFilter([
    (el) => String(el["Escola"]).includes(escola),
    (el) => String(el["Campo"]).includes("Tipo"),
    (el) => String(el["Entrada/Saída"]).includes(es),
  ]);
  console.log("Valores filtrados: ", val);
  return val;
}

/**
 * Retorna tiposMovimento
 * @param {string} escola Nome da Escola
 * @param {string} es Tipo Entrada, Saída ou Entrada/Saída
 * @returns array
 */
function locaisMovimento(escola = "Itaberaí", es = "Entrada/Saída") {
  let val = getDataSetsOnFilter([
    (el) => String(el["Escola"]).includes(escola),
    (el) => String(el["Campo"]).includes("Local do movimento"),
    (el) => String(el["Entrada/Saída"]).includes(es),
  ]);
  console.log("Valores filtrados: ", val);
  return val;
}

/**
 * Retorna getDataSetsOnFilter
 * @param {string} escola Nome da Escola
 * @param {string} es Tipo Entrada, Saída ou Entrada/Saída
 * @returns array
 */
function formasPagamento(escola, es = "Entrada/Saída") {
  return getDataSetsOnFilter([
    (el) => String(el["Escola"]).includes(escola),
    (el) => String(el["Campo"]).includes("Forma de Pagamento"),
    (el) => String(el["Entrada/Saída"]).includes(es),
  ]);
}
