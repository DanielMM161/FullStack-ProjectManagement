import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

interface ControlledInputProps {
  onUpdate: (value: string) => void;
}

function ControlledInput({ onUpdate }: ControlledInputProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const debounceOnUpdate = setTimeout(() => {
      onUpdate(value);
    }, 300);

    return () => clearTimeout(debounceOnUpdate);
  }, [value, onUpdate]);

  return (
    <TextField
      autoFocus
      id="standard-basic"
      label="Search User"
      variant="outlined"
      value={value}
      sx={{
        marginBottom: '1rem',
        marginTop: '1rem',
        width: '100%',
      }}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default ControlledInput;
