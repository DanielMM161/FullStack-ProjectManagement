import { Typography } from '@mui/material';
import StyledEmptyContent from './styled';

interface EmptyContentProps {
  message: string;
}

function EmptyContent({ message }: EmptyContentProps) {
  return (
    <StyledEmptyContent>
      <Typography variant="h2">There is no Items</Typography>
      <Typography variant="h5">{message}</Typography>
    </StyledEmptyContent>
  );
}

export default EmptyContent;
