document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const uploadForm = document.getElementById('upload-form');
    const imageInput = document.getElementById('image-input');
    const fileNameDisplay = document.getElementById('file-name');
    const uploadStatus = document.getElementById('upload-status');
    const leftColumn = document.querySelector('.left-column');
    const rightColumn = document.querySelector('.right-column');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const currentPageSpan = document.getElementById('current-page');
    const totalPagesSpan = document.getElementById('total-pages');
    
    // Pagination state
    let currentPage = 1;
    const imagesPerPage = 6; // 3 on left, 3 on right
    let allImages = [];
    
    // Show file name when selected
    imageInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            fileNameDisplay.textContent = this.files[0].name;
        } else {
            fileNameDisplay.textContent = 'No file chosen';
        }
    });
    
    // Handle form submission for image upload
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData();
        const file = imageInput.files[0];
        
        if (!file) {
            showUploadStatus('Please select an image file', 'error');
            return;
        }
        
        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            showUploadStatus('Only JPG, JPEG, and PNG files are allowed', 'error');
            return;
        }
        
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            showUploadStatus('File size must be less than 5MB', 'error');
            return;
        }
        
        formData.append('image', file);
        uploadStatus.textContent = 'Uploading...';
        uploadStatus.className = '';
        
        // Send the image to the server
        fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Upload failed');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                showUploadStatus('Image uploaded successfully!', 'success');
                fileNameDisplay.textContent = 'No file chosen';
                uploadForm.reset();
                
                // Refresh images to include the new upload
                loadImages();
            } else {
                showUploadStatus('Upload failed: ' + (data.error || 'Unknown error'), 'error');
            }
        })
        .catch(error => {
            showUploadStatus('Upload error: ' + error.message, 'error');
        });
    });
    
    // Display upload status message
    function showUploadStatus(message, type) {
        uploadStatus.textContent = message;
        uploadStatus.className = type;
        
        // Clear status message after 5 seconds
        setTimeout(() => {
            uploadStatus.textContent = '';
            uploadStatus.className = '';
        }, 5000);
    }
    
    // Load all images from the server
    function loadImages() {
        fetch('/api/images')
        .then(response => response.json())
        .then(data => {
            allImages = data.images || [];
            
            // Sort images by name (which includes timestamp)
            allImages.sort().reverse(); // Newest first
            
            // Update pagination info
            updatePagination();
            
            // Display the first page
            displayImagesForCurrentPage();
        })
        .catch(error => {
            console.error('Error loading images:', error);
        });
    }
    
    // Update pagination controls
    function updatePagination() {
        const totalPages = Math.ceil(allImages.length / imagesPerPage);
        totalPagesSpan.textContent = totalPages || 1;
        
        // Adjust current page if necessary
        if (currentPage > totalPages) {
            currentPage = totalPages || 1;
        }
        currentPageSpan.textContent = currentPage;
        
        // Enable/disable pagination buttons
        prevPageBtn.disabled = currentPage <= 1;
        nextPageBtn.disabled = currentPage >= totalPages || totalPages <= 1;
    }
    
    // Display images for the current page
    function displayImagesForCurrentPage() {
        // Clear current display
        leftColumn.innerHTML = '';
        rightColumn.innerHTML = '';
        
        // Calculate start and end indices for current page
        const startIndex = (currentPage - 1) * imagesPerPage;
        const endIndex = Math.min(startIndex + imagesPerPage, allImages.length);
        
        // Get images for this page
        const pageImages = allImages.slice(startIndex, endIndex);
        
        // Display images in columns (3 per column)
        pageImages.forEach((imagePath, index) => {
            const imageElement = createImageElement(imagePath);
            
            // Place in left or right column based on index
            if (index % 2 === 0) {
                leftColumn.appendChild(imageElement);
            } else {
                rightColumn.appendChild(imageElement);
            }
        });
    }
    
    // Create image element with orientation detection
    function createImageElement(imagePath) {
        const wrapper = document.createElement('div');
        wrapper.className = 'image-wrapper';
        
        const img = document.createElement('img');
        img.src = imagePath;
        wrapper.appendChild(img);
        
        // Detect image orientation after loading
        img.onload = function() {
            if (img.naturalWidth > img.naturalHeight) {
                wrapper.classList.add('horizontal');
            } else {
                wrapper.classList.add('vertical');
            }
        };
        
        return wrapper;
    }
    
    // Handle pagination navigation
    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            currentPageSpan.textContent = currentPage;
            displayImagesForCurrentPage();
            updatePagination();
        }
    });
    
    nextPageBtn.addEventListener('click', function() {
        const totalPages = Math.ceil(allImages.length / imagesPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            currentPageSpan.textContent = currentPage;
            displayImagesForCurrentPage();
            updatePagination();
        }
    });
    
    // Initial load of images
    loadImages();
});