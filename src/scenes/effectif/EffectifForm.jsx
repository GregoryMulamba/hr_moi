import React, { useState, useEffect } from "react";
import Loading from "../utils/loading";
import {
  Box,
  Button,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { fetchDataFromAPI, postDataToAPI, updateDataToAPI } from "../../api";

const initialFormData = {
  id: "",
  cuid: "",
  name: "",
  prenom: "",
  postnom: "",
  direction: "",
  employeur: "",
  genre: "",
  date_naissance: "",
  contrat: "",
  num_mat: "",
  phone: "",
  age: "",
  statut_contrat: "",
  fonction: "",
  email: "",
  anciennete_annee: "",
  anciennete_mois: "",
  nationalite: "",
  lieu_embauche: "",
  grade: "",
  date_fin_contrat: "",
  date_embauche: "",
  dure_contrat: "",
  periode_essai: "",
};

const EffectifForm = ({
  formData: initialFormDataProp,
  handleFormSubmit,
  openDialog,
  handleCloseDialog,
  editMode,
  onSuccess, // Nouveau prop pour signaler une opération réussie
}) => {
  const [isSuccess, setIsSuccess] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [cuidOptions, setCuidOptions] = useState([]);
  const [nationaliteOptions, setNationaliteOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [ageOptions, setAgeOptions] = useState([]);
  const [gradeOptions, setGradeOptions] = useState([]);
  const [statut_contratOptions, setStatut_contratOptions] = useState([]);
  const [directionOptions, setDirectionOptions] = useState([]);
  const [employeurOptions, setEmployeurOptions] = useState([]);
  const [contratOptions, setContratOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setIsSuccess(true)
    if (editMode && initialFormDataProp) {
      setFormData(initialFormDataProp);
    } else {
      setFormData(initialFormData);
    }
  }, [editMode, initialFormDataProp]);

  useEffect(() => {
    const fetchEffectifData = async () => {
      try {
        const [
          choicesResponse,
          directionResponse,
          employeurResponse,
          contratResponse,
          cuidResponse,
        ] = await Promise.all([
          fetchDataFromAPI("/effectif/agent/get_choices/"),
          fetchDataFromAPI("/effectif/direction/get_direction/"),
          fetchDataFromAPI("/effectif/employeur/get_employeur/"),
          fetchDataFromAPI("/effectif/contrat/get_contrat/"),
          fetchDataFromAPI("/effectif/agent/get_user/"),
        ]);

        const { age, genre, statut_contrat, nationalite, grade } =
          choicesResponse.data;
        const direction = directionResponse.data;
        const employeur = employeurResponse.data;
        const contrat = contratResponse.data;
        const cuid = cuidResponse.data;

        const transformChoices = (choices) => {
          return Array.isArray(choices)
            ? choices.map((choice) => ({
                value: choice.value,
                label: choice.label,
              }))
            : [];
        };
        const transformForeignKeyData = (data) => {
          return Array.isArray(data)
            ? data.map((item) => ({
                id: item.id,
                value: item.id,
                label: item.label,
              }))
            : [];
        };
        setGenreOptions(transformChoices(genre || []));
        setAgeOptions(transformChoices(age || []));
        setGradeOptions(transformChoices(grade || []));
        setCuidOptions(transformForeignKeyData(cuid || []));
        setStatut_contratOptions(transformChoices(statut_contrat || []));
        setDirectionOptions(transformForeignKeyData(direction || []));
        setEmployeurOptions(transformForeignKeyData(employeur || []));
        setContratOptions(transformForeignKeyData(contrat || []));
        setNationaliteOptions(transformChoices(nationalite || []));
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des données de l'effectif :",
          error
        );
        // setLoading(false);
      }
    };

    fetchEffectifData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Efface l'erreur lors de la modification du champ
    }));
  };
  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    // Vérification des champs requis
    if (!formData.cuid) {
      newErrors.cuid = "Le CUID est requis";
      valid = false;
    }
    if (!formData.name) {
      newErrors.name = "Le nom est requis";
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = "L'email est requis";
      valid = false;
    }
    if (!formData.phone) {
      newErrors.phone = "Le numéro de téléphone est requis";
      valid = false;
    }
    if (!formData.prenom) {
      newErrors.prenom = "Le prénom est requis";
      valid = false;
    }
    if (!formData.postnom) {
      newErrors.postnom = "Le postnom est requis";
      valid = false;
    }
    if (!formData.direction) {
      newErrors.direction = "La direction est requise";
      valid = false;
    }
    if (!formData.employeur) {
      newErrors.employeur = "L'employeur est requis";
      valid = false;
    }
    if (!formData.genre) {
      newErrors.genre = "Le genre est requis";
      valid = false;
    }
    if (!formData.date_naissance) {
      newErrors.date_naissance = "La date de naissance est requise";
      valid = false;
    }
    if (!formData.contrat) {
      newErrors.contrat = "Le contrat est requis";
      valid = false;
    }
    if (!formData.num_mat) {
      newErrors.num_mat = "Le numéro matricule est requis";
      valid = false;
    }
    if (!formData.age) {
      newErrors.age = "L'âge est requis";
      valid = false;
    }
    if (!formData.statut_contrat) {
      newErrors.statut_contrat = "Le statut du contrat est requis";
      valid = false;
    }
    if (!formData.fonction) {
      newErrors.fonction = "La fonction est requise";
      valid = false;
    }
    if (!formData.anciennete_annee) {
      newErrors.anciennete_annee = "L'ancienneté en années est requise";
      valid = false;
    }
    if (!formData.anciennete_mois) {
      newErrors.anciennete_mois = "L'ancienneté en mois est requise";
      valid = false;
    }
    if (!formData.nationalite) {
      newErrors.nationalite = "La nationalité est requise";
      valid = false;
    }
    if (!formData.lieu_embauche) {
      newErrors.lieu_embauche = "Le lieu d'embauche est requis";
      valid = false;
    }
    if (!formData.lieu_affectation) {
      newErrors.lieu_affectation = "Le lieu d'affectation est requis";
      valid = false;
    }
    if (!formData.grade) {
      newErrors.grade = "Le grade est requis";
      valid = false;
    }
    if (!formData.date_fin_cdd) {
      newErrors.date_fin_cdd = "La date de fin du CDD est requise";
      valid = false;
    }
    if (!formData.date_embauche) {
      newErrors.date_embauche = "La date d'embauche est requise";
      valid = false;
    }
    if (!formData.dure_cdd) {
      newErrors.dure_cdd = "La durée du CDD est requise";
      valid = false;
    }
    if (!formData.periode_essai) {
      newErrors.periode_essai = "La période d'essai est requise";
      valid = false;
    }
    if (!formData.manager_name) {
      newErrors.manager_name = "Le nom du manager est requis";
      valid = false;
    }
    if (!formData.date_depart) {
      newErrors.date_depart = "La date de départ est requise";
      valid = false;
    }

    // Définir les erreurs et renvoyer l'état de validité
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      console.log("Le champ name est manquant");
      return false;
    }
    console.log("Validation réussie, soumission en cours...");
  
    try {
      const submitData = {
        ...formData,
        employeur: Number(formData.employeur),
        direction: Number(formData.direction),
        contrat: Number(formData.contrat),
      };
      submitData.periode_essai = submitData.periode_essai ?? false;

      submitData.user = {
        cuid: `${submitData?.cuid}`,
        email: `${submitData?.email}`,
        phone: `${submitData?.phone}`,
      };
      delete submitData.cuid;
      // console.log("**********submit data:", submitData);

      if (editMode) {
        await updateDataToAPI(`/effectif/agent/${formData.id}/`, submitData);
      } else {
        const response = await postDataToAPI(
          "/effectif/agent/creer_agent/",
          submitData
        );
        if (response.status === 200) {
          setIsSuccess(true);
          if (onSuccess) onSuccess(); // Appeler la fonction de succès
        } else {
          setIsSuccess(false);
        }
        console.log(response);
      }

      handleCloseDialog();
      setFormData(initialFormData);
    } catch (error) {
      console.error("Erreur lors de la soumission de l'agent :", error);
    }
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md">
        <DialogTitle>
          {editMode ? "Modifier Effectif" : "Ajouter Agent"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Cuid"
                  name="cuid"
                  value={formData.cuid}
                  onChange={handleInputChange}
                  required
                  error={!!errors.cuid}
                  helperText={errors.cuid}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nom"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Prénom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  required
                  error={!!errors.prenom}
                  helperText={errors.prenom}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Postnom"
                  name="postnom"
                  value={formData.postnom}
                  onChange={handleInputChange}
                  required
                  error={!!errors.postnom}
                  helperText={errors.postnom}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Direction</InputLabel>
                  <Select
                    name="direction"
                    value={formData.direction || ""}
                    onChange={handleInputChange}
                    error={!!errors.direction}
                    helperText={errors.direction}
                    label="Direction">
                    {!loading ? (
                      directionOptions.map((option) => (
                        <MenuItem key={option.id} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>Loading...</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Employeur</InputLabel>
                  <Select
                    name="employeur"
                    value={formData.employeur || ""}
                    onChange={handleInputChange}
                    error={!!errors.employeur}
                    helperText={errors.employeur}
                    label="Employeur">
                    {!loading ? (
                      employeurOptions.map((option) => (
                        <MenuItem key={option.id} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>Loading...</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Genre</InputLabel>
                  <Select
                    name="genre"
                    value={formData.genre || ""}
                    onChange={handleInputChange}
                    error={!!errors.genre}
                    helperText={errors.genre}
                    label="Genre">
                    {!loading ? (
                      genreOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>Loading...</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date de Naissance"
                  name="date_naissance"
                  value={formData.date_naissance}
                  onChange={handleInputChange}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  required
                  error={!!errors.date_naissance}
                  helperText={errors.date_naissance}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Contrat</InputLabel>
                  <Select
                    name="contrat"
                    value={formData.contrat || ""}
                    onChange={handleInputChange}
                    error={!!errors.contrat}
                    helperText={errors.contrat}
                    label="Contrat">
                    {!loading ? (
                      contratOptions.map((option) => (
                        <MenuItem key={option.id} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>Loading...</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Numéro de Matricule"
                  name="num_mat"
                  value={formData.num_mat}
                  onChange={handleInputChange}
                  required
                  error={!!errors.num_mat}
                  helperText={errors.num_mat}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Téléphone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>tranche d'âge</InputLabel>
                  <Select
                    name="age"
                    value={formData.age || ""}
                    onChange={handleInputChange}
                    error={!!errors.age}
                    helperText={errors.age}
                    label="age">
                    {!loading ? (
                      ageOptions.map((option) => (
                        <MenuItem key={option.id} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>Loading...</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Statut du Contrat</InputLabel>
                  <Select
                    name="statut_contrat"
                    value={formData.statut_contrat || ""}
                    onChange={handleInputChange}
                    error={!!errors.statut_contrat}
                    helperText={errors.statut_contrat}
                    label="Statut du Contrat">
                    {!loading ? (
                      statut_contratOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>Loading...</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Fonction"
                  name="fonction"
                  value={formData.fonction}
                  onChange={handleInputChange}
                  required
                  error={!!errors.fonction}
                  helperText={errors.fonction}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  required
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Nationalité</InputLabel>
                  <Select
                    name="nationalite"
                    value={formData.nationalite || ""}
                    onChange={handleInputChange}
                    error={!!errors.nationalite}
                    helperText={errors.nationalite}
                    label="Nationalité">
                    {!loading ? (
                      nationaliteOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>Loading...</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Lieu d'embauche"
                  name="lieu_embauche"
                  value={formData.lieu_embauche}
                  onChange={handleInputChange}
                  required
                  error={!!errors.lieu_embauche}
                  helperText={errors.lieu_embauche}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Lieu d'affectation"
                  name="lieu_affectation"
                  value={formData.lieu_embauche}
                  onChange={handleInputChange}
                  required
                  error={!!errors.lieu_affectation}
                  helperText={errors.lieu_affectation}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Grade</InputLabel>
                  <Select
                    name="grade"
                    value={formData.grade || ""}
                    onChange={handleInputChange}
                    error={!!errors.grade}
                    helperText={errors.grade}
                    label="Grade">
                    {!loading ? (
                      gradeOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>Loading...</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date de Fin de Contrat"
                  name="date_fin_contrat"
                  value={formData.date_fin_contrat}
                  onChange={handleInputChange}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.date_fin_contrat}
                  helperText={errors.date_fin_contrat}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date d'Embauche"
                  name="date_embauche"
                  value={formData.date_embauche}
                  onChange={handleInputChange}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.date_embauche}
                  helperText={errors.date_embauche}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Durée du Contrat"
                  name="dure_contrat"
                  value={formData.dure_contrat}
                  onChange={handleInputChange}
                  required
                  error={!!errors.dure_contrat}
                  helperText={errors.dure_contrat}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="periode_essai"
                      defaultValue={false}
                      checked={formData.periode_essai}
                      onChange={handleInputChange}
                    />
                  }
                  label="Période d'Essai"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editMode ? "Modifier" : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>

      <Loading isSuccess={isSuccess} />
    </>
  );
};

export default EffectifForm;
