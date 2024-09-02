import { LTTB } from "downsample";

let maxValues = 30;
let reduceLength = 15;

export default function reduzirValores(newValues: any, dadosGrafico: any) {
  dadosGrafico.S1.push(newValues.S1);
  dadosGrafico.S2.push(newValues.S2);
  dadosGrafico.categories.push(newValues.categories);
  if (dadosGrafico.S1.length > maxValues) dadosGrafico = { ...compress(dadosGrafico) };
  return dadosGrafico;
}

function compress(dadosGrafico: any) {
  let S1 = dadosGrafico.S1.map((valor: any, indice: any) => [valor, dadosGrafico.categories[indice]]);
  let S2 = dadosGrafico.S2.map((valor: any, indice: any) => [valor, dadosGrafico.categories[indice]]);
  S1 = LTTB(S1, reduceLength);
  S2 = LTTB(S2, reduceLength);
  let categories = S1.map((valor: any) => valor[1]);
  S1 = S1.map((valor: any) => valor[0]);
  S2 = S2.map((valor: any) => valor[0]);
  return { S1, S2, categories };
}

/*
let data = {
  S1: [3, 7, 12, 18, 25, 32, 40, 50, 65, 80, 85, 90, 100, 120],
  S2: [3, 7, 12, 18, 25, 32, 40, 50, 65, 80, 85, 90, 100, 120],
  categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
};

data = reduzirValores(
  {
    S1: 128,
    S2: 128,
    categories: 15,
  },
  data
);

console.log(data);
*/
