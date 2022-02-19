import React, { useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Styles.css";
import { useNavigate } from "react-router-dom";
import logBg from "../images/BookBg.jpg";
import { faUserAlt ,faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSelector ,useDispatch} from "react-redux";
import loginUser from "../Redux/action/action"

function Login() {
  const dispatch = useDispatch()
  //const Auth = useContext(AuthApi);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] =useState("");
  
  //const [auth, setAuth ] = useState(false);
  
  useEffect(() => {
    // if(localStorage.getItem('user-info')){
    //   history.push("/login/SubmitOtp")
    // }
    //readCookie();
    // if (Cookies.get("user-info")) {

    //   history.push("/login/SubmitOtp");
    // }
    // const fav = JSON.stringify(getCookie("user-info"));
    // console.log(typeof(fav));
    //console.log(getCookie("user-info"))
    

    if (getCookie("user-info")) {
      let uInfo = getCookie("user-info");

      if (uInfo.challengeSent === "Yes") {
        navigate("/login/SubmitOtp");
        //console.log(uInfo.challengeSent);
      }

      // if (typeof uInfo === "string") {
      //   setError(uInfo);

      // }else if (uInfo.statusCode !== 200 && typeof uInfo === "object") {
      //   //setAuth(true);

      //   setError(resData.message);
      // }

      // history.push("/login/SubmitOtp");
    }
  }, []);

  // const readCookie = () =>{
  //   //const user = Cookies.get("user-info");
   
  //   // if(user){
  //   //   setAuth(true);
  //   //   history.push("/login/SubmitOtp");
  //   // }
  // }
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
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  // useEffect(()=>{
  //   // if(localStorage.getItem('user-info')){
  //   //   history.push("/login/SubmitOtp")
  //   // }
  //   //readCookie();
  //   // if (Cookies.get("user-info")) {

  //   //   history.push("/login/SubmitOtp");
  //   // }
  //   const fav = JSON.stringify(getCookie("user-info"))
  //   console.log(fav);
  //   if(getCookie("user-info")){
  //     history.replace("/login/SubmitOtp");
  //   }
  // }, [])
  
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {  
    //setAuth(true);
    event.preventDefault();
  }

  async function handleClick(event){
    dispatch(loginUser(email))

    let item = {username: email, password};
    let result = await fetch("http://localhost:8000/login/username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(item)
    }).then((res) => res.json())
    .then(resData => {

      console.log(resData)
      
      if (resData.challengeSent === "Yes") {
        navigateToSubmitOtpPage();
        console.log(resData.challengeSent);
      }

      if (typeof resData === "string") {
        setError(resData);
      }else if (resData.statusCode !== 200 && typeof(resData) === "object") {
         //setAuth(true);
         
         setError(resData.message);
      }

      //console.log("my challenge id is", resData.challengeId);
      persistData(resData);
      clearInput();
    })
    .catch(e => {
      console.error(e)
    });
    
    event.preventDefault();
  }

  let navigateToSubmitOtpPage = () => {
     navigate("/login/SubmitOtp");
  };

  const persistData = (data) => {
    setCookie("user-info", JSON.stringify(data), 0.041666);
     //Cookies.set("user-info",{expires: 7}, JSON.stringify(data));
     //localStorage.getItem("user-info", JSON.stringify(data));

  };

  const clearInput = () => {
    setEmail("");
    setPassword("");
  };

  
  return (
    <div className="Login" style={{ backgroundImage: `url(${logBg})` }}>
      <Form className="Form1" onSubmit={handleSubmit}>
      <h1><span><FontAwesomeIcon icon = {faUserAlt}/></span><br/>Login</h1>
        <Form.Group size="lg" controlId="email" className="group">
          <Form.Control
            autoFocus
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password" className="group">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          block
          size="lg"
          type="submit"
          onClick={handleClick}
          disabled={!validateForm()}
        >
          Login <span><FontAwesomeIcon icon = {faSignInAlt}/></span>
        </Button>
        {error && <div className="error"> {error} </div>}

      </Form>
    </div>
  );
}

// const ProtectedLogin = ({ auth, component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={() =>
//         !auth ? <Component /> : <Redirect to="/login/SubmitOtp" />
//       }
//     />
//   );
// };

export default Login;
//export { getCookie };