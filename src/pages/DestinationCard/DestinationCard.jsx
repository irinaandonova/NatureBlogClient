import axiosLocalInstance from "../../config/axiosConfig";
import { useQuery } from 'react-query';
import './destinationCard.css';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, CircularProgress } from "@mui/material";
import RatingComponent from "../../components/Rating/Rating";

const DestinationCard = ({ destinationInfo }) => {
    const navigate = useNavigate();

    const getRegion = async () => {
        const id = destinationInfo.regionId;
        const response = await axiosLocalInstance.get(`region/${id}`);

        return response.data;
    }

    const { data, isError, isFetching, isLoading } = useQuery(['getRegionQueryKey', destinationInfo], getRegion, { retry: false });

    return (
        <Card sx={{ width: 345 }} className="container" onClick={() => navigate(`/destination/${destinationInfo.id}`)}>
            {(isLoading || isFetching) ? <CircularProgress /> : null}
            {isError ? <p>Something went wrong</p> : null}
            <CardMedia
                sx={{ height: 140 }}
                image={destinationInfo.imageUrl}
                title={destinationInfo.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {destinationInfo.name}
                </Typography>
                <Typography gutterBottom variant="body2" component="div">
                    {destinationInfo.description}
                </Typography>
                <Typography gutterBottom variant="body2" component="div">
                    Region: {data?.name}
                </Typography>
                {<RatingComponent ratingScore={destinationInfo.ratingScore} />}
            </CardContent>
        </Card>
    );
}

export default DestinationCard;