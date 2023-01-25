import { useState } from 'react';
import { Select, TextField, Grid, Box, MenuItem, Typography, InputLabel } from '@mui/material';
const HikingTrail = (prop) => {
    const [duration, setDuration] = useState(0);
    const [difficulty, setDifficulty] = useState(1);

    return (
        <Box className="category-info" >
            <Grid item>
                <TextField type="text" sx={{ width: 222 }} multiline={true} label="Hiking Duration" name="description" margin="normal" inputProps={{ minLength: 2, maxLength: 960, }} onChange={(e) => {

                    prop.addInfo({ duration: Number(e.currentTarget.value), difficulty });
                    setDuration(Number(e.currentTarget.value))
                }}/>
            </Grid>
            <InputLabel htmlFor="hiking-difficulty">Hiking Difficulty: </InputLabel>
            <Select
                name="hiking-difficulty"
                sx={{width: '220px'}}
                margin="dense"
                onChange={(e) => {
                    prop.addInfo({ duration, difficulty: Number(e.currentTarget.value) });
                    setDifficulty(Number(e.currentTarget.value))
                }} >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
            </Select>
        </Box >
    );
}

export default HikingTrail;