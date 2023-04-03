import styled from '@emotion/styled';

export const StyledListInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  minWidth: '210px',
  maxWidth: '210px',
});

export const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
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
  '& .button-add-task': {
    height: '30px',
    background: 'white',
    color: '#838383',
    marginBottom: '1rem',
  },
});
