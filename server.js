const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000; // Elige el puerto que prefieras

app.use(express.static(__dirname));

app.get('/pdfs', (req, res) => {
    const pdfDir = path.join(__dirname, 'archivos');
    fs.readdir(pdfDir, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al leer la carpeta de PDFs.');
            return;
        }

        const pdfs = files.filter(file => path.extname(file) === '.pdf');
        res.json(pdfs);
    });
});

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
