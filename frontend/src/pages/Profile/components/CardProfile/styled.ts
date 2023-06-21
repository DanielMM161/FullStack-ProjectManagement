import { styled, Paper } from '@mui/material';

export const CardProfileLayout = styled(Paper)(({ theme }) => ({
    boxShadow:' rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.08) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 2px 2px, rgba(0, 0, 0, 0.05) 0px 0px 8px',
    padding: '1rem',
    width: '100%',
    maxWidth: '800px',    
    borderRadius: '8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '& > div:first-child ': {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        alignItems: 'center',
        '& > svg': {
            cursor: 'pointer'
        }
    },
    '& .profile_container': {
        display: 'flex',
        '& .avatar_container': {
            marginRight: '1.25rem',
            textAlign: 'center',
            position: 'relative',
            '& div:nth-child(2)': {
                cursor: 'pointer',
                color: 'rgb(255, 255, 255)',
                backgroundColor: 'rgb(37, 99, 235)',
                position: 'absolute',
                bottom: '21px',
                right: '5px',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                padding: '0.25rem',
            }            
        },
        '& .info_container': {            
            minWidth: '0px',
            flex: '1 1 0%',
            '& > div': {
                marginTop: '1rem',
                display: 'flex',
                gap: '5px'
            }
        },
        '& .file': {
            opacity: 0,
            width: '0.1px',
            height: '0.1px',
            position: 'absolute'
        },
        '& label': {              
            alignItems: 'center',
            justifyContent: 'center',                
            fontWeight: 'bold',
            cursor: 'pointer',                
        }
    },
    /** Edit Form  */
    '& form': {
        '& .name_container': {
            display: 'flex',
            gap: '10px',
            marginBottom: '1.5rem'
        },
        '& .email_field': {
            marginTop: '1.5rem',
            marginBottom: '1.5rem'
        },
        '& > div:nth-child(3)': {
            display: 'flex',
            flexDirection: 'row-reverse',
            gap: '20px'
        }
    }
}));