import DashBoard from "./pages/DashboardPages/DashBoard";
import "./assets/css/fonts.css";
import Sidbar from "./Sidbar";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import MyCalander from "./pages/Mycalendar/MyCalendar";
import Header from "./Header";
import Leads from "./pages/Leads/Leads";
import AddLeads from "./pages/Leads/AddLeads";
import Itinerary from "./pages/ItineraryANDquotation/Itinerary";
import AddItinerary from "./pages/ItineraryANDquotation/AddItinerary";
import ViewItinerary from "./pages/ItineraryANDquotation/ViewItinerary";
import InvoiceORbill from "./pages/InvoiceORbill/InvoiceORbill";
import AddInvoice from "./pages/InvoiceORbill/AddInvoice";
import ViewInvoice from "./pages/InvoiceORbill/ViewInvoice";
import Customer from "./pages/Customer/Customer";
import AddCustomer from "./pages/Customer/AddCustomer";
import Finance from "./pages/Finance/Finance";
import SignUp from "./pages/SignUp";
import AddAdditionalPayement from "./pages/InvoiceORbill/AddAdditionalPayement";
import axios from "axios";
import { useState, useEffect } from "react";
const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard");
  }, []);
  //  const [access, setAccess] = useState("");
  const isSignupPage = location.pathname === "/";
  /* console.log(isSignupPage);
  useEffect(() => {
    const getAccess = async () => {
      await axios
        .get("http://localhost:4000/client/verify", { withCredentials: true })
        .then((response) => {
          console.log(response.data.message);
          setAccess(response.data.message);
        })
        .catch((err) => {
          if (err) {
            navigate("/");
            console.log(err);
          }
        });
    };
    getAccess();
  }, [navigate]);*/

  return (
    <div className="w-full">
      {!isSignupPage && <Sidbar />}
      {!isSignupPage && <Header />}
      <Routes>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/calander" element={<MyCalander />} />
        <Route path="/leads">
          <Route index element={<Leads />}></Route>
          <Route path="addLeads" element={<AddLeads />}></Route>
        </Route>
        <Route path="/itinerary">
          <Route index element={<Itinerary />}></Route>
          <Route path="addItinerary" element={<AddItinerary />}></Route>
          <Route path="viewItinerary/:id" element={<ViewItinerary />}></Route>
        </Route>

        <Route path="/invoice">
          <Route index element={<InvoiceORbill />}></Route>
          <Route path="addInvoice" element={<AddInvoice />}></Route>
          <Route
            path="additionalPayment"
            element={<AddAdditionalPayement />}
          ></Route>
          <Route
            path="/invoice/viewInvoice/:id"
            element={<ViewInvoice />}
          ></Route>
        </Route>

        <Route path="/customer">
          <Route index element={<Customer />}></Route>
          <Route path="addCustomer" element={<AddCustomer />}></Route>
        </Route>

        <Route path="/finance">
          <Route index element={<Finance />}></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
