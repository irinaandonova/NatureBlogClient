import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress, Box } from "@mui/material";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import axiosLocalInstance from "../../config/axiosConfig";
import AuthContext from "../../auth/authContext";
import EditHikingTrail from "../../components/EditDestination/HikingTrail";
import EditSeaside from "../../components/EditDestination/Seaside";
import EditPark from "../../components/EditDestination/Park";

const EditDestination = () => {
    const initialState = { duration: undefined, difficulty: undefined, isGuarded: undefined, offersUmbrella: undefined, isDogFriendly: undefined, hasPlayground: undefined }
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [info, setInfo] = useState(initialState);
    const navigate = useNavigate();

    const toggleType = (type) => {

        if (type === 'hikingTrail')
            return <EditHikingTrail addInfo={addInfo} destinationData={destinationData} />
        else if (type === 'seaside')
            return <EditSeaside addInfo={addInfo} destinationData={destinationData} />
        else if (type === 'park')
            return <EditPark addInfo={addInfo} destinationData={destinationData} />
        else
            return null;
    }

    const addInfo = (info) => {
        setInfo(info)
    }

    const getRegions = async () => {
        const regions = await axiosLocalInstance.get('region');

        return regions.data;
    }

    const getDestinatinInfo = async () => {
        const response = await axiosLocalInstance.get(`destinations/info/${id}`);

        return response.data;
    }

    const editDestinationHandler = async (name,
        region,
        description,
        imageUrl,
    ) => {
        if (destinationData?.type === 'hikingTrail') {
            const response = await axiosLocalInstance.put('destinations/hiking-trail/edit', {
                id: destinationData.id,
                name,
                regionId: region,
                userId: user.id,
                description,
                imageUrl,
                duration: info.duration,
                difficulty: info.difficulty,
            });

            if (response.status === 200)
                navigate(`/destination/${id}`);
        }
        else if (destinationData?.type === 'park') {
            const body = {
                id: destinationData.id,
                name,
                regionId: region,
                userId: user.id,
                description,
                imageUrl,
                isDogFriendly: Boolean(info.isDogFriendly),
                hasPlayground: Boolean(info.hasPlayground)
            }
            console.log(body);
            const response = await axiosLocalInstance.put('destinations/park/edit', {
                body
            });

            if (response.status === 200)
                navigate('/');
        }
        else if (destinationData?.type === 'seaside') {
            const response = await axiosLocalInstance.put('destinations/seaside/edit', {
                id: destinationData.id,
                name,
                regionId: region,
                userId: user.id,
                description,
                imageUrl,
                offersUmbrella: Boolean(info.offersUmbrella),
                isGuarded: Boolean(info.isGuarded)
            });

            if (response.status === 200)
                navigate('/');
        }
    }

    const { data: regionData, isLoading: regionLoadining, isFetching: regionFetching, isError: regionError } = useQuery(['getRegionsEditData'], getRegions);
    const { data: destinationData, isLoading: destinationLoading, isFetching: destinationFetching, isError: destinationError } = useQuery(['getDestinationEditInfo'], getDestinatinInfo);

    return (
        <Box sx={{ marginLeft: "90px" }}>
            {destinationError || regionError ? <p>Something went wrong</p> : null}
            {(regionLoadining || destinationLoading || destinationFetching || regionFetching)
                ?
                <CircularProgress />
                :
                <form onSubmit={(e) => {
                    e.preventDefault();

                    const name = e.target.name.value;
                    const region = e.target.region.value;
                    const description = e.target.description.value;
                    const imageUrl = e.target.imageUrl.value;

                    editDestinationHandler(name, region, description, imageUrl);
                }}>
                    <Grid container direction="column" className="container">
                        <Grid item>
                            <TextField label="Destination Name" name="name" margin="normal" type="text" inputProps={{ minLength: 2, maxLength: 100 }} defaultValue={destinationData?.name} />
                        </Grid>
                        <Grid item>
                            <FormControl margin="normal">
                                <InputLabel htmlFor="region" >Region: </InputLabel>
                                <Select
                                    name="region"
                                    autoWidth
                                    label="region"
                                    className="region-select"
                                    margin="dense"
                                    value={destinationData?.regionId}
                                >
                                    {
                                        regionData
                                            ?
                                            regionData.map(r => <MenuItem value={r.id} key={r.id}>{r.name}</MenuItem>)
                                            :
                                            null
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <TextField type="text" sx={{ width: 222 }} multiline={true} rows={10} label="Description" name="description" margin="normal" inputProps={{ minLength: 2, maxLength: 960, }} defaultValue={destinationData?.description} />
                        </Grid>
                        <Grid item>
                            <FormControl>
                                <TextField type="text" label="Image path" name="imageUrl" margin="normal" inputProps={{ minLength: 2, maxLength: 960 }} defaultValue={destinationData?.imageUrl} />
                            </FormControl>
                        </Grid>
                        {toggleType(destinationData?.type)}
                        <Button type="submit" variant="contained" sx={{backgroundColor: '#e4ada2', marginLeft: '5px', color: 'black', width: '150px', margin: '10px'}}>Edit</Button>
                    </Grid>
                </form>
            }
        </Box >
    );
}

export default EditDestination;