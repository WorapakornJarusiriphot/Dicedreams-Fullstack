import React, { useState, useContext } from 'react';
import {
    AppBar, Toolbar, IconButton, Typography, Input, Box, Drawer,
    List, ListItem, ListItemText, Button, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import { Link, useNavigate } from 'react-router-dom';
import { FaCircleUser } from 'react-icons/fa6';
import axios from 'axios';
import FilterComponent from './FilterComponent';
import { AuthContext } from '../Auth/AuthContext';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { accessToken, login, logout } = useContext(AuthContext);
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();

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

    const handleLogout = () => {
        logout();
        setDialogOpen(false);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const openDialog = () => {
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
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
                <ListItem button component={Link} to="/profile">
                    <ListItemText primary="profile" />
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
                {accessToken ?
                    (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton color="inherit" onClick={() => navigate('/profile')}>
                                <FaCircleUser size={24} />
                            </IconButton>
                            <Button color="inherit" onClick={openDialog}>Log out</Button>
                        </Box>
                    ) :
                    (
                        <>
                            <Button color="inherit" onClick={navigateToLogin}>Log in</Button>
                            <Button variant="contained" color="primary" onClick={navigateToRegister}>Register</Button>
                        </>
                    )}
                <IconButton color="inherit" onClick={() => navigateToDetails('example-event-id')}>
                    <InfoIcon />
                </IconButton>
            </Toolbar>
            <Dialog
                open={dialogOpen}
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Logout"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLogout} color="primary" autoFocus>
                        Log out
                    </Button>
                </DialogActions>
            </Dialog>
        </AppBar>
    );
}

export default Navbar;
