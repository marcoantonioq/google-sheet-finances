export default {
  toNumber(val) {
    return Number(String(val).replace(",", "."));
  },
  toReal(val) {
    return this.toNumber(val).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  },
};
