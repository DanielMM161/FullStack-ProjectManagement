import { useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StyledInputControlButton from './styled';

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
    <StyledInputControlButton>
      <TextField
        autoFocus
        id="outlined-basic"
        size="small"
        label={label}
        variant="filled"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="buttons-container">
        <Button onClick={() => handleAddClick()} variant="contained" size="small">
          Add
        </Button>
        <IconButton size="small" onClick={closeClick}>
          <CloseIcon />
        </IconButton>
      </div>
    </StyledInputControlButton>
  );
}

export default InputControlButton;
