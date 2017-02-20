const ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#39;',
};

export const escapeHTML = (text) => text.replace( /[&<>'"]/g, match => ESCAPE_MAP[match] );
