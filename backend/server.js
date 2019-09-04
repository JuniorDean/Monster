const express = require('express');
const app = express();
const bodyParser = require('body-Parser');
let data = require('./jobs');

let initialJobs = data.jobs;
let addedJobs = [];

const getAlljobs = () => {
    return [...addedJobs, ...initialJobs];
};

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const api = express.Router();

api.get('/jobs', (req, res) => {
    // res.json(data.jobs);
    res.json(getAlljobs());
});

api.post('/jobs', (req, res) => {
    console.log('*************************************************');
    const job = req.body;
    addedJobs = [job, ...addedJobs];
    console.log('total nb of jobs : ', getAlljobs().length);
    res.json(job);
});

api.get('/jobs/:id', (req, res) => {
    const id = parseInt(req.params.id, 10) // "1"
    const job = getAlljobs().filter(j => j.id === id);
    if (job.length === 1) {
        res.json({ success: true, job: job[0] });
    } else {
        res.json({ success: false, message: `pas de job ayant pour id ${id}` });
    }
});

app.use('/api', api); // localhost:4201/api/jobs

const port = 4201;

app.listen(port, () => {
    console.log(`listen on port ${port}`);
});