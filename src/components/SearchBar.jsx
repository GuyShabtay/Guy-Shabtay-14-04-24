import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { getAutoComplete } from '../ApiCalls';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/Search';
import { toast } from 'sonner';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [autoCompletions, setAutoCompletions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (inputValue.length) handleAutoComplete();
  }, [inputValue]);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleAutoComplete = async () => {
    try {
      const maxFiveAutoCompletions = await getAutoComplete(inputValue);
      setAutoCompletions(maxFiveAutoCompletions);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error);
    }
  };

  const handleSelectionChange = (event, value) => {
    dispatch(setSearchQuery(value));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'end' }}>
      <SearchIcon sx={{ color: 'action.active', mr: '5px' }} />
      <Stack spacing={1} sx={{ width: 300 }}>
        <Autocomplete
          id='auto-highlight'
          autoHighlight
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onChange={handleSelectionChange}
          options={autoCompletions}
          renderInput={(params) => (
            <TextField {...params} label='Search' variant='standard' />
          )}
        />
      </Stack>
    </div>
  );
};
export default SearchBar;
