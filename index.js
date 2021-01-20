const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()); // -> req.body

//ROUTES
    //Get all boxes

    //Get a box

    //Create a box
    app.post("/box", async (req,res) => {
        try {
            const { macAddress } = req.body;
            
            const newBox = await pool.query("INSERT INTO box (macAddress) VALUES ($1) RETURNING *", [macAddress])
        
        
            res.json(newBox);

        } catch(err) {
            console.error(err.message)
        }

    }
    )

    //Update a box

    //Delete a box


//Listen to port
app.listen(5000, () => {
    console.log("Server is listening to port 5000");
});