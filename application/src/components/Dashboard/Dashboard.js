import React from 'react'
import { Stack } from '@mui/material';

import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Table from '../Table/Table';



const Dashboard = () => {
  return (
   <div>
        <Stack diretion="column">
            <Navbar />
            <Header />
            <Table />
        </Stack>
   </div>
  )
}

export default Dashboard
