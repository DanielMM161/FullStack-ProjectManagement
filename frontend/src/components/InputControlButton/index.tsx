import { Button, IconButton, styled, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

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

interface InputControlButtonProps {
  label: string;
  addClick: (inputValue: string) => void;
  closeClick: () => void;
}

function InputControlButton({ label, addClick, closeClick }: InputControlButtonProps) {
  const [inputValue, setInputValue] = useState('');

  function handleAddClick() {
    if (inputValue !== '') {
      addClick(inputValue);
    }
  }

  return (
    <Container>
      <TextField
        autoFocus={true}
        id="outlined-basic"
        size="small"
        label={label}
        variant="filled"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <ButtonsContainer>
        <Button onClick={() => handleAddClick()} variant="contained" size="small">
          Add
        </Button>
        <IconButton size="small" onClick={closeClick}>
          <CloseIcon />
        </IconButton>
      </ButtonsContainer>
    </Container>
  );
}

export default InputControlButton;
