document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('enviar-mensaje').addEventListener('click', function() {
        const nombreCompleto = document.getElementById('nombre-completo').value;
        const email = document.getElementById('email').value;
        const celular = document.getElementById('celular').value;
        const mensaje = document.getElementById('mensaje').value;

        if (!nombreCompleto || !email || !celular || !mensaje) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, completa todos los campos antes de enviar el mensaje.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        } else {
            Swal.fire({
                title: 'Mensaje enviado',
                text: 'Gracias por contactarnos. Tu mensaje ha sido enviado con éxito.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });

            document.getElementById('form-registro').reset();
        }
    });
});
