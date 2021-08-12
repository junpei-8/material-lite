function styleInject(style: string, ref: { insertAt?: string }): void {
  if (ref === void 0) ref = {};
  const insertAt = ref.insertAt;

  if (!style || typeof document === 'undefined') { return; }

  const head = document.head || document.getElementsByTagName('head')[0];
  const styleEl = document.createElement('style');
  styleEl.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(styleEl, head.firstChild);
    } else {
      head.appendChild(styleEl);
    }
  } else {
    head.appendChild(styleEl);
  }

  if (styleEl.styleSheet) {
    styleEl.styleSheet.cssText = style;
  } else {
    styleEl.appendChild(document.createTextNode(style));
  }
}

export { styleInject as default };
