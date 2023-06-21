
import styled from '@emotion/styled';

export const ProfileContainer = styled('div')({
  height: '100%',
  width: '100%',
  display: 'flex',
  '& .user_nav': {
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    '& > section:nth-child(1)': {
        height: '20%'
    },
    '& > section:nth-child(2)': {
        display: 'flex',
        cursor: 'pointer',
        flexDirection: 'column',
        gap: '14px'
    }
  },
  '& user_info': {
    width: '75%',    
  }

});