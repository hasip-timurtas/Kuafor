export const beautify = (text) => {
  const newText = text.replace(/-/g, ' ');
  return newText.charAt(0).toLocaleUpperCase() + newText.slice(1);
};
