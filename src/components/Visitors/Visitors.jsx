import { Button, Box, Typography, Alert } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import  AuthContext  from "../../auth/authContext";
import axiosLocalInstance from "../../config/axiosConfig";

const Visitors = ({ visitors, destinationId, creatorId }) => {
    const [visitorsState, setVisitorsState] = useState(visitors);
    const [alert, setAlert] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const onVisitHandler = async () => {
        if (!user.id)
            navigate('/login');
        else if (user.id === creatorId)
            setAlert(true);
        else {
            const response = await axiosLocalInstance.post(`destinations/${destinationId}/visit`, {
                userId: creatorId
            });

            if (response.status === 200)
                setVisitorsState(response.data);
        }
    }
    return (
        <Box>
            {
                visitorsState?.length === 1
                    ?
                    <Typography>{visitorsState[0].username} has visited this destination</Typography>
                    :
                    <Typography>{visitorsState?.length} users have visited this destination</Typography>
            }
            {
                alert
                    ?
                    <Alert severity="error">
                        Creator cannot change visit status
                    </Alert>
                    :
                    null
            }
            <Button variant="contained" disableElevation onClick={onVisitHandler}>
                Visit destination
            </Button>
        </Box>
    )
}

export default Visitors;