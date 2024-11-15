document.getElementById('fileInput').addEventListener('change', async (event) => {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('image_file', file);

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
                const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
                    headers: {
                        'X-Api-Key': 'hJME1Bfgst3cznT1S5cX7i3p'
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
            }
        });
