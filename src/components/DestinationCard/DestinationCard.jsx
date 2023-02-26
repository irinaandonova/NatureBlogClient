import { useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';
import { Card, CardContent, CardMedia, Typography, CircularProgress } from "@mui/material";
import axiosLocalInstance from "../../config/axiosConfig";
import RatingComponent from "../Rating/Rating";
import './destinationCard.css';

const DestinationCard = ({ destinationInfo }) => {
    const navigate = useNavigate();

    const getRegion = async () => {
        const id = destinationInfo.regionId;
        const response = await axiosLocalInstance.get(`region/${id}`);

        return response.data;
    }

    const { data, isError, isFetching, isLoading } = useQuery(['getRegionQueryKey', destinationInfo], getRegion, { retry: false });

    return (
        <Card sx={{ width: 345 }} className="destination-container" onClick={() => navigate(`/destination/${destinationInfo.id}`)}>
            {isError ? <p>Something went wrong</p> : null}
            {(isLoading || isFetching)
                ?
                <CircularProgress />
                :
                <>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={destinationInfo.imageUrl}
                        title={destinationInfo.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" className="smaller-name">
                            {destinationInfo.name}
                        </Typography>
                        <Typography gutterBottom variant="body2" component="div" className="font">
                            {destinationInfo.description}
                        </Typography>
                        <Typography gutterBottom variant="body2" component="div" className="smaller-name" id="reagion">
                            Region: {data?.name}
                        </Typography>
                        {<RatingComponent ratingScore={destinationInfo.ratingScore} />}
                    </CardContent>
                </>
            }
        </Card>
    );
}

export default DestinationCard;