import React, { Component } from 'react'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';


class timeApi extends Component  {
    constructor() {
        super();
        this.state = {
            fullLink: "",
            my_tocken: "414007143543889",
            search: "",
            time: "",
            day: "",
            date: "",
        };
    }

    onChange(event) {
        this.setState({
            search: event.target.value,
        });
    }

    updateData() {
        fetch("http://worldtimeapi.org/api/timezone/Europe/Paris" , {mode: 'no-cors'} )
            .then(response => response.json())
            .then(data => {
                this.setState({
                    date: data["utc_datetime"],
                    time: data["utc_offset"]
                })
            })
            .catch(err => alert("Wrong contry or city!"));
    }
    
    ApiCall(){
        return(
            <div style={{padding: "5px"}}>
                {this.state.search}
                <b style={{padding: "20px 5px"}}>Time</b> <br/>
                day : {this.state.date} <br/>
                hours: {this.state.time} <br/>

            </div>
        )
    }

    componentDidMount() {
        document.getElementById('updateButton')
            .addEventListener('click', this.updateData)
            setInterval(() => this.dataUp(), 10000);
    }
    
    componentWillUnmount() {
      clearInterval(this.interval);
    }   

    notCall(){
        return(
            <div>
                Enter a city 
            </div>
        )
    }

    render () {
        console.log("------|Time api|---------")
        return(
            <div>
                <input 
                    value={this.state.search}
                    type="text"
                    placeholder="renseigner une zone + capitale"
                    onChange={this.onChange.bind(this)}
                    className="form-control mb-2"
                />
                <button id="updateButton" style={{size: this.width, color: 'black', backgroundColor: "red"}} 
                    onClick={(e) => this.setState({fullLink: this.state.link + this.state.my_tocken + "/search/" + this.state.search})}>S
                </button>
                {this.state.fullLink === "" ? this.notCall() : this.ApiCall()}
            </div>
        )
    }
}

export default timeApi