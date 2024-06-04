const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const moment = require('moment');
const requestIp = require('request-ip');
const { request, query } = require("express");
const axios = require("axios");

const urlendocodeParser = bodyParser.urlencoded({
  extended: true
});
app.use(urlendocodeParser);
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/superhero', async function (req, res) {
  const response = await axios.get(`https://superheroapi.com/api/414007143543889/search/${req.query.name}`)
  res.json(response.data)
})

app.get('/facebook', async function (req, res) {
  try {
    const pageRes = await axios.get(`https://graph.facebook.com/${req.query.id}?fields=access_token&access_token=${req.query.access_token}`)
    const response = await axios.post(`https://graph.facebook.com/${req.query.id}/feed?message=${req.query.message}&access_token=${pageRes.data.access_token}`)
    res.json(response.data)
    } catch (error) {
    console.error(error)
  }
})

app.get('/covid', async function (req, res) {
  try {
    const response = await axios.get(`http://api.covid19api.com/live/country/${req.query.country}/`)
    res.json(response.data)
  } catch (error) {
    console.error(error)
  }
})

app.get('/about.json', function (req, res) {
  console.log(requestIp.getClientIp(req))
  res.json({
    client: {
      host: requestIp.getClientIp(req)
    },
    server: {
      current_time: moment().valueOf(),
      services: [
        {
          name: "Weather Service",
          widgets: [{
            name: "METEO",
            description: "Display temperature for a city",
            params: [{
              name: "Lieu",
              type: "string"
            }]
          }]
        },
        {
          name: "Covid Service",
          widgets: [{
            name: "Covid",
            description: "Displaying the info about covid",
            params: [{
              name: "Pays",
              type: "string"
            }]
          }]
        },
        {
          name: "Google",
          widgets: [{
            name: "Google books",
            description: "Displays the first book found in Google books",
            params: [{
              name: "Livre",
              type: "string"
            }]
          }]
        },
        {
          name: "SuperHero",
          widgets: [{
            name: "SuperHero",
            description: "Displays a superhero characteristics",
            params: [{
              name: "Héro",
              type: "string"
            }]
          }]
        },
        {
          name: "Facebook",
          widgets: [{
            name: "Facebook status",
            description: "Post a status on a facebook page you own",
            params: [{
              name: "Message",
              type: "string"
            },
            {
              name: "Page ID",
              type: "string"
            }
          ]
          }]
        },
        {
          name: "Time",
          widgets: [{
            name: "Time",
            description: "Displays the time for a specific country",
            params: [{
              name: "nom pays",
              type: "string"
            }]
          }]
        },
      ]
    }
  })
}
)

const port = 8080;
app.listen(port, () => console.log(`About.json listening on port ${port}`));