import React, { useState, useEffect } from 'react';
import {
    AppBar, Toolbar, IconButton, Typography, Input, Box, Drawer,
    List, ListItem, ListItemText, Button, Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import { Link, useNavigate } from 'react-router-dom';
import { FaCircleUser } from 'react-icons/fa6';
import axios from 'axios';
import FilterComponent from './FilterComponent'; // Import the FilterComponent

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/auth');
                setIsLoggedIn(response.data.loggedIn);
            } catch (error) {
                console.log('Failed to check login status');
            }
        };
        checkLoginStatus();
    }, []);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        if (event.key === 'Enter') {
            console.log('Search query:', searchQuery);
        }
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

    const navigateToDetails = (eventId) => {
        navigate(`/events/${eventId}`);
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/auth');
            setIsLoggedIn(false);
            navigate('/');
        } catch (error) {
            console.log('Failed to logout');
        }
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const drawerList = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
        >
            <List>
                <ListItem button component={Link} to="/"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to='/participation-history'
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <ListItemText primary="Show Participation History" />
                </ListItem>
                <ListItem button component={Link} to="/notifications"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <ListItemText primary="Notifications" />
                </ListItem>
                <ListItem button component={Link} to="/rules"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <ListItemText primary="Website Rules" />
                </ListItem>
                <Divider />
                <ListItem>
                    <Typography variant="h6">Filter Events</Typography>
                </ListItem>
                <ListItem>
                    <FilterComponent onSearch={closeDrawer} />
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
                        onKeyDown={handleSearchSubmit}
                        sx={{ marginLeft: 2 }}
                    />
                </Box>
                {isLoggedIn ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton color="inherit" onClick={() => navigate('/profile')}>
                            <FaCircleUser size={24} />
                        </IconButton>
                        <Button color="inherit" onClick={handleLogout}>Log out</Button>
                    </Box>
                ) : (
                    <>
                        <Button color="inherit" onClick={navigateToLogin}>Log in</Button>
                        <Button variant="contained" color="primary" onClick={navigateToRegister}>Register</Button>
                    </>
                )}
                <IconButton color="inherit" onClick={() => navigateToDetails('example-event-id')}>
                    <InfoIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;


