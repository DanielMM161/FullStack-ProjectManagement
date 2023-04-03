import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

interface IButtonIconProps {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
  selected: boolean;
}

function ListButtonItem({ title, onClick, children, selected }: IButtonIconProps) {
  return (
    <ListItem key={title} disablePadding onClick={() => onClick()} sx={{ color: selected ? 'green' : 'black' }}>
      <ListItemButton color={selected ? 'green' : 'red'}>
        <ListItemIcon sx={{ color: selected ? 'green' : 'default' }}>{children}</ListItemIcon>
        <ListItemText primary={title} sx={{ fontWeight: 'bold', fontSize: '34px' }} />
      </ListItemButton>
    </ListItem>
  );
}

export default ListButtonItem;
