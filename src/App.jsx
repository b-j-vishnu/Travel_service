import DashBoard from "./pages/DashboardPages/DashBoard";
import "./assets/css/fonts.css";
import Sidbar from "./Sidbar";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [access, setAccess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const fetchAccess = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getDashboard", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setAccess(true);
        }
      } catch (error) {
        console.log("Error fetching access:", error);
        setAccess(false);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccess();
  }, [location.pathname]);

  const isSignupPage = location.pathname === "/";

  if (isLoading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  }
  console.log(access);
  return (
    <div className="w-full">
      {!isSignupPage && <Sidbar />}
      {!isSignupPage && <Header setAccess={setAccess} />}
      <Routes>
        <Route
          path="/"
          element={!access ? <SignUp /> : <Navigate to="/dashboard" />}
        />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/calander" element={<MyCalander />} />
        <Route path="/leads">
          <Route index element={<Leads />}></Route>
          <Route path="addLeads" element={<AddLeads mode="add" />}></Route>
          <Route path="edit/:id" element={<AddLeads mode="edit" />}></Route>
        </Route>
        <Route path="/itinerary">
          <Route index element={<Itinerary />}></Route>
          <Route
            path="addItinerary"
            element={<AddItinerary mode="add" />}
          ></Route>
          <Route
            path="editItinerary/:id"
            element={<AddItinerary mode="edit" />}
          ></Route>
          <Route path="viewItinerary/:id" element={<ViewItinerary />}></Route>
        </Route>

        <Route path="/customer">
          <Route index element={<Customer />}></Route>
          <Route
            path="addCustomer"
            element={<AddCustomer mode="add" />}
          ></Route>
          <Route
            path="editCustomer/:id"
            element={<AddCustomer mode="edit" />}
          ></Route>
        </Route>

        <Route path="/invoice">
          <Route index element={<InvoiceORbill />}></Route>
          <Route path="addInvoice" element={<AddInvoice mode="add" />}></Route>
          <Route
            path="/invoice/editInvoice/:id"
            element={<AddInvoice mode="edit" />}
          ></Route>
          <Route
            path="additionalPayment"
            element={<AddAdditionalPayement />}
          ></Route>
          <Route
            path="/invoice/viewInvoice/:id"
            element={<ViewInvoice />}
          ></Route>
        </Route>

        <Route path="/finance">
          <Route index element={<Finance />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
