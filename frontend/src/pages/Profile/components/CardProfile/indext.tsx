import { LegacyRef, useRef, useState } from 'react';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Avatar, IconButton } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import FormEditProfile, { infoUserProps } from '../FormEditProfile';
import { CardProfileLayout } from "./styled"
import { Visibility } from '@mui/icons-material';
import { useAppDispatch } from '../../../../hooks/redux.hook';
import { uploadImageProfile } from '../../../../redux/slice/ProfileSlice';

interface Props {
    userName: string;
    userLastName: string;
    userEmail: string;
    imageProfile: String;
    onSaveChanges: (prop: infoUserProps) => void;
}

function CardProfile({
    userName,
    userLastName,
    userEmail,
    imageProfile,
    onSaveChanges
}: Props) {
    
    const dispatch = useAppDispatch();
    const [edit, setEdit] = useState(false)
    const hiddenFileInput = useRef<HTMLInputElement>(null)

    function handleUpdatePhoto() {
        const myInput = hiddenFileInput.current
        if (myInput) {
            myInput.click()
        }        
    }

    function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files
        if (file !== null && file[0].type === 'image/jpeg') {
            const formData = new FormData();
            formData.append('File', file[0]);
            dispatch(uploadImageProfile(formData))            
        }
    }

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
                    <Avatar sx={{ width: 88, height: 88 }} src={`data:image/jpeg;base64,${imageProfile}`} />
                    
                    <div>
                        <DeleteOutlineOutlinedIcon sx={{ width: 16, height: 16 }} />
                    </div>

                    <input 
                        id="myFile" 
                        type="file" 
                        name="filename" 
                        className='file' 
                        accept="image/png, image/jpeg"
                        ref={hiddenFileInput}
                        onChange={e => handleChangeImage(e)}
                    />
                    <label onClick={handleUpdatePhoto}>Update</label>                                  
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