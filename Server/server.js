const express = require('express');
const cors = require('cors');
const app = express();
const { v4: uuidv4 } = require('uuid')

app.use(cors());
app.use(express.json());

let movies = [
    {id:uuidv4(), title: 'Avatar', year: 1972, director: 'Francis Ford Coppola', genre: 'Crime, Drama'},
    {id:uuidv4(), title: 'The Shawshank Redemption', year: 1994, director: 'Francis Darabont', genre: 'Drama'},
    {id:uuidv4(), title: 'The Drak Knigth', year: 2008, director: 'Christopher Nolan', genre: 'Action, Crime, Drama'},
];

app.get('/movies', (req, res) => {
    res.json(movies);
});

app.get('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const movie = movies.find(movie => movie.id);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).send('movie not found');
    }
});

app.post('/movies', (res, req) => {
    const movie = req.body;
    if (!movie.title || !movie.director || !movie.genre || !movie.year) {
        return res.status(404).json({ error: 'Mising required fields'});
    }
    movie.id = uuidv4();
    movie.push(movie);
    res.json(movie)
}); 

const PORT = 3001;
app.listen(PORT, () => {
    console.info(' Server runnig on PORT 3001');
});

//crear CRUD