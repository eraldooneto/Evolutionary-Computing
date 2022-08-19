// Gera aleatoriamente uma população de cromossomos

const generateRandomPopulation = () => {
  let chromossomes = [[], [], [], [], [], [], [], [], [], []];

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 8; j++) {
      chromossomes[i][j] = Math.floor(Math.random() * 2);
    }
  }

  return chromossomes;
};

// Mostra população de cromossomos e posso utilizar para imprimir outras populações

const showPopulation = (chromossomePopulation) => {
  let i = 0;
  while (i < 10) {console.log(`Chromossome ${i + 1}: [${chromossomePopulation[i]}]`);
    i++;
  }
};

// Função de adaptação: calcula a quantidade de ocorrências 01 no cromossomo

const adaptationInPopulation = (locus) => {
  let adaptationControl = [];

  for (let i = 0; i < 10; i++) {
    adaptationControl[i] = 0;
    for (let j = 0; j < 8; j++) {
      if (locus[i][j] === 0 && locus[i][j + 1] === 1) {
        adaptationControl[i] += 1;
      }
    }
  }
  return adaptationControl;
};

// Imprime a posição do cromossomo e a sua adaptação
const showAdaptationOnChromossomes = (randomPopulation, adaptations) => {
  let i = 0;
  while (i < 10) {
    console.log(`${i + 1}°: [${randomPopulation[i]}] - Adaptation: ${adaptations[i]}`);
    i++;
  }
};

// Ordena os cromossomos com base na sua adaptação, chamando a função de impressão para mostrar na ordem descendente 
const sortChromossomes = (randomPopulation, adaptations) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10 - i - 1; j++) {
      if (adaptations[j] < adaptations[j + 1]) {

        let temp = adaptations[j];
        adaptations[j] = adaptations[j + 1];
        adaptations[j + 1] = temp;

        let aux = randomPopulation[j];
        randomPopulation[j] = randomPopulation[j + 1];
        randomPopulation[j + 1] = aux;
      }
    }
  }

  showAdaptationOnChromossomes(randomPopulation, adaptations);

};

// const crossingChromossomes = (population, size) => {

//   let descendants = [];

//   for (let i = 0; i < 4; i++) {
//     for (let j = 1; j < 5; j++) {
//       let probability = Math.floor(Math.random() * 100 + 1);
//       if (probability > 60 && size <= 28) {
//         let cutSection = Math.floor(Math.random() * 9 + 1);
//         for (let i = 0; i < cutSection; i++) {
//           descendants[size + 1] = population[i]

//         }
//       }
//     }
//   }
// };


const firstCromossomes = generateRandomPopulation();
showPopulation(firstCromossomes);
console.log();
showAdaptationOnChromossomes(firstCromossomes, adaptationInPopulation(firstCromossomes));
console.log();
sortChromossomes(firstCromossomes, adaptationInPopulation(firstCromossomes));
