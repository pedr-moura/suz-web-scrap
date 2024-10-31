document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const message = document.getElementById('message');

    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        fetch('/upload_image', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.path) {
                message.textContent = `Imagem enviada com sucesso: ${data.path}`;
            } else {
                message.textContent = `Erro: ${data.error}`;
            }
        })
        .catch(error => {
            message.textContent = `Erro ao enviar: ${error.message}`;
        });
    });
});
