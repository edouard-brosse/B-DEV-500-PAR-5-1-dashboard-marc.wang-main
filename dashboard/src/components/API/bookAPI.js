//import React, { Fragment, Component, useState } from 'react';
import fetch from 'node-fetch';
import React, { useState, Fragment, useContext, useEffect, Component } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

class BookApi extends Component  {
    constructor() {
        super();
        this.state = {
            openModal : false,
            search: "labetehumaine",
            picture: "",
            error: "",
            title: "",
            date: "",
            author: "",
            publisher: "",
            description: "",
            ISBN: "",
            IMG: "",
            langue: "",
            lien: "NOT AVAIBLE",
        };
    }

    dataUp() {
        //fetch("https://api.covid19api.com/live/country/"+ this.state.search)
        fetch("https://www.googleapis.com/books/v1/volumes?q=$"+ this.state.search)
          .then(response => response.json())
          .then(data => this.setState({
              title: data["items"][0]["volumeInfo"]["title"],
              author: data["items"][0]["volumeInfo"]["authors"]['0'],
              publisher: data["items"][0]["volumeInfo"]["publisher"],
              date: data["items"][0]["volumeInfo"]['publishedDate'],
              description: data["items"][0]["volumeInfo"]['description'],
              ISBN: data["items"][0]["volumeInfo"]["industryIdentifiers"][0]["identifier"],
              langue: data["items"][0]['saleInfo']["country"],
              lien: data["items"][0]['accessInfo']["webReaderLink"],
              IMG: data["items"][0]["volumeInfo"]["imageLinks"]["thumbnail"],
             }), data => console.log(data))
          .catch(error => this.setState({ error, isLoading: false }));;
    }

    onChange = (event) => {
        this.setState({
            search: event.target.value,
        });
    }

    onOpenModal = e =>{
        e.preventDefault()
        this.setState({openModal : true})
    }

    onCloseModal = ()=>{
        this.setState({openModal : false})
    }

    renderModal() {
        return(
            <div>
                <Modal open={this.state.openModal} onClose={this.onCloseModal} styles={{width: "500px", height: "500px"}}>
                    <h1 style={{color: "black"}} >{this.state.title}</h1> 
                    <img src={this.state.IMG}></img><br/>
                    <span style={{color: 'red', textDecoration: 'underline red', fontWeight: 'bold'}} >author:</span> {this.state.author}<br/>
                    <span style={{color: 'red', textDecoration: 'underline red', fontWeight: 'bold'}} >publish date:</span> {this.state.date}<br/>
                    <span style={{color: 'red', textDecoration: 'underline red', fontWeight: 'bold'}} >publisher:</span> {this.state.publisher}<br/>
                    <span style={{color: 'red', textDecoration: 'underline red', fontWeight: 'bold'}} >description:</span> <br/>{this.state.description}<br/>
                    <span style={{color: 'red', textDecoration: 'underline red', fontWeight: 'bold'}} >ISBN:</span> {this.state.ISBN}<br/>
                    <span style={{color: 'red', textDecoration: 'underline red', fontWeight: 'bold'}} >langue:</span> {this.state.langue}<br/>
                    <span style={{color: 'red', textDecoration: 'underline red', fontWeight: 'bold'}} >ebook link:</span> <a href="url">{this.state.lien}</a> <br/>
                </Modal>
            </div>
        )
    }

    componentDidMount() {
        this.dataUp();
        document.getElementById('updateButton')
            .addEventListener('click', this.dataUp.bind(this), console.log("event click"))
    }

    ApiCall(){
        return(
            <div style={{padding: "5px"}}>
                <span style={{textDecoration: 'underline bolder', fontWeight: 'bold'}}> title: </span>{this.state.title} <br/>
                <span style={{textDecoration: 'underline bolder', fontWeight: 'bold'}}>author: </span>{this.state.author} <br/>
                <span style={{textDecoration: 'underline bolder', fontWeight: 'bold'}}>publisher: </span>{this.state.publisher} <br/>
                <span style={{textDecoration: 'underline bolder', fontWeight: 'bold'}}>publish date: </span>{this.state.date}
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
            <center>Book Data<br/>------------------------</center>
            {this.ApiCall()}
            <center>
                <button style={{bottom: "0"}} onClick={this.onOpenModal} ><b className="textButton">more information</b></button>
            </center>
            {this.renderModal()}
            </div>
        );
    }
}

export default BookApi