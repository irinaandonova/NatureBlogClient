import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating, Typography, Stack } from "@mui/material";
import  AuthContext  from "../../auth/authContext";
import axiosLocalInstance from "../../config/axiosConfig";

const RatingComponent = ({ ratingScore }) => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [rating, setRating] = useState(ratingScore);

    const onVoteHandler = async (vote) => {
        const response = await axiosLocalInstance.post(`destinations/${id}/rate`, {
            userId: user.id,
            ratingValue: vote
        });
        if (response.status === 200)
            setRating(response.data);
    }
    return (
        <Stack spacing={1}>
            {
                user.id
                    ?
                    <Rating name="half-rating" value={rating} precision={0.5} onChange={(event, value) => onVoteHandler(value)} />
                    :
                    <Rating name="half-rating-read" value={rating} precision={0.5} readOnly />
            }
            <Typography></Typography>
        </Stack>
    )
}

export default RatingComponent;