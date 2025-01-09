import { Navigate, Route, Routes, } from 'react-router'
import Login from "../Login.jsx";
import User from './pages/User/user.jsx';
import { AuthContext } from './context/AuthContext.jsx';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import Students from './pages/students/students.jsx';


function App() {
  // const [count, setCount] = useState(0)
  const { user } = useContext(AuthContext)
  // console.log("user=>", user)
  // console.log("token=>", Cookies.get("token"))

  return (
    <>
      <div className='text-center bg-blue-100  flex  min-h-screen min-w-[1440pv] ' >

        <Routes>

          <Route path="/" element={user ? <Navigate to={'/user'} /> : <Login />} />

          <Route path="/user" element={user ? <student /> : <Navigate to={'/'} />} />
          {/* <Route path="/user" element={user ? <Students /> : <Navigate to={'/students'} />} /> */}
        </Routes>
      </div>
    </>
  )
}

export default App