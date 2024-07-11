# Web-Based Student Data Management Platform (ProfiS CoreE-Portal)

## Overview
The ProfiS CoreE-Portal is a web-based platform developed to manage student data efficiently. The platform allows administrators to perform CRUD operations, upload data via Excel sheets (bulk insertion),
and provides restricted view access to employees. This project was developed during the one-month Short-Term MERN Full Stack Training Program at CDAC Patna.

## Features
- **Admin Access**: Full CRUD (Create, Read, Update, Delete) operations on student data.
- **Data Upload**: Bulk insertion of data from Excel sheets.
- **Data Management**: Pagination and filtering of student data. This is Future Scope of our Project
- **Employee Access**: Restricted access to view student data.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript (AJAX)
- **Backend**: Node.js, Express.js
- **Database**: MySQL

## Installation

### Prerequisites
- Node.js
- MySQL

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/profis-coree-portal.git
    cd profis-coree-portal
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up the MySQL database:
    - Create a new database:
      ```sql
      CREATE DATABASE master_table;
      ```
    - Import the database schema:
      ```bash
      mysql -u yourusername -p master_table < db/schema.sql
      ```

4. Configure the database connection:
    - Edit `db/config.js` to include your MySQL credentials.

5. Start the server:
    ```bash
    npm start
    ```

6. Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

## Usage
### Admin
- Perform CRUD operations on student data.
- Upload data using Excel sheets for bulk insertion.
- Paginate and filter student data for efficient management.(Future Scope)

### Employee
- View student data with restricted access.

## Project Structure

├── 
│ ├── HTML
│ │ └── admin.html
│ ├ └── employee.html
│ │ └── employeeAdd.html
| | └── index.html
| | └── login.html
| | └── profile.html
| | └── student.html
| | └── studentAdd.html
| | └── style.css
│ └── node_modules
├── Admin_2.js
├── Db_Connection.js
└── README.md


## MY Contribution
- **Aanchal Kumari** - Project Leader and Backend Developer

## Acknowledgments
- Special thanks to Hriday Verma Sir (Senior Project Engineer)from C-DAC PATNA for their exceptional support and guidance throughout the development of this project.
- 
## PROJECT_PPT
- https://docs.google.com/presentation/d/1uBbRsnne9HhZ44ldMrEaTv5IdFwx9asD/edit?usp=sharing&ouid=114570277063036351952&rtpof=true&sd=true

Please give rating ⭐ to the repository.

☺️ "Thank You for visiting" ☺️
