import React, { useState, Fragment, useContext, useEffect, Component } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { wait } from '@testing-library/dom';

toast.configure();

const { windowWidth: width, windowHeight: height } = window;

class MainPage extends Component {
    constructor() {
        super();
        this.state = {
            height: '',
            width: "200px",
            widgect: "200px",
            userInput: 'user',
            items: [],
            LWidgect: [],
            wName: [],
            //test: [[]],
            windowWidth: window.innerWidth,
            test: [],
            //test2: [{userInput: this.userInput,width: this.width, widgect: this.widgect}],
            openModal : false,
        };
    }

    onChange(event) {
        this.setState({
            userInput: event.target.value,
        });
    }

    addWidgect(event, widgect) {
            event.preventDefault();
            this.setState({
                userInput: '',
                widgect:'',
                //test: [...this.setState.test, [...this.state.test[0], this.state.userInput],[...this.state.test[1], this.state.width]],
                items: [...this.state.items, this.state.userInput],
                LWidgect: [...this.state.LWidgect, widgect],
            });
    }

    msg(msg){
        toast("too many widgects", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: "toastify-color-MainPage"
        });
    }

    deleteWidgect(item) {
        // no event 
        // pass the item to indexOf
        const array = this.state.items;
        const index = array.indexOf(item);
        array.splice(index, 1);
        this.setState({
            items: array
        });
    }


    onClickButton = e =>{
        e.preventDefault()
        this.setState({openModal : true})
    }

    onCloseModal = ()=>{
        this.setState({openModal : false})
    }
    
    renderWidgect() {
        return this.state.items.map((item) => {
            return (
                <div  key={item} style={{margin: "10px 10px"}}>
                    <div style={{borderColor: "red", borderRadius: "30px",  width: "200px", height: "200px", backgroundColor: 'grey', margin: "10px 10px", flexWrap: "wrap",}}>
                        <div style={{margin: "15px 15px", display:"flex"}}>
                            <div style={{width: "138px", height: "20px", }}> 
                                {item} 
                                {this.state.LWidgect}
                            </div>
                            <button style={{size: this.width, color: 'black', backgroundColor: "red"}} onClick={this.deleteWidgect.bind(this, item)}>X</button>
                            {}
                            </div>
                    </div>
                </div>    
            );
        });
    }

    

    renderButton(wType, widgectType) {
        return(
            <div>
                <button style={ModStyle} onClick={() => {
                    //if(this.windowWidth.length <= 10 ) {
                        this.setState({widgect: wType, userInput: wType}); 
                        //this.addWidgect.bind(this);
                    //}else{
                    //        this.msg("too many widgect")
                    //}
                }, this.addWidgect.bind(this)} className="btn btn-primary">
                    <p style={{color: "black"}}>{wType} {widgectType} test{this.widgect}</p>
                </button>
            </div>
        )
    }

    renderModal() {
        return(
            <div>
                <Modal open={this.state.openModal} onClose={this.onCloseModal}>
                    <h1 style={{color: "black"}} >Chouse your widgect</h1> 
                    <div style={{display: "inline-flex", flexDirection: "-moz-initial", lineHeight: "200px", }}>
                        {this.renderButton("ADD SUPER HERO API", "Hero API")}
                        {this.renderButton("ADD Youtube", "Youtube")}
                        {this.renderButton("ADD Gmail", "GMAIL")}
                    </div>
                    <div style={{display: "flex"}}>
                        {this.renderButton("ADD Twiter", "TWITER")}
                        {this.renderButton("ADD FACE BOOK", "Face DE BOOK")}
                        {this.renderButton("ADD METEO", "METEO")}
                    </div>
                </Modal>
            </div>
        )
    }

    handleResize = (e) => {
        this.setState({ windowWidth: window.innerWidth });
       };

    componentDidMount() {
     window.addEventListener("resize", this.handleResize);
    }

    render() {
        const { windowWidth } = this.state; 
        const { items } = this.state; 
        return (
            <div>
                <div style={style, {display: 'flex', flexWrap: "wrap", flex: '1 1' + windowWidth}}>
                    {this.renderWidgect()}
                </div>
                <input 
                    value={this.state.userInput}
                    type="text"
                    placeholder="renseigner un item"
                    onChange={this.onChange.bind(this)}
                    className="form-control mb-2"
                />
                <button style={style} 
                    onClick={this.addWidgect.bind(this)} 
                    className="btn btn-primary">
                    <p style={{color: "black"}}>ADD Widgect</p>
                </button>
                <button onClick={this.onClickButton}>modal</button>

                {this.renderModal()}
                taille [{windowWidth}]
                 | itmes [{items.length}]
            
            </div>
        )
    }
}

const style = {
    color: "#ffff",
    borderColor: "red",
    borderRadius: "5px",
    width: "100px",
    height: "100px",
    padding: "20px 20px",
    margin: "10px 10px",
}

const ModStyle = {
    color: "#ffff",
    borderColor: "red",
    borderRadius: "5px",
    width: "200px",
    height: "200px",
    padding: "20px 20px",
    margin: "10px 10px",
}

export default MainPage