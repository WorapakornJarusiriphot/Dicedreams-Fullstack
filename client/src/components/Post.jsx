import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, InputBase, Button, Box } from '@mui/material';

export default function Post() {
  const [italic, setItalic] = useState(false);
  const [fontWeight, setFontWeight] = useState('normal');
  const navigate = useNavigate();

  return (
    <div className='py-24 flex flex-col justify-center items-center bg-black'>
      <FormControl>
        <FormLabel sx={{ color: 'white', fontSize: '24px' }}>Let's create a party for fun</FormLabel>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0px 2px 4px rgba(0, 0.5, 0.5, 0.5)',
            backgroundColor: 'white',
            borderRadius: '10px',
            border: '1px solid #ccc',
            padding: '10px',
            overflow: 'hidden',
          }}
        >
          <InputBase
            multiline
            minRows={3}
            placeholder="Type something here…"
            sx={{
              flex: 1,
              marginRight: '18px',
              minWidth: { xs: '300px', sm: '500px', md: '800px', lg: '1200px' },
              fontSize: '16px',
              padding: '12px 16px',
              fontWeight,
              fontStyle: italic ? 'italic' : 'initial',
              textAlign: 'left',
            }}
          />
          <Button
            variant="contained"
            onClick={() => navigate('/login')}
            sx={{ backgroundColor: 'crimson', height: '100px' }}
          >
            Post
          </Button>
        </Box>
      </FormControl>
    </div>
  );
}


