import axios from "axios";
import { useState, useEffect } from "react";
import { appRoutes } from "../../constant/constant";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";



export default function Students() {
    const [students, setStudents] = useState({
        count: 0,
        students: [],
        studentByCourse: [],
    });
    const [courses, setCourses] = useState([]);
    const [filter, setFilter] = useState({
        course: "all",
        aboveAge: "all",
        belowAge: "all",
        city: "all",
    });
    useEffect(() => {
        getStudents();
        getCourses();
    }, [filter])

    const getStudents = () => {
        axios
            .get(
                `${appRoutes.getStudents}? 
            course=${filter.course}&aboveAge=${filter.aboveAge}&belowAge=${filter.belowAge}&city=${filter.city}`,
                {
                    headers: {
                        Authorization: `Bearer` + Cookies.get("token"),
                    },
                }
            )
            .then((res) => {
                setStudents(res.data?.data)
                console.log("Students=>", res.data);
            });
    };

    const getCourses = () => {
        if (!courses.length) {
            axios
                .post(appRoutes.getCourse, {
                    headers: {
                        Authorization: `Bearer` + Cookies.get("token"),
                    },
                })
                .then((res) => {
                    setCourses(res.data?.data)
                    console.log("Courses=>", res);
                });

        }
    }


    return (
        <div>
            Students Here
        </div>
    )
}