import React from 'react';
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Box } from '@mui/material';

const GoogleLoginButton = () => {
    const successLogin = (credentialResponse: CredentialResponse) => {
        console.log(credentialResponse);
    }
    const errorLogin = () => {
        console.log('Login Failed');
    }
    return (
        <GoogleOAuthProvider clientId='879459311824-n2hde02n0dbb305a12m5fpthubll33ht.apps.googleusercontent.com'>
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
            >
                <GoogleLogin
                    size='large'
                    logo_alignment='center'
                    onSuccess={successLogin}
                    onError={errorLogin}
                    useOneTap
                />

            </Box>
        </GoogleOAuthProvider>
    )
}

export default GoogleLoginButton;