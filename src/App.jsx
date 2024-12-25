import { Route, Routes, } from 'react-router'
import Login from "../Login.jsx";
import User from './pages/User/user.jsx';
import { AuthContext } from './context/AuthContext.jsx';





function App() {
  // const [count, setCount] = useState(0)
  const { user } = useContext(AuthContext)
  // console.log("user=>", user)

  return (
    <>
      <h1>Hello World </h1>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  )
}

export default App