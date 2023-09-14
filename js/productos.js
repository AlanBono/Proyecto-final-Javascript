let productos = [];
const productosContainer = document.getElementById('productos-container');

document.addEventListener('DOMContentLoaded', function () {

fetch('../bd/products.json')
    .then(response => response.json())
    .then(data => {
        productos = data;

        const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
        if (carritoGuardado) {
            carrito.push(...carritoGuardado);
            actualizarCarritoOffcanvas();
        }
        
        data.forEach(producto => {
            
            const tarjetaProducto = document.createElement('div');
            tarjetaProducto.className = 'card';

            const imagenProducto = document.createElement('img');
            imagenProducto.className = 'card-img-top';
            imagenProducto.src = producto.imagen;
            imagenProducto.alt = producto.nombre;

            const cuerpoTarjeta = document.createElement('div');
            cuerpoTarjeta.className = 'card-body';

            const nombreProducto = document.createElement('h5');
            nombreProducto.className = 'card-title';
            nombreProducto.textContent = producto.nombre;

            const precioProducto = document.createElement('p');
            precioProducto.className = 'card-text';
            precioProducto.textContent = producto.precio;

            const botonAgregar = document.createElement('a');
            botonAgregar.className = 'btn btn-outline-dark';
            botonAgregar.textContent = '.añadir al carrito';
            botonAgregar.addEventListener('click', () => {
                agregarAlCarrito(producto.nombre, producto.precio, producto.imagen);
            });

            tarjetaProducto.appendChild(imagenProducto);
            cuerpoTarjeta.appendChild(nombreProducto);
            cuerpoTarjeta.appendChild(precioProducto);
            cuerpoTarjeta.appendChild(botonAgregar);
            tarjetaProducto.appendChild(cuerpoTarjeta);
            productosContainer.appendChild(tarjetaProducto);
        });
    })
    .catch(error => {
        console.error('Error al cargar los datos de productos:', error);
    });

});


const botonesAgregar = document.querySelectorAll('.btn-outline-dark');
botonesAgregar.forEach((boton, index) => {
    boton.addEventListener('click', () => {
        const nombreProducto = document.querySelectorAll('.nombre-prod')[index].textContent;
        const precioProducto = document.querySelectorAll('.precio-prod')[index].textContent;
        agregarAlCarrito(nombreProducto, precioProducto);
    });
});

const carritoOffcanvas = new bootstrap.Offcanvas(document.getElementById('carritoOffcanvas'), {
    scroll: true,
});

const botonVerCarrito = document.getElementById('ver-carrito');
botonVerCarrito.addEventListener('click', () => {
    actualizarCarritoOffcanvas();
    carritoOffcanvas.show();
});

// Filtrar productos por categoría
function filtrarProductos(categoria) {
    const productosFiltrados = productos.filter(producto => producto.categoria === categoria);

    productosContainer.innerHTML = '';

    productosFiltrados.forEach(producto => {
        const tarjetaProducto = document.createElement('div');
        tarjetaProducto.className = 'card';

        const imagenProducto = document.createElement('img');
        imagenProducto.className = 'card-img-top';
        imagenProducto.src = producto.imagen;
        imagenProducto.alt = producto.nombre;

        const cuerpoTarjeta = document.createElement('div');
        cuerpoTarjeta.className = 'card-body';

        const nombreProducto = document.createElement('h5');
        nombreProducto.className = 'card-title';
        nombreProducto.textContent = producto.nombre;

        const precioProducto = document.createElement('p');
        precioProducto.className = 'card-text';
        precioProducto.textContent = producto.precio;

        const botonAgregar = document.createElement('a');
        botonAgregar.className = 'btn btn-outline-dark';
        botonAgregar.textContent = '.añadir al carrito';
        botonAgregar.addEventListener('click', () => {
            agregarAlCarrito(producto.nombre, producto.precio, producto.imagen);
        });

        tarjetaProducto.appendChild(imagenProducto);
        cuerpoTarjeta.appendChild(nombreProducto);
        cuerpoTarjeta.appendChild(precioProducto);
        cuerpoTarjeta.appendChild(botonAgregar);
        tarjetaProducto.appendChild(cuerpoTarjeta);
        productosContainer.appendChild(tarjetaProducto);

    });
}


function mostrarTodosLosProductos() {

    productosContainer.innerHTML = '';

    productos.forEach(producto => {
        const tarjetaProducto = document.createElement('div');
        tarjetaProducto.className = 'card';

        const imagenProducto = document.createElement('img');
        imagenProducto.className = 'card-img-top';
        imagenProducto.src = producto.imagen;
        imagenProducto.alt = producto.nombre;

        const cuerpoTarjeta = document.createElement('div');
        cuerpoTarjeta.className = 'card-body';

        const nombreProducto = document.createElement('h5');
        nombreProducto.className = 'card-title';
        nombreProducto.textContent = producto.nombre;

        const precioProducto = document.createElement('p');
        precioProducto.className = 'card-text';
        precioProducto.textContent = producto.precio;

        const botonAgregar = document.createElement('a');
        botonAgregar.className = 'btn btn-outline-dark';
        botonAgregar.textContent = '.añadir al carrito';
        botonAgregar.addEventListener('click', () => {
            agregarAlCarrito(producto.nombre, producto.precio, producto.imagen);
        });

        tarjetaProducto.appendChild(imagenProducto);
        cuerpoTarjeta.appendChild(nombreProducto);
        cuerpoTarjeta.appendChild(precioProducto);
        cuerpoTarjeta.appendChild(botonAgregar);
        tarjetaProducto.appendChild(cuerpoTarjeta);
        productosContainer.appendChild(tarjetaProducto);
    });
}

document.getElementById('filtro-todos').addEventListener('click', () => {
    mostrarTodosLosProductos();
});

document.getElementById('filtro-consolas').addEventListener('click', () => {
    filtrarProductos('Consolas');
});

document.getElementById('filtro-juegos').addEventListener('click', () => {
    filtrarProductos('Juegos');
});

document.getElementById('filtro-accesorios').addEventListener('click', () => {
    filtrarProductos('Accesorios');
});