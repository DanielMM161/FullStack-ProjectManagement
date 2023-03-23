import styled from "@emotion/styled";
import { DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import useUsers from "../../hooks/useUsers.hook";
import { User } from "../../models/user.model";
import TransferList from "../TransferList/TransferList";

const Layout = styled('div') ({
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column'
})

interface AssignUserProps {
    users: User[]
}

function AssignUser({
    users
}: AssignUserProps) {
    const [usersIn, setUsersIn] = useState<User[]>(users);
    const { allUsers } = useUsers();
    return (
        <Layout>
            <DialogTitle>Assign User</DialogTitle>
            <DialogContent className="create-project-content" sx={{ width: '100%' }}>
                {allUsers.length > 0 ? (
                    <TransferList allUsers={allUsers} usersIn={usersIn} onUsersIn={(value) => setUsersIn(value)} />                
                ) : null}                
            </DialogContent>
        </Layout>
    )
}

export default AssignUser