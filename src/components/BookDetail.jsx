import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState ,useContext} from "react";
import "../bookinfo.css";
import axios from "axios";
import DefaultBokImg from "../images/defaultBookCov.jpg";
import { faTrashAlt, } from "@fortawesome/free-regular-svg-icons";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useParams } from "react-router-dom";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


function BookDetail() {
    const {bookid} = useParams()
    const [bookinfo, setBookinfo] = useState([]);
    const [publishTime,setpublishTime] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        getbookdata();

        AOS.init({
            duration : 800,
            offset:-10,

        });
    });
    function getbookdata() {
        const url = `http://localhost:8000/book/bookInfo/${bookid}`;
        return (
            axios.get(url)
                .then((res) => {
                    if (res.status === 200) {
                        setBookinfo(res.data);
                        setpublishTime(res.data.TimeLeft);
                    }
                })
                .catch((err) => {
                    console.log('Error : ', err)
                })
        )
    }

    function DeleteBookFunc() {
        if (window.confirm(`Do Yo Really Want To Delete Book With Id ${bookinfo.Id}`)) {
            const url = `http://localhost:8000/book/delete/${bookinfo.Id}`;

            return (
                axios.delete(url)
                    .then((res) => {
                        console.log(res.status)
                        if (res.status === 200) {
                            alert("Book Is SuccessFully Deleted");
                            navigate("/books");
                        }
                    })
                    .catch((err) => {
                        console.log('Error : ', err)
                    })
            )
        } else {
            alert("Book Is Not Deleted")
        }
    }

    function getBookPdf() {
        axios(`http://localhost:8000/book/pdfFile/${bookid}`, {
            method: 'GET',
            responseType: 'blob' //Force to receive data in a Blob Format
        })
        .then((res) => {
            console.log("Pdf Status"+res.status)
            const file = new Blob(
              [res.data], 
              {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL,"_new");
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="container">
            <div className="padd">
                <div className="poster" data-aos="zoom-in" >
                    <img src={DefaultBokImg} alt="&#x1F631; Book Cover Poster" />
                </div>
                <div className="book_desc">
                    <h1 data-aos="fade-left">{bookinfo.Book_title}</h1>
                    <p data-aos="fade-left" data-aos-delay = "100"><span>Book Id :</span>{bookinfo.Id}</p>
                    <p data-aos="fade-left" data-aos-delay = "200"><span>Author :</span>{bookinfo.Author}</p>
                    <p data-aos="fade-left" data-aos-delay = "300"><span>Edition :</span>{bookinfo.Edition}</p>
                    <p data-aos="fade-left" data-aos-delay = "400"><span>Publication :</span>{bookinfo.Publication}</p>
                    <p data-aos="fade-left" data-aos-delay = "500"><span>Book Status :</span>{bookinfo.Status}</p>
                    <p data-aos="fade-left" data-aos-delay = "600"><span>Date On Uploaded :</span>{bookinfo.uploadDate}</p>
                    {
                        publishTime !== "" && <p className = "publishTim" data-aos="fade-left" data-aos-delay = "700"><span>Publish After :</span>{publishTime}</p>
                    }
                    <div className="detailbtns">
                        <button onClick={DeleteBookFunc}
                            style={bookinfo.Status === "PENDING" ? { display: 'block' } : { display: 'none' }}
                            className="deleteBtn"><FontAwesomeIcon icon={faTrashAlt} /> DELETE</button>
                        <button className="PdfFileBtn" onClick={getBookPdf}><FontAwesomeIcon icon={faBookOpen}></FontAwesomeIcon> View Book</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BookDetail;
