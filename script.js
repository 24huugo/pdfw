const pdfList = document.getElementById('pdfList');
const searchInput = document.getElementById('searchInput');
const loadMoreButton = document.getElementById('loadMore');

let pdfsData = []; // Almacenar todos los PDFs
let visiblePDFs = 5; // Número inicial de elementos visibles
const increment = 5; // Número de elementos para cargar en cada "Ver más"

// Realiza una solicitud al servidor para obtener la lista de PDFs
fetch('/pdfs')
    .then(response => response.json())
    .then(data => {
        pdfsData = data; // Almacenar todos los PDFs
        displayPDFs(0, visiblePDFs, pdfsData); // Mostrar los primeros 5 elementos
    })
    .catch(error => {
        console.error('Error al obtener la lista de PDFs: ' + error);
    });

// Manejar la búsqueda
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPDFs = pdfsData.filter(pdf => pdf.toLowerCase().includes(searchTerm));
    displayPDFs(0, visiblePDFs, filteredPDFs);
});

// Manejar "Ver más" de la lista
loadMoreButton.addEventListener('click', () => {
    visiblePDFs += increment;
    displayPDFs(0, visiblePDFs, pdfsData);
    if (visiblePDFs >= pdfsData.length) {
        loadMoreButton.style.display = 'none';
    }
});

// Función para mostrar los PDFs
function displayPDFs(startIndex, endIndex, pdfArray) {
    pdfList.innerHTML = ''; // Vaciar la lista

    if (pdfArray.length === 0) {
        pdfList.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    pdfArray.slice(startIndex, endIndex).forEach(pdf => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = 'archivos/' + pdf;
        link.textContent = pdf;
        listItem.appendChild(link);
        pdfList.appendChild(listItem);
    });

    if (pdfArray.length > endIndex) {
        loadMoreButton.style.display = 'block';
    } else {
        loadMoreButton.style.display = 'none';
    }
}
