import { Box } from "@mui/system";
import { useQuery } from "react-query"
import axiosLocalInstance from "../../config/axiosConfig";
import DestinationCard from "../DestinationCard/DestinationCard";
import { CircularProgress } from "@mui/material";
const HomePage = () => {
    const getTopThree = async () => {
        const response = await axiosLocalInstance.get('destinations/top-three');
        console.log(response);
        return response.data;
    }
    const { data, isLoading, isFetching, isError } = useQuery(['getTopThree'], getTopThree);

    return (
        <Box sx={{ marginLeft: '5%' }}>
            {(isLoading || isFetching) ? <CircularProgress />
                :
                <Box className="destinations-wrapper" sx={{ display: 'flex', }} >
                    {
                        data.length > 0
                            ?
                            data.map(x => <DestinationCard destinationInfo={x} key={x.id} />)
                            :
                            null
                    }
                </Box>
            }
            {isError ? <p>Something went wrong</p> : null}
        </Box>
    );
}

export default HomePage;