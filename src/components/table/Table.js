import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom.js';
import { createTable } from './table.template.js';
import { resizeHandler } from './table.resize.js';
import { isCell, shouldResize, matrix, nextSelector } from './table.functions.js';
import { TableSelection } from './TableSelection.js';
export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      // listeners: ['click', 'mousedown', 'mousemove', 'mouseup'],
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable(20);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.$on('formula:input', (text) => this.selection.current.text(text));

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:done', () => this.selection.current.focus());
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  onInput(event) {
    const $target = $(event.target);
    this.$emit('table:select', $target);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }

    if (isCell) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) => this.$root.find(`[data-id="${id}"]`));

        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }

      this.$emit('table:select', $target);
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown'];
    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();

      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }
}
