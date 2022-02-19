import { useEffect, useState } from 'react';
import '../newBook.css'
import background from '../images/newbookBg.jpg';
import axios from 'axios';
import { faBookReader, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AOS from 'aos';
import bookIcon from '../images/redBookImg.png';
import { useSelector } from "react-redux";


function NewBook() {
    const  UserId = useSelector((state) => state.UserReducer);
    const [booktitle, setBookTitle] = useState('');
    const [Edition, setBookEdition] = useState('');
    const [Author, setAuthor] = useState('');
    const [Publication, setPublication] = useState('');

    const [bookForYear, setbookForYear] = useState('');

    const [bookForBranch, setbookForBranch] = useState('');

    const [ImgFileValue, setImgFileValue] = useState('');
    const [ImgFile, setImgFile] = useState('');

    const [File, setFile] = useState('');
    const [Filevalue, setFilevalue] = useState('');

    const yearOpt = [
        { 
            label: "Select For Year",
            value: "",
        },
        { 
            label: "1st Year",
            value: "1st Year",
        },
        {
            label: "2nd Year",
            value: "2nd Year",
        },
        {
            label: "3rd Year",
            value: "3rd Year",
        },
        {
            label: "4th Year",
            value: "4th Year",
        }
    ];
    const BranchOpt = [
        { 
            label: "Select Branch",
            value: "",
        },
        {
            label: "Electrical/Electronic Engineering",
            value: "Electrical/Electronic Engineering"
        },
        {
            label: "Mechanical Engineering",
            value: "Mechanical Engineering"
        },
        {
            label: "Civil Engineering",
            value: "Civil Engineering"
        },
        {
            label: "Chemical Engineering",
            value: "Chemical Engineering"
        },
        {
            label: "Thermal Engineering",
            value: "Thermal Engineering"
        },
        {
            label: "Computer Engineering",
            value: "Computer Engineering"
        },
        {
            label: "Information Technology",
            value: "Information Technology"
        },
    ]

    useEffect(() => {
        AOS.init({
            duration: 700,
            offset: 10,
        })
    }, [])

    const clearFields = () => {
        setBookTitle('');
                setBookEdition('');
                setAuthor('');
                setPublication('');
                setbookForYear('')
                setbookForBranch('');
                setImgFileValue('');
                setImgFile('');
                setFile('');
                setFilevalue('')
    }

    const formAction = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("User_Id", UserId);
        formData.append("Book_title", booktitle);
        formData.append("Edition", Edition);
        formData.append("Author", Author);
        formData.append("Publication", Publication);
        formData.append("BookForYear", bookForYear);
        formData.append("Branch", bookForBranch);
        formData.append("CoverImage",ImgFile);
        formData.append('file', File);


        axios.post("http://localhost:8000/book/NewBook",
            formData
        )
            .then((res) => {
                console.log(res.status)
                console.log(res.data)
                if (res.status === 201) {
                    clearFields();
                    alert('Book is Added to the Database')
                } else {
                    alert('Something Went Wrong From the Server !!!')

                }
            })
            .catch((e) => {
                console.log('Error', e)
                clearFields();
                alert('Something Went Wrong !!!')
            })
    }
    function ImgFileValidateAndHandel(e) {
        var filePath = e.target.value;

        var allowedExtensions = 
                    /(\.jpg|\.jpeg|\.png|\.gif)$/i;

        if (!allowedExtensions.exec(filePath)) {
            alert('Invalid file type');
            setFilevalue('');
            setImgFileValue('');
            return false;
        }else{
             setImgFile(e.target.files[0]); 
             setImgFileValue(e.target.value);
        }
    }

    function BookFileValidateAndHandel(e) {
        console.log(e.target.value)
        var filePath = e.target.value;

        // Allowing file type
        var allowedExtensions =
            /(\.pdf)$/i;

        if (!allowedExtensions.exec(filePath)) {
            alert('Invalid file type');
            setFile(''); 
            setFilevalue('');
            return false;
        }else{
             setFile(e.target.files[0]); 
             setFilevalue(e.target.value); 
            }
        
    }

    return (
        <div style={{ backgroundImage: `url(${background})` }} id='uploaddiv'>
            <form onSubmit={formAction} data-aos="flip-up" data-aos-duration="400" id='uploadForm'>
                <img className="BookreadIcon" src={bookIcon} />

                <input className='formField'
                    data-aos="fade-up" data-aos-delay='100'
                    name='Book_title' type="text" value={booktitle} placeholder="Book Title" onChange={(e) => { setBookTitle(e.target.value) }} required />
                <input className='formField'
                    data-aos="fade-up" data-aos-delay='100'
                    name='Edition' type="text" value={Edition} placeholder="Edition" onChange={(e) => { setBookEdition(e.target.value) }} required />

                <input className='formField'
                    data-aos="fade-up" data-aos-delay='200'
                    name='Author' type="text" value={Author} placeholder="Author" onChange={(e) => { setAuthor(e.target.value) }} required />

                <input className='formField'
                    data-aos="fade-up" data-aos-delay='300'
                    name='Publication' type="text" value={Publication} placeholder="Publication" onChange={(e) => { setPublication(e.target.value) }} required />

                <select className='formField' 
                                    data-aos="fade-up" data-aos-delay='400'
                                    value={bookForYear} onChange={(e) => { setbookForYear(e.target.value);}}>
                    {yearOpt.map((opt) => {
                        return <option value={opt.value} selected>{opt.label}</option>
                    })}
                </select>
                <select className='formField'
                                    data-aos="fade-up" data-aos-delay='500'
                                    value={bookForBranch} onChange={(e) => { setbookForBranch(e.target.value) }} >
                    {BranchOpt.map((opt) => {
                        return <option value={opt.value} selected>{opt.label}</option>
                    })}
                </select>

                <div className="formuplode" data-aos="fade-up" data-aos-delay='600'>
                <label htmlfor="Image"> Select a Book Cover Image to upload in <br/> <span>jpg,jpeg,png</span> format</label>
                    <input name='Image' type="file" placeholder="Image" value={ImgFileValue} onChange={ImgFileValidateAndHandel} />
                </div>
                <div className="formuplode" data-aos="fade-up" data-aos-delay='100'>
                <label htmlfor="File"> Select a Book File to upload in <br/> <span>.pdf</span> format</label>
                    <input name='File' type="file" placeholder="File" value={Filevalue} onChange={BookFileValidateAndHandel} required />
                </div>

                <button id='formBtn'
                    data-aos="fade-left" data-aos-delay='200' data-aos-offset='-50'
                    type='submit' ><FontAwesomeIcon icon={faCloudUploadAlt} /> Upload</button>
            </form>
        </div>
    )

}

export default NewBook;