import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import logo from "../images/logo.png"
import "../index.css"
import { faBookMedical, faBars, faBell, faTimes,faSignOutAlt ,faCog,faBookOpen,faHourglassHalf,faUserAlt, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

const Header = () => {
    const  UserId = useSelector((state) => state.UserReducer);
    const [NotifyData, setNotifyData] = useState([])
    const [MessageOpenValue, setMessageOpenValue] = useState('');
    const [messageOpen, setMessageOpen] = useState(false);

    useEffect(() => {
        getNotification();
    },[])

    const getNotification = () => {
        return (
            axios.get(`http://localhost:8000/notification/${UserId}`)

                .then((res) => {
                    // console.log(res.data)
                    setNotifyData(res.data);
                })
                .catch((err) => {
                    console.log("ERROR", err);
                })
        )
    }

    // function NotifyOpen(e){
    //     console.log(e.target)

    // }

    const logOut = ()=>{
        localStorage.clear();
        window.location.href = "/";
    }
    const MessageHandel = (Id, set_ViewState) => {
        return (
            axios.post(`http://localhost:8000/notification/${Id}`, { state: set_ViewState })
                .then((res) => {
                    if (res.status === 201) {
                        setMessageOpen(false);
                    }
                })
                .catch((err) => {
                    console.log("ERROR", err);
                })
        )

    }
    const DeleteNotify = (Id) => {
        return (
            axios.delete(`http://localhost:8000/notification/${Id}`)
                .then((res) => {
                    if (res.status === 200) {
                        setMessageOpen(false);
                    }
                })
                .catch((err) => {
                    console.log("ERROR", err);
                })
        )

    }
    return (
        <div id="Header" className="">
            <div className="logoCont">
                <img src={logo} alt="Book2Trees Logo" className="Logoimage" />
                <h1 className="logoTitle">BOOK 2 TREES</h1>
            </div>
            <ul className="nav">
                <li><button className='notifyBtn'><FontAwesomeIcon icon={faBell}></FontAwesomeIcon><span>{NotifyData.length}</span></button>
                    <div className="notifyBox">
                        <div className="notifyboxCont">
                            <h3 id="notifyTitle"> Notifications</h3>

                            {
                                NotifyData.length !== 0 ?
                                    NotifyData.map((val, index) => {
                                        return (
                                            <div className="notyItemBox" key={index}
                                                onClick={() => { setMessageOpenValue(val); setMessageOpen(true); }}
                                                style={val.view_status === 'UNSEEN' ? { backgroundColor: 'rgb(225, 245, 255)' } : { backgroundColor: 'rgb(248, 248, 248)' }}>
                                                <img src={logo} alt="" />
                                                <div>
                                                    <h4>{val.title}</h4>
                                                    <p>{val.text}</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                    : <div><h4 className='NoNotifyMsg'>No Notification !!!</h4></div>
                            }
                            {
                                messageOpen ?
                                    <div className="messageBox">
                                        <div className='messageTopDiv'><button className="mrkRead" onClick={() => { MessageHandel(MessageOpenValue.Id, "UNSEEN") }}>Mark as unread</button><button className="deleteNotify" onClick={() => { DeleteNotify(MessageOpenValue.Id) }}>Delete</button><span onClick={() => { MessageHandel(MessageOpenValue.Id, "SEEN") }}><FontAwesomeIcon icon={faTimes} /></span></div>
                                        <p className='NotFyTime'>{MessageOpenValue.Notyf_Date} {MessageOpenValue.Notyf_Time}{MessageOpenValue.Notyf_Period}</p>
                                        <div className="message">
                                            <h3>{MessageOpenValue.title} </h3>
                                            <p>{MessageOpenValue.text}</p>
                                        </div>
                                    </div> : <></>
                            }
                        </div>
                    </div>
                </li>
                <li><Link to="/NewBook" className="NewBookBtn" title="Add New Book" >New <span><FontAwesomeIcon icon={faBookMedical}></FontAwesomeIcon></span> </Link></li>
                <li className="UserIco" id="UserIcoId" ><button id="menuBtn"
                    onClick={
                        () => {
                            var head = document.getElementById("menuBtn");
                            head.nextSibling.classList.toggle('menuDisplay');
                        }
                    }><span><img src={logo}/></span> <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon></button>
                    <ul className = "Items">
                        <li><Link to = "/Profile"  className="ItemsLink">Profile <span><FontAwesomeIcon icon={faUserAlt}/></span></Link></li>
                        <li><Link to="/Pending" className="ItemsLink">Pending Books <span><FontAwesomeIcon icon={faHourglassHalf}/></span></Link></li>
                        <li><Link to="/Published" className="ItemsLink">Published Books <span><FontAwesomeIcon icon ={faBookOpen}/></span></Link></li>
                        <li><Link to ="/" onClick={logOut} className="ItemsLink" on>Log Out <span><FontAwesomeIcon icon={faSignOutAlt}/></span></Link></li>
                    </ul>
                </li>
            </ul>

        </div>
    )
}

export default Header
