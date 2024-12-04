export const periodOptions = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
];

export const trainingTypes = [
  { value: 'En ligne', label: 'En ligne' },
  { value: 'En présentiel', label: 'En présentiel' },
 
];
export const employeurs = [
  { value: "Orange", label: "ORANGE" },
  { value: "OM", label: "ORANGE MONEY" },
  { value: "Itm", label: "ITM" },
  { value: "Bnw", label: "BENSIZWE" },
];

export const directions = [
  { value: "DG", label: "Direction Générale" },
  { value: "DAF", label: "Direction Financière" },
  { value: "DST", label: "Direction Stratégie et Transformation" },
  { value: "DRH", label: "Direction des Ressources Humaines" },
  { value: "DEC", label: "Direction Expérience Client" },
  { value: "DAL", label: "Direction Achats et Logistique" },
  { value: "DRE", label: "Direction Reseaux" },
  { value: "DJAR", label: "Direction Juridique & Affaires Réglementaires" },
  { value: "B2C", label: "Direction Marketing & Communication B2C" },
  { value: "DVD", label: "Direction de Ventes & Distribution" },
  { value: "B2B", label: "Direction Commercial et Marketing B2B" },
  { value: "OM", label: "Orange Money" },
  { value: "DRSI", label: "DRSI" },
  { value: "GKAT", label: "GRAND KATANGA" },
  { value: "GKAS", label: "GRAND KASAI" },
  { value: "GKIVU", label: "GRAND KIVU" },
  { value: "GNORD", label: "GRAND NORD" },
  { value: "KC", label: "KONGO CENTRAL" },
  { value: "KIN", label: "KINSHASA" },
];
export const trainingParticipation = [
  {
    id:1,
    direction: 'Direction Générale',
    participant: 'John Doe',
    gender: 'Masculin',
    type: 'En ligne',
  },
  {
    id:2,
    direction: 'Direction Financière',
    participant: 'Jane Smith',
    gender: 'Feminin',
    type: 'En présentiel',
  },
  {
    id:3,
    direction: 'Direction Stratégie et Transformation',
    participant: 'Peter Johnson',
    gender: 'Masculin',
    type: 'En ligne',
  },
  {
    id:4,
    direction: 'Direction des Ressources Humaines',
    participant: 'Emily Davis',
    gender: 'Feminin',
    type: 'En présentiel',
  },
  // Ajoutez plus de données de participation à la formation au besoin
];
// Données pour Bensizwe
export const Bensizwe = {
  total: 0,
  male: 0,
  female: 0,
  items: [
    {
      id: 1,
      name: 'John Doe',
      gender: 'male',
      direction: 'Direction 1'
    },
    {
      id: 2,
      name: 'Jane Smith',
      gender: 'female',
      direction: 'Direction 2'
    }
  ]
};

// Données pour Itm
export const Itm = {
  total: 0,
  male: 0,
  female: 0,
  items: [
    {
      id: 1,
      name: 'Alice Brown',
      gender: 'female',
      direction: 'Direction 1'
    },
    {
      id: 2,
      name: 'Bob Johnson',
      gender: 'male',
      direction: 'Direction 3'
    }
  ]
};

// Données pour Orange
export const Orange = {
  total: 0,
  male: 0,
  female: 0,
  items: [
    {
      id: 1,
      name: 'Charlie Green',
      gender: 'male',
      direction: 'Direction 2'
    },
    {
      id: 2,
      name: 'Diana White',
      gender: 'female',
      direction: 'Direction 4'
    }
  ]
};

// Données pour Orange Money
export const OrangeMoney = {
  total: 0,
  male: 0,
  female: 0,
  items: [
    {
      id: 1,
      name: 'Eve Black',
      gender: 'female',
      direction: 'Direction 1'
    },
    {
      id: 2,
      name: 'Frank Blue',
      gender: 'male',
      direction: 'Direction 5'
    }
  ]
};
export const agePyramid = [
  { ageRange: '20-25', male: 40, female: 45 },
  { ageRange: '26-30', male: 60, female: 55 },
  { ageRange: '31-35', male: 70, female: 65 },
  { ageRange: '36-40', male: 50, female: 55 },
  { ageRange: '41-45', male: 30, female: 35 },
  { ageRange: '46-50', male: 20, female: 25 },
  { ageRange: '51-55', male: 10, female: 15 },
  { ageRange: '56-60', male: 5, female: 10 },
];

