import { Container } from "@mui/system";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axiosLocalInstance from "../../config/axiosConfig";
import {  ActionType } from "../../reducers/CommentsReducer";
import Comment from "./Comment";

const CommentContainer = ({ state, dispatch }) => {
    const { id } = useParams();

    const getComments = async () => {
        const response = await axiosLocalInstance.get(`comments/${id}`);
        return response.data;
    }

    useQuery(['getCommentsKey', state.query.destinationId], getComments, {
        retry: false,
        onSuccess: (data) => {
            if (data) {
                const transformedData = data.map(
                    (comment) =>
                    ({
                        id: comment.id,
                        destinationId: comment.destinationId,
                        text: comment.text,
                        creatorId: comment.creatorId,
                        date: comment.date
                    })
                )
                dispatch({ type: ActionType.getComments, payload: { destinationId: state.query.destinationId, comments: transformedData } });
            }
            else
                dispatch({ type: ActionType.clearComments })
        },
    })

    return (
        <Container>
            {state.data.map(x => <Comment comment={x} dispatch={dispatch} key={x.id} />)}
        </Container>
    )
}

export default CommentContainer;