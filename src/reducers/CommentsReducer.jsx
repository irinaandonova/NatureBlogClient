import lodash from "lodash";
import { useReducer, createContext } from "react";

const initialState = {
    query: {
        destinationId: 0
    },
    data: [],
}

export const ActionType = {
    addComment: 'addComment',
    updateComments: 'updateComments',
    deleteComment: 'deleteComment',
    getComments: 'getComments',
    clearComments: 'clearComments'
}

const commentsReducer = (currentState, action) => {
    switch (action.type) {
        case ActionType.addComment: {
            const newState = lodash.cloneDeep(currentState);

            newState.data.push(action.payload.comment);
            return newState;
        }
        case ActionType.updateComments: {
            const newState = lodash.cloneDeep(currentState);
            const newQuery = newState.query;
            const newQueryMerged = { ...newQuery, ...action.payload.newQuery };

            newState.query = { ...newQueryMerged };

            return newState
        }
        case ActionType.deleteComment: {
            const newState = lodash.cloneDeep(currentState);
            const index = newState.data.findIndex(x => x.id === action.payload.id);
            newState.data.splice(index, 1);

            return newState;
        }
        case ActionType.getComments: {
            const newState = {
                query: { destinationId: action.payload.destinationId },
                data: [...action.payload.comments]
            }

            return newState;
        }
        case ActionType.clearComments: {
            return initialState;
        }
        default: {
            return currentState;
        }
    }
}

const CommentsContext = createContext();

export const CommentsStore = ({ children }) => {
    const [state, dispatch] = useReducer(commentsReducer, initialState);

    return <CommentsContext.Provider value={{ state, dispatch }}>{children}</CommentsContext.Provider>
}
export default CommentsContext;