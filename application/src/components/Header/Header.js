import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { Box, Typography, Stack, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';

import { setFilter, setSortOrder } from '../../redux/store';

import './Header.css'

const filterBtns = {
  backgroundColor: "transparent",
  color: "white",
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: "300",
  padding: "0",
  paddingBottom: "0.3rem",
  borderRadius: 0, 
  boxShadow: "none",
};

const dateBtn = {
  textTransform: "none",
  fontSize: "1rem", 
  fontWeight: "300",
  color: "white",
};


const Header = () => {

  const iconStatuses = ["All Applications", "Applied", "Interviewing", "Offer Received"];
  const activeFilter = useSelector((state) => state.jobs.activeFilter);
  const sortOrder = useSelector((state) => state.jobs.sortOrder);
  const dispatch = useDispatch();
  const statuses = useSelector((state) => [
    "All Applications",
    ...new Set(state.jobs.jobs.map((job) => job.status)),
  ]);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const handleSortToggle = () => {
    const newOrder = sortOrder === "newest" ? "oldest" : "newest";
    dispatch(setSortOrder(newOrder));
  };

  const handleFilterCycle = () => {
    const currentIndex = statuses.indexOf(activeFilter);
    const nextIndex = (currentIndex + 1) % iconStatuses.length; 
    dispatch(setFilter(statuses[nextIndex]));
  };


  return (
    <>
        <Box className="header">
            <Stack direction="column" spacing={5} >
                
                <Typography className = "headerText" sx = {{fontSize: "2.5rem"}}>
                    Applications
                </Typography>
                {
                   windowSize.width >= 300 && windowSize.width <= 450 ? 
                   (
                    <Stack direction="row" spacing={2.5} justifyContent="end">
                      <Button
                        sx={filterBtns}
                        variant="contained"
                        startIcon={<FilterListIcon />}
                        onClick={handleFilterCycle} 
                      />
                      <Button
                        sx={filterBtns}
                        variant="contained"
                        startIcon={<SortIcon />}
                        onClick={handleSortToggle}
                      />
                  </Stack>
                   )
                   :
                   (
                    <Stack direction= "row" justifyContent="space-between">
                      <Stack direction="row" spacing={3}>
                        {statuses.map((status, index) => (
                          <Button
                            key={index}
                            sx={{
                              ...filterBtns,
                              borderBottom: activeFilter === status ? "3px solid white" : "none",
                            }}
                            variant="contained"
                            onClick={() => dispatch(setFilter(status))}
                          >
                            {status}
                          </Button>
                        ))}
                      </Stack>
                      <Button sx={dateBtn} onClick={handleSortToggle}>
                        Sort By Date
                    </Button>
                </Stack>

                   )
                }
                
              </Stack>
        </Box>

    </>
  )
}
export default Header;
