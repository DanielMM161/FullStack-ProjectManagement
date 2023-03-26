import { styled } from '@mui/material';

const StyledEmptyContent = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '150px',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  margin: 'auto',
  flexDirection: 'column',
  maxWidth: '700px',
  maxHeight: '200px',
  border: 'solid 1px',
});

export default StyledEmptyContent;
