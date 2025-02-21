import { configureStore, createSlice } from "@reduxjs/toolkit";
import jobs from "../Utility/Jobs.json"; 

import themeReducer from "./theme";

const loadState = () => {
  const savedJobs = localStorage.getItem("filteredJobs");
  const savedFilter = localStorage.getItem("activeFilter");
  const savedSearchTerm = localStorage.getItem("searchTerm");
  const savedSortOrder = localStorage.getItem("sortOrder");

  return {
    jobs: jobs,
    searchTerm: savedSearchTerm ? JSON.parse(savedSearchTerm) : "",
    activeFilter: savedFilter ? JSON.parse(savedFilter) : "All Applications",
    sortOrder: savedSortOrder ? JSON.parse(savedSortOrder) : "newest",
    filteredJobs: savedJobs ? JSON.parse(savedJobs) : jobs
  };
};

const saveState = (state) => {
  localStorage.setItem("filteredJobs", JSON.stringify(state.filteredJobs));
  localStorage.setItem("activeFilter", JSON.stringify(state.activeFilter));
  localStorage.setItem("searchTerm", JSON.stringify(state.searchTerm));
  localStorage.setItem("sortOrder", JSON.stringify(state.sortOrder));
};

const getNextStatus = (currentStatus) => {
  if (currentStatus === "Applied") return "Interviewing";
  if (currentStatus === "Interviewing") return "Offer Received";
  if (currentStatus === "Offer Received") return "Applied";
  return "Interviewing"; 
};

const sortJobsByDate = (jobs, order) => {
  return [...jobs].sort((a, b) => {
    const dateA = new Date(a.date_applied);
    const dateB = new Date(b.date_applied);
    return order === "newest" ? dateB - dateA : dateA - dateB;
  });
};

const jobSlice = createSlice({
  name: "jobs",
  initialState: loadState(),
  reducers: {
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
      state.filteredJobs = sortJobsByDate(
        state.jobs.filter((job) =>
          action.payload === "All Applications" || job.status === action.payload
        ),
        state.sortOrder
      );
      saveState(state); 
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredJobs = sortJobsByDate(
        state.jobs.filter((job) =>
          (state.activeFilter === "All Applications" || job.status === state.activeFilter) &&
          (job.title.toLowerCase().includes(action.payload.toLowerCase()) ||
           job.company.toLowerCase().includes(action.payload.toLowerCase()))
        ),
        state.sortOrder
      );
      saveState(state); 
    },
    updateJobStatus: (state, action) => {
      state.jobs = state.jobs.map((job) =>
        job.id === action.payload ? { ...job, status: getNextStatus(job.status) } : job
      );
      state.filteredJobs = sortJobsByDate(
        state.jobs.filter((job) =>
          (state.activeFilter === "All Applications" || job.status === state.activeFilter) &&
          (job.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
           job.company.toLowerCase().includes(state.searchTerm.toLowerCase()))
        ),
        state.sortOrder
      );
      saveState(state); 
    },
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
      state.filteredJobs = sortJobsByDate(
        state.filteredJobs.filter((job) => job.id !== action.payload),
        state.sortOrder
      );
      saveState(state); 
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
      state.filteredJobs = sortJobsByDate(state.filteredJobs, action.payload);
      saveState(state);
    }
  },
});

export const { setFilter, setSearchTerm, updateJobStatus, deleteJob, setSortOrder } = jobSlice.actions;

const store = configureStore({
  reducer: {
    jobs: jobSlice.reducer,
    theme: themeReducer,
  },
});

export default store;
