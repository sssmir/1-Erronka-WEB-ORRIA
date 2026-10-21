const filas = [
            {
            titulo: 'Pelikulak',
            peliculas: ['Pelikula 1', 'Pelikula 2', 'Pelikula 3', 'Pelikula 4', 'Pelikula 5', 'Pelikula 6']
            },
            {
            titulo: 'Serieak',
            peliculas: ['Serie 1', 'Serie 2', 'Serie 3', 'Serie 4', 'Serie 5', 'Serie 6']
            },
            {
            titulo: 'Dokumentalak',
            peliculas: ['Dokumental 1', 'Dokumental 2', 'Dokumental 3', 'Dokumental 4', 'Dokumental 5', 'Dokumental 6', 'Dokumental 7', 'Dokumental 8', 'Dokumental 9']
            }
        ];

    const contenedor = document.getElementById('katalogoa');

    filas.forEach(fila => {
    const seccion = document.createElement('section');
    seccion.className = 'fila';

    const titulo = document.createElement('h3');
    titulo.className = 'fila_titulo';
    titulo.textContent = fila.titulo;

    const lista = document.createElement('div');
    lista.className = 'fila_lista';

    fila.peliculas.forEach(nombre => {
      const tarjeta = document.createElement('div');
      tarjeta.className = 'tarjeta';
      tarjeta.innerHTML = '<div class="tarjeta_img"></div><div class="tarjeta_titulo"></div>';
      tarjeta.querySelector('.tarjeta_titulo').textContent = nombre;
      lista.appendChild(tarjeta);
    });

    seccion.appendChild(titulo);
    seccion.appendChild(lista);
    contenedor.appendChild(seccion);
    });