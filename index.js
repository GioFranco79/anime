const animeService = require('./service/animeService');
const Anime = require('./model/anime');
var bodyParser = require('body-parser');
const express = require('express');
const hbs = require('hbs');
const app = express();

const buscar = (id, array) => {
    for (let i = 0; i < array.length; ++i) {
        if (array[i].id === id) {
            return i;
        }
    }
    return -1;
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (request, response) => {
    response.render('home', {
        titulo: 'Home'
    });
});

app.get('/agregar', (request, response) => {
    response.render('agregar', {
        titulo: 'Agregar animé',
        error: null
    });
});

app.post('/mostraragregar', (req, response) => {
    const miAnime = animeService.readf();
    const id = parseInt(req.body.indice);
    const añitos = parseInt(req.body.año);
    const index = buscar(id, miAnime);
    if (index < 0) {
        const dato = new Anime(id, req.body.nombre, req.body.genero, añitos, req.body.autor);
        miAnime.push(dato);
        animeService.writef(miAnime);
        response.render('lista', {
            titulo: 'Mostrando animé agregado',
            arrayAnime: miAnime
        });
    } else {
        response.render('agregar', {
            titulo: 'Agregar animé',
            error: 'Error!!!! El Id no debe existir.'
        });
    }
});

app.get('/lista', (request, response) => {
    response.render('lista', {
        titulo: 'Listado de animé',
        arrayAnime: animeService.readf()
    });
});

app.get('/elimina', (request, response) => {
    response.render('elimina', {
        titulo: 'Listado de animé',
        arrayAnime: animeService.readf()
    });
});

app.post('/mostrarelimina', (req, response) => {
    const miAnime = animeService.readf();
    const index = buscar(parseInt(req.body.selecciona), miAnime);
    miAnime.splice(index, 1);
    animeService.writef(miAnime);
    response.render('lista', {
        titulo: 'Lista actualizada',
        arrayAnime: miAnime
    });
});

app.get('/modifica', (request, response) => {
    response.render('modifica', {
        titulo: 'Modificar animé',
        arrayAnime: animeService.readf()
    });
});

app.post('/modificando', (req, response) => {
    const miAnime = animeService.readf();
    const index = buscar(parseInt(req.body.selecciona), miAnime);
    response.render('modificando', {
        titulo: 'Animé a modificar',
        anime: miAnime[index]
    });
});

app.post('/modificado', (req, response) => {
    const miAnime = animeService.readf();
    const index = buscar(parseInt(req.body.iden), miAnime);
    const añitos = parseInt(req.body.año);
    miAnime[index].nombre = req.body.nombre;
    miAnime[index].genero = req.body.genero;
    miAnime[index].año = añitos;
    miAnime[index].autor = req.body.autor;
    animeService.writef(miAnime);
    response.render('lista', {
        titulo: 'Mostrando animé actualizado',
        arrayAnime: miAnime
    });
});

app.listen(3000);