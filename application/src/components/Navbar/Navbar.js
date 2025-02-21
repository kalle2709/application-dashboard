import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Stack, Typography, IconButton, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; 

import { toggleTheme } from '../../redux/theme';

import './Navbar.css';
import '../../App.css';


const Navbar = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.darkMode);

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

  const handleMenuOpen = () => {
    alert("Menu Opened");
    }
    console.log(isDarkMode)
    
  return (
    <Box className={`navbar ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <Stack spacing={2} direction="row" justifyContent={"space-between"} alignItems={"center"}>
        <Typography className="nav-item">
          XYZ Jobs
        </Typography>
        {
            windowSize.width >= 300 && windowSize.width <= 450 ? (
                <Box>
                    <IconButton onClick={handleMenuOpen} sx={{ color: "white" }}>
                        <MenuIcon />
                    </IconButton>
                    
              </Box>
      

            ):
            (
                <Stack spacing={6} direction="row" className="nav-links">
                    <Typography className="nav-item">Applications</Typography>
                    <Typography className="nav-item">Home</Typography>
                    <Switch 
                      checked={isDarkMode} 
                      onChange={() => dispatch(toggleTheme())} 
                      color="default" 
              />
                 </Stack>
                
            )     
        }
        </Stack>

      
       
    </Box>
  );
};

export default Navbar;
