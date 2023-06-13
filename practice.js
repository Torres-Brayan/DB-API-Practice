const express = require('express');
const app = express();
const { Pool } = require('pg');
const PORT = 8000;

const pool = new Pool ({
    user: 'brayantorres',
    host: 'localhost',
    database: 'practicedb',
    port: 5432
});

app.use(express.json());

app.get('/workouts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM workouts');
        res.status(200).json(result.rows);
    } catch {
        res.status(500).send('ERROT ON SERVER');
    }
});

app.get('/workouts/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM workouts WHERE id = $1', [id]);
        if(!result.rows[0]) {
            return res.status(404).send('No workout at given id.');
        }
        res.status(200).json(result.rows[0]);
    } catch {
        res.status(500).send('ERROT ON SERVER');
    }
});

app.post('/workouts', async (req, res) => {
    try{
        const { body_part, exercise } = req.body;
        if (!body_part || !exercise) {
            return res.status(404).send('Check body for body_part and exercise');
        }
        const result = await pool.query('INSERT INTO workouts (body_part, exercise) VALUES ($1, $2) RETURNING *', [body_part, exercise]);
        res.status(200).json(result.rows[0]);
    } catch {
        res.status(500).send('ERROT ON SERVER');
    }
});

app.put('/workouts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { body_part, exercise } = req.body;
        if (!body_part || !exercise) {
            return res.status(404).send('Check body for body_part and exercise');
        }
        const result = await pool.query('UPDATE workouts SET body_part = $1, exercise = $2 WHERE id = $3 RETURNING *', [body_part, exercise, id]);
        if(!result.rows[0]) {
            return res.status(404).send('No workout at given id.');
        }
        res.status(200).json(result.rows[0]);
    } catch {
        res.status(500).send('ERROT ON SERVER');
    }
});

app.delete('/workouts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM workouts WHERE id = $1 RETURNING *', [id]);
        if(!result.rows[0]) {
            return res.status(404).send('No workout at given id.');
        }
        res.status(200).json(result.rows[0]);
    } catch {
        res.status(500).send('ERROT ON SERVER');
    }
});

app.listen(PORT, ()=> {
    console.log(`STRUCK GOLD ON PORT: ${PORT}`);
});