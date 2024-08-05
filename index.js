const express = require("express");
const app = express();
const port = 3000;

// Making use of all static files in the public folder
app.use(express.static('public'));

// Setting the view engine
app.set('view engine', 'ejs' )

// custom middleware to verify the time of the request

const checkWorkingHours = (req, res, next) => {
    const date = new Date();
    const day = date.getDate();
    const hour = date.getHours();
    // console.log(hour);

    // check if the request is within woeking hours ( MOnday to Friday, 9 to 17)

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17){
        next();
    } else {
        res.status(403).send('Website is unavailable outside working hours.')
    }
}

app.use(checkWorkingHours);

// Routing
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/services', (req, res) => {
    res.render('services')
});

app.get('/contact', (req, res) => {
    res.render('contact')
});

app.listen(port, () => {
    console.log(`Server is listening to port: ${port}`);
});