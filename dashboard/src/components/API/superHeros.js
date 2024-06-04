import React, { Component } from 'react'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';
import axios from 'axios';

class SuperApi extends Component  {
    constructor() {
        super();
        this.state = {
            search: "",
            name: "",
            fullname : "",
            gender: "" ,
            race: "",
            publisher: "",
            eyes: "",
            hair: "",
            picture: "",
            error: false,
        };
    }

    onChange(event) {
        this.setState({
            search: event.target.value,
        });
    }

    async updateData () {
        try {
            const res = await axios.get(`http://localhost:8080/superhero?name=${this.state.search}`)
            const data = res.data["results"][0]
            console.log(data)
            this.setState({
                name: data["name"],
                fullname: data["biography"]["full-name"],
                alignment: data["biography"]["alignment"],
                gender: data["appearance"]["gender"],
                race: data["appearance"]["race"],
                publisher: data["biography"]["publisher"],
                eyes: data["appearance"]["eye-color"],
                hair: data["appearance"]["hair-color"],
                picture: data["image"]["url"],
            })
            this.setState({error : false})
        } catch (err) {
            this.setState({error : true})
        }
    }
    
    ApiCall(){
        return(
            <div style={{padding: "5px"}}>
                {this.state.error ?
                <div><b>Ce n'est pas un héro!</b><br/></div> : <></>}
                Nom : {this.state.name} <br/>
                Nom complet : {this.state.fullname} <br/>
                Genre: {this.state.gender} <br/>
                Race: {this.state.race} <br/>
                Univers : {this.state.publisher} <br/>
                Couleur des yeux: {this.state.eyes} <br/>
                Couleur de cheveux: {this.state.hair} <br/>
            </div>
        )
    }

    componentDidMount() {
        document.getElementById('updateButton')
            .addEventListener('click', this.updateData)
    }

    notCall(){
        return(
            <div>
                Entrez le nom de héro
            </div>
        )
    }

    render () {
        return(
            <div>
                <input 
                    value={this.state.search}
                    type="text"
                    placeholder="nom de hero"
                    onChange={this.onChange.bind(this)}
                    className="form-control mb-2"
                />
                <button id="updateButton" style={{size: this.width, color: 'black', backgroundColor: "red"}} 
                    onClick={() => this.updateData()
                        }>S
                </button>
                {this.state.fullLink === "" ? this.notCall() : this.ApiCall()}
            </div>
        )
    }
}

export default SuperApi