export const agentsByDirection = [
  { direction: 'Direction Générale', count: 15 },
  { direction: 'Direction Financière', count: 30 },
  { direction: 'Direction Stratégie et Transformation', count: 25 },
  { direction: 'Direction des Ressources Humaines', count: 20 },
  { direction: 'Direction Expérience Client', count: 40 },
  { direction: 'Direction Achats et Logistique', count: 35 },
  { direction: 'Direction Juridique & Affaires Réglementaires', count: 10 },
  { direction: 'Direction Marketing & Communication B2C', count: 50 },
  { direction: 'Direction de Ventes & Distribution', count: 45 },
  { direction: 'Direction Commercial et Marketing B2B', count: 15 },
  { direction: 'Orange Money', count: 5 },
  { direction: 'DRSI', count: 25 },
  { direction: 'GRAND KATANGA', count: 20 },
  { direction: 'GRAND KASAI', count: 30 },
  { direction: 'GRAND KIVU', count: 35 },
  { direction: 'GRAND NORD', count: 10 },
  { direction: 'KONGO CENTRAL', count: 15 },
  { direction: 'KINSHASA', count: 60 },
];

export const trainingData = [
  {
    id: 1,
    title: 'Formation Leadership',
    type: 'En ligne',
    startDate: '2024-07-01',
    endDate: '2024-07-15',
    duration: 15,
    evaluationDate: '2024-07-16',
  },
  {
    id: 2,
    title: 'Gestion de Projet',
    type: 'En présentiel',
    startDate: '2024-08-01',
    endDate: '2024-08-10',
    duration: 10,
    evaluationDate: '2024-08-11',
  },
  {
    id: 3,
    title: 'Développement Web',
    type: 'En ligne',
    startDate: '2024-09-01',
    endDate: '2024-09-20',
    duration: 20,
    evaluationDate: '2024-09-21',
  },
  {
    id: 4,
    title: 'Marketing Digital',
    type: 'En présentiel',
    startDate: '2024-10-01',
    endDate: '2024-10-07',
    duration: 7,
    evaluationDate: '2024-10-08',
  },
];

export const initialTrainingData = [
  {
    id: 1,
    title: 'Formation en Leadership',
    description: 'Développez vos compétences en leadership.',
    startDate: '2023-07-01',
    endDate: '2023-07-05',
    days: 5,
  },
  {
    id: 2,
    title: 'Formation en Communication',
    description: 'Améliorez vos compétences en communication.',
    startDate: '2023-08-10',
    endDate: '2023-08-12',
    days: 3,
  },
  {
    id: 3,
    title: 'Formation en Gestion de Projet',
    description: 'Maîtrisez les bases de la gestion de projet.',
    startDate: '2023-09-15',
    endDate: '2023-09-20',
    days: 6,
  },
  {
    id: 4,
    title: 'Formation en Sécurité Informatique',
    description: 'Apprenez les bonnes pratiques en sécurité informatique.',
    startDate: '2023-10-05',
    endDate: '2023-10-10',
    days: 6,
  },
  // Ajoutez plus de données de formation au besoin
];

export const statusOptions = [
  { value: 'local', label: 'Local' },
  { value: 'expatrie', label: 'Expatrié' },
];

export const classificationOptions = [
  { value: 'classifie', label: 'Classifié' },
  { value: 'maitrise', label: 'Maitrise' },
  { value: 'cadre_collaboration', label: 'Cadre de Collaboration' },
  { value: 'cadre_direction', label: 'Cadre de Direction' },
];

export const effectifList = [
  {
    id: 1,
    nom: 'Doe',
    prenom: 'John',
    directionId: 'DG',
    employeurId: 'Orange',
    gender: 'Masculin',
    dateNaissance: '1990-01-01',
    seniorite: 5,
    contrat: 'CDI',
  },
  {
    id: 2,
    nom: 'Smith',
    prenom: 'Jane',
    directionId: 'DAF',
    employeurId: 'OM',
    gender: 'Feminin',
    dateNaissance: '1995-05-15',
    seniorite: 3,
    contrat: 'CDD',
  },
  {
    id: 3,
    nom: 'Johnson',
    prenom: 'Michael',
    directionId: 'DRH',
    employeurId: 'Itm',
    gender: 'Masculin',
    dateNaissance: '1988-10-10',
    seniorite: 7,
    contrat: 'CDI',
  },
  // Ajoutez plus d'effectifs au besoin
];

export const genderOptions = [
  { value: 'Masculin', label: 'Masculin' },
  { value: 'Feminin', label: 'Féminin' },
];

export const contractOptions = [
  { value: 'CDI', label: 'CDI' },
  { value: 'CDD', label: 'CDD' },
];

