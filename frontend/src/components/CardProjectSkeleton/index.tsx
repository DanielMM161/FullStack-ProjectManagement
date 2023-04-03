import { Avatar, Chip, Skeleton } from '@mui/material';
import CardLayout from '../CardProject/styled';

function CardProjectSkeleton() {
  return (
    <CardLayout elevation={6}>
      <div className="info-container">
        <div className="title-info">
          <Skeleton variant="rectangular" width={210} height={30} sx={{ marginBottom: '1rem' }} />
        </div>
        <Skeleton variant="rectangular" width={210} height={60} />
      </div>

      <div className="users-container">
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
        <div className="icons-content">
          <Skeleton variant="rectangular" width={60} height={30}>
            <Chip />
          </Skeleton>
        </div>
      </div>
    </CardLayout>
  );
}

export default CardProjectSkeleton;
