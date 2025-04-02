import React from 'react';
import { AppBar, Tabs, Tab, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Tabs
          value={location.pathname}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Capture" value="/" component={Link} to="/" />
          <Tab label="Checks" value="/checks" component={Link} to="/checks" />
          <Tab label="Invoices" value="/invoices" component={Link} to="/invoices" />
          <Tab label="Companies" value="/companies" component={Link} to="/companies" />
        </Tabs>
      </AppBar>
    </Box>
  );
};

export default Navigation; 