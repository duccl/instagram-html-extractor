export const slicePayload = <T>(documents: T[], sliceCount = 10) => {
  const itens = [];
  let counter = 0;
  let finished = false;

  while (!finished) {
    const docsToInsert = documents.slice(counter, counter + sliceCount);
    itens.push(docsToInsert);
    counter = counter + docsToInsert.length;
    finished = counter === documents.length;
  }

  return itens;
};
