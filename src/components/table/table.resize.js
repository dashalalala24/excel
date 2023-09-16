import { $ } from '../../core/dom.js';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const type = event.target.dataset.resize;
  const sideProp = type === 'column' ? 'bottom' : 'right';

  $resizer.css({ opacity: 1, [sideProp]: '-5000px' });

  const $parent = $resizer.closest('[data-type="resizable"]');

  const coordinates = $parent.getCoordinates();

  const cells = $root.findAll(`[data-column="${$parent.data.column}"]`);

  let value;
  document.onmousemove = (e) => {
    if (type === 'column') {
      const delta = e.pageX - coordinates.right;
      $resizer.css({ right: -Math.floor(delta) + 'px' });
      value = coordinates.width + delta;
    } else {
      const delta = e.pageY - coordinates.bottom;
      value = coordinates.height + delta;
      $resizer.css({ bottom: -Math.floor(delta) + 'px' });
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (type === 'column') {
      $parent.css({ width: Math.floor(value) + 'px' });
      cells.forEach((el) => (el.style.width = Math.floor(value) + 'px'));
    } else {
      $parent.css({ height: Math.floor(value) + 'px' });
    }

    $resizer.css({ opacity: 0, bottom: 0, right: 0 });
  };
}
