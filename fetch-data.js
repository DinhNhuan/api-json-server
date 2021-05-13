const { lorem } = require("faker");

fetch('http://localhost:3000/api/products')
    // Handle success
    .then(response => response.json()) // convert to json
    .then(json => console.log(json)) //print data to console
    .catch(err => console.log('Request Failed', err)); // Catch errors