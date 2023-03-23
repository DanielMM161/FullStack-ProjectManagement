import styled from "@emotion/styled";

export const SideBarLayout = styled('div') ({
    position: 'fixed',
    width: '300px',
    height: '100%',
    backgroundColor: 'white',
    padding: '1rem',
    '& .avatar-info': {
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        '& .info-name': {
            display: 'flex',            
            alignItems: 'center'
        }
    }
})

export const ListContainer = styled('div') ({
    padding: '1rem'
})
