import { Sheet } from "./googlesheet";

const datasets = {
  _values: [],
  set values(values) {
    this._values.slice(0, this._values.length, ...values);
  },
  get values() {
    return this._values;
  },
  get count() {
    return this._values.length;
  },
  methods: {
    async updateDataSetsFromTables() {
      Sheet.onGetDataSets((el) => {
        const { data, msg, status } = JSON.parse(el);
        console.log("Mensagem do banco: ", msg);
        console.log("Status do banco: ", status);
        this.values = data;
      });
      return true;
    },
    getDataSetsOnFilter(filters = []) {
      try {
        if (this.store.state.ds) {
          let values = [];
          filters.forEach((filter) => {
            values = this.store.state.ds.filter(filter);
          });
          return values;
        } else {
          throw "Não há DataSets";
        }
      } catch (e) {
        this.emitter.emit("msg", "Erro ao carregar DataSets!");
        return [];
      }
    },
  },
  getters: {
    tiposMovimento(escola) {
      return datasets.getDataSetsOnFilter([
        (el) => String(el["Escola"]).includes(escola),
        (el) => String(el["Campo"]).includes("Tipo"),
      ]);
    },
    locaisMovimento(escola) {
      return datasets.getDataSetsOnFilter([
        (el) => String(el["Escola"]).includes(escola),
        (el) => String(el["Campo"]).includes("Local de movimento"),
      ]);
    },
    formasPagamento(escola) {
      return datasets.getDataSetsOnFilter([
        (el) => String(el["Escola"]).includes(escola),
        (el) => String(el["Campo"]).includes("Forma de Pagamento"),
      ]);
    },
  },
};

export default {
  datasets,
};
