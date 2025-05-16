const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 8080;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Filter for image files only
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .jpg and .png files are allowed!'), false);
    }
};

// Configure upload with size limits
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
    fileFilter: fileFilter
});

// Serve static files from public directory
app.use(express.static('public'));

// Get all images
app.get('/api/images', (req, res) => {
    const imagesDirectory = path.join(__dirname, 'public/uploads/images');

    // Create the directory if it doesn't exist
    if (!fs.existsSync(imagesDirectory)) {
        fs.mkdirSync(imagesDirectory, { recursive: true });
    }

    fs.readdir(imagesDirectory, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve images' });
        }

        // Filter for image files only
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png'].includes(ext);
        });

        // Return image paths
        const images = imageFiles.map(file => `/uploads/images/${file}`);
        res.json({ images });
    });
});

// Handle image upload
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded or invalid file type' });
    }

    res.json({
        success: true,
        image: `/uploads/images/${req.file.filename}`
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

// Start server
app.listen(port, () => {
    console.log(`Photo album app listening at http://localhost:${port}`);

    // Make sure upload directory exists
    const uploadDir = path.join(__dirname, 'public/uploads/images');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log('Created uploads directory');
    }
});