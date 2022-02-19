import React from 'react';
import { faUserAlt, faSave, faUnlock, faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState,useEffect } from 'react';
import logBg from "../images/BookBg.jpg";
import { useNavigate } from "react-router-dom";
import "../ChangePass.css";
import axios from 'axios';

const ChangePass = (props) => {
    const [PrevPass, setPrevPass] = useState("");
    const [NewPass, setNewPass] = useState("");
    const [ConfmPass, setConfmPass] = useState("");
    const [error, setError] = useState(""); 
    const [checkFormt, setcheckFormt] = useState({chekLower:false,chekcap:false,cheklen:false,chekNum:false})
    const navigate = useNavigate()

    useEffect(()=>{
        console.log(NewPass)
        validateForm();

    },[NewPass])
 const validateForm = () => {
        var letter = document.getElementById("letter");
        var capital = document.getElementById("capital");
        var number = document.getElementById("number");
        var length = document.getElementById("length");
        let lowercaseLetter = /[a-z]/g;
        if (NewPass.match(lowercaseLetter)) {
            letter.classList.replace("invalid", "valid");
            // setcheckFormt({...checkFormt,chekLower:true})
        } else{
            letter.classList.replace("valid", "invalid");
            // setcheckFormt({...checkFormt,chekLower:false})
        }

        let uppercaseLetter = /[A-Z]/g;
        if (NewPass.match(uppercaseLetter)) {
            capital.classList.replace("invalid", "valid");
            // setcheckFormt({...checkFormt,chekcap:true})
        } else {
            capital.classList.replace("valid", "invalid");
            // setcheckFormt({...checkFormt,chekcap:false})
        }

        let num = /[0-9]/g;
        if (NewPass.match(num)) {
            number.classList.replace("invalid", "valid");
            // setcheckFormt({...checkFormt,chekNum:true})

        } else {
            number.classList.replace("valid", "invalid");
            // setcheckFormt({...checkFormt,chekNum:false})
        }

        if (NewPass.length >= 8) {
            length.classList.replace("invalid", "valid");
            // setcheckFormt({...checkFormt,cheklen:true})

        } else {
            length.classList.replace("valid", "invalid");
            // setcheckFormt({...checkFormt,cheklen:false})

        }
        console.log(checkFormt)
    }
   
    function clearInp() {
        setPrevPass('')
        setNewPass('')
        setConfmPass('')

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (NewPass === ConfmPass) {
            const body = {
                UserName: props.userid,
                CurrentPassWord: PrevPass,
                NewPassWord: ConfmPass
            }
            return (
                axios({
                    url: 'http://localhost:8000/changePasword',
                    method: "post",
                    data: body
                })
                    .then((res) => {
                        console.log(res.status)
                        console.log(typeof res.data);
                        if (typeof res.data === 'string') {
                            setError(res.data);
                            clearInp();
                            validateForm();

                        } else if (res.status === 201) {
                            alert("PassWord SuccessFully Updated !!!");
                            clearInp();
                            setError('');
                            validateForm();
                        }
                    })
                    .catch((err) => {
                        clearInp();
                        validateForm();
                    })
            )
        } else {
            clearInp();
            setError("password and confirm passWord does not match !!!");
        }
    }
    return <div>
        <div className="ChangePass" >
            <div className="ChngPassCont">
                <div className="NewPassValida">
                    <h1><span><FontAwesomeIcon icon={faUnlock} /></span><br /> Change Password</h1>
                    <h2>Password must contain the following :</h2>
                    <p id="letter" className="invalid">A <b>lowercase</b> letter</p>
                    <p id="capital" className="invalid">A <b>capital (uppercase)</b> letter</p>
                    <p id="number" className="invalid">A <b>number</b></p>
                    <p id="length" className="invalid">Minimum <b>8 characters</b></p>
                </div>
                <form className="Form1" onSubmit={handleSubmit}>

                    <input
                        type="password"
                        placeholder="Current Password"
                        value={PrevPass}
                        required
                        onChange={(e) => setPrevPass(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        value={NewPass}
                        required
                        onChange={(e) => {
                            setNewPass(e.target.value);
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={ConfmPass}
                        required
                        onChange={(e) => setConfmPass(e.target.value)}
                    />

                    <div className="Btncont">
                        <button
                            className="saveBtn"
                            type="submit"
                            required
                        >
                            Save <span><FontAwesomeIcon icon={faSave} /></span>
                        </button>
                        <button
                            className="CancelBtn"
                            onClick={() => { navigate("/books") }}
                        >
                            Cancel <span><FontAwesomeIcon icon={faBackward} /></span>
                        </button>
                    </div>
                    {error && <div className="error">{error} </div>}

                </form>
            </div>
        </div>
    </div>;
};

export default ChangePass;
