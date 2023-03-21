import styled from "@emotion/styled";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch } from "../../hooks/redux.hook";
import { Grid, Typography, Button, Avatar, IconButton, AvatarGroup } from '@mui/material';
import { Add, Edit } from "@mui/icons-material";
import Layout from "../../components/Layout";
import HorizontalScrollLayout from "../../components/HorizontalScrollLayout";
import ButtonInput from "../../components/ButtonInput";

const ProjectInfo = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: '15px',
  backgroundColor: '#f3f3f3',    
});

const ListInfo = styled('div')({
  marginTop: '1rem',
  display: 'flex',
  height: '100%',
  width: '100%',
  overflowX: 'scroll',
  alignItems: 'flex-start',
  padding: '15px',
  backgroundColor: '#f3f3f3',
  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 15rem), 1fr))',
  gap: '25px'
});
  
  
const ProjectName = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
});
  
const AddUserButton = styled(IconButton)({
  marginLeft: '10px',
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',    
});
  
function Project() {
    const { categoryId } = useParams()
    const dispatch = useAppDispatch();

    useEffect(() => {

    }, [])

    return  (
      <Layout>
        <ProjectInfo>
          <Container>
            <Typography variant="h5">
                Boards
            </Typography>
            <ProjectName>
                <p>Nombre del proyecto</p>
                <IconButton>
                    <Edit />
                </IconButton>
            </ProjectName>
          </Container>        
            <Container>
              <Typography variant="h5">
                Team
              </Typography>
              <AvatarGroup max={4}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                <AddUserButton>
                    <Add />
                </AddUserButton>
              </AvatarGroup>
            </Container>
        </ProjectInfo>

        <ListInfo>
          <ButtonInput />
        </ListInfo>
        
      </Layout>
    )
};

export default Project;