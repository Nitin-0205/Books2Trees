import { useState ,useEffect} from "react";
import LoadingGif from "../images/loading.gif";
import "../BookHead.css";
import { faSearch ,faBook,faHourglassHalf,faBookOpen, faSwatchbook, faBookDead} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Book from "./Book";
import AOS from 'aos';
import 'aos/dist/aos.css';
import SearchBook from "./SearchBook";
import Header from './Header';
import Footer from './Footer';
import { useSelector } from "react-redux";


function BookHead(){
    const  UserId = useSelector((state) => state.UserReducer);
    const [loadState,setLoadState] = useState(false);
    const [Search,setSearch] = useState("");
    const [SearchBookState , setSearchBookState] = useState(false)

    useEffect(()=>{
        setLoadState(true)
        setTimeout(()=>{setLoadState(false)},3000)
        
        AOS.init({
            duration : 500

        });
    },[])


    function SearchBookHandle(){
        if(Search.length !== 0 ){
            setSearchBookState(true);
        }else{
            setSearchBookState(false);
        }
    }

    return(
        loadState ?
        <div id = 'Loading' style={{ backgroundImage: `url(${LoadingGif})` }}>
        </div>
        :
        <>
        <Header/>
        <div id = 'Books'>
            <div className="searchCont" data-aos="zoom-in">
               <input type="text" placeholder="Search Books" name="Searchbook" id="searchinput" value ={Search} onChange={(e)=>{setSearch(e.target.value); setSearchBookState(false);}}/>
               <button className="SearchBtn" type="submit" onClick={SearchBookHandle}><FontAwesomeIcon icon = {faSearch}/><span>Search</span></button>
            </div>
            <div id="bookCont" >
                <span className="overlay"></span>
            {
                SearchBookState ?
                <SearchBook bookName = {Search} userid = {UserId}/>
                :
                <Book userid = {UserId}/>
            }
            </div>
        </div>
        <Footer/>
        </>
    )

}
export default BookHead;

// <h1 
        //    style={{ backgroundImage:'linear-gradient(#0000ff,#8080ff)' }}
        //    className = 'BookTypHeading'><FontAwesomeIcon icon={faBookOpen}></FontAwesomeIcon> All Books</h1> 

// <div className="bookcat">
            //     <a className="newbookBtn" href="/NewBook" data-aos="fade-left" data-aos-delay='100'><span><FontAwesomeIcon icon ={faBook}/></span><h2>New Book</h2></a>
            //     <a className="pendbookBtn" href="/Pending" data-aos="fade-left" data-aos-delay='200'><span><FontAwesomeIcon icon ={faHourglassHalf}/></span><h2>Pending</h2></a>
            //     <a className="pubbookBtn" href="/Published" data-aos="fade-left" data-aos-delay='400'><span><FontAwesomeIcon icon = {faBookOpen}/></span><h2>Published</h2></a>
            // </div>