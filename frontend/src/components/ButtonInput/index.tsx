import { useState } from 'react';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import InputControlButton from '../InputControlButton';

interface ButtonInputProps {
  buttonText: string;
  labelText: string;
  addClick: (inputValue: string) => void;
  children?: React.ReactNode;
  className?: string;
}

function ButtonInput({ buttonText, addClick, labelText, children = <Add />, className = '' }: ButtonInputProps) {
  const [showForm, setShowForm] = useState(false);

  function handleAddTaskClick(taskName: string) {
    setShowForm(!showForm);
    addClick(taskName);
  }

  return (
    <>
      {showForm ? (
        <InputControlButton
          label={labelText}
          addClick={(value) => handleAddTaskClick(value)}
          closeClick={() => setShowForm(!showForm)}
        />
      ) : (
        <Button className={className} variant="contained" onClick={() => setShowForm(!showForm)}>
          {children}
          {buttonText}
        </Button>
      )}
    </>
  );
}

export default ButtonInput;
