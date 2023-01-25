import { useMsal } from "@azure/msal-react"
import { Button } from "@mui/material"

const LogoutButton = () => {
    const { instance } = useMsal();

    const logoutHandler = () => {
        instance.logoutRedirect();
    }
    return (
        <Button onClick={logoutHandler} sx={{
            textDecoration: 'none',
            color: 'black',
            padding: '10px 30px',
            backgroundColor: 'rgb(127 204 147)',
            borderRadius: '20px',
            marginLeft: '1000px',
        }}>Logout</Button>
    );
}

export default LogoutButton;