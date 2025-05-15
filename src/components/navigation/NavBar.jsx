import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Menu,
    MenuItem,
    Box,
    Modal,
    Typography,
    Avatar, CircularProgress
} from '@mui/material';
import {Link} from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {LoginModal} from "../modals/LoginModal.jsx";
import {ProfileButton} from "../common/ProfileButton.jsx";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../api/auth.js";
import {clearUser} from "../../redux/reducers/userSlice.js";

export const NavBar = ({authLoading = false}) => {
    const dispatch = useDispatch();
    const [restaurantAnchor, setRestaurantAnchor] = useState(null);
    const [profileAnchor, setProfileAnchor] = useState(null);
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const user = useSelector((state) => state.user);
    const loggedIn = localStorage.getItem('access_token') && user?.name;

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'white',
        borderRadius: 8,
        boxShadow: 24,
        padding: 24,
    };

    const handleOpenMenu = (setter) => (event) => {
        setter(event.currentTarget);
    };

    const handleCloseMenu = (setter) => () => {
        setter(null);
    };

    const handleLogout = () => {
        logout()
            .then(resp => {
                console.log(resp)
                if (!resp?.error) {
                    dispatch(clearUser());
                }
            })
    }

    return (
        <>
            <AppBar position="static" color='transparent' sx={{borderRadius: 10}}>
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    <Box display="flex" alignItems="center" component={Link} to="/" sx={{cursor: 'pointer'}}>
                        <img src="src/assets/icons/logo.png" alt="Logo" style={{height: 60, borderRadius: 50}}/>
                    </Box>

                    <Box display="flex" alignItems="center" gap={10}>
                        <Button color="inherit" component={Link} to="/">Home</Button>

                        <Button
                            color="inherit"
                            onMouseEnter={handleOpenMenu(setRestaurantAnchor)}
                            endIcon={restaurantAnchor ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        >
                            Restaurant
                        </Button>

                        {
                            authLoading ? <CircularProgress/> : (
                                loggedIn ?
                                    <Box display="flex" alignItems="center" gap={5}>
                                        <ProfileButton name={user?.name} email={user?.email}
                                                       onClick={() => handleOpenMenu(setProfileAnchor)}/>
                                        <IconButton>
                                            <LogoutIcon onClick={handleLogout}/>
                                        </IconButton>
                                    </Box>
                                    :
                                    (
                                        <div>
                                            <Button color="inherit" onClick={() => setLoginOpen(true)}>Login</Button>
                                            <Button color="inherit"
                                                    onClick={() => setRegisterOpen(true)}>Register</Button>
                                        </div>

                                    )
                            )}

                    </Box>
                </Toolbar>
            </AppBar>

            <Menu
                anchorEl={restaurantAnchor}
                open={Boolean(restaurantAnchor)}
                onClose={handleCloseMenu(setRestaurantAnchor)}
                onMouseLeave={handleCloseMenu(setRestaurantAnchor)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 20,
                }}
                disableAutoFocusItem
                aria-hidden={false}
            >
                <MenuItem onClick={handleCloseMenu(setRestaurantAnchor)} component={Link}
                          to="/halls">Halls</MenuItem>
                <MenuItem onClick={handleCloseMenu(setRestaurantAnchor)} component={Link}
                          to="/tables">Tables</MenuItem>
            </Menu>

            <Menu
                anchorEl={profileAnchor}
                open={Boolean(profileAnchor)}
                onClose={handleCloseMenu(setProfileAnchor)}
                onMouseLeave={handleCloseMenu(setProfileAnchor)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 20,
                }}
                disableAutoFocusItem
                aria-hidden={false}
            >
                <MenuItem onClick={handleCloseMenu(setProfileAnchor)} component={Link}
                          to="/profile">Profile</MenuItem>
                <MenuItem onClick={handleCloseMenu(setProfileAnchor)} component={Link}
                          to="/orders">Orders</MenuItem>
            </Menu>

            <LoginModal
                open={loginOpen} onClose={() => setLoginOpen(false)}/>

            <Modal open={registerOpen} onClose={() => setRegisterOpen(false)}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" gutterBottom>Register</Typography>
                </Box>
            </Modal>
        </>
    );
};
