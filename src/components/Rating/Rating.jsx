import { Stack } from "@mui/system";
import { Rating, Typography } from "@mui/material";
import { useContext, useState } from "react";
import  AuthContext  from "../../auth/authContext";
import axiosLocalInstance from "../../config/axiosConfig";
import { useParams } from "react-router-dom";

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