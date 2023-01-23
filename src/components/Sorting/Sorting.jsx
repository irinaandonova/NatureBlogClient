import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Sorting =({ manageSorting }) => {
  const [selectValue, setSelectValue] = useState('visitors');
  const handleChange = (event) => {
    setSelectValue(event.target.value);
    manageSorting(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          value={selectValue}
          label="Sort By"
          onChange={handleChange}
        >
          <MenuItem value='visitors'>Visitors</MenuItem>
          <MenuItem value='alphabetical'>Alphabetical(A-Z)</MenuItem>
          <MenuItem value='alphabetical-rev'>Alphabetical(Z-A)</MenuItem>
          <MenuItem value='rating'>Ratings</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Sorting;