import React, { Component } from 'react'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';
import axios from 'axios'

const https = require('https');

class CovidApi extends Component  {
    constructor() {
        super();
        this.state = {
            my_tocken: "414007143543889",
            link: "https://superheroapi.com/api/",
            contacts: [],
            my_tocken: "414007143543889",
            fullLink: "",
            link: "",
            search: "france",
            finalSearch: "france",
            pay: "",
            Mort : "",
            confirmer: "" ,
            guerie: "",
            ateint: "",
            picture: "",
            error: "",
            Date: [],
        };
    }

    async dataUp() {
        try {
            const res = await axios.get(`http://localhost:8080/covid?country=${this.state.search}`)
            const data = res.data
            this.setState({
                       contacts: data[0]["Confirmed"], 
                       pay: data[0]["Country"], 
                       confirmer: data[0]["Confirmed"],
                       guerie: data[0]["Recovered"], 
                       ateint: data[0]["Active"], 
                       Mort: data[0]["Deaths"],
                       Date: data[0]["Date"],
            })
        } catch (error) {
            this.setState({ error, isLoading: false })
        }
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
            setInterval(() => this.dataUp(), 100000);
    }
    
    componentWillUnmount() {
      clearInterval(this.interval);
    }   

    ApiCall(){
        return(
            <div style={{padding: "5px"}}>
                Pays : {this.state.pay} <br/>
                Cas confirmés: {this.state.confirmer} <br/>
                Mort : {this.state.Mort} <br/>
                Guéris: {this.state.guerie} <br/>
                Atteints : {this.state.ateint} <br/>
                Dernière mise à jour: {this.state.Date}
            </div>
        )
    }
       
    render() {
        return (
            <div>
                <input 
                value={this.state.search}
                type="text"
                placeholder="nom pays"
                onChange={this.onChange.bind(this)}
                className="form-control mb-2"
            />
            <button id="updateButton" style={{size: this.width, color: 'black', backgroundColor: "red"}} 
                onClick={(e) => this.setState({finalSearch: this.setState.search}), () => this.dataUp()}>S
            </button>
            <center>Données Covid<br/>------------------------</center>
            {this.ApiCall()}
            </div>
        );
    }
}

export default CovidApi