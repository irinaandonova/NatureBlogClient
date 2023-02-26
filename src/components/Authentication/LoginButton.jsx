import { useMsal } from "@azure/msal-react";
import { Button, FormControl } from "@mui/material";
import './login.css';
const LoginButton = () => {
    const { instance } = useMsal();

    const onLoginHandler = () => {
        instance.loginRedirect({
            scopes: ['user.read'],
            redirectUri: 'http://localhost:3000/auth/register'
        });
    }

    return (
        <Button className="links" onClick={onLoginHandler} sx={{
            textDecoration: 'none',
            color: 'black',
            padding: '10px 30px',
            backgroundColor: '#e4ada2',
            borderRadius: '20px',
            marginTop: '5px',
            marginLeft: '1050px',
        }}>Sign in</Button>
    )
}

export default LoginButton;