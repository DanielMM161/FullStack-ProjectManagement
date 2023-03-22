import { useState } from 'react';
import { Button, TextField, FormControl, styled, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import InputControlButton from '../InputControlButton';

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
  children?: React.ReactNode
}

function ButtonInput({ 
  buttonText, 
  addClick, 
  children = <Add />
}: ButtonInputProps) {
  const [showForm, setShowForm] = useState(false);
  
  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
    <>
      {showForm ? (
          <InputControlButton 
            label={buttonText}
            addClick={(value) => addClick(value)}
            closeClick={() => setShowForm(false)}
          />
      ) : (
        <Button variant="contained" onClick={handleButtonClick}>
          {children}
          {buttonText}
        </Button>
      )}
    </>
  );
}

export default ButtonInput;
