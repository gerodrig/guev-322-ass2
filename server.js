const express = require("express");
const app = express();
const path = require("path");
const data_service = require("./data-service.js");



const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'));

const onHttpStart = async () => {
    console.log(`Express http server listening on: ${HTTP_PORT}`);    
    await data_service.initialize().then(data => console.log(data)).catch(error => console.log(error));
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './views/home.html'));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, './views/about.html'));
});

//TODO: get all employees who have isManager==true
app.get("/managers",async (req, res) => {
    try {
        const response = await data_service.getManagers();
        console.log(response, "maangers");
        res.json(response);
    } catch (error) {
        res.json({message: error});
    }
});

app.get("/employees", async (req,res) => {
    try {
        const response = await data_service.getAllEmployees();
        res.json(response);
    } catch (error) {
        res.json({message: error});
    }
});

app.get("/departments", async (req,res) => {
    try {
        const response = await data_service.getDepartments();
        res.json(response);
    } catch (error) {
        res.json({message: error});
    }

});

app.get("*", (req, res) => {
    res.send("<p>Error 404 Page Not Found</p>")
});

// app.use((req, res) => {
//     res.status(404).send("Page Not Found");
// });



app.listen(HTTP_PORT, onHttpStart);

