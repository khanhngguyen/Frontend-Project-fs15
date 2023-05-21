import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const GoogleLoginButton = () => {
    return (
        <GoogleOAuthProvider clientId=''>
            <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
            />
        </GoogleOAuthProvider>
    )
}

export default GoogleLoginButton;