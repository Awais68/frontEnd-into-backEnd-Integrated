import { useEffect, useState } from "react";
import Navbar from "../../components/Header";

import { appRoutes } from "../../constant/constant.js";
import axios from "axios";
import Cookies from "js-cookie"



export default function User() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses();
    }, []);
    const getCourses = () => {
        // console.log("cookies in getcourses>", Cookies.get('token'));
        
        axios.get(appRoutes.getCourse,{
            headers: {
                Authorization: `Bearer` + " " + Cookies.get('token')
            }
        })
            .then((res) => {
                // console.log("Courses=>", res)
            })
            .catch(err => {
                console.log("err", err);
                
            })
    }
    return (
        <Navbar />
    )
}