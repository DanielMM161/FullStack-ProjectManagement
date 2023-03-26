import styled from '@emotion/styled';

const StyledSubTaskItem = styled('div')({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  '& .title-container': {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
});

export default StyledSubTaskItem;
