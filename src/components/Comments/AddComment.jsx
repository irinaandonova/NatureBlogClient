import { Button, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { Dispatch, useContext, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext  from "../../auth/authContext";
import axiosLocalInstance from "../../config/axiosConfig";

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

        const comment= {
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
        <Container>
            <form onSubmit={onSubmitHandler}>
                <TextField multiline rows={4} label="Add Comment" name="text" />
                <Button type="submit">Add comment</Button>
            </form>
        </Container>
    )
}

export default AddComment;