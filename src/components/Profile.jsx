import { useEffect, useState } from "react";
import "../profile.css"
import { Chart } from 'react-google-charts'
import logo from "../images/logo.png"
import ChangePass from './ChangePass';
import { useSelector } from "react-redux";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Profile = () => {
    const UserId = useSelector((state) => state.UserReducer);
    const [switchmen, setswitchmen] = useState("");
    const [PublishBookNo, setPublishBookNo] = useState("");
    const [PendingBookNo, setPendingBookNo] = useState("");

    useEffect(() => {
        getBookCount();

        AOS.init({
            duration: 800,
            offset: -10
        });
    }, []);

    function getBookCount() {
        let user = { userId: UserId };

        axios.post(`http://localhost:8000/book/publish/PENDING`, user)

            .then((res) => {
                if (res.status === 201 || res.status === 200) {
                    setPendingBookNo(res.data);
                }
            })

        axios.post(`http://localhost:8000/book/publish/PUBLISHED`, user)

            .then((res) => {
                if (res.status === 201 || res.status === 200) {
                    setPublishBookNo(res.data);
                }
            })
        return
    }
    const data = [
        ["Status", "Number Of Books"],
        ["Pending", PendingBookNo.length],
        ["Published", PublishBookNo.length],
    ];

    const options = {
        title: "Book Status",
        is3D: true,
        titleTextStyle: {
            color: 'dimgray',
            fontName: 'Arial',
            fontSize: 20
        },
        legendFontSize: 15,
        legend: {
            position: 'bottom',
            alignment: 'center',
            orientation: 'vertical',
        },
        backgroundColor: 'white',
        colors: ['red', 'green']

    };

    const Hand = (e) => {
        let listItem = document.getElementsByClassName("profListContItems");
        for (let i = 0; i < listItem.length; i++) {
            listItem[i].classList.remove("activeCls")
        }
        e.target.classList.add("activeCls")
    }

    return (
        <div id='Profile'>
            <div className="profileDash">
                <div className="Book2TreeLog"><img src={logo} /></div>
                <h1>Company Name</h1>
                <ul className="profListCont">
                    <li className="profListContItems activeCls" onClick={(e) => { Hand(e); setswitchmen(''); }}>Details</li>
                    <li className="profListContItems" onClick={(e) => { Hand(e); setswitchmen("chngpass") }}>Change Password</li>
                </ul>
            </div>
            <div id="Box">
                {
                    switchmen === '' &&
                    <div className="profCont">
                        <div className="profileDetail">
                            <p><span>Name </span>Andrew Mathew</p>
                            <p><span>User Id </span>Andrew5125</p>
                            <p><span>Email </span>exampleEmail@gmail.com</p>
                            <p><span>Contact No </span>457155652</p>

                        </div>
                        <div className="pendPubChart">
                            <Chart
                                chartType="PieChart"
                                data={data}
                                options={options}
                                width={"100%"}
                                height={"100%"}

                            />
                        </div>
                    </div>
                }
                {
                    switchmen === 'chngpass' &&
                    <ChangePass userid={UserId} />
                }
            </div>
        </div>
    )
}

export default Profile
