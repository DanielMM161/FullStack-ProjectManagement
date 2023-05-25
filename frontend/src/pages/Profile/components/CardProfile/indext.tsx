import { useState } from 'react';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Avatar, IconButton } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import FormEditProfile, { infoUserProps } from '../FormEditProfile';
import { CardProfileLayout } from "./styled"

interface Props {
    userName: string;
    userLastName: string;
    userEmail: string;
    onSaveChanges: (prop: infoUserProps) => void;
}

function CardProfile({
    userName,
    userLastName,
    userEmail,
    onSaveChanges
}: Props) {

    const [edit, setEdit] = useState(false)

    return (
        <CardProfileLayout>
            <div>
                <h2>Profile</h2>
                <IconButton onClick={() => setEdit(!edit)}>
                    {edit ? <CancelOutlinedIcon /> : <EditOutlinedIcon  /> }                    
                </IconButton>
            </div>

            <div className='profile_container'>
                <div className='avatar_container'>
                    <Avatar sx={{ width: 88, height: 88 }}/>
                    
                    <div>
                        <DeleteOutlineOutlinedIcon sx={{ width: 16, height: 16 }} />
                    </div>
                    
                    <h4>Update</h4>                    
                </div>
                <div className='info_container'>
                    <h2>{userName} {userLastName}</h2>
                    <div>
                        <EmailOutlinedIcon />
                        {userEmail}
                    </div>
                </div>
            </div>

            {edit ? (
                <FormEditProfile
                    key={userEmail}
                    email={userEmail} 
                    firstName={userName}
                    lastName={userLastName}
                    onCancel={() => setEdit(!edit)}
                    onSaveChanges={onSaveChanges}
                />
            ) : null}            
        </CardProfileLayout>
    )
}

export default CardProfile