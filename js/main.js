import './carrito.js';
import './productos.js';
import './contacto.js';

window.addEventListener('load', () => {
    cargarCarritoDesdeLocalStorage();
    actualizarCarritoOffcanvas();
    actualizarContadorCarrito();
});