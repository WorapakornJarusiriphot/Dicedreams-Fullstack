import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Button } from '@mui/material';
import HomePage from './HomePage';
import Rules from './Rules';
import NotificationPage from "./pages/NotificationPage";
import DetailsPage from "./pages/DetailPage"
import { AuthContext } from './Auth/AuthContext';

const drawerWidth = 240;

function App() {
  const { isLoggedIn, login, logout } = useContext(AuthContext);

  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Game Events
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            {isLoggedIn ? (
              <Button color="inherit" onClick={logout}>
                Log out
              </Button>
            ) : (
              <Button color="inherit" onClick={login}>
                Log in
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {['Home', 'Events', 'Contact', 'About', 'Rules', 'Notifications'].map((text) => (
                <ListItem button key={text} component={Link} to={`/${text.toLowerCase()}`}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/events/:post_games_id" element={<DetailsPage />} />
            <Route path="*" element={<Typography variant="h6">404 Not Found</Typography>} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;

