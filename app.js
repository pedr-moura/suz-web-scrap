const express = require('express');
const multer = require('multer');
const helmet = require('helmet');
const path = require('path');
const app = express();

// Middleware de segurança
app.use(helmet());

// Configuração do multer para uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }); // Limite de 5 MB

// Endpoint para upload
app.post('/upload_image', upload.single('file'), (req, res) => {
    if (req.file) {
        res.json({ path: `uploads/${req.file.filename}` });
    } else {
        res.status(400).json({ error: 'Falha no upload da imagem.' });
    }
});

// Porta dinâmica
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
