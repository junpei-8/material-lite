// Reference: https://prismjs.com/plugins/normalize-whitespace/

function removeIndent(code: string): string {
  const indents = code.match(/^[^\S\n\r]*(?=\S)/gm);

  if (!indents || !indents[0].length) {
    return code;
  }

  // indents.sort(function (a, b) { return a.length - b.length; });
  indents.sort((a, b) => a.length - b.length);

  if (!indents[0].length) {
    return code;
  }

  return code.replace(RegExp('^' + indents[0], 'gm'), '');
}

export function normalizeWhitespace(code: string) {
  return removeIndent(code.replace(/\s*?$/gm, '')).replace(/^\s+/, '');
}