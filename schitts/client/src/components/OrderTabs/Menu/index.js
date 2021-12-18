import { Tabs, Tab, Box, Button } from '@mui/material';

import MenuModal from './Modal';
import Menu from './MenuDisplay';

const boxStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  maxWidth: '800px',
  margin: '0 auto',
};

const MenuTab = () => {
  return (
    <Box sx={boxStyle}>
      <MenuModal />
      <Menu />
    </Box>
  );
};

export default MenuTab;
