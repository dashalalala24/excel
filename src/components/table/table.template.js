const CODES = {
  A: 65,
  Z: 90,
};

function toCell(_, columnIndex) {
  return `<div contenteditable class="cell" data-row="${''}" data-column="${columnIndex + 1}"></div>`;
}

function toColumn(content, index) {
  return `
    <div class="column" data-type="resizable" data-column="${index + 1}">
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

  for (let i = 0; i < rowsCount; i++) {
    const rowIndex = i + 1;
    const columnIndex = toChar('', rowIndex);
    const cells = new Array(columnsCount).fill('').map(toCell).join('');
    rows.push(createRow(rowIndex, cells));
  }

  return rows.join('');
}