export const trainingProgressData = [
  {
    agent: 'John Doe',
    training: 'Formation Leadership',
    progress: 80,
    satisfaction: 4,
  },
  {
    agent: 'Jane Smith',
    training: 'Gestion de Projet',
    progress: 100,
    satisfaction: 5,
  },
  {
    agent: 'Peter Johnson',
    training: 'Développement Web',
    progress: 60,
    satisfaction: 3,
  },
  {
    agent: 'Anna Brown',
    training: 'Marketing Digital',
    progress: 40,
    satisfaction: 2,
  },
];
export const initialEffectifData = [
  {
    id: 1,
    nom: 'Doe',
    prenom: 'John',
    directionId: 'DG',
    employeurId: 'Orange',
    gender: 'Masculin',
    dateNaissance: '1990-01-01',
    seniorite: 5,
    contrat: 'CDI',
  },
  {
    id: 2,
    nom: 'Smith',
    prenom: 'Jane',
    directionId: 'DAF',
    employeurId: 'OM',
    gender: 'Feminin',
    dateNaissance: '1995-05-15',
    seniorite: 3,
    contrat: 'CDD',
  },
  {
    id: 3,
    nom: 'Johnson',
    prenom: 'Michael',
    directionId: 'DRH',
    employeurId: 'Itm',
    gender: 'Masculin',
    dateNaissance: '1988-10-10',
    seniorite: 7,
    contrat: 'CDI',
  },
  // Ajoutez plus d'effectifs initiaux au besoin
];
export const orangeInterns = {
  total: 100,
  male: 60,
  female: 40,
};

export const orangeMoneyInterns = {
  total: 50,
  male: 30,
  female: 20,
};

export const externals = {
  total: 150,
  male: 90,
  female: 60,
};
export const mockData = {
  totalAgents: 676,
  trainingParticipation: {
    Hommes:320 ,
    Femmes:356,
    inPerson: 44,
    eLearning: 220,
    total: 676,
  },
  directions: [
    { name: 'Direction Commercial et Marketing B2B', total: 33, notTrained: 10, trained: 23, inPerson: 5, eLearning: 18 },
    { name: 'Direction de Ventes & Distribution grand public', total: 56, notTrained: 20, trained: 36, inPerson: 10, eLearning: 26 },
    { name: 'Direction Générale', total: 12, notTrained: 3, trained: 9, inPerson: 2, eLearning: 7 },
    { name: 'Direction Financière', total: 40, notTrained: 15, trained: 25, inPerson: 8, eLearning: 17 },
    { name: 'Direction Stratégie et Transformation', total: 30, notTrained: 10, trained: 20, inPerson: 5, eLearning: 15 },
    { name: 'Direction des Ressources Humaines', total: 25, notTrained: 8, trained: 17, inPerson: 4, eLearning: 13 },
    { name: 'Direction Expérience Client', total: 50, notTrained: 18, trained: 32, inPerson: 12, eLearning: 20 },
    { name: 'Direction Achats et Logistique', total: 35, notTrained: 12, trained: 23, inPerson: 7, eLearning: 16 },
    { name: 'Direction Juridique & Affaires Réglementaires', total: 22, notTrained: 6, trained: 16, inPerson: 3, eLearning: 13 },
    { name: 'Direction Marketing & Communication B2C', total: 45, notTrained: 16, trained: 29, inPerson: 9, eLearning: 20 },
    { name: 'Orange Money', total: 20, notTrained: 5, trained: 15, inPerson: 4, eLearning: 11 },
    { name: 'DRSI', total: 38, notTrained: 12, trained: 26, inPerson: 8, eLearning: 18 },
    { name: 'GRAND KATANGA', total: 32, notTrained: 10, trained: 22, inPerson: 6, eLearning: 16 },
    { name: 'GRAND KASAI', total: 28, notTrained: 9, trained: 19, inPerson: 5, eLearning: 14 },
    { name: 'GRAND KIVU', total: 24, notTrained: 8, trained: 16, inPerson: 4, eLearning: 12 },
    { name: 'GRAND NORD', total: 26, notTrained: 7, trained: 19, inPerson: 5, eLearning: 14 },
    { name: 'KONGO CENTRAL', total: 18, notTrained: 5, trained: 13, inPerson: 3, eLearning: 10 },
    { name: 'KINSHASA', total: 70, notTrained: 25, trained: 45, inPerson: 15, eLearning: 30 },
  ],
  donutDataEffectif: {
    labels: ['BENSIZWE', 'ITM', 'ORDC'],
    datasets: [
      {
        data: [272, 140, 264],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  },
  donutDataFormation: {
    labels: ['Total Formations Hors E-Learning', 'Total Formations E-Learning'],
    datasets: [
      {
        data: [44, 220],
        backgroundColor: ['#FF6384', '#FFCE56'],
      },
    ],
  },
  donutDataParticipation: {
    labels: ['Aucune Participation', 'Au Moins Une Participation'],
    datasets: [
      {
        data: [676, 0],
        backgroundColor: ['#FF6384', '#FFCE56'],
      },
    ],
  },
};
