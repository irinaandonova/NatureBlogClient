import { useContext } from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, CircularProgress } from "@mui/material";
import  AuthContext  from "../../auth/authContext";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import axiosLocalInstance from "../../config/axiosConfig";
import './details.css';
import AddComment from "../../components/Comments/AddComment";
import RatingComponent from "../../components/Rating/Rating";
import Visitors from "../../components/Visitors/Visitors";
import CommentsContainer from "../../components/Comments/CommentsContainer";
import CommentsContext from "../../reducers/CommentsReducer";

const Details = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { state, dispatch } = useContext(CommentsContext);

    const getDestinationInfo = async () => {
        const response = await axiosLocalInstance.get(`destinations/info/${id}`);

        return response.data;
    }

    const onDeleteHandler = async () => {
        const response = await axiosLocalInstance.delete(`destinations/${id}`, { data: { userId: user.id } });

        if (response.status === 200)
            navigate('/');
    }

    const { data, isError, isFetching, isLoading } = useQuery(['getDestinationFullInfoKey'], getDestinationInfo);

    return (
        <Card sx={{ maxWidth: 345 }} className="container">
            {isError ? <p>Something went wrong</p> : null}
            {(isLoading || isFetching) ? <CircularProgress />
                :
                <>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={data?.imageUrl}
                        title={data?.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {data?.name}
                        </Typography>
                        <Typography gutterBottom variant="body2" component="div">
                            {data?.description}
                        </Typography>
                        {
                            data !== undefined && data.type === 'hikingTrail'
                                ?
                                <article>
                                    <Typography gutterBottom variant="body2" component="div">
                                        Hiking duration: {data?.hikingDuration}min
                                    </Typography>
                                    <Typography gutterBottom variant="body2" component="div">
                                        Hiking difficulty: {data?.difficulty}
                                    </Typography>
                                </article>
                                :
                                null
                        }
                        {
                            data !== undefined && data.type === 'seaside'
                                ?
                                <article>
                                    <Typography gutterBottom variant="body2" component="div">
                                        Guarded by life guard: {data.isGuarded === true ? 'Yes' : 'No'}
                                    </Typography>
                                    <Typography gutterBottom variant="body2" component="div">
                                        Offers umbrella: {data?.offersUmbrella == true ? 'Yes' : 'No'}
                                    </Typography>
                                </article>
                                :
                                null
                        }
                        {
                            data !== undefined && data.type === 'park'
                                ?
                                <article>
                                    <Typography gutterBottom variant="body2" component="div">
                                        Has playground: {data.isDogFriendly === true ? 'Yes' : 'No'}
                                    </Typography>
                                    <Typography gutterBottom variant="body2" component="div">
                                        Are dogs allowed: {data?.isDogFriendly == true ? 'Yes' : 'No'}
                                    </Typography>
                                </article>
                                :
                                null
                        }
                        {
                            user.id == data?.creatorId
                                ?
                                <CardActions>
                                    <Button size="small" onClick={onDeleteHandler}>Delete</Button>
                                    <Button size="small" onClick={() => navigate(`/destination/${id}/edit`)}>Edit</Button>
                                </CardActions>
                                :
                                null
                        }
                        <RatingComponent ratingScore={data?.ratingScore} />
                        <AddComment state={state} dispatch={dispatch} />
                        <CommentsContainer state={state} dispatch={dispatch} />
                        <Visitors destinationId={data?.id} creatorId={data?.creatorId} visitors={data?.visitors} />
                    </CardContent>
                </>
            }
        </Card>

    );
}

export default Details;