import styled from "@emotion/styled";
import { Button, DialogActions, DialogContent, DialogTitle } from "@mui/material";
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
    cancelClick: () => void,
    acceptClick: (usersId: number[]) => void
}

function AssignUser({
    users,
    cancelClick,
    acceptClick
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
            <DialogActions>
            <Button
            onClick={() => cancelClick()}
            >
            Cancel
            </Button>
            <Button onClick={() => acceptClick(usersIn.map(u => u.id))}>Acept</Button>
        </DialogActions>
        </Layout>
    )
}

export default AssignUser