const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Tu usuario de MySQL
    password: '1234',  // Tu contraseña de MySQL
    database: 'gestion_usuarios'  // Base de datos
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) res.status(500).send('Error al obtener usuarios');
        else res.json(results);
    });
});

// Ruta para agregar un usuario
app.post('/usuarios', (req, res) => {
    const { nombre, email } = req.body;
    db.query('INSERT INTO usuarios (nombre, email) VALUES (?, ?)', [nombre, email], (err, result) => {
        if (err) res.status(500).send('Error al agregar usuario');
        else res.json({ status: 'Usuario agregado' });
    });
});

// Ruta para eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
        if (err) res.status(500).send('Error al eliminar usuario');
        else if (result.affectedRows === 0) {
            res.status(404).send('Usuario no encontrado');
        } else {
            res.json({ status: 'Usuario eliminado' });
        }
    });
});

// Ruta para modificar un usuario
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;
    db.query('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?', [nombre, email, id], (err, result) => {
        if (err) res.status(500).send('Error al modificar usuario');
        else if (result.affectedRows === 0) {
            res.status(404).send('Usuario no encontrado');
        } else {
            res.json({ status: 'Usuario modificado' });
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
