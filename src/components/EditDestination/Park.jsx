import { Box, RadioGroup, FormLabel, FormControlLabel, Radio } from '@mui/material';
import { useState } from 'react';

const EditPark = ({ addInfo, destinationData }) => {
    const [hasPlayground, setHasPlayground] = useState(destinationData.hasPlayground);
    const [isDogFriendly, setIsDogFriendly] = useState(destinationData.isDogFriendly);

    return (
        <Box>
            <FormLabel aria-labelledby="hasPlayground">Does the park has playground?</FormLabel>
            <RadioGroup
                row
                aria-labelledby="hasPlayground"
                name="hasPlayground"
                defaultValue={destinationData.hasPlayground}
                onChange={(e) => {
                    addInfo({ hasPlayground: e.target.value, isDogFriendly });
                    setHasPlayground(e.target.value);
                    console.log(hasPlayground);
                }}
            >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
            <FormLabel aria-labelledby="isDogFriendly">Are dogs allowed in the park?</FormLabel>
            <RadioGroup
                row
                aria-labelledby="isDogFriendly"
                name="isDogFriendly"
                defaultValue={destinationData.isDogFriendly}
                onChange={(e) => {
                    addInfo({ hasPlayground, isDogFriendly: Boolean(e.target.value) });
                    setIsDogFriendly(Boolean(e.target.value));
                    console.log(isDogFriendly);
                }}
            >
                < FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
        </Box>
    );
}

export default EditPark;
