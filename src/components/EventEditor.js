// src/components/EventEditor.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const EventEditor = ({ onEventAdd }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && date) {
      onEventAdd({ title, date, description });
      setTitle('');
      setDate('');
      setDescription('');
    }
  };

  return (
    <Box>
      <Typography variant="h6">Edit Event</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Event Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '10px' }}>
          Save Event
        </Button>
      </form>
    </Box>
  );
};

export default EventEditor;