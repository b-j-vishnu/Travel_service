import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const AddInvoice = ({ mode }) => {
  const [selectedById, setSelectedById] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const InvoiceInformation = useSelector(
    (state) => state.Invoice.InvoiceInformation
  );
  const [invoice, setInvoice] = useState({
    proposalDate: "",
    validDate: "",
    acceptPaymentVia: "",
    executiveName: "",
    mobile: "",
    email: "",
    invoiceTo: "",
    destinationTemplate: "",
    userId: "",
  });
  useEffect(() => {
    if (mode === "edit") {
      const userId = `#${params.id}`;
      const itineraryToEdit = InvoiceInformation.find(
        (data) => data.userId == userId
      );
      console.log(itineraryToEdit);
      const data = {
        ...itineraryToEdit,
        proposalDate: itineraryToEdit.proposalDate.split("T")[0],
        validDate: itineraryToEdit.validDate.split("T")[0],
      };

      setInvoice(data);
    }
  }, [InvoiceInformation]);

  useEffect(() => {
    const searchApi = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/search/searchById?type=${
            invoice.invoiceTo
          }&userId=${invoice.userId.split("#")[1]}`
        );
        console.log(response.data);
        if (response.status === 200) {
          setSelectedById(response.data.foundedPerson);
        }
      } catch (err) {
        setSelectedById();

        console.log(err);
      }
    };
    searchApi();
  }, [invoice.userId, invoice.invoiceTo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, billingAmount, userId, balancePayment } =
      selectedById;
    const dataToSend = JSON.stringify({
      ...invoice,
      userId,
      fullName: `${firstName} ${lastName}`,
      total: billingAmount,
      pending: balancePayment,
    });
    console.log(dataToSend);
    if (mode === "add") {
      try {
        const response = await axios.post(
          "http://localhost:4000/invoice/addInvoices",
          dataToSend,
          { headers: { "Content-Type": "application/json" } }
        );
        if (response.status === 200) {
          navigate("/invoice");
          console.log(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const userId = encodeURIComponent(`#${params.id}`);
        const response = await axios.put(
          `http://localhost:4000/invoice/editInvoice/${userId}`,
          dataToSend,
          { headers: { "Content-Type": "application/json" } }
        );
        if (response.status === 200) {
          navigate("/invoice");
          console.log(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="w-full flex mt-16 justify-end bg-gray-100">
      <form
        className="md:w-[93%] px-1   lg:w-[80%] mt-6 items-end"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <h1 className="poppins-semibold text-lg">
          {mode === "add" ? "Add Invoice / Bill" : "Edit Invoice / Bill"}
        </h1>
        <div className="bg-white pb-8 rounded-t-lg">
          <section className="my-1">
            <div className="w-full text-black flex gap-x-4 flex-wrap gap-y-6  pl-5 py-5  items-center">
              <div className="flex flex-col flex-wrap w-[23%]">
                <label
                  htmlFor="countries"
                  className="  roboto-semibold 
                  text-sm mb-2  text-black  font-medium dark:text-white"
                >
                  Proposal Date
                </label>
                <input
                  type="date"
                  value={invoice.proposalDate}
                  name="proposalDate"
                ></input>
              </div>
              <div className="flex w-[23%] justify-center  flex-col ">
                <label
                  className={` font-medium   roboto-semibold mb-2 text-sm`}
                >
                  Valid date
                </label>
                <div className="relative max-w-sm">
                  <input
                    name="validDate"
                    type="date"
                    value={invoice.validDate}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date"
                  />
                </div>
              </div>
              <div className="flex flex-col flex-wrap w-[23%]">
                <label
                  htmlFor="countries"
                  className="  roboto-bold text-sm mb-2  text-black  font-medium dark:text-white"
                >
                  Accept Payment Via
                </label>
                <select
                  name="acceptPaymentVia"
                  value={invoice.acceptPaymentVia}
                  className="bg-gray-50 w-full border-gray-300 text-gray-400 text-[14px] roboto-medium rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden selected>
                    Select value
                  </option>
                  <option value="Cash">Cash</option>
                  <option value="Online">online</option>
                </select>
              </div>

              <div className={`w-[19%] flex flex-col`}>
                <label className={" roboto-semibold  text-sm mb-2"}>
                  Executive Name
                </label>

                <input
                  type="text"
                  name="executiveName"
                  value={invoice.executiveName}
                  placeholder="Executive Name"
                  className={
                    "px-3 py-3 border-none ring-1 ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  }
                />
              </div>

              <div className={`w-1/4 flex flex-col`}>
                <label className={` roboto-semibold  text-sm mb-2`}>
                  Mobile Phone
                </label>

                <input
                  type="number"
                  name="mobile"
                  value={invoice.mobile}
                  placeholder="Enter Your Mobile Number"
                  className={
                    "px-3 py-3 border-none ring-1 ring-gray-300 w-full text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  }
                />
              </div>

              <div className={`w-1/4 flex flex-col`}>
                <label className={`roboto-semibold  text-sm mb-2`}>Email</label>

                <input
                  type="email"
                  name="email"
                  value={invoice.email}
                  placeholder="example@gmail.com"
                  className={
                    "px-3 py-3 border-none ring-1 ring-gray-300 w-full text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  }
                />
              </div>
              <div className="flex flex-col  flex-wrap w-[19%]">
                <label
                  htmlFor="countries"
                  className="  roboto-semibold text-sm mb-2  text-black  font-medium dark:text-white"
                >
                  Invoice To
                </label>
                <select
                  name="invoiceTo"
                  value={invoice.invoiceTo}
                  disabled={mode === "edit" ? true : false}
                  className="bg-gray-50 w-full border-gray-300 text-gray-400 text-[14px] roboto-medium rounded-[0.3rem] focus:ring-blue-500 focus:border-blue-500 block   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden selected>
                    Select
                  </option>
                  <option value="Leads">Leads</option>
                  <option value="Customers">Customer</option>
                </select>
              </div>
              <div className="flex flex-col    flex-wrap w-[19%]">
                <label
                  htmlFor="countries"
                  className="  roboto-semibold text-sm mb-2  text-black  font-medium dark:text-white"
                >
                  Destination Template
                </label>
                <select
                  name="destinationTemplate"
                  value={invoice.destinationTemplate}
                  className="bg-gray-50 w-full border-gray-300 text-gray-400 text-[14px] roboto-medium rounded-[0.3rem] focus:ring-blue-500 focus:border-blue-500 block   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden selected>
                    Select
                  </option>
                  <option value="Dubai">Dubai</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Maldives">Maldives</option>
                  <option value="UK">UK</option>
                  <option value="Malta">Malta</option>
                </select>
              </div>
            </div>
          </section>
          <section className="my-4">
            <table className="w-full ">
              <tr className=" rounded-t-xl   text-white">
                <th className="py-2 bg-[#003E78]  rounded-ss-xl">Id</th>
                <th className="py-2 bg-[#003E78]  ">Name</th>
                <th className="py-2 bg-[#003E78]  ">Days</th>
                <th className="py-2 bg-[#003E78]  ">Description</th>
                <th className="py-2 bg-[#003E78]  ">Tax</th>
                <th className="py-2 bg-[#003E78]  rounded-se-xl">Amount</th>
              </tr>
              <tr className="text-center">
                <td className="px-4 py-1 w-[15%] border-r-2 border-b-2">
                  <input
                    type="text"
                    placeholder="Id"
                    disabled={mode === "edit" ? true : false}
                    value={invoice.userId}
                    name="userId"
                    className="w-28 focus:ring-0  border-none"
                  ></input>
                </td>
                <td className="px-4 py-1 w-[15%]  border-r-2 border-b-2">
                  <p className="w-28 focus:ring-0  border-none">
                    {selectedById && selectedById.firstName}
                  </p>
                </td>
                <td className="px-4 py-1 w-[15%] border-r-2 border-b-2 ">
                  <p className="w-28 focus:ring-0 no-spinner  border-none">
                    {selectedById && selectedById.plannedNoOfDays}
                  </p>
                </td>
                <td className="px-4 py-1 w-[15%] whitespace-nowrap text-start border-r-2 border-b-2 text-xs ">
                  <p className="border-none focus:ring-0  w-28">-NA-</p>
                </td>
                <td className="w-[15%] py-1 px-4 border-r-2 border-b-2">
                  <p className="w-28 focus:ring-0 no-spinner border-none">
                    -NA-
                  </p>
                </td>
                <td className="w-[15%] py-1 px-4 border-r-2 border-b-2">
                  <p className="w-28 outline-none focus:ring-0 no-spinner border-none">
                    {selectedById && selectedById.billingAmount}
                  </p>
                </td>
              </tr>
            </table>
          </section>
          <section className="w-full px-1 flex roboto-bold flex-col mt-20 items-end ">
            <div className="w-1/4 flex justify-between items-center ">
              <p>Sub Total:</p>
              <p className="border-2 border-gray-500 rounded-sm w-1/2 px-2 py-1 h-8">
                -NA-
              </p>
            </div>
            <div className="w-1/4 flex my-2 justify-between items-center ">
              <p>GST (%):</p>
              <p className="border-2 border-gray-500 rounded-sm w-1/2 px-2 py-1">
                -NA-
              </p>
            </div>
            <div className="w-1/4 flex justify-between items-center ">
              <p>Total Amount:</p>
              <p className="border-2 border-gray-500 rounded-sm w-1/2 h-8 px-2 py-1">
                {selectedById && selectedById.billingAmount}
              </p>
            </div>
          </section>
          <section className="mr-10 ml-3 roboto-medium">
            <p className="my-2">Notes</p>
            <div className="ring-1 ring-gray-300 text-[#CECECE]  px-4 py-5 text-sm">
              <p className="mt-3">Kindly let me know for any clarification.</p>
              <p className="my-3">Thanks & Regards,</p>
              <p className="">
                Disclaimer The information contained in this communication from
                the sender is confidential. It is intended solely for use by the
                recipient and others authorized to receive it. If you are not
                the recipient, you are hereby notified that any disclosure,
                copying, distribution or taking action in relation of the
                contents of this information is strictly prohibited and may be
                unlawful.
              </p>
            </div>
          </section>
          <section className="mr-14 pl-3 mt-7  roboto-medium">
            <p className="my-2">Terms and Conditions</p>
            <div className="ring-1 ring-gray-300 text-[#CECECE]  px-4 py-3 text-sm">
              <p className="mt-3">Terms and Conditions</p>
            </div>
          </section>
          <div className=" flex justify-end my-5">
            <Link
              to="/invoice"
              className="bg-[#0E2238] px-6 py-3 text-white text-sm  poppins-medium  rounded-md"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-3 mx-5 rounded-md bg-[#0E2238] roboto-medium text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddInvoice;
