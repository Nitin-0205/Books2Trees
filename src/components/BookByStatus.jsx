import DefaultBokImg from "../images/defaultBookCov.jpg";
import "../BookHead.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookDead, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector } from "react-redux";

const BookByStatus = (props) => {
    const  UserId = useSelector((state) => state.UserReducer);
    const [bookData, setbookData] = useState([]);


    useEffect(() => {
        getDataByStatus();
        AOS.init({
            duration: 800,
            offset: -10
        });
    }, []);

    function getDataByStatus() {
        let user = {userId :UserId};
        return (
            axios.post(`http://localhost:8000/book/publish/${props.status}`,user)

                .then((res) => {
                    if (res.status === 201 || res.status === 200) {
                        setbookData(res.data);
                        console.log(res.data)
                    }
                })
                .catch((err) => {
                    console.log('Error : ', err)
                })
        )
    }
    return (
        bookData.length === 0 ?
        <h1 className="notFoundHead" ><span ><FontAwesomeIcon icon = {faBookDead}/></span> No Book {props.status} Yet !!!</h1>
            :
        <div id='Books'>
            <h1 data-aos="fade-down"
                style={props.status === "PENDING" ? { backgroundImage: 'linear-gradient(#cc2900,#ff5c33)' } : { backgroundImage: 'linear-gradient(#218341,#25ce5d)' }}
                className='BookTypHeading'>{props.status} BOOKS</h1>
            <div id="bookCont" >
                <ul className="bookCardCont">
                    {
                        bookData.map((val, index) => {
                            return (

                                <li key={index}>
                                    <div className="card" data-aos="zoom-in">
                                        <div className='CardImgdiv'>
                                            <div className="CardImg">
                                                <span>
                                                    <img src={DefaultBokImg} alt="Book Cover Not Available" />
                                                </span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </div>
                                        <div className="CardTxt">
                                            <h4>{val.Book_title}</h4>
                                            <a href={`/Bookinfo/${val.Id}`} className='bookInfo' data-aos="fade-right" data-aos-duration="500">Info <span><FontAwesomeIcon icon={faSignInAlt} /></span></a>
                                            <p data-aos="flip-up" data-aos-duration="1000" data-aos-delay="100">Book Status : <span
                                                style={val.Status === "PENDING" ? { backgroundColor: 'red' } : { backgroundColor: 'green' }}
                                            >{val.Status}</span></p>
                                        </div>
                                    </div>
                                </li>)
                        }
                        )
                    }
                </ul>

            </div>
        </div>

    )


}
export default BookByStatus;