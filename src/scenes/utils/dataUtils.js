// utils/dataUtils.js
import { fetchDataFromAPI } from '../../api'; 

export const fetchEffectifData = async () => {
  try {
    const [choicesResponse, directionResponse, employeurResponse, contratResponse,userResponse] = await Promise.all([
      fetchDataFromAPI('/effectif/agent/get_choices/'),
      fetchDataFromAPI('/effectif/agent/get_direction/'),
      fetchDataFromAPI('/effectif/agent/get_employeur/'),
      fetchDataFromAPI('/effectif/agent/get_contrat/'),
      fetchDataFromAPI('/effectif/agent/get_user/'),
    ]);

    const { age, genre, statut_contrat, nationalite } = choicesResponse.data;
    const direction = directionResponse.data;
    const employeur = employeurResponse.data;
    const contrat = contratResponse.data;
    const user = userResponse.data;

    const transformChoices = (choices) => {
      return Array.isArray(choices)
        ? choices.map(choice => ({
            value: choice.value,
            label: choice.label,
          }))
        : [];
    };

    const transformForeignKeyData = (data) => {
      return Array.isArray(data)
        ? data.map(item => ({
            id: item.id,
            value: item.id,
            label: item.label,
          }))
        : [];
    };

    return {
      genreOptions: transformChoices(genre || []),
      ageOptions: transformChoices(age || []),
      statut_contratOptions: transformChoices(statut_contrat || []),
      directionOptions: transformForeignKeyData(direction || []),
      employeurOptions: transformForeignKeyData(employeur || []),
      contratOptions: transformForeignKeyData(contrat || []),
      nationaliteOptions: transformChoices(nationalite || []),
      userOptions: transformChoices(user || [])
    };
  } catch (error) {
    console.error('Erreur lors du chargement des données de l\'effectif :', error);
    throw error;
  }
};
