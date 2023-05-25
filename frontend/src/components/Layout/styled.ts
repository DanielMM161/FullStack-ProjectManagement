import { styled } from "@mui/material";

export const StyledLayout = styled('div')(({ theme }) => ({
    height: '100%',
    padding: '0px 50px',
    marginLeft: '240px',
    '& > div:first-child': {
        paddingTop: '80px',
        //paddingBottom: '165px'
        margin: '0 auto',
        maxWidth: '1176px'
    },
    '& > div:first-child > div:first-child': {
        margin: '0 auto',
        maxWidth: '1176px'
    },
    [`@media screen and (max-width: ${theme.breakpoints.values.md}px)`]: {
      marginLeft: 0,
    },
}));