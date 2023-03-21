import React, { useState } from "react";
import { Grid, Typography, Button, TextField } from "@mui/material";

function HorizontalScrollLayout() {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [content, setContent] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 5" },
  ]);

  const handleAddListClick = () => {
    setShowInput(true);
  };

  const handleCancelClick = () => {
    setShowInput(false);
  };

  const handleAddClick = () => {
    const newContent = [...content, { id: content.length + 1, name: inputValue }];
    setContent(newContent);
    setInputValue("");
    setShowInput(false);
  };

  return (
    <Grid container>
      <Grid container item sx={{ overflowX: "scroll" }}>
        {/* {content.map((item) => (
          <Grid key={item.id} item sx={{ width: 200, height: 200 }}>
            <Typography>{item.name}</Typography>
          </Grid>
        ))} */}
      </Grid>
      <Grid container item xs={12}>
        {showInput ? (
          <>
            <Grid item xs={6}>
              <TextField
                label="Nombre de la lista"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Button onClick={handleAddClick}>Añadir</Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={handleCancelClick}>Cancelar</Button>
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <Button onClick={handleAddListClick}>Añadir lista</Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default HorizontalScrollLayout;
