import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeList from "./component/EmployeeList";
import UpdateEmployee from "./component/UpdateEmployee";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/edit/:id" element={<UpdateEmployee />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
