import React, { useState } from 'react';
import {
    AppBar, Toolbar, IconButton, Typography, Input, Box, Drawer,
    List, ListItem, ListItemText, Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { FaCircleUser } from 'react-icons/fa6';
import FilterComponent from './FilterComponent'; // Ensure the path is correct

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if the user is logged in
    const navigate = useNavigate(); // Hook for navigation

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const navigateToLogin = () => {
        navigate('/login');
    };

    const navigateToRegister = () => {
        navigate('/login?register=true');
    };

    const navigateToNotifications = () => {
        navigate('/notifications');
    };

    const navigateToParticipationHistory = () => {
        navigate('/participation-history');
    };

    const drawerList = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={navigateToParticipationHistory}>
                    <ListItemText primary="Show Participation History" />
                </ListItem>
                <ListItem button component={Link} to="/notifications">
                    <ListItemText primary="Notifications" />
                </ListItem>
                <ListItem button component={Link} to="/rules">
                    <ListItemText primary="Website Rules" />
                </ListItem>
                <ListItem>
                    <FilterComponent />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <AppBar position="fixed" color="inherit">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                >
                    {drawerList()}
                </Drawer>
                <Link to="/">
                    <img src='logoDice.png' alt="DiceDreams Logo" style={{ marginRight: '18px', height: '64px' }} />
                </Link>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="h6" component="div" sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: 'crimson', fontWeight: 'bold' }}>Dice</span>
                        <span style={{ color: 'black', fontWeight: 'bold' }}>Dreams</span>
                    </Typography>
                </Link>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, marginLeft: 2 }}>
                    <Input
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        sx={{ marginLeft: 2 }}
                    />
                </Box>
                {isLoggedIn ? (
                    <IconButton color="inherit" onClick={navigateToLogin}>
                        <FaCircleUser size={24} />
                    </IconButton>
                ) : (
                    <>
                        <Button color="inherit" onClick={navigateToLogin}>Log in</Button>
                        <Button variant="contained" color="primary" onClick={navigateToRegister}>Register</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;

