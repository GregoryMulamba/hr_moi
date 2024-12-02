// JobProfiles.jsx
import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const JobProfiles = () => {
  const [jobProfiles] = useState([
    { name: 'Marketing Manager', skillsRequired: ['SEO', 'Content Creation', 'Social Media'] },
    { name: 'Software Developer', skillsRequired: ['JavaScript', 'React', 'Node.js'] },
  ]);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Profils Métiers</Typography>
      <List>
        {jobProfiles.map((profile, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText primary={profile.name} />
              <Typography variant="body2" color="textSecondary">Compétences requises :</Typography>
              <Typography variant="body2">{profile.skillsRequired.join(', ')}</Typography>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default JobProfiles;
