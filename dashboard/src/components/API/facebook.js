import React, { Component } from 'react'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';
import axios from 'axios';
import { db } from '../Provider/SetupFirebase';

class Facebook extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            search : '',
            error: false,
            accessToken: '',
            pageId: '',
            confirm: false
        };
    }

    updateEntry(event) {
        this.setState({
            search: event.target.value,
        });
    }

    updatePageID(event) {
        this.setState({
            pageId: event.target.value,
        });
    }

    getToken = async () => {
        try {
            const myRef = db.ref(`users`)
            myRef.orderByKey().on('child_added', (snapshot) => {
                const user = db.ref(`users/${snapshot.key}`)
                if (snapshot.val().uid === this.props.currentUser.uid) {
                    this.setState({accessToken: snapshot.val().accessToken})
                }
            });
        } catch (err) {
            throw err
        }
    }

    async getData() {
        try {
            const res = await axios.get(`http://localhost:8080/facebook?message=${this.state.search}&id=${this.state.pageId}&access_token=${this.state.accessToken}`)
            const data = res.data
            if (data.id)
                this.setState({confirm: true, error: false})
            else {
                this.setState({confirm: false, error: true})
                console.log(test)
            }
            } catch (err) {
            this.setState({confirm: false})
            this.setState({error: false})
        }
    }
    
    ApiCall(){
        return(
            <div style={{padding: "5px"}}>
                {this.state.error ?
                <div><b>Mauvais paramètres</b><br/></div> : <></>}
            </div>
        )
    }

    componentDidMount() {
        this.getToken()
        document.getElementById('updateButton')
            .addEventListener('click', this.updateData)
    }

    notCall(){
        return(
            <div>
                Vous devez être connecté à facebook pour utiliser ce widget
            </div>
        )
    }

    render () {
        return(
            <div>
                <input 
                    value={this.state.search}
                    type="text"
                    placeholder="Message du status"
                    onChange={this.updateEntry.bind(this)}
                    className="form-control mb-2"
                />
                <input 
                    value={this.state.pageId}
                    type="text"
                    placeholder="ID de la page Facebook"
                    onChange={this.updatePageID.bind(this)}
                    className="form-control mb-2"
                />
                <button id="updateButton" style={{size: this.width, color: 'black', backgroundColor: "red"}} 
                    onClick={() => this.getData()
                        }>S
                </button>
                {this.state.confirm ? <div><b>Status posté !</b></div> : <></>}
                {this.state.error ? <div><b>Error dans l'envoi du status</b></div> : <></>}
                {this.state.accessToken === "" ? this.notCall() : this.ApiCall()}
            </div>
        )
    }
}

export default Facebook