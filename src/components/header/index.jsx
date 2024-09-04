import React from 'react';
import { AppBar, Toolbar, Typography, Link } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          g00b Weekly Pick'em Challenge
        </Typography>
        <Link href="/submit-picks" color="inherit" sx={{ marginRight: 2 }}>
          Submit Picks
        </Link>
        <Link href="/leaderboard" color="inherit" sx={{ marginRight: 2 }}>
          Leaderboard
        </Link>
        <Link href="/games" color="inherit">
          Games
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

