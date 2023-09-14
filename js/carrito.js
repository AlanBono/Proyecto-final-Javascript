const carrito = [];

function agregarAlCarrito(nombre, precio, imagen) {

    const productoExistente = carrito.find(producto => producto.nombre === nombre);
  
    if (productoExistente) {
        mostrarMensajeDeAlerta(`.el producto "${nombre}" ya está en el carrito.`, 'red');
    } else {
        const producto = { nombre, precio, cantidad: 1, precioTotal: parseFloat(precio.replace('$', '')), imagen };
        carrito.push(producto);
        actualizarCarritoOffcanvas();
        guardarCarritoEnLocalStorage();
        actualizarContadorCarrito();
        mostrarMensajeDeAlerta(`.el producto "${nombre}" se agregó al carrito.`, 'green');
    }
    
}

function mostrarMensajeDeAlerta(mensaje, color) {
    Toastify({
        text: mensaje,
        duration: 3000,
        gravity: 'bottom',
        position: 'right',
        backgroundColor: color,
    }).showToast();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarritoOffcanvas();
    guardarCarritoEnLocalStorage();
    actualizarContadorCarrito();
}

function sumarAlCarrito(index) {
    carrito[index].cantidad++;
    carrito[index].precioTotal += parseFloat(carrito[index].precio.replace('$', ''));
    actualizarCarritoOffcanvas();
    guardarCarritoEnLocalStorage();
}


function restarDelCarrito(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        carrito[index].precioTotal -= parseFloat(carrito[index].precio.replace('$', ''));
    } else {
        carrito.splice(index, 1);
    }
    actualizarCarritoOffcanvas();
    guardarCarritoEnLocalStorage();
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado) {
        carrito = carritoGuardado;
    }
}

function actualizarContadorCarrito() {
    const contador = document.getElementById('carrito-contador');
    contador.textContent = carrito.length.toString();
}


const botonEliminarTodos = document.getElementById('eliminar-todos');
botonEliminarTodos.addEventListener('click', () => {

    carrito.length = 0;
    actualizarCarritoOffcanvas();
    actualizarContadorCarrito();
    localStorage.removeItem('carrito');
});

const botonFinalizarCompra = document.getElementById('finalizar-compra');
botonFinalizarCompra.addEventListener('click', () => {
    if (carrito.length === 0) {
        mostrarMensajeDeAlerta('.el carrito está vacío.', 'red');
        return;
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-dark btn-sm',
            cancelButton: 'btn btn-secondary btn-sm'
        },
        buttonsStyling: true
    });

    swalWithBootstrapButtons.fire({
        title: 'Desea finalizar la compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Finalizar la compra',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Compra realizada!',
                'Gracias por confiar en .share.',
                'success'
            ).then(() => {
                carrito.length = 0;
                localStorage.removeItem('carrito');
                actualizarCarritoOffcanvas();
                actualizarContadorCarrito();
                window.location.href = '../index.html'
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Compra cancelada',
                'Intentelo nuevamente',
                'error'
            )
        }
    });

});


function actualizarCarritoOffcanvas() {
    const carritoListaOffcanvas = document.getElementById('carrito-lista-offcanvas');
    const total = carrito.reduce((acumulador, producto) => {
        return acumulador + producto.precioTotal;
    }, 0);
    const totalCarritoElement = document.getElementById('total-carrito');
    totalCarritoElement.textContent = `Total: $${total.toFixed(2)}`;
    carritoListaOffcanvas.innerHTML = '';

    carrito.forEach((producto, index) => {
        const itemCarrito = document.createElement('li');
        itemCarrito.className = 'item-carrito';
        itemCarrito.innerHTML = `
      <div class="producto-carrito">
      <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-carrito">
      <div class="detalle-carrito">
          <div class="nombre-precio-carrito">${producto.nombre}</div>
          <div class="nombre-precio-carrito">$${producto.precioTotal.toFixed(2)}</div>
          <div class="acciones">
            <button class="btn btn-secondary btn-sm" onclick="restarDelCarrito(${index})">-</button>
            <span class="nombre-precio-carrito">${producto.cantidad}</span>
            <button class="btn btn-secondary btn-sm" onclick="sumarAlCarrito(${index})">+</button>
            <button class="btn btn-dark btn-sm" onclick="eliminarDelCarrito(${index})">.eliminar</button>
          </div>
      </div>
  </div>
      `;
        carritoListaOffcanvas.appendChild(itemCarrito);
    });
}