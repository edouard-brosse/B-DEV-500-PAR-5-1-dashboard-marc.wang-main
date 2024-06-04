import React, { useState, Fragment, useContext, useEffect, Component } from 'react'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';
import axios from 'axios';

class TimeApi extends Component  {
    constructor() {
        super();
        this.state = {
            search: "America/Los_Angeles",
            finalSearch: "france",
            pay: "",
            date: "",
            time : "",
            week: "",
            update: null
        };
    }

    dataUp() {
        fetch("https://api.ipgeolocation.io/timezone?apiKey=3c60fd200a484732a1074c37e547cea7&tz=" + this.state.search)
          .then(response => response.json())
          .then(data => this.setState({ 
            pay: data["timezone"],
            date: data["date_time"],
            week: data["week"],
            time: data["time_24"],
             }), data => console.log(data))
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
            .addEventListener('click', this.dataUp.bind(this), console.log("event click"))
        setInterval(() => this.dataUp(), 10000);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }    

    ApiCall(){
        return(
            <div style={{padding: "5px"}}>
              Zone : {this.state.pay} <br/>
              Date : {this.state.date} <br/>
              Semaine : {this.state.week} <br/>
            </div>
        )
    }
    render() {
        return (
            <div>
                <input 
                value={this.state.search}
                type="text"
                placeholder="Pays/Ville"
                onChange={this.onChange.bind(this)}
                className="form-control mb-2"
            />
            <button id="updateButton" style={{size: this.width, color: 'black', backgroundColor: "red"}} 
                onClick={(e) => this.setState({finalSearch: this.setState.search}), () => this.dataUp()}>S
            </button>
            <center>L'entrée doit être sous cette forme : America/Los_Angeles</center>
            <center>Time<br/>------------------------</center>
            {this.ApiCall()}
            </div>
        );
    }
}

export default TimeApi