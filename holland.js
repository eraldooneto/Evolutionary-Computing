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

// Função auxiliar para criar um array de descendentes sem o undefined
const clearData = (descendants) => {
  let descendantsFinal = []
  for (let j = 0; j < descendants.length; j++) {
    if (descendants[j] !== undefined) {
      descendantsFinal.push(descendants[j]);
    }
  }

  return descendantsFinal;
};

// Cruzamento dos cromossomos 

const crossingChromossomes = (population, size) => { 
let descendants = [];

for (let i = 0; i < 5; i++) {
  let firstParent = 0; 
  let secondParent = 0;
  let probability = Math.floor(Math.random() * 101) + 1; // prob. entre 1 e 100
  let cutSection = Math.floor(Math.random() * 8); // gera um numero entre 0 e 7 para fazer o corte

  while (firstParent === secondParent) { // Garantir que o pai e a mãe sejam escolhidos aleatoriamente e que não sejam iguais
    firstParent =  Math.floor(Math.random() * 10);
    secondParent = Math.floor(Math.random() * 10); 
  }

  if (probability > 60 && size <= 28) {
    descendants[i] = population[firstParent].slice(0, cutSection).concat(population[secondParent].slice(cutSection, 8));
    descendants[i + 1] = population[secondParent].slice(0, cutSection).concat(population[firstParent].slice(cutSection, 8));
  }
}
  size++; 
  descendants = clearData(descendants);
  
  return descendants;
}; 

const showDescendants = (chromossomesDescendants) => {
  if (chromossomesDescendants.length > 0) {
    for (let i = 0; i < chromossomesDescendants.length; i++) {
      console.log(`${i + 1}°: [${chromossomesDescendants[i]}]`);
    }
  } else {
    console.log(`No descendants were born.`);
  }
};

// Cria a população aleatória e armazena na variável 
const firstCromossomes = generateRandomPopulation();

// Mostra a população
console.log(`População gerada: `);
showPopulation(firstCromossomes);
console.log();

console.log(`Adaptação da população: `);
showAdaptationOnChromossomes(firstCromossomes, adaptationInPopulation(firstCromossomes));
console.log();

console.log(`Ordenação descendente dos cromossomos: `);
sortChromossomes(firstCromossomes, adaptationInPopulation(firstCromossomes));
console.log();

console.log(`Descendentes: `);
showDescendants(crossingChromossomes(firstCromossomes, 0));
