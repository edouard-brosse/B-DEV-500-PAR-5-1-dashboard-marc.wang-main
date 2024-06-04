import React, { Fragment, Component, useState } from 'react';
import axios from 'axios';
import fetch from 'node-fetch';
//const fetch = require("node-fetch");

export default class Weather extends React.Component {
  constructor() {
    super();
    this.state = {
        link: "",
        search: "france",
        finalSearch: "france",
        pay: "",
        Weather : "",
        picture: "",
        description : "",
        wind        : "",
        humidity    : "",
        temp : "",
        min: "",
        max: "",
        error: "",
        Date: [],
    };
}

dataUp() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+ this.state.search +"&units=metric&appid=4256d614b1ec95c438f9a90225989b27")
      .then(response => response.json())
      .then(data => this.setState({
          pay: data["name"],
          Weather: data["weather"][0]["main"],
          description: data["weather"][0]["description"],
          wind: data["wind"]["speed"],
          humidity: data["main"]["humidity"],
          temp: data["main"]["temp"],
         }))
      .catch(error => this.setState({ error, isLoading: false }));;
}

onChange = (event) => {
    this.setState({
        search: event.target.value,
    });
}

componentDidMount() {
    this.dataUp();
    document.getElementById('updateButton')
        .addEventListener('click', this.dataUp.bind(this))
        setInterval(() => this.dataUp(), 10000);
    }

componentWillUnmount() {
  clearInterval(this.interval);
}   

ApiCall(){
    return(
        <div style={{padding: "5px"}}>
            Pays/lieux  : {this.state.pay} <br/>
            Temps       : {this.state.Weather} <br/>
            Description : {this.state.description} <br/>
            Vents       : {this.state.wind}km/h <br/>
            Humidité    : {this.state.humidity} <br/>
            Température : {this.state.temp}° <br/>
        </div>
    )
}
   
render() {
    return (
        <div>
            <div style={{width: "10",}}></div>
            <input 
            value={this.state.search}
            type="text"
            placeholder="Pays/Ville"
            onChange={this.onChange.bind(this)}
            className="form-control mb-2"/>
        <button id="updateButton" style={{size: this.width, color: 'black', backgroundColor: "red"}} 
            onClick={(e) => this.setState({finalSearch: this.setState.search}), () => this.dataUp()}>S
        </button>
        <center>Meteo Data<br/>------------------------</center>
        {this.ApiCall()}
        </div>
    );
}
}