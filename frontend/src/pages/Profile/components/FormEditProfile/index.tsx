import { Button, TextField } from "@mui/material"
import { useState } from "react"

export interface infoUserProps {
    firstName: string;
    lastName: string
}

interface Props {
    email: string;
    firstName: string;
    lastName: string;
    onCancel: () => void;
    onSaveChanges: (prop: infoUserProps) => void;
}

function FormEditProfile({
    email,
    firstName,
    lastName,
    onCancel,
    onSaveChanges,
}: Props) {
    const [userForm, setUserForm] = useState({
        name: firstName,
        surName: lastName
    })

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value} = event.target
        setUserForm(() => ({
            ...userForm,
            [name]: value
        }))
    }

    function handleCheckForm(): boolean {
        if (userForm.name.trim() == "") {
            //Set Error here
            return false;
        }

        if (userForm.surName.trim() == "") {
            //Set Error here
            return false;
        }

        return true;
    }

    function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(handleCheckForm()) onSaveChanges({firstName: userForm.name, lastName: userForm.surName})        
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <TextField
                className="email_field"
                disabled={true}                              
                id="email"
                label="Email"
                variant="outlined"
                value={email}                                               
                fullWidth                
            />
            <div className="name_container">
                <TextField                
                    id={userForm.name}
                    name="name"
                    label="Name"
                    variant="outlined"
                    value={userForm.name}
                    onChange={(e) => handleInputChange(e)}
                    fullWidth                
                />
                <TextField                
                    id={userForm.surName}
                    name="surName"
                    label="Surname"
                    variant="outlined"
                    value={userForm.surName}
                    onChange={(e) => handleInputChange(e)}
                    fullWidth                
                />
            </div>

            <div>
                <Button type='submit' variant="contained">
                    Save Changes
                </Button>
                <Button onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </form>
    )
}   

export default FormEditProfile