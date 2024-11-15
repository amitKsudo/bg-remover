document.getElementById('fileInput').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file); // Updated form data key to 'file'

    // Show progress bar
    const progressBar = document.getElementById('progressBar');
    const progressBarInner = document.getElementById('progressBarInner');
    progressBar.style.display = 'block';
    progressBarInner.style.width = '0%';

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
        const originalImage = document.createElement('img');
        originalImage.src = e.target.result;
        originalImage.alt = 'Uploaded Image';
        const resultImage = document.getElementById('resultImage');
        resultImage.innerHTML = '';
        resultImage.appendChild(originalImage);
    };
    fileReader.readAsDataURL(file);

    try {
        progressBarInner.style.width = '50%';
        const response = await axios.post('https://api.backgroundcut.co/remove-background', formData, {
            headers: {
                'X-Api-Key': '9d8846fdd13149dc89c3cd0e43188626fe69f7b9' // Added your API key
            },
            responseType: 'blob'
        });
        progressBarInner.style.width = '100%';

        const resultImage = document.getElementById('resultImage');
        const url = URL.createObjectURL(response.data);
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Image with Removed Background';
        resultImage.appendChild(img);

        // Show download button
        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.style.display = 'block';
        downloadBtn.onclick = () => {
            const link = document.createElement('a');
            link.href = url;
            link.download = 'removed-bg-image.png';
            link.click();
        };

        // Hide progress bar
        setTimeout(() => {
            progressBar.style.display = 'none';
            progressBarInner.style.width = '0%';
        }, 500);
    } catch (error) {
        console.error('Error removing background:', error);
        progressBar.style.display = 'none';
        alert('There was an error processing your image. Please try again.');
    }
});
