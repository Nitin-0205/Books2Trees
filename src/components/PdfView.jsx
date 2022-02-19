import React from 'react'
import { pdfjs } from 'react-pdf';
import { useState ,useEffect } from 'react';
import axios from 'axios';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


const PdfView = () => {
    const [pdfFile , setPdfFile] = useState(false)

    useEffect(()=>{
        getBookPdf();
    },[])

    function getBookPdf() {
        axios(`http://localhost:8000/book/pdfFile/82`, {
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
            setPdfFile(true)
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        !pdfFile &&
        <div >
            <h1 style={
                {height:'100vh',color:'green', display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",fontSize:"3rem"}
                } >Sorry !!! <br/>PDF File Not Found</h1>
        </div>
    )
}

export default PdfView;
