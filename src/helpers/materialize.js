/**
 * Atualizar componentes MaterializeCss
 */
export function upMaterialize() {
  var options = null;

  // select
  // eslint-disable-next-line no-undef
  M.FormSelect.init(document.querySelectorAll("select"), options);

  // Tooltips
  // eslint-disable-next-line no-undef
  M.Tooltip.init(document.querySelectorAll(".tooltipped"), options);
}
