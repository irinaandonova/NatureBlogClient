import { useMsal } from "@azure/msal-react";
import { Button, MenuItem, Select, Typography } from "@mui/material";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react"
import AuthContext from "../../auth/authContext";
import axiosLocalInstance from "../../config/axiosConfig";
import { Grid, TextField, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const RegisterForm = () => {
    const [hasProfile, setHasProfile] = useState(true);
    const { login } = useContext(AuthContext);
    const { instance } = useMsal();

    useEffect(() => {
        const currentAccount = instance.getActiveAccount();
        if (currentAccount) {
            axiosLocalInstance.get(`users/${currentAccount.username}`)
                .then(res => {
                    if (res.status === 204)
                        setHasProfile(false);
                    else
                        login(res.data);
                })
                .catch(err => console.log(err))
        }
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = instance.getActiveAccount().username;
        const username = formData.get('username');
        const hikingLevel = formData.get('hikingLevel');
        const response = await axiosLocalInstance.post('users', {
            email,
            username,
            hikingSkill: Number(hikingLevel)
        });
        if (response.data)
            login(response.data);
    }

    return (
        <Box >
            {
                !hasProfile
                    ?
                    <form onSubmit={onSubmit} className="register-form"> 
                        <Typography sx={{marginLeft: '50px'}}>Opp... It seems like you don't have a profile in this app.</Typography>
                        <Grid container direction="column" className="container" sx={{ marginTop: '1%', marginLeft: '5%' }}>
                            <Grid item sx={{width: '400px'}}>
                                <TextField label="username" name="username" margin="normal" type="text" inputProps={{ minLength: 6, maxLength: 100,  }} />
                            </Grid>
                            <Select
                                name="hikingLevel"
                                sx={{ width: '230px' }}
                            >
                                <MenuItem value="1" key='1'>1</MenuItem>
                                <MenuItem value="2" key='2'>2</MenuItem>
                                <MenuItem value="3" key='3'>3</MenuItem>
                            </Select>
                            <Button type="submit" className="links" sx={{width: '30px', padding: '10px 25px', color: 'black', backgroundColor: 'rgb(127 204 147)', marginTop: '10px', borderRadius: "10px", marginLeft: '70px'}}>Submit</Button>
                        </Grid>
                    </form>
                    :
                    <CircularProgress />
            }
        </Box>
    );
}

export default RegisterForm;