import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Styles.css";
import axios from 'axios';
import otpBg from "../images/OtpBg.jpg";
import { faKey,faUserCheck,faBroom} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const OtpInput = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const navigate = useNavigate()


  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  async function handleClick(event){
    let uInfo = getCookie("user-info")
    
    let userInfo = JSON.parse(uInfo)
    // console.log(userInfo);
    // console.log(typeof (userInfo));
    let userId = userInfo.userId;
    let challengeId = userInfo.challengeId;
    let userOtp = otp.join("");
    // console.log(userOtp);
    let item = { userId, challengeId, challenge: userOtp};
    
    axios("http://localhost:8000/login/SubmitOtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      data: JSON.stringify(item)

    })
    .then(res => {
      console.log(res.data);

      if(res.status === 200 ){
        if(res.data.verification === "Verified"){
          navigate("/books");
        }
        else{
          setError(res.data.verification);
        }
      }
      // if (typeof res.data === "string") {
      // }

    })
    .catch(e => {
      console.error(e)
    });
    
    event.preventDefault();
  }


  // const persistData = (data) => {
  //   setCookie("user-info", JSON.stringify(data), 0.041666);
  //   //Cookies.set("user-info",{expires: 7}, JSON.stringify(data));
  //   //localStorage.getItem("user-info", JSON.stringify(data));
  // };

  return (
    <>
      <div className="row"  style={{ backgroundImage: `url(${otpBg})` }}>
        <div className="col text-center">
          <h1><span><FontAwesomeIcon icon = {faKey}/></span><br/> Enter the OTP sent to you<br/> to verify your identity</h1>
          <div className = "inputsBox">
          {otp.map((data, index) => {
            return (
              <input
                className="otp-field otpInput"
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            );
          })}
          </div>

          <p className = "otpEnter">OTP Entered - <span> {otp.join("")}</span></p>
          <div className = "Btncont">
            <button
              className="btn btn-secondary mr-2 otp-sub"
              onClick={(e) => setOtp([...otp.map((v) => "")])}
            >
             <span><FontAwesomeIcon icon = {faBroom}/></span> Clear
            </button>
            <button
              className="btn btn-primary otp-sub"
              onClick={handleClick} //alert("Entered OTP is " + otp.join(""))
            >
             <span><FontAwesomeIcon icon = {faUserCheck}/></span> Verify OTP
            </button>
          </div>
          {error && <div className="error"> {error} </div>}

        </div>
      </div>
    </>
  );
};

export default OtpInput;
