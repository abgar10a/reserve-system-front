import {
    Box,
    Button,
    FormControl,
    IconButton,
    Modal,
    TextField,
    Input,
    InputLabel,
    InputAdornment,
    Typography, Stack
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import React, {useState} from "react";
import {FcGoogle} from "react-icons/fc";
import {handleLoginResponse, login, loginWithProvider} from "../../api/auth.js";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useGoogleLogin} from "@react-oauth/google";
import {setUser} from "../../redux/reducers/userSlice.js";
import {setPageLoading} from "../../redux/reducers/appSlice.js";

export const LoginModal = ({open = false, onClose}) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const googleLogin = useGoogleLogin({
            onSuccess:
                (resp) => {
                    loginWithProvider('google', resp).then(resp => {
                        handleLoginResponse(resp.token.access_token, resp.token.refresh_token);
                        dispatch(setUser({name: resp.user.name, email: resp.user.email}));
                        onClose();
                    })
                }
        }
    );

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: 'auto',
        width: '25%',
        backgroundColor: 'white',
        borderRadius: 8,
        boxShadow: 24,
        padding: 20,
    };

    const handleLogin = async () => {
        localStorage.setItem('loginFrom', from);
        await login({email, password})
            .then(resp => {
                console.log(resp)
            });
    }

    const handleProviderLogin = async (provider) => {
        window.location.href = 'http://localhost:8000/api/auth/' + provider;
    }

    const handleGoogleLogin = async () => {
        onClose();
        dispatch(setPageLoading(true));
        await googleLogin();
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Stack direction='column' spacing={2} sx={{width: '100%', height: '100%'}}>
                    <Typography variant='h4'>Login</Typography>

                    <TextField sx={{width: '100%'}} label="Email" variant="standard"
                               onChange={(e) => setEmail(e.target.value)}/>

                    <FormControl sx={{width: '100%'}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>

                    <Button variant="contained" onClick={handleLogin}>Login</Button>
                    <Button variant="outlined" onClick={() => googleLogin()}
                            startIcon={<FcGoogle/>}>Google</Button>
                    <IconButton sx={{position: 'absolute', right: '1%', bottom: '90%'}} onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                </Stack>
            </Box>
        </Modal>
    )
}