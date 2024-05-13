const serverData = require('./server_data'); //server_data no incluido en el repositorio
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require('multer');
const multerS3 = require('multer-s3');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const app = express();
const port = serverData.l_port

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: serverData.host,
    user: serverData.user,
    password: serverData.password,
    database: serverData.database
});

db.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + db.threadId);
});

const s3 = new S3Client({
    region: serverData.region,
    credentials: {
        accessKeyId: serverData.accessKeyId,
        secretAccessKey: serverData.secretAccessKey
    }
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: serverData.bucket,
        //acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, `images/${Date.now().toString()}_${file.originalname}`);
        }
    })
});

{/* API RESTful USERS */}{
    
    app.post('/users', async (req, res) => {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).send('Usuario agregado');
        });
    });

    app.post('/login', (req, res) => {
        const { email, password } = req.body;
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (results.length > 0) {
                bcrypt.compare(password, results[0].password, (error, response) => {
                    if (response) {
                        res.status(200).send('Usuario autenticado correctamente.');
                    } else {
                        res.status(401).send('Contraseña incorrecta.');
                    }
                });
            } else {
                res.status(404).send('Usuario no encontrado.');
            }
        });
    });

    app.get('/users', (req, res) => {
        db.query('SELECT id, username, email FROM users', (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    });

    app.get('/user', (req, res) => {
        const email = req.query.email;
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
            if (err) {
                res.status(500).send('Error en el servidor');
                return;
            }
            if (result.length > 0) {
                res.json({
                    username: result[0].username,
                    email: result[0].email
                });
            } else {
                res.status(404).send('Usuario no encontrado');
            }
        });
    });

}

{/* API RESTful ANIMALS */}{

    app.post('/animals', async (req, res) => {
        const { name, race, age, location, description, publishBy, image } = req.body;
    
        db.query('INSERT INTO animals (name, race, age, location, description, publishBy, image) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, race, age, location, description, publishBy, image], (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).send('Mascota agregada');
        });
    });

    app.post('/upload', upload.single('file'), (req, res) => {
        if (req.file) {
            res.status(201).send({ imageUrl: req.file.location });
        } else {
            console.error("Error en la subida de archivos:", req.file);
            res.status(500).send("Error al subir el archivo.");
        }
    });

    app.get('/animals', (req, res) => {
        db.query('SELECT id, name, race, age, location, description, publishBy, image FROM animals', (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    });

    app.get('/animals/byPublisher', (req, res) => {
        const { publisherEmail } = req.query;
    
        if (!publisherEmail) {
            return res.status(400).send("Publisher email is required.");
        }
    
        const query = 'SELECT id, name, race, age, location, description, publishBy, image FROM animals WHERE publishBy = ?';
        db.query(query, [publisherEmail], (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    });
    
    app.delete('/animals/:id', (req, res) => {
        const { id } = req.params;
    
        if (!id) {
            return res.status(400).send('ID is required');
        }
    
        const query = 'DELETE FROM animals WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('No animal found with that ID');
            }
            res.send('Animal deleted successfully');
        });
    });
    
}

app.listen(port, '0.0.0.0', () => console.log(`Servidor escuchando en todas las interfaces`));
