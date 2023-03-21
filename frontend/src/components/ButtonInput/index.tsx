import { useState } from 'react';
import { Button, TextField, FormControl, styled, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const ButtonsContainer = styled('div')({
  marginTop: 5,
  display: 'flex',
  alignItems: 'flex-start',
  gap: 5,
});

interface ButtonInputProps {
  buttonText: string;
  addClick: (inputValue: string) => void;
}

function ButtonInput({ buttonText, addClick }: ButtonInputProps) {
  const [showForm, setShowForm] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleAddClick = () => {
    if (inputValue !== '') {
      setShowForm(false);
      addClick(inputValue);
    }
  };

  return (
    <>
      {showForm ? (
        <Container>
          <FormControl>
            <TextField
              id="outlined-basic"
              size="small"
              label={buttonText}
              variant="outlined"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </FormControl>
          <ButtonsContainer>
            <Button onClick={() => handleAddClick()} variant="contained" size="small">
              Add
            </Button>
            <IconButton size="small" onClick={() => setShowForm(false)}>
              <CloseIcon />
            </IconButton>
          </ButtonsContainer>
        </Container>
      ) : (
        <Button variant="contained" onClick={handleButtonClick}>
          <Add />
          {buttonText}
        </Button>
      )}
    </>
  );
}

export default ButtonInput;
