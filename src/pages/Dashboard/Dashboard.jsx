import { useEffect, useState } from "react";
import DestinationCard from "../DestinationCard/DestinationCard";
import { useQuery } from "react-query";
import axiosLocalInstance from "../../config/axiosConfig";
import { Box, CircularProgress, Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import './dashboard.css';
import Sorting from "../../components/Sorting/Sorting";
import { Container } from "@mui/system";

const Dashboard = () => {
    const { destinationType } = useParams();
    const [sorting, setSorting] = useState('visitors');
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    useEffect(() => {
        getPageCount()
    }, []);

    const getDestinations = async () => {

        if (destinationType) {
            const response = await axiosLocalInstance.get(`destinations/${destinationType}/${sorting}/${page}`);

            return response.data;
        }
        else {

            const response = await axiosLocalInstance.get(`destinations/all/${sorting}/${page}`);

            return response.data;
        }

    }
    const getPageCount = async () => {
        const response = await axiosLocalInstance.get(`destinations/count/${destinationType}`);

        setPageCount(response.data);
    }

    const manageSorting = (sortingCriteria) => {
        setSorting(sortingCriteria);
    }

    const { data, isError, isLoading, isFetching } = useQuery(['allDestinationsArray', destinationType, page, sorting], getDestinations, { retry: false })

    return (
        <Box className="box">
            {(isLoading || isFetching) ? <CircularProgress /> : null}
            {isError ? <p>Something went wrong</p> : null}
            <Sorting manageSorting={manageSorting} />
            <Box className="destinations-wrapper" sx={{ display: 'flex', width: '90%', }} >
                {
                    data && data?.length > 0
                        ?
                        data.map(d => <DestinationCard destinationInfo={d} key={d.id} />)
                        :
                        null
                }
            </Box>
            <Pagination count={pageCount} onChange={(event, page) => setPage(page)} className="pagination" />
        </Box>
    );
}

export default Dashboard;