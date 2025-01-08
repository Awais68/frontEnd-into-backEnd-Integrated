import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Header";

import { appRoutes } from "../../constant/constant.js";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext.jsx";

export default function User() {
    const { setUser } = useContext(AuthContext)
    const [courses, setCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCourse, setNewCourse] = useState({
        title: "",
        description: "",
        thumbnail: "",
    });

    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = () => {
        axios
            .get(appRoutes.getCourse, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            })
            .then((res) => {
                console.log("res>", res),
                setCourses(res.data?.data)
                console.log("Courses=>", res);
            })
            .catch((err) => {
                console.log("Error fetching courses", err);
            })

    };

    const handleAddCourse = () => {
        // console.log("cookies in handleCourse>", Cookies.get("token"));
        console.log("New Course=>", newCourse);
        axios
            .post(
                appRoutes.addCourse, newCourse,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                }
            )
            .then((res) => {
                // console.log("cookies in axios catch>", Cookies.get("token"));
                console.log("Course added successfully!", res);

                setShowModal(false);
                // getCourses(); // Refresh courses after adding
            })
            .catch((err) => {
                console.log("Error adding course", err);
                console.log("cookies in axios catch>", Cookies.get("token"));
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse({ ...newCourse, [name]: value });
    };



    return (
        <>
            <Navbar />
            <div className="p-4 mx-auto max-w-full">
                <div className="flex justify-end gap-4 items-center mt-4 mx-auto">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 gap-4 rounded hover:bg-blue-600"
                        onClick={() => setShowModal(true)}
                    >
                        Add Course
                    </button>


                    <button
                        className="bg-blue-500 text-white px-4 py-2 gap-4 rounded hover:bg-blue-600"
                        onClick={() => {
                            Cookies.set('token', null)
                            setUser(null)
                        }}
                    >
                        Logout
                    </button>

                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Add New Course</h2>
                        <div className="mb-4">
                            <label className="block mb-2 font-medium">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={newCourse.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 font-medium">Description</label>
                            <textarea
                                name="description"
                                value={newCourse.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded focus:outline-none"
                                rows="3"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 font-medium">Thumbnail URL</label>
                            <input
                                type="text"
                                name="thumbnail"
                                value={newCourse.thumbnail}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded focus:outline-none"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                onClick={handleAddCourse}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-3 gap-10">
                {courses?.map((course) => {
                    console.log("course=>", course);
                    
                    return (
                        <div className="border rounded overflow-hidden">
                            <img src={course.thumbnail} className="h-48 w-full" />
                            <div className="p-2 ">
                                <h1 className="font-bold">{course.title}</h1>
                                <h1>{course.description}</h1>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
