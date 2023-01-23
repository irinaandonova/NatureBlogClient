import { useMsal } from "@azure/msal-react";
import { Button, FormControl } from "@mui/material";
import './login.css';
const Login = () => {
    const { instance } = useMsal();

    const onLoginHandler = () => {
        instance.loginRedirect({
            scopes: ['user.read']
        });
    }
    
    return (
        <Button className="links" onClick={onLoginHandler}>Sign in</Button>
    )
}

export default Login;