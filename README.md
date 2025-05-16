# 📸 Photo Album Web Application

A responsive web application for uploading and displaying photos in a dynamic layout. This application allows users to upload images in real-time and displays them in a paginated grid with 3 images on each side (6 images per page).

---

## ✨ Features

- ✅ **Real-time Image Upload**: Upload photos that appear instantly in the album.
- ✅ **Responsive Layout**: Automatically adjusts to horizontal and vertical images.
- ✅ **Pagination**: Navigate through pages (6 images per page).
- ✅ **Input Validation**: Supports `.jpg`, `.jpeg`, `.png` formats and restricts file size.
- ✅ **Mobile Friendly**: Works seamlessly across devices.

---

## 🛠 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js with Express
- **File Handling**: Multer middleware
- **Architecture**: RESTful API design

---

## ⚙️ Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- npm (comes with Node.js)

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/photo-album.git
cd photo-album

Step 2: Install Dependencies
npm install

This will install:
	•	express – Web server framework
	•	multer – File upload handling middleware
	•	start – npm run start

🏃‍♂️ Running the Application

Development Mode
npm run dev

Production Mode
npm run start

	Open your browser and visit: http://localhost:8080


📸 How to Use

Uploading Images
	1.	Open the app at http://localhost:8080
	2.	Click Choose File
	3.	Select an image (.jpg, .jpeg, .png)
	4.	Click Upload Photo
	5.	Your image appears instantly in the album

Browsing Images
	•	6 images per page (3 left, 3 right)
	•	Use Previous and Next to navigate
	•	Newest images are shown first

📂 Project Structure

photo-album/
├── public/
│   ├── css/
│   │   └── style.css           # Styling
│   ├── js/
│   │   └── script.js           # Client-side logic
│   ├── uploads/
│   │   └── images/             # Uploaded images
│   └── index.html              # Main HTML page
├── server.js                   # Express server setup
├── package.json                # Project metadata & dependencies
└── README.md                   # Project documentation

🔌 API Endpoints
Method	   Endpoint	        Description
GET	     /api/images	           Retrieve all uploaded images
POST	 /api/upload	       Upload a new image file

🧰 Troubleshooting

🖼️ Images Not Uploading
	•	Ensure format is .jpg, .jpeg, or .png
	•	File must be under 5MB

🛑 “ENOENT: no such file or directory…”
	•	Ensure public/uploads/images/ exists
	•	Create it manually if needed

⚠️ “EADDRINUSE” Error
	•	Port 8080 is already in use
	•	Kill the other process or change the port in server.js

🙏 Acknowledgments
	•	Icons and design inspiration from [https://drive.google.com/file/d/17-Ul2F7fj8XxZlYNN7vF_aokSogC6z6d/view]
	•	Built using Node.js, Express, and Multer
    •	Built using Node.js, Express, and Multer

