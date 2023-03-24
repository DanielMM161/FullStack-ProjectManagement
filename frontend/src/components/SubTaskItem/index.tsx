import styled from '@emotion/styled';
import { Checkbox, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

const Layout = styled('div')({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const TitleContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

interface SubTaskItemProps {
  title: string;
  done: boolean;
  deleteOnClick: () => void;
  checkedClick: (checked: boolean) => void;
}

function SubTaskItem({ title, done, deleteOnClick, checkedClick }: SubTaskItemProps) {
  const [checked, setChecked] = useState(done);

  function handleCheckedClick() {
    checkedClick(!checked);
    setChecked(!checked);
  }

  return (
    <Layout>
      <TitleContainer>
        <Checkbox defaultChecked size="small" checked={checked} onClick={() => handleCheckedClick()} />
        <Typography variant="subtitle1">{title}</Typography>
      </TitleContainer>
      <IconButton onClick={deleteOnClick}>
        <DeleteIcon />
      </IconButton>
    </Layout>
  );
}

export default SubTaskItem;
