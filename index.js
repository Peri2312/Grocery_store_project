const express = require('express')
const app = express()
const port = 3000
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// Server configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Connection to the SQlite database
const db_name = path.join(__dirname, "data", "grocerystore.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'grocerystore.db'");
});

const sql_create = `CREATE TABLE Products (
  Product_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Name TEXT NOT NULL,
  Price FLOAT NOT NULL,
  Quantity TEXT
);`;

db.run(sql_create, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of the table");
});

//// Database seeding
const sql_insert = `INSERT INTO Products (Product_ID, Name, Price, Quantity) VALUES
(1, 'Onion', '5', '1'),
(2, 'Rice', '16', '3'),
(3, 'Pom-Bread', '15', '2');`;
db.run(sql_insert, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of 3 entries");
});

// GET /
app.get('/', (req, res) => {
   // res.send('Hello World!')
   res.render("index");
  })
  
  // Starting the server
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

// GET data

  app.get("/items", (req, res) => {
    const test = {
      title: "Items",
      items: ["Onion", "Rice", "Pom-Bread"]
    };
    res.render("items", { model: test });
  });