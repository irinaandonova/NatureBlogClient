import { useState } from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

const Sorting = ({ manageSorting }) => {
  const [selectValue, setSelectValue] = useState('visitors');
  const handleChange = (event) => {
    setSelectValue(event.target.value);
    manageSorting(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginLeft: '10px' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          value={selectValue}
          label="Sort By"
          onChange={handleChange}
          sx={{ width: '385px' }}
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