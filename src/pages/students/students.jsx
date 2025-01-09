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
            <div className="container mx-auto p-4" >
                <h1 className="text-2xl w-full  font-bold gap-10 bg-blue-400">Students</h1>
                <div>
                    <select
                        onChange={(e) => setFilter({ ...filter, course: e.target.value })}
                        className="w-56 border p-2"
                    >
                        <option key={"all"} value={"all"}>
                            Select Course
                        </option>
                        {courses.map((data) => (
                            <option key={data._id} value={data._id}>
                                {data.title}
                            </option>
                        ))}

                    </select>
                    <select
                        onChange={(e) => setFilter({ ...filter, aboveAge: e.target.value })}
                        className="w-56 border p-2"
                    >
                        <option key={"all"} value={"all"}>

                            Above Age
                        </option>
                        {[...Array(100).keys()].map((data) => (

                            <option key={data} value={data}>
                                {data}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={(e) => setFilter({ ...filter, belowAge: e.target.value })}
                        className="w-56 border p-2"
                    >
                        <option key={"all"} value={"all"}>
                            Below Age
                        </option>
                        {[...Array(100).keys()].map((data) => (
                            <option key={data} value={data}>
                                {data}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={(e) => setFilter({ ...filter, city: e.target.value })}
                        className="w-56 border p-2"
                    >

                        <option key={"all"} value={"all"}>
                            Select City
                        </option>

                        {
                            [
                                "Lahore",
                                "Islamabad",
                                "Karachi",
                                "Quetta",
                                "Multan",
                                "Rawalpindi",
                                "Faisalabad",
                            ]
                                .map((data) => (
                                    <option key={data} value={data}>
                                        {data}
                                    </option>
                                ))
                        }

                    </select>

                    <h1 className="text-5xl font-bold text-end flex-grow">
                        {students.count} Students
                    </h1>

                </div>
                <div className="flex gap-10 mt-5">
                    {students.studentByCourse.map((data) => (

                        <div key={data._id} className="border p-2 shadow rounded  my-2">
                            <h1 className="font-bold ">
                                {data.course.title} : {data.totalQuantity}
                            </h1>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-10 mt-5">
                    {students?.students?.map((student) => {
                        return (
                            <div key={student._id} className="border p-2 shadow rounded overflow-hidden">
                                <div>

                                <h1 className="font-bold ">
                                    {student.name + " " + student.father_name}
                                </h1>
                                <h1 className="font-bold ">{student.city}</h1>
                                <h1>Course : { student.course.title} </h1>
                                <h1>Age : { student.age} </h1>
                                <h1>City : { student.city} </h1>
                                <h1>Country : { student.country} </h1>
                                </div>
                            </div>
                        )

                    })}
                </div>
            </div>
        </div>
    )
} 