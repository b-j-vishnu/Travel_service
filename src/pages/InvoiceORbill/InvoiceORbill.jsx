import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getInvoice } from "../../Actions/InvoiceActions";
import InvoiceFilter from "./InvoiceFilter";
const InvoiceORbill = () => {
  const InvocieInformation = useSelector(
    (state) => state.Invoice.InvoiceInformation
  );

  const [showDropdown, setShowDropdown] = useState({});
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = InvocieInformation.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    dispatch(
      getInvoice([
        {
          status: "1 st Payment ",
          acceptPayment: "",
          date: "Jan 15, 2024",
          executive: "Sowmiya",
          mobileNumber: 9022010183,
          email: "augue@natoquepenatibuset.ca",
          itineraryFor: "",
          destinationTemplate: "",
          subject: "",
          pending: 100000,
          introMessage: "",
          id: "#9265",
          name: "Hakeem Chan",
          days: "",
          description: "",
          tax: "12",
          amount: "150000",
          total: 19000,
          bgcolor: "00AC4F",
        },
        {
          status: "1 st Payment ",
          acceptPayment: "",
          date: "Jan 15, 2024",
          executive: "Sowmiya",
          mobileNumber: 9022010183,
          email: "augue@natoquepenatibuset.ca",
          itineraryFor: "",
          destinationTemplate: "",
          subject: "",
          pending: 100000,
          introMessage: "",
          id: "#9265",
          name: "Hakeem Chan",
          days: "",
          description: "",
          tax: "12",
          amount: "150000",
          total: 19000,
          bgcolor: "00AC4F",
        },
        {
          status: "1 st Payment ",
          acceptPayment: "",
          date: "Jan 15, 2024",
          executive: "Sowmiya",
          mobileNumber: 9022010183,
          email: "augue@natoquepenatibuset.ca",
          itineraryFor: "",
          destinationTemplate: "",
          subject: "",
          pending: 100000,
          introMessage: "",
          id: "#9265",
          name: "Hakeem Chan",
          days: "",
          description: "",
          tax: "12",
          amount: "150000",
          total: 19000,
          bgcolor: "AC4800",
        },
        {
          status: "1 st Payment ",
          acceptPayment: "",
          date: "Jan 15, 2024",
          executive: "Sowmiya",
          mobileNumber: 9022010183,
          email: "augue@natoquepenatibuset.ca",
          itineraryFor: "",
          destinationTemplate: "",
          subject: "",
          pending: 100000,
          introMessage: "",
          id: "#9265",
          name: "Hakeem Chan",
          days: "",
          description: "",
          tax: "12",
          amount: "150000",
          total: 19000,
          bgcolor: "00AC4F",
        },
        {
          status: "1 st Payment ",
          acceptPayment: "",
          date: "Jan 15, 2024",
          executive: "Sowmiya",
          mobileNumber: 9022010183,
          email: "augue@natoquepenatibuset.ca",
          itineraryFor: "",
          destinationTemplate: "",
          subject: "",
          pending: 100000,
          introMessage: "",
          id: "#9265",
          name: "Hakeem Chan",
          days: "",
          description: "",
          tax: "12",
          amount: "150000",
          total: 19000,
          bgcolor: "00AC4F",
        },
        {
          status: "1 st Payment ",
          acceptPayment: "",
          date: "Jan 15, 2024",
          executive: "Sowmiya",
          mobileNumber: 9022010183,
          email: "augue@natoquepenatibuset.ca",
          itineraryFor: "",
          destinationTemplate: "",
          subject: "",
          pending: 100000,
          introMessage: "",
          id: "#9265",
          name: "Hakeem Chan",
          days: "",
          description: "",
          tax: "12",
          amount: "150000",
          total: 19000,
          bgcolor: "CA9C06",
        },
        {
          status: "1 st Payment ",
          acceptPayment: "",
          date: "Jan 15, 2024",
          executive: "Sowmiya",
          mobileNumber: 9022010183,
          email: "augue@natoquepenatibuset.ca",
          itineraryFor: "",
          destinationTemplate: "",
          subject: "",
          pending: 100000,
          introMessage: "",
          id: "#9265",
          name: "Hakeem Chan",
          days: "",
          description: "",
          tax: "12",
          amount: "150000",
          total: 19000,
          bgcolor: "00AC4F",
        },
        {
          status: "1 st Payment ",
          acceptPayment: "",
          date: "Jan 15, 2024",
          executive: "Sowmiya",
          mobileNumber: 9022010183,
          email: "augue@natoquepenatibuset.ca",
          itineraryFor: "",
          destinationTemplate: "",
          subject: "",
          pending: 100000,
          introMessage: "",
          id: "#9265",
          name: "Hakeem Chan",
          days: "",
          description: "",
          tax: "12",
          amount: "150000",
          total: 19000,
          bgcolor: "CA9C06",
        },
        {
          status: "1 st Payment ",
          acceptPayment: "",
          date: "Jan 15, 2024",
          executive: "Sowmiya",
          mobileNumber: 9022010183,
          email: "augue@natoquepenatibuset.ca",
          itineraryFor: "",
          destinationTemplate: "",
          subject: "",
          pending: 100000,
          introMessage: "",
          id: "#9265",
          name: "Hakeem Chan",
          days: "",
          description: "",
          tax: "12",
          amount: "150000",
          total: 19000,
          bgcolor: "AC4800",
        },
        {
          status: "1 st Payment ",
          acceptPayment: "",
          date: "Jan 15, 2024",
          executive: "Sowmiya",
          mobileNumber: 9022010183,
          email: "augue@natoquepenatibuset.ca",
          itineraryFor: "",
          destinationTemplate: "",
          subject: "",
          pending: 100000,
          introMessage: "",
          id: "#9265",
          name: "Hakeem Chan",
          days: "",
          description: "",
          tax: "12",
          amount: "150000",
          total: 19000,
          bgcolor: "AC4800",
        },
      ])
    );
  }, [dispatch]);

  const totalPages = Math.ceil(InvocieInformation.length / 10);

  const handleShowInvoiceFilter = (e) => {
    const filterEl = document.getElementById("invoiceFilter");
    filterEl.classList.replace("hidden", "block");
    e.stopPropagation();
  };

  const handleShowDrapdown = (index) => {
    setShowDropdown((prev) => ({
      [index]: !prev[index],
    }));
  };
  const handleHideInvoiceFilter = () => {
    const filterEl = document.getElementById("invoiceFilter");
    filterEl.classList.replace("block", "hidden");
  };
  return (
    <div className="w-full flex mt-16 justify-end mb-10 bg-gray-200 ">
      <div
        className="md:w-[93%] text-black  lg:w-[80%]   items-end bg-gray-100 
      "
      >
        <h1 className="mt-10 px-2 text-lg poppins-semibold">Invoice / Bill</h1>
        <section
          onClick={handleHideInvoiceFilter}
          className="w-full bg-white h-[100vh] rounded-xl"
        >
          <div className="flex items-center justify-end py-3 gap-x-3 px-3">
            <div
              className="flex items-center hover:cursor-pointer mx-4 ring-1 filterDiv py-2 ring-gray-300 px-5"
              onClick={(e) => handleShowInvoiceFilter(e)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.25 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58097 1.5 3.15326 1.5 3.75V4.6275C1.49989 4.93721 1.56372 5.2436 1.6875 5.5275V5.5725C1.79346 5.81323 1.94354 6.032 2.13 6.2175L6.75 10.8075V15.75C6.74974 15.8775 6.78198 16.0029 6.84365 16.1144C6.90533 16.226 6.99442 16.3199 7.1025 16.3875C7.22186 16.4615 7.35958 16.5005 7.5 16.5C7.61741 16.4993 7.73301 16.471 7.8375 16.4175L10.8375 14.9175C10.9612 14.8552 11.0652 14.7598 11.138 14.642C11.2108 14.5242 11.2496 14.3885 11.25 14.25V10.8075L15.84 6.2175C16.0265 6.032 16.1765 5.81323 16.2825 5.5725V5.5275C16.4166 5.24582 16.4907 4.93933 16.5 4.6275V3.75C16.5 3.15326 16.2629 2.58097 15.841 2.15901C15.419 1.73705 14.8467 1.5 14.25 1.5ZM9.9675 9.9675C9.89799 10.0376 9.843 10.1207 9.80567 10.2121C9.76835 10.3034 9.74943 10.4013 9.75 10.5V13.785L8.25 14.535V10.5C8.25057 10.4013 8.23165 10.3034 8.19433 10.2121C8.157 10.1207 8.10201 10.0376 8.0325 9.9675L4.0575 6H13.9425L9.9675 9.9675ZM15 4.5H3V3.75C3 3.55109 3.07902 3.36032 3.21967 3.21967C3.36032 3.07902 3.55109 3 3.75 3H14.25C14.4489 3 14.6397 3.07902 14.7803 3.21967C14.921 3.36032 15 3.55109 15 3.75V4.5Z"
                  fill="#6C6C6C"
                />
              </svg>

              <div className="dropdown-toggle inline-flex justify-center items-center  px-3 text-sm  text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500">
                Filters
              </div>
            </div>

            <Link
              to="/invoice/addInvoice"
              className="flex items-center text-sm gap-x-2 text-white ring-1 bg-[#0E2238]  ring-gray-300 px-4 py-2 rounded-sm"
            >
              <svg
                width="19"
                height="15"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_218_943)">
                  <path
                    d="M3.5 9H15.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 15V3"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_218_943">
                    <rect
                      width="18"
                      height="18"
                      fill="black"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <p className="bg-[#0E2238] text-white hover:cursor-pointer appearance-none">
                Add
              </p>
            </Link>
          </div>
          <div className="w-full">
            <table className="text-left w-full">
              <thead className="">
                <tr className="bg-gray-300 text-xs py-7 mb-6  poppins-medium text-gray-500 ">
                  <th className="py-2 pl-4">
                    <input
                      type="checkbox"
                      className="w-4 rounded-[0.2rem] focus:ring-0 h-4"
                    />
                  </th>
                  <th>Action</th>
                  <th className="">Full name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>User ID</th>
                  <th>Executive</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Pending</th>
                  <th className="pl-3">Status</th>
                </tr>
              </thead>
              <tbody className="">
                {currentItems.map((person, index) => (
                  <tr key={index} className=" text-xs">
                    <td className="pt-5 pl-4    ">
                      <input
                        type="checkbox"
                        className="w-4 outline-none rounded-[0.2rem] focus:ring-0 h-4"
                      />
                    </td>
                    <td className="pt-5 ">
                      <Link
                        to={`/invoice/viewInvoice/${person.id.slice(1)}`}
                        className="bg-[#003E78] px-3 rounded-md text-white py-1"
                      >
                        View
                      </Link>
                    </td>
                    <td className="flex items-center relative pt-5  text-sm">
                      <p className=" poppins-bold px-1">{person.name}</p>
                      <svg
                        onClick={() => handleShowDrapdown(index)}
                        width="12"
                        height="12"
                        className="absolute right-3"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.84798 3.79167C8.89502 3.79167 9.74381 2.94287 9.74381 1.89583C9.74381 0.848793 8.89502 0 7.84798 0C6.80094 0 5.95215 0.848793 5.95215 1.89583C5.95215 2.94287 6.80094 3.79167 7.84798 3.79167Z"
                          fill="#9EA9B4"
                        />
                        <path
                          d="M7.84798 8.89616C8.89502 8.89616 9.74381 8.04737 9.74381 7.00033C9.74381 5.95329 8.89502 5.10449 7.84798 5.10449C6.80094 5.10449 5.95215 5.95329 5.95215 7.00033C5.95215 8.04737 6.80094 8.89616 7.84798 8.89616Z"
                          fill="#9EA9B4"
                        />
                        <path
                          d="M7.84798 13.9997C8.89502 13.9997 9.74381 13.1509 9.74381 12.1038C9.74381 11.0568 8.89502 10.208 7.84798 10.208C6.80094 10.208 5.95215 11.0568 5.95215 12.1038C5.95215 13.1509 6.80094 13.9997 7.84798 13.9997Z"
                          fill="#9EA9B4"
                        />
                      </svg>

                      {showDropdown[index] && (
                        <ul className="absolute left-36 text-xs roboto-medium -top-4 w-36 px-2 py-2 rounded-lg text-white bg-gray-400">
                          <li className="my-2 bg-gray-300 rounded-md p-2">
                            Send Email
                          </li>
                          <li className="my-2 bg-gray-300 rounded-md p-2">
                            Send by SMS
                          </li>
                          <li className="my-2 bg-gray-300 rounded-md p-2">
                            Send Whatsapp
                          </li>
                          <li className="my-2 bg-gray-300 rounded-md p-2">
                            Edit
                          </li>
                          <li className="my-2 bg-gray-300 rounded-md p-2">
                            Delete
                          </li>
                        </ul>
                      )}
                    </td>
                    <td className="px-1 pt-5">{person.email}</td>
                    <td className="px-1 pt-5 ">{person.mobileNumber}</td>
                    <td className="px-1 pt-5 ">{person.id}</td>
                    <td className="px-1 pt-5 ">{person.executive}</td>
                    <td className="px-1 pt-5 ">{person.date}</td>

                    <td className="px-1 pt-5">{person.total}</td>
                    <td className="px-1 pt-5">{person.pending}</td>
                    <td className="px-2 pt-5">
                      <p
                        className="text-center p-1 text-white rounded-md"
                        style={{ backgroundColor: `#${person.bgcolor}` }}
                      >
                        {person.status}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full flex items-center mt-7 pb-10 justify-end gap-4 px-5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="flex bg-[#0E2238] items-center gap-2 px-4 py-1 font-sans text-xs font-bold text-center text-white uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 18.5L6 12.5L12 6.5" fill="white" />
                <path d="M19 18.5L13 12.5L19 6.5" fill="white" />
              </svg>
              Previous
            </button>
            <div className="flex items-center ring-1 ring-gray-400 rounded-lg px-3 gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={String.raw`text-white poppins-semibold px-4 py-1 ${
                    currentPage == index + 1 ? " bg-[#0E2238]" : null
                  } rounded-lg`}
                  onClick={() => setCurrentPage(index + 1)}
                  type="button"
                >
                  <span
                    className={String.raw`${
                      currentPage == index + 1 ? "text-white" : "text-black"
                    } `}
                  >
                    {index + 1}
                  </span>
                </button>
              ))}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="flex items-center bg-[#0E2238]  gap-2 px-4 py-1 font-sans text-xs font-bold text-center text-white uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Next
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 18.5L18 12.5L12 6.5" fill="white" />
                <path d="M5 18.5L11 12.5L5 6.5" fill="white" />
              </svg>
            </button>
          </div>
        </section>
        <div id="invoiceFilter" className="hidden">
          <InvoiceFilter InvocieInformation={InvocieInformation} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceORbill;
