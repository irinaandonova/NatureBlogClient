import { useState } from "react";
import { Box, RadioGroup, FormLabel, FormControlLabel, Radio } from '@mui/material';

const EditSeaside = ({ addInfo, destinationData }) => {
    const [isGuarded, setisGuarded] = useState(destinationData.isGuarded);
    const [offersUmbrella, setoffersUmbrella] = useState(destinationData.offersUmbrella);
    return (
        <Box margin="normal">
            <FormLabel aria-labelledby="isGuarded">Is the seaside location guarded by a life guard?</FormLabel>
            {
                <RadioGroup
                    row
                    aria-labelledby="isGuarded"
                    name="isGuarded"
                    defaultValue={destinationData.isGuarded.toString()}
                    onChange={(e) => {
                        addInfo({ isGuarded: e.target.value, offersUmbrella });
                        setisGuarded(e.target.value);
                    }}
                >
                    <FormControlLabel value="true" control={<Radio />} label="Yes" defaultChecked={true} />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
            }
            <FormLabel aria-labelledby="offersUmbrella" >Are there umbrellas offred in the seaside location</FormLabel>
            <RadioGroup
                row
                aria-labelledby="offersUmbrella"
                name="offersUmbrella"
                defaultValue={destinationData.offersUmbrella}
                onChange={(e) => {
                    addInfo({ isGuarded, offersUmbrella: e.target.value });
                    setoffersUmbrella(e.target.value);
                }}
            >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
        </Box>
    );
}

export default EditSeaside;