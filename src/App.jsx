import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Memories from "./pages/Memories"
import Letters from "./pages/Letters"
import Notes from "./pages/Notes"



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/memories" element={<Memories />} />
      <Route path="/letters" element={<Letters />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App