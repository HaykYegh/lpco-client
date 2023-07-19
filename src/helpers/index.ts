export const removeLastWordStartUnderline = (word: string) => {
  const lastIndex = word.lastIndexOf('_');

  return word.substring(0, lastIndex);
};
