import { Routes, Route } from "react-router-dom";


import ThankYou from "./Pages/ThankYou";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/thank-you" element={<ThankYou/>} />
      <Route path="/admin" element={<Admin/>} />
    </Routes>
  );
}

export default App;