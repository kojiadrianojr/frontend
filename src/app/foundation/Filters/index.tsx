import React, { useState, ChangeEvent } from "react";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  Grid,
  IconButton,
  SelectChangeEvent,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import { Clear, Search } from "@mui/icons-material";

interface Props {
  onSearch: (searchTerm: string) => void;
  onFilter: (filterValue: string) => void;
  onSort: (sortValue: string) => void;
}

const SearchFilterSort: React.FC<Props> = ({ onSearch, onFilter, onSort }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [sortValue, setSortValue] = useState<string>("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setFilterValue(value);
    setSortValue("");
    // Pass the filter value to the parent component
    onFilter(value);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setSortValue(value);
    // Pass the sort value to the parent component
    onSort(value);
  };

  const handleSearch = () => {
    // Pass the search term to the parent component
    onSearch(searchTerm);
  };

  return (
    <Grid container spacing={4} alignItems="center">
      <Grid item xs={12} sm={4} display="flex">
        <TextField
          label="Search (author, title, description)"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
        />
        <IconButton color="primary" onClick={handleSearch}>
          <Search />
        </IconButton>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Filter...</InputLabel>
          <Select
            value={filterValue}
            onChange={handleFilterChange}
            label="Filter..."
            inputProps={{ "aria-label": "Filter" }}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="mine">My Posts</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Sort...</InputLabel>
          <Select
            value={sortValue}
            label="Sort..."
            onChange={handleSortChange}
            inputProps={{ "aria-label": "Sort" }}
          >
            {/* <MenuItem value="">Default</MenuItem> */}
            <MenuItem value="recent">Most recent</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="content">Content</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default SearchFilterSort;
