import React, { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Input, FormHelperText, styled } from '@mui/material';
import { Add } from '@mui/icons-material';

const Container = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',    
});


function ButtonInput() {
    const [showForm, setShowForm] = useState(false);
    const [inputValue, setInputValue] = useState('');
  
    const handleButtonClick = () => {
      setShowForm(true);
    };
  
    const handleFormSubmit = () => {
      //event.preventDefault();
      console.log(inputValue);
      setInputValue('');
      setShowForm(false);
    };
  
    const handleFormInputChange = () => {
     // setInputValue(event.target.value);
    };

    return (
        <>
            {showForm ? null : (
                <Button variant="contained" onClick={handleButtonClick}>
                    <Add />
                    Add another list
                </Button>
            )}
            {showForm && (
                <form onSubmit={handleFormSubmit} >
                    <FormControl>
                        <TextField id="outlined-basic" label="List Name" variant="outlined" />                                            
                    </FormControl>
                    <Button type="submit" variant="contained">
                        Add
                    </Button>
                </form>
            )}
        </>
      );
}

export default ButtonInput