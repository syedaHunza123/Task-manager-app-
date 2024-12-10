const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

const tasks = [];

app.use(bodyParser.urlencoded({ extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { tasks });
});

app.post('/add-task', (req,res)=> {
    tasks.push(req.body.task);
    res.redirect('/');
});

app.post('/delete-task', (req, res) => {
    const index = parseInt(req.body.index);
    if (!isNaN(index)) {
        tasks.splice(index, 1);
    }
    res.redirect('/');
});


app.post('/edit-task', (req, res) => {
    const index = parseInt(req.body.index);
    const updatedTask = req.body.updatedTask;
    if (!isNaN(index) && updatedTask) {
        tasks[index] = updatedTask;
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});