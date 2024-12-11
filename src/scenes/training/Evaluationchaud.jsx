import React, { useState } from 'react';
import { Typography, Button, Radio, RadioGroup, FormControlLabel, TextField } from '@mui/material';

const Evaluationchaud = ({ onSave }) => {
  const [formData, setFormData] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    question6: '',
    question7: '',
    question8: '',
    question9: '',
    question10: '',
    commentaires: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, type: 'à Chaud' });
    setFormData({
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      question5: '',
      question6: '',
      question7: '',
      question8: '',
      question9: '',
      question10: '',
      commentaires: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {["Le contenu de la formation était-il clair et compréhensible ?", "Les supports pédagogiques étaient-ils utiles et pertinents ?", "La durée de la formation était-elle adaptée ?", "L'animateur a-t-il bien maîtrisé le sujet ?", "L'animateur a-t-il répondu à vos questions ?", "Comment évalueriez-vous globalement cette formation ?", "Quels sont les points forts de la formation ?", "Quels sont les points à améliorer ?", "Recommanderiez-vous cette formation à vos collègues ?", "Commentaires supplémentaires"].map((question, index) => (
        <React.Fragment key={index}>
          <Typography variant="body1">{index + 1}. {question}</Typography>
          <RadioGroup name={`question${index + 1}`} value={formData[`question${index + 1}`]} onChange={handleChange} required>
            {[1, 2, 3, 4, 5].map(value => (
              <FormControlLabel key={value} value={String(value)} control={<Radio />} label={String(value)} />
            ))}
          </RadioGroup>
        </React.Fragment>
      ))}
      <Typography variant="body1">Commentaires</Typography>
      <TextField
        name="commentaires"
        value={formData.commentaires}
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

export default Evaluationchaud;
