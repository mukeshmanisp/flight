import React, { Fragment, useState } from 'react';
import { Button, Paper, Stack, styled, Radio, RadioGroup, FormControlLabel, FormControl, TextField, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchFlights } from '../component/action/flight-actions';

// Styled components for custom styling
const CustomPaper = styled(Paper)({
  padding: '10px',
  margin: '10px',
  // Add other custom styles as needed
});

const SearchButton = styled(Button)({
  backgroundColor: 'success.main',
  '&:hover': {
    backgroundColor: 'success.dark',
  },
});

const LandingView = () => {
  const [formData, setFormData] = useState({
    origin: '',
    dest: '',
    date: new Date(),
    returnDate: new Date(),
    numTravellers: '',
  });

  const { searchResults } = useSelector(state => state.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const info = {};
    info.origin = formData.origin;
    info.dest = formData.dest;
    info.date = formData.date;

    dispatch(searchFlights(info)).then(resp => {
      console.log('request complete');
    });
  };

  const handleBooking = flightInfo => {
    navigate(`/book-flight/${flightInfo.flid}`);
  };

  const handleDataDisplay = () => {
    if (!searchResults) {
      return null;
    }

    return (
      searchResults?.responseData.map((flight, index) => (
        <Fragment key={index}>
          <CustomPaper elevation={3}>
            <div>
              <div>Time: {flight.departureTime}</div>
              <div>Cost : {flight.cost} </div>
              <div>Aircraft : {flight.aircraft}</div>
            </div>
            <div>
              <SearchButton onClick={() => handleBooking(flight)} variant="outlined">
                Book
              </SearchButton>
            </div>
            <br />
          </CustomPaper>
          <br />
        </Fragment>
      ))
    );
  };

  return (
    <div>
      <Stack direction="column" justifyContent="center">
        <Container maxWidth="sm">
          <form>
            <Paper elevation={6}>
              <h3>Enter Search Criteria to find flights</h3>
              <div className="inner-search-form">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="oneWay"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="oneWay" control={<Radio />} label="One Way" />
                    <FormControlLabel value="roundTrip" control={<Radio />} label="Round Trip" />
                  </RadioGroup>
                </FormControl>
                <div>
                  <TextField
                    label="From"
                    variant="outlined"
                    name="origin"
                    onChange={handleInputChange}
                  />
                  &nbsp;
                  <TextField
                    label="To"
                    variant="outlined"
                    name="dest"
                    onChange={handleInputChange}
                  />
                </div>
                <br />
                <div>
                  <Stack direction="row">
                    <TextField
                      label="Date"
                      variant="outlined"
                      type="date"
                      value={formData.date}
                      name="date"
                      onChange={handleInputChange}
                    />
                    &nbsp;
                    <TextField
                      label="Return date"
                      variant="outlined"
                      type="date"
                      value={formData.returnDate}
                      onChange={handleInputChange}
                      name="returnDate"
                    />
                    &nbsp;
                    <TextField
                      label="# Travellers"
                      variant="outlined"
                      onChange={handleInputChange}
                      name="numTravellers"
                    />
                  </Stack>
                </div>
                <br />
                <div>
                  <SearchButton onClick={handleSearch} size="large" variant="contained">
                    Search
                  </SearchButton>
                </div>
              </div>
            </Paper>
          </form>
        </Container>
        <div>
          <br /> <br /> <br />
          <Stack direction="column" justifyContent="center" spacing={3}>
            <Container maxWidth="xl">{handleDataDisplay()}</Container>
          </Stack>
          <Stack direction="column" justifyContent="center">
            <Container maxWidth="xl">
              <Paper elevation={6}>
                <h3>Recommendations</h3>
                <div style={{ padding: '10px' }}>
                  <Stack direction="row" justifyContent="center" spacing={3}>
                    <Box sx={{ width: 200, height: 200, border: 'solid 2px orange' }} />
                    <Box sx={{ width: 200, height: 200, border: 'solid 2px orange' }} />
                    <Box sx={{ width: 200, height: 200, border: 'solid 2px orange' }} />
                    <Box sx={{ width: 200, height: 200, border: 'solid 2px orange' }} />
                  </Stack>
                  <br />
                </div>
              </Paper>
            </Container>
          </Stack>
        </div>
      </Stack>
    </div>
  );
};

export default LandingView;
