import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import axiosLocalInstance from '../../config/axiosConfig';
import  AuthContext  from '../../auth/authContext';
import { TextField } from '@mui/material';
import { borderRadius, Box, margin } from '@mui/system';

const Comment = ({ comment, dispatch }) => {
    const { user } = useContext(AuthContext);
    console.log(comment);
    const onDeleteHandler = async () => {
        const response = await axiosLocalInstance.delete(`comments/${comment.id}`, { data: { userId: user.id, destinationId: comment.destinationId } })

        if (response.data === true)
            dispatch({ type: 'deleteComment', payload: { id: comment.id } });
    }
    return (
        <Box sx={{ minWidth: 275, backgroundColor: '#f0f5f0', padding: '15px', margin: '15px', borderRadius: '15px'}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Created at: {comment.date}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Username: {comment.username}
                </Typography>
                <Typography>
                    {comment.text}
                </Typography>
            {
                comment.creatorId === user.id
                    ?
                    <Button onClick={onDeleteHandler}>Delete</Button>
                    :
                    null
            }
        </Box>
    );
}


export default Comment;