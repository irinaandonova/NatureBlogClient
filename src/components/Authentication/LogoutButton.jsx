import { useMsal } from "@azure/msal-react"
import { Button } from "@mui/material"

const LogoutButton = () => {
    const { instance } = useMsal();
    
    const logoutHandler = () => {
        instance.logoutRedirect();
    }
    return (
        <Button onClick={logoutHandler}>Logout</Button>
    );
}

export default LogoutButton;