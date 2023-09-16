const CODES = {
  A: 65,
  Z: 90,
};

function toCell() {
  return `
    <div contenteditable class="cell"></div>`;
}

function toColumn(content) {
  return `
    <div class="column">
      ${content}
    </div>`;
}

function createRow(rowIndex, content) {
  return `
    <div class='row'>
      <div class="row-info">${rowIndex}</div>
      <div class="row-data">${content}</div>
    </div>`;
}

const toChar = (_, index) => String.fromCharCode(CODES.A + index);

export function createTable(rowsCount = 15) {
  const columnsCount = CODES.Z - CODES.A + 1;
  const columns = new Array(columnsCount).fill('').map(toChar).map(toColumn).join('');

  const rows = [];
  rows.push(createRow('', columns));

  // const cellsRow = [];

  // for (let i = 0; i < columnsCount; i++) {
  //   // console.log(cellsRow);
  //   cellsRow.push(toCell());
  // }

  for (let i = 0; i < rowsCount; i++) {
    const rowIndex = i + 1;
    const cells = new Array(columnsCount).fill('').map(toCell).join('');
    rows.push(createRow(rowIndex, cells));
  }

  // console.log(cellsRow.join(''));
  return rows.join('');

  // <div class="row">
  //   <div class="row-info"></div>
  //   <div class="row-data">
  //     <div class="column">A</div>
  //     <div class="column">B</div>
  //     <div class="column">C</div>
  //   </div>
  // </div>
  // <div class="row">
  //   <div class="row-info">1</div>
  //   <div contenteditable class="cell">1</div>
  //   <div contenteditable class="cell">2</div>
  //   <div contenteditable class="cell">3</div>
  // </div>
  // <div class="row">
  //   <div class="row-info">1</div>
  //   <div contenteditable class="cell">1</div>
  //   <div contenteditable class="cell">2</div>
  //   <div contenteditable class="cell">3</div>
  // </div>
  // <div class="row">
  //   <div class="row-info">1</div>
  //   <div contenteditable class="cell">1</div>
  //   <div contenteditable class="cell">2</div>
  //   <div contenteditable class="cell">3</div>
  // </div>`;
}
