import React , {useState, useEffect}from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Box, Stack, Typography, Card, Divider, TextField } from '@mui/material';

import { setSearchTerm, updateJobStatus, deleteJob } from "../../redux/store"; 

import "./Table.css";

const tableCard = {
    borderRadius: "5px",
    backgroundColor: "#FAFAFA",
}

const statusBtn = {
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "1rem",
  width: "10rem",
};

const jobTitle = {
  fontWeight: "600",
};

const companyStack = {
  marginTop: "0.5rem",
};

const locationName = {
  fontWeight: "bold",
};

const editAction = {
  color: "#032929",
  fontWeight: "bold",
  cursor: "pointer",
};


const Table = () => {
  const dispatch = useDispatch();
  const filteredJobs = useSelector((state) => state.jobs.filteredJobs);
  const searchTerm = useSelector((state) => state.jobs.searchTerm);
  const activeFilter = useSelector((state) => state.jobs.activeFilter); 

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
  

  return (
    <Box className="table">
      <Stack spacing={2} direction="column">
        {
          windowSize.width >= 300 && windowSize.width <= 450 ?
          (
            <Stack spacing={2} direction="column" justifyContent={"space-between"} alignItems="center">
              <Typography >
                 {filteredJobs.length} applications {activeFilter !== "All Applications" ? `for "${activeFilter}"` : ""}
              </Typography>
              <TextField
                className="searchField" 
                label="Job Title or Company"
                variant="outlined"
                size="medium"
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              />
            </Stack>
          )
          :
          (
            <Stack direction={"row"} justifyContent={"space-between"} alignItems="center">
              <Typography>
                Showing {filteredJobs.length} applications {activeFilter !== "All Applications" ? `for "${activeFilter}"` : ""}
              </Typography>
              <TextField
                label="Search by Job Title or Company"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                sx={{ width: "25%" }}
              />
            </Stack>

          )
        }
          

        {filteredJobs.length === 0 ? (
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold", textAlign: "center", color: "#666" }}>
             No matching job applications found! <br /> Start applying to your dream jobs and track them here.
          </Typography>
        ) : (
          filteredJobs.map((job) => (
            <Card key={job.id} sx = {tableCard}>
              {
                 windowSize.width >= 300 && windowSize.width <= 450 ?
                 (
                  <Stack direction="column" spacing = {3} justifyContent="space-between" alignItems="center" className="tableStackMobile">
                
                    <Typography 
                      sx={statusBtn} 
                      onClick={() => dispatch(updateJobStatus(job.id))}
                    >
                      {job.status}
                    </Typography> 

                    <Stack direction="column" spacing={0} className="table-item-stack">
                      <Typography sx={jobTitle}>{job.title} {job.company}</Typography>
                      <Stack direction="column" spacing={0}>
                        <Typography className="idDate">Job ID: {job.id}</Typography>
                        <Typography className="idDate">Applied: {job.date_applied}</Typography>
                      </Stack>
                      <Stack direction="column" sx={companyStack}>
                        <Typography className="locationHeader">Location</Typography>
                        <Typography sx={locationName} className="locationName">
                          US, WA, Seattle
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="row" spacing={1} className="actionsStack">
                      <Typography sx={editAction}>Edit</Typography>
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ borderColor: "#032929", width: "0.5px", height: "15px", paddingBottom: "0.5rem" }}
                      />
                      <Typography sx={editAction} onClick={() => dispatch(deleteJob(job.id))}>
                        Delete
                      </Typography>
                    </Stack>
                  </Stack>
                 )
                 :
                 (
                  <Stack direction="row" justifyContent="space-between" className="tableStack">
                    <Typography 
                      sx={statusBtn} 
                      onClick={() => dispatch(updateJobStatus(job.id))}
                    >
                      {job.status}
                    </Typography> 

                    <Stack direction="column" spacing={0}>
                      <Typography sx={jobTitle}>{job.title}, {job.company}</Typography>
                      <Stack direction="row" spacing={1}>
                        <Typography className="idDate">Job ID: {job.id}</Typography>
                        <Divider
                          orientation="vertical"
                          flexItem
                          sx={{ borderColor: "#4E4E4E", width: "0.5px", height: "15px", paddingBottom: "0.5rem" }}
                        />
                        <Typography className="idDate">Applied: {job.date_applied}</Typography>
                      </Stack>
                      <Stack direction="column" sx={companyStack}>
                          <Typography className="locationHeader">Location</Typography>
                          <Typography sx={locationName} className="locationName">
                            US, WA, Seattle
                          </Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="row" spacing={1} className="actionsStack">
                        <Typography sx={editAction}>Edit</Typography>
                        <Divider
                          orientation="vertical"
                          flexItem
                          sx={{ borderColor: "#032929", width: "0.5px", height: "15px", paddingBottom: "0.5rem" }}
                        />
                        <Typography sx={editAction} onClick={() => dispatch(deleteJob(job.id))}>
                          Delete
                        </Typography>
                    </Stack>
                  </Stack>
                 )
              }
              
            </Card>
          ))
        )}
      </Stack>
    </Box>
  );
};

export default Table;
