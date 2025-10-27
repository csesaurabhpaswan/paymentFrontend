import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pay from "../pages/Pay";
import Pending from "../pages/Pending";
import Success from "../pages/Success";
import Fail from "../pages/Fail";
import NotFound from "../pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<Pay />} />
        <Route path="/:id" element={<Pay />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Fail />} />
        <Route path="/*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
