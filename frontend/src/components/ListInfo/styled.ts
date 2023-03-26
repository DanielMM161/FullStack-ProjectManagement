import styled from '@emotion/styled';
import { Paper } from '@mui/material';

export const StyledListInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
});

export const Content = styled(Paper)({
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  backgroundColor: '#e1e1e1',
  borderRadius: 3,
  '& .head-list': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  '& .task-content': {
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 10,
  },
});
