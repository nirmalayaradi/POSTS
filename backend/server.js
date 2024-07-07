const express = require("express");
const cors = require("cors")
const mysql = require("mysql")


const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mamu@180821",
    database: "postdb",
})

app.get("/posts", (req, res) => {
    const q = "SELECT * FROM posts"
    db.query(q, (err, data) => {
        if(err) return res.json(`Error: ${err}`);
        return res.json(data)
    });
})

app.post("/posts", (req, res) => {
    const q = "INSERT INTO posts (`username`, `comment`, `color`, `date`, `time`) VALUES (?)"
    const values = [
        req.body.username,
        req.body.comment,
        req.body.color,
        req.body.date,
        req.body.time
    ]

    db.query(q,[values], (err, data) => {
        if(err) return res.json(err);
        return res.json("Posted Successfully");

    });
})

app.delete('/posts/:id', (req, res) => {
    const postId = req.params.id;
    const sql = 'DELETE FROM posts WHERE id = ?';

    db.query(sql, [postId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error deleting record' });
        }
        console.log('Deleted record with ID ' + postId);
        res.json('Record deleted successfully');
    });
});

app.listen(8081, () => {
     console.log("Server Running...")
}) 