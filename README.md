Photo Album Web Application
A responsive web application for uploading and displaying photos in a dynamic layout. This application allows users to upload images in real-time and displays them in a paginated grid with 3 images on each side (6 images per page).

Features
Real-time Image Upload: Upload photos that appear immediately in the album
Responsive Layout: Automatically adapts to horizontal and vertical images
Pagination: Navigate through multiple pages of images (6 images per page)
Input Validation: Only accepts supported image formats (.jpg, .jpeg, .png) and validates file size
Mobile Friendly: Responsive design works on both desktop and mobile devices
Technologies Used
Frontend: HTML5, CSS3, JavaScript (ES6+)
Backend: Node.js with Express
File Handling: Multer middleware for file uploads
Architecture: RESTful API design
Prerequisites
Before running this application, make sure you have the following installed:

Node.js (v14.0.0 or higher)
npm (usually comes with Node.js)
Installation
Clone the repository (or download and extract the ZIP file):
bash
git clone https://github.com/yourusername/photo-album.git
cd photo-album
Install the dependencies:
bash
npm install
This will install:
Express: Web framework for Node.js
Multer: Middleware for handling multipart/form-data (file uploads)
Nodemon (dev dependency): For automatic server restarts during development
Running the Application
Development Mode
To run the application in development mode with automatic server restarts:

bash
npm run dev
Production Mode
To run the application in standard mode:

bash
npm start
After starting the server, the application will be available at:

http://localhost:3000
How to Use
Uploading Images
Open the application in your web browser at http://localhost:3000
Click on the Choose File button in the upload section
Select an image file from your computer (supported formats: .jpg, .jpeg, .png)
Click the Upload Photo button
The image will be uploaded and immediately displayed in the photo album
Browsing Images
The album displays 6 images per page (3 on the left, 3 on the right)
Use the Previous and Next buttons at the bottom to navigate through pages
Images are sorted with the newest uploads first
Project Structure
photo-album/
├── public/
│   ├── css/
│   │   └── style.css          # Styling for the application
│   ├── js/
│   │   └── script.js          # Client-side JavaScript 
│   ├── uploads/
│   │   └── images/            # Directory where uploaded images are stored
│   └── index.html             # Main HTML file
├── server.js                  # Node.js server code
├── package.json               # Project configuration and dependencies
└── README.md                  # This documentation file
API Endpoints
The application provides the following API endpoints:

GET /api/images: Retrieves a list of all uploaded images
POST /api/upload: Uploads a new image file (multipart/form-data)
Configuration Options
You can modify the following settings in the server.js file:

Port: Change the port variable (default: 3000)
File Size Limit: Modify the limits property in the multer configuration (default: 5MB)
Allowed File Types: Update the fileFilter function to support additional image formats
Troubleshooting
Common Issues
"Error: ENOENT: no such file or directory, scandir 'public/uploads/images'"
Solution: Make sure the uploads directory exists. The application should create it automatically, but you may need to create it manually if there are permission issues.
"Error: File too large"
Solution: The file exceeds the size limit (5MB by default). Try uploading a smaller file or adjust the size limit in server.js.
"Error: Only .jpeg, .jpg and .png files are allowed!"
Solution: Upload only supported image formats (.jpg, .jpeg, .png).
Server Not Starting
If the server fails to start with an "EADDRINUSE" error, another process is already using port 3000. You can:

Close the other application using port 3000, or
Change the port number in server.js to an available port
License
MIT License

Acknowledgments
Icons and design inspiration from [Insert sources if applicable]
Built with Node.js and Express
