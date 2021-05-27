export default {
  toNumber(val) {
    return parseFloat(String(val).replace(",", "."));
  },
  toStr(val) {
    return String(val).replace(".", ",");
  },
  toReal(val) {
    return this.toNumber(val).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  },
};
