import styled from "@emotion/styled";
import { Paper } from "@mui/material";


export const EmptyLayout = styled('div')({
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const ImageContainer = styled(Paper)(
    ({ theme }) => ({
        width: '70%',        
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        textAlign: 'center',
        background: 'white',
        padding: '2rem',
    })
);