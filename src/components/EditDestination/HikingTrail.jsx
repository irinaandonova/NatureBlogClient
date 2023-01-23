import { useState } from 'react';
import { Box } from '@mui/system';
import { RadioGroup, TextField, FormControlLabel, Radio } from '@mui/material';

const EditHikingTrail = ({ addInfo, destinationData }) => {
    const [duration, setDuration] = useState(destinationData.hikingDuration);
    const [difficulty, setDifficulty] = useState(destinationData.difficulty);

    return (
        <Box>
            <TextField label="Hiking Duration" type="text" value={duration} onChange={(e) => {
                addInfo({ duration: Number(e.currentTarget.value), difficulty });
                setDuration(Number(e.currentTarget.value))
            }} />
            <RadioGroup aria-labelledby="Hiking difficulty" value={difficulty} onChange={(e) => {
                addInfo({ duration, difficulty: Number(e.currentTarget.value) })
                setDifficulty(Number(e.currentTarget.value))
                 
            }}>
                
                                <FormControlLabel value="1" control={<Radio />} label="1"  />
                                <FormControlLabel value="2" control={<Radio />} label="2" />
                                <FormControlLabel value="3" control={<Radio />} label="3" />
            </RadioGroup>
        </Box>
    );
}

export default EditHikingTrail;