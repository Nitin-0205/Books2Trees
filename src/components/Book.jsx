import DefaultBokImg from "../images/defaultBookCov.jpg";
import "../BookHead.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Book = (props) => {
    const [bookData, setbookData] = useState([]);

    useEffect(() => {
        getData();
        AOS.init({
            duration: 800,
            offset: -5

        });
    }, []);

    function getData() {
        let user = {userId :props.userid};
        return (
            axios.post("http://localhost:8000/book",user)

                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        setbookData(res.data);
                        console.log(bookData);
                    }
                })
                .catch((err) => {
                    console.log('Error : ', err)
                })
        )
    }
    return (
        bookData.length === 0 ?
            <h1 className = 'SechBokNotFondtilt' 
            // style={{ position:"relative" , height: '100%', color: 'darkgreen', display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "3rem" }} 
            >Books Not Found</h1>
            :
            <ul className="bookCardCont">
                {
                    bookData.map((val, index) => {
                        return (
                            <li key={index}>
                                <div className="card" data-aos="zoom-in" data-aos-duration="500" >
                                    <div className='CardImgdiv' >
                                        <div className="CardImg">
                                            <span>
                                                <img src={DefaultBokImg} alt="Book Cover Not Available" />
                                            </span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                    <div className="CardTxt" >
                                        <h4>{val.Book_title}</h4>
                                        <a href={`/Bookinfo/${val.Id}`} className='bookInfo' data-aos="fade-right" data-aos-duration="500" >Info <span><FontAwesomeIcon icon={faSignInAlt} /></span></a>
                                        <p data-aos="flip-up" data-aos-duration="1000" data-aos-delay="100">Book Status : <span
                                            style={val.Status === "PENDING" ? { backgroundColor: 'red' } : { backgroundColor: 'green' }}
                                        >{val.Status}</span></p>
                                    </div>
                                </div>
                            </li>

                        )
                    })
                }
            </ul>

    )


}
export default Book;
