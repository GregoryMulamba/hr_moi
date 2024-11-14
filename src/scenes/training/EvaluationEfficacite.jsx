import React, { useState } from 'react';
import { Typography, Button, TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';

const EvaluationEfficacite = ({ onSave }) => {
  const [formData, setFormData] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    commentaires: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allFieldsFilled = Object.values(formData).every(field => field.trim() !== '');
    if (!allFieldsFilled) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    onSave({ ...formData, type: 'Efficacité' });
    setFormData({
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      question5: '',
      commentaires: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <b>(1)Pas bien, (2)Un peu Bien, (3)Bien, (4)Très bien, (5)Excellent</b> <br/>
      <br/>
      <Typography variant="body1">1. La formation a-t-elle amélioré vos compétences professionnelles ?</Typography>
      <RadioGroup name="question1" value={formData.question1} onChange={handleChange} required>
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>
      <Typography variant="body1">2. La formation a-t-elle répondu à vos attentes ?</Typography>
      <RadioGroup name="question2" value={formData.question2} onChange={handleChange} required>
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>
      <Typography variant="body1">3. Recommanderiez-vous cette formation à d'autres ?</Typography>
      <RadioGroup name="question3" value={formData.question3} onChange={handleChange} required>
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>
      <Typography variant="body1">4. Comment évalueriez-vous globalement cette formation ?</Typography>
      <RadioGroup name="question4" value={formData.question4} onChange={handleChange} required>
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>
      <Typography variant="body1">5. Avez-vous des suggestions pour améliorer cette formation ?</Typography>
      <TextField
        name="question5"
        value={formData.question5}
        onChange={handleChange}
        fullWidth
        multiline
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Enregistrer
      </Button>
    </form>
  );
};

export default EvaluationEfficacite;
