import { Box, Button, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { Dispatch, useContext, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../auth/authContext";
import axiosLocalInstance from "../../config/axiosConfig";
import './comments.css';

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
        <Container sx={{ display: 'block', marginLeft: '500px' }}>
            <form onSubmit={onSubmitHandler} className="add-comment-form">
                <TextField multiline rows={3} label="Add Comment" name="text" sx={{ display: 'block', width: '500px' }} />
                <Button type="submit" sx={{
                    color: 'black',
                    padding: '5px 15px',
                    backgroundColor: 'rgb(127 204 147)',
                    borderRadius: '20px',
                    marginLeft: '35px',
                    marginTop: '10px'
                }}>Add comment</Button>
            </form>
        </Container>
    )
}

export default AddComment;