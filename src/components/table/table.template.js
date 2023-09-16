const CODES = {
  A: 65,
  Z: 90,
};

function toCell(row) {
  return function (_, columnIndex) {
    return `<div contenteditable class="cell" 
      data-type="cell" 
      data-id="${row}:${columnIndex}" 
      data-column="${columnIndex + 1}">
    </div>`;
  };
}

function toColumn(content, index) {
  return `
    <div class="column" data-type="resizable" data-column="${index}">
      ${content}
      <div class="column-resize" data-resize="column"></div>
    </div>`;
}

function createRow(rowIndex, content) {
  const resizer = rowIndex ? '<div class="row-resize" data-resize="row"></div>' : '';

  return `
    <div class='row' data-type="resizable">
      <div class="row-info">
        ${rowIndex ? rowIndex : ''}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>`;
}

const toChar = (_, index) => String.fromCharCode(CODES.A + index);

export function createTable(rowsCount = 15) {
  const columnsCount = CODES.Z - CODES.A + 1;
  const columns = new Array(columnsCount).fill('').map(toChar).map(toColumn).join('');

  const rows = [];
  rows.push(createRow(null, columns));

  for (let row = 0; row < rowsCount; row++) {
    const rowIndex = row + 1;
    const cells = new Array(columnsCount).fill('').map(toCell(row)).join('');
    rows.push(createRow(rowIndex, cells));
  }

  return rows.join('');
}
