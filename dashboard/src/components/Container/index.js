import React, { Fragment, Component } from 'react'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { db } from '../Provider/SetupFirebase'
import Weather from '../API/weaterAPI';
import BookApi from '../API/bookAPI';
import CovidApi from '../API/covidAPI';
import TimeApi from '../API/Time';
import SuperApi from '../API/superHeros';
import Facebook from '../API/facebook';

class MainPage extends Component {
    constructor() {
        super();
        this.state = {
            height: "220px",
            width: "300px",
            Widget: "",
            items: [],
            LWidget: [],
            wName: [],
            windowWidth: window.innerWidth,
            test: [],
            tab: [
                {
                    Id: 0,
                    widget: "",
                    userInput: "",
                    parameter: "Later",
                    length: "220px",
                    height: "300px",
                }
            ],
            widgect: [],
            openModal: false,
            key: "",
        };
    }

    onChange(event) {
        this.setState({
            userInput: event.target.value,
        });
    }

    displayW(tab) {
        if (tab.widget === "google Book") {
            return (<BookApi></BookApi>)
        } else if (tab.widget === "SuperApi") {
            return (<SuperApi></SuperApi>)
        } else if (tab.widget === "Facebook") {
            return (<Facebook
                currentUser={this.props.currentUser}></Facebook>)
        } else if (tab.widget === "TimeApi") {
            return (<TimeApi></TimeApi>)
        } else if (tab.widget === "Covid") {
            return (<CovidApi></CovidApi>)
        } else if (tab.widget === "METEO") {
            return (<Weather></Weather>)
        } else {
            return (<b>Nothing</b>)
        }
    }

    RenderWid1() {
        return (
            <Fragment>
                {
                    this.state.tab.map(tab => {
                        if (tab.Id > 0) {
                            return (
                                <div key={tab.Id} style={{ margin: "10px 10px" }}>
                                    <div style={{ borderColor: "red", borderRadius: "30px", width: tab.length, height: tab.height, backgroundColor: 'grey', margin: "10px 10px", flexWrap: "wrap", }}>
                                        <div style={{ margin: "15px 15px", display: "flex" }}>
                                            <div style={{ width: tab.length, height: "20px", }}>
                                                [{tab.Id}] w: {tab.widget}
                                            </div>
                                            <button style={{ size: (tab.length - 25), color: 'black', backgroundColor: "red" }} onClick={this.DeleteWidget.bind(this, tab)}>X</button>
                                        </div>
                                        {this.displayW(tab)}
                                    </div>
                                </div>)
                        }
                    })}
            </Fragment>
        )
    }

    addWidgetToDb = async (widgetInfo) => {
        try {
            const myRef = db.ref(`users`)
            const widget = {
                Id: widgetInfo.Id,
                widget: widgetInfo.widget,
                parameter: widgetInfo.parameter,
                userInput: this.state.userInput,
                length: "200px",
                height: "300px",
            }
            myRef.orderByKey().on('child_added', (snapshot) => {
                const user = db.ref(`users/${snapshot.key}`)
                if (snapshot.val().uid === this.props.currentUser.uid) {
                    user.push(widget)
                }
            });
        } catch (err) {
            throw err
        }
    }
    getDBWidget = async () => {
        try {
            const myRef = db.ref(`users`)
            let tab = [
                {
                    Id: 0,
                    widget: "",
                    userInput: "",
                    parameter: "Later",
                    length: "200px",
                    height: "200px",
                }]
            myRef.orderByKey().on('child_added', (snapshot) => {
                const user = db.ref(`users/${snapshot.key}`)
                if (snapshot.val().uid === this.props.currentUser.uid) {
                    user.orderByChild('Id').on('value', (snapshot) => {
                        snapshot.forEach((snap) => {
                            if (snap.val().Id)
                                tab.push(snap.val())
                        })
                    })
                }
            })

            this.setState({ ...this.state.tab, tab })
        } catch (err) {
            throw err
        }
    }
    addWidget(event) {
        event.preventDefault();
        this.setState({
            tab: [...this.state.tab,
            {
                Id: this.state.tab.pop().Id + 1,
                widget: this.state.widgect,
                userInput: this.state.userInput,
                parameter: this.state.widgect,
                length: "220px",
                height: "300px",
            }],
            userInput: '',
            Widget: '',
        }, () => {
            this.state.tab.map((tab) => {
                if (this.state.tab.length === tab.Id + 1) {
                    this.addWidgetToDb(tab)
                }
            })
        })
    }

    async DeleteWidget(tab) {
        const array = this.state.tab;
        const index = array.indexOf(tab);
        array.splice(index, 1);
        console.log(index)
        const myRef = db.ref(`/users/`)
        myRef.orderByKey().on('value', (snapshot) => {
            snapshot.forEach((snapUser) => {
                const user = db.ref(`users/${snapUser.key}`)
                if (snapUser.val().uid === this.props.currentUser.uid) {
                    user.orderByChild('Id').on('value', (snapusr) => {
                        snapusr.forEach((snapWid) => {
                            if (snapWid.val().Id && snapWid.val().Id == index) {
                                const widgetDel = db.ref(`users/${snapUser.key}/${snapWid.key}`)
                                try {
                                    widgetDel.remove()
                                } catch (error) {
                                    console.error('Failed to remove widget')
                                }
                            }
                        })
                    })
                }
            })
        })
        this.setState({
            tab: array
        });
    }

onClickButton = e => {
    e.preventDefault()
    this.setState({ openModal: true })
}

onCloseModal = () => {
    this.setState({ openModal: false })
}

sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

renderButton(wType, WidgetType) {
    return (
        <div>
            <button style={ModStyle}
                onClick={(e) => {
                    this.setState({ widgect: WidgetType }, () => {
                        this.addWidget(e, "MANUAL ENRTY")
                    });
                }}
                className="">
                <p style={{ color: "black" }}>{wType}</p>
            </button>
        </div>
    )
}

renderModal() {
    return (
        <div>
            <Modal open={this.state.openModal} onClose={this.onCloseModal}>
                <h1 style={{ color: "black" }} >Choose your Widget</h1>
                <div style={{ display: "inline-flex", flexDirection: "-moz-initial", lineHeight: "200px", }}>
                    {this.renderButton("Ajouter google Book", "google Book")}
                    {this.renderButton("Ajouter SuperHero", "SuperApi")}
                    {this.renderButton("Ajouter Facebook", "Facebook")}
                </div>
                <div style={{ display: "flex" }}>
                    {this.renderButton("Ajouter Time", "TimeApi")}
                    {this.renderButton("Ajouter Covid", "Covid")}
                    {this.renderButton("Ajouter Meteo", "METEO")}
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
    return (
        <div>
            <div style={style, { display: 'flex', flexWrap: "wrap", flex: '1 1' + windowWidth }}>
                {this.RenderWid1()}
            </div>
            <button className="addWidjectButton" onClick={this.onClickButton} ><b className="textButton">Ajouter un widget</b></button>
            <button className="addWidjectButton" onClick={this.getDBWidget} ><b className="textButton">Retrouver tes widgets</b></button>
            {this.renderModal()}
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