import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const CategoryForm = ({ open, onClose, addCategory }) => {
  const [categoryData, setCategoryData] = useState({ name: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleFormSubmit = () => {
    if (categoryData.name) {
      addCategory(categoryData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Créer un groupe</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nom du Groupe"
          name="name"
          type="text"
          fullWidth
          value={categoryData.name}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleFormSubmit} color="primary">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryForm;
