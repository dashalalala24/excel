import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template.js';
import { resizeHandler } from './table.resize.js';
import { shouldResize } from './table.functions.js';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      // listeners: ['click', 'mousedown', 'mousemove', 'mouseup'],
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(20);
  }

  // onClick(event) {
  //   console.log('onClick', event.target);
  // }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }

  // onMousemove() {
  //   console.log('onMousemove');
  // }

  // onMouseup() {
  //   console.log('onMouseup');
  // }
}
