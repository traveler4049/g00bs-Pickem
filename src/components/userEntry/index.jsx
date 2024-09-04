import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const UserEntry = ({ onTwitterHandleSubmit }) => {
  const [twitterHandle, setTwitterHandle] = useState('');

  const handleSubmit = () => {
    if (twitterHandle) {
      onTwitterHandleSubmit(twitterHandle);
    } else {
      alert('Please enter your Twitter handle.');
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Enter Your Twitter Handle
      </Typography>
      <TextField
        label="Twitter Handle"
        variant="outlined"
        value={twitterHandle}
        onChange={(e) => setTwitterHandle(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default UserEntry;

