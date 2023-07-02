import { useState } from 'react';
import { ChromePicker } from 'react-color';
import { Box, Typography } from '@mui/material';

const ColorPicker = ({ title, defaultValue }) => {
  const [color, setColor] = useState(defaultValue);
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handlePickerClick = () => {
    setShowPicker(!showPicker);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          backgroundColor: color,
          width: '30px',
          height: '30px',
          borderRadius: '20%',
          mr: '1rem',
        }}
        onClick={handlePickerClick}
      ></Box>
      <Box>
        <Typography variant="body1">{title}</Typography>
        <Typography variant="body2">{color}</Typography>
      </Box>
      {showPicker && (
        <Box sx={{ position: 'absolute', zIndex: '2', mt: '17.5rem' }}>
          <Box
            sx={{
              position: 'fixed',
              top: '0',
              right: '0',
              bottom: '0',
              left: '0',
            }}
            onClick={handlePickerClick}
          />
          <ChromePicker color={color} onChange={handleColorChange} />
        </Box>
      )}
    </Box>
  );
};

export default ColorPicker;

