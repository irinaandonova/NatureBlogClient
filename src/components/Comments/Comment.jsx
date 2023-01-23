import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import axiosLocalInstance from '../../config/axiosConfig';
import  AuthContext  from '../../auth/authContext';
import {  ActionType } from '../../reducers/CommentsReducer';
import { TextField } from '@mui/material';

const Comment = ({ comment, dispatch }) => {
    const { user } = useContext(AuthContext);

    const onDeleteHandler = async () => {
        const response = await axiosLocalInstance.delete(`comments/${comment.id}`, { data: { userId: user.id, destinationId: comment.destinationId } })

        if (response.data === true)
            dispatch({ type: 'deleteComment', payload: { id: comment.id } });
    }
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Created at: {comment.date}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Username: {comment.username}
                </Typography>
                <TextField value={comment.text}/>
            </CardContent>
            {
                comment.creatorId === user.id
                    ?
                    <Button onClick={onDeleteHandler}>Delete</Button>
                    :
                    null
            }
        </Card>
    );
}


export default Comment;