import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import jobData from "./JobDummyData";
import Home from "./components/Home/Home";
import JobPost from "./components/JobPost/JobPost";
import Notifications from "./components/Notifications/Notifications";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import Profile from "./components/Profile/Profile";
import { Toaster } from "react-hot-toast";



function App() {
  

  return (
    <>

      <Router>
        <Navbar />

        <Routes>

          <Route path="/" element={<Home />} /> 
          <Route path="/postjob" element={<JobPost />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/login" element={<SignIn />} /> 
          <Route path="/register" element={<SignUp />} /> 
          <Route path="/profile" element={<Profile />} /> 


        </Routes>
        <Toaster />

      </Router>
     </> 
  )
}

export default App
