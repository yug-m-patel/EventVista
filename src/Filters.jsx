// Filters.jsx
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

const Filters = ({ filterCategory, filterDepartment, toggleOnline, togglePaid }) => {
  const [online, setOnline] = React.useState(false);
  const [paid, setPaid] = React.useState(false);

  const handleOnlineChange = (event, newOnline) => {
    if (newOnline !== null) {
      setOnline(newOnline);
      toggleOnline(newOnline);
    }
  };

  const handlePaidChange = (event, newPaid) => {
    if (newPaid !== null) {
      setPaid(newPaid);
      togglePaid(newPaid);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <FormControl fullWidth style={{ marginBottom: 20 }}>
        <InputLabel>Category</InputLabel>
        <Select label='Category' onChange={(e) => filterCategory(e.target.value)} defaultValue="all">
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="workshops">Workshops</MenuItem>
          <MenuItem value="seminars">Seminars</MenuItem>
          <MenuItem value="sports">Sports</MenuItem>
          <MenuItem value="hackathons">Hackathons</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ marginBottom: 20 }}>
        <InputLabel>Department</InputLabel>
        <Select label='Department' onChange={(e) => filterDepartment(e.target.value)} defaultValue="all">
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="cse">CSE</MenuItem>
          <MenuItem value="medical">Medical</MenuItem>
          <MenuItem value="mechanical">Mechanical</MenuItem>
          <MenuItem value="electrical">Electrical</MenuItem>
          <MenuItem value="robotics">Robotics</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="subtitle1" gutterBottom>
        Event Type
      </Typography>
      <ToggleButtonGroup
        value={online}
        exclusive
        onChange={handleOnlineChange}
        aria-label="online filter"
        fullWidth
        style={{ marginBottom: 20 }}
      >
        <ToggleButton value={true} aria-label="online">
          Online
        </ToggleButton>
        <ToggleButton value={false} aria-label="offline">
          Offline
        </ToggleButton>
      </ToggleButtonGroup>
      <Typography variant="subtitle1" gutterBottom>
        Event Price
      </Typography>
      <ToggleButtonGroup
        value={paid}
        exclusive
        onChange={handlePaidChange}
        aria-label="paid filter"
        fullWidth
      >
        <ToggleButton value={true} aria-label="paid">
          Paid
        </ToggleButton>
        <ToggleButton value={false} aria-label="free">
          Free
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default Filters;
