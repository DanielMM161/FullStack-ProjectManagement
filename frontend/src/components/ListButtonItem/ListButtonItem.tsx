import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

interface IButtonIconProps {
  title: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  selected?: boolean;
}

function ListButtonItem({ title, disabled = false, onClick, children, selected }: IButtonIconProps) {
  return (
    <ListItem key={title} disablePadding onClick={() => onClick()}>
      <ListItemButton disabled={disabled}>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={title} sx={{ fontWeight: 'bold', fontSize: '34px' }} />
      </ListItemButton>
    </ListItem>
  );
}

export default ListButtonItem;
