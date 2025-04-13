const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/todo')
const dotenv = require('dotenv');
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_STR).then(console.log('Connected to MongoDB')).catch(err => console.log(err))

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    console.log("ID received:", id); // Debugging

    TodoModel.findByIdAndUpdate(id, { done: true }, { new: true })
    .then(result => {
        if (!result) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json(result);
    })
    .catch(err => res.json(err));
});

app.post('/add',(req, res) => {
    const task = req.body.task;
    TodoModel.create({task: task})
    .then(result => res.json(result.message))
    .catch(err => res.json(err))
})
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
    .then(result =>res.json(result))
    .catch(err => res.json(err));
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})