import { Typography } from "@mui/material";

import Layout from "../../components/Layout";
import CardProfile from "./components/CardProfile/indext";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { updateProfile } from "../../redux/slice/ProfileSlice";

function Profile() {

    const dispatch = useAppDispatch();
    const userProfile = useAppSelector(state => state.profile)
    const { profile } = userProfile
    
    return (
        <Layout>
           <Typography variant="h3" gutterBottom>
                Your Profile
          </Typography>
          <Typography variant="h5" gutterBottom>
                Manage your personal information
          </Typography>
          
          <CardProfile 
            key={profile.id}
            userEmail={profile.email}
            userName={profile.firstName}
            userLastName={profile.lastName}
            imageProfile={profile.pictureProfile}
            onSaveChanges={(value) => {
                dispatch(updateProfile({
                    email: profile.email,
                    firstName: value.firstName,
                    lastName: value.lastName
                }))
            }}
          />
        </Layout>
    )
}

export default Profile;