import * as React from 'react';
import { useIsAuthenticated } from '@azure/msal-react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Login from '../Authentication/LoginButton';
import LogoutButton from '../Authentication/LogoutButton';

export default function ButtonAppBar() {
    const isAuthenticated = useIsAuthenticated();

    return (
        <AppBar component="nav" sx={{
            backgroundColor: 'rgb(207 220 208)',
            color: '#000',
        }}>
            <Toolbar>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexGrow: 1,
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            // onClick={props.handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}