# application-dashboard
**1. Setup & Installation**

To start, create a new React app using the following command:

**npx create-react-app application**

**cd application**


**2. Install Dependencies**

Install the required dependencies:

**npm install @mui/material @mui/icons-material @reduxjs/toolkit react-redux**

**3. Features Implemented**

    **1. Navbar**
    
      * Displays company name (XYZ Jobs) on the left.
      
      * Menu items on the right, including:
      
        * A toggle button to switch between dark mode and light mode using Redux.
        
        * Other navigation items (Applications, Home, etc.).

        
    **2. Header Section**
    
      * Contains a filter button to filter applications based on status (Applied, Interviewing, Offer Received).
      
      * Responsive Design:
      
          * For screens wider than 450px, filters appear as separate buttons.
          
          * For screens smaller than 450px, a single filter button cycles through different statuses when clicked.

          
      * Date Sorting Option:
      
          *Allows sorting applications based on the applied date (Newest → Oldest or Oldest → Newest).

          
    **3. Applications Table Section**
    
      * Pagination
      
          * Displays the number of applications per page.

          
      * Applications List
      
          * Each job application is displayed as a card.

          
      * Each card has 3 columns:

          * Status Button: On clicking, it cycles through different statuses (Applied → Interviewing → Offer Received).
          
          * Description Section: Displays job title, company name, date applied, and location.

          
      * Actions:
      
          * Edit Button (Currently Disabled).
          
          *  Delete Button: Deletes the application.

          
      * State Persistence
      
          * All modifications (status changes, filtering, deleting) are stored in localStorage so data persists across page reloads.

          
      **4. Footer**
      
          * A basic single line Footer

          



  **4. State Management (Redux Store)**
  
      * The application uses Redux to manage global states efficiently.
      
      * Two Redux slices:
      
          *Job Slice:
          
              * Maintains job applications and allows filtering, searching, sorting, deleting jobs.

              
          * Theme Slice:
          
              * Handles dark mode and light mode switching globally.

              

              
  ***5. Assumptions**

      * Currently, the application has 3 sample job applications.
      
      * Location data is static for now.
      
      * The edit functionality is disabled at this stage.

      

  **6. Challenges Faced**
  
      * Implementing Redux for Global State Management
      
          * Managing filtering in two different ways:
          
             * By company name or job title (search bar).
             
             * By job status (filter buttons).

             
      * Ensuring Mobile-Friendliness
      
          * Using media queries to make the UI responsive.
          
          * Handling different filter layouts for small screens.

          
      * Persisting Data in Local Storage
      
          * Keeping state updates synced with localStorage to prevent losing data after refreshing the page.**

          
          
    **7. Future Enhancements**

    
        * Enable Edit Feature for job applications.
        
        * Dynamic Locations instead of static data.
        
        * API Integration for fetching real job data.
        

**IMAGES**

**NavBar and Header:**
![image](https://github.com/user-attachments/assets/6c379261-6288-4a78-be45-5cd29aa97226)

**Application Card and Footer:**
![image](https://github.com/user-attachments/assets/2b0ca77d-feeb-47e8-a810-83557fd1c78e)

**For small Screens**
![image](https://github.com/user-attachments/assets/b8be153f-6b6e-4e9b-a7f4-9a3b86069831)
![image](https://github.com/user-attachments/assets/1b294f91-d2b6-4b88-800f-22a2bfc24311)





  
