// Función para obtener todos los usuarios
function obtenerUsuarios() {
    fetch('http://localhost:3000/usuarios')
    .then(response => response.json())
    .then(data => {
        const tablaUsuarios = document.getElementById('tabla_usuarios').getElementsByTagName('tbody')[0];
        tablaUsuarios.innerHTML = '';  // Limpiar tabla
        data.forEach(usuario => {
            let fila = tablaUsuarios.insertRow();
            fila.innerHTML = `
                <td>${usuario.nombre}</td>
                <td>${usuario.email}</td>
                <td>
                    <button onclick="editarUsuario(${usuario.id}, '${usuario.nombre}', '${usuario.email}')">Editar</button>
                    <button onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                </td>
            `;
        });
    });
}

// Función para agregar un nuevo usuario
function agregarUsuario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        body: JSON.stringify({ nombre, email }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        alert(data.status);
        obtenerUsuarios(); // Actualizar lista de usuarios
    });
}

// Función para eliminar un usuario
function eliminarUsuario(id) {
    fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            alert('Error al eliminar el usuario');
            return;
        }
        return response.json();
    })
    .then(data => {
        alert(data.status);
        obtenerUsuarios(); // Actualizar lista de usuarios
    });
}

// Función para editar un usuario
function editarUsuario(id, nombre, email) {
    document.getElementById('id_usuario_modificar').value = id;
    document.getElementById('nombre_modificar').value = nombre;
    document.getElementById('email_modificar').value = email;
}

// Función para modificar un usuario
function modificarUsuario() {
    const id = document.getElementById('id_usuario_modificar').value;
    const nombre = document.getElementById('nombre_modificar').value;
    const email = document.getElementById('email_modificar').value;

    fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ nombre, email }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (!response.ok) {
            alert('Error al modificar el usuario');
            return;
        }
        return response.json();
    })
    .then(data => {
        alert(data.status);
        obtenerUsuarios(); // Actualizar lista de usuarios
    });
}

// Cargar usuarios al inicio
window.onload = obtenerUsuarios;
