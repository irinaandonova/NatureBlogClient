import { Box, Button, TextField, Typography } from "@mui/material";
import { Dispatch, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../auth/authContext";
import axiosLocalInstance from "../../config/axiosConfig";
import './comments.css';
import '../../pages/Details/details.css';
const AddComment = ({ state, dispatch }) => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const text = formData.get('text');

        const response = await axiosLocalInstance.post('comments', {
            destinationId: id,
            creatorId: Number(user.id),
            text
        });

        const comment = {
            id: response.data.id,
            destinationId: Number(id),
            creatorId: user.id,
            username: response.data.username,
            text,
            date: new Date().toDateString()
        }
        if (response.status === 200) {
            dispatch({ type: 'addComment', payload: { comment } })
            e.target.text.value = '';
        }
    }
    return (
        <Box sx={{ display: 'block', marginLeft: '41px'}}>
            <Typography sx={{marginTop: '10px',  }} className="font">
                Have you been there? Tells us about your experience!
            </Typography>
            <form onSubmit={onSubmitHandler} className="add-comment-form">
                <TextField multiline rows={2} label="Add Comment" name="text" sx={{ display: 'block', width: '700px' }} />
                <Button type="submit" sx={{
                    color: 'black',
                    padding: '5px 15px',
                    backgroundColor: '#e4ada2',
                    borderRadius: '20px',
                    marginLeft: '30px',
                    marginTop: '10px'
                }}>Add comment</Button>
            </form>
        </Box>
    )
}

export default AddComment;