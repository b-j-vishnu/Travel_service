import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getItinerary } from "../../Actions/ItineraryActions";
import ItineraryFilter from "./ItineraryFilter";

const Itinerary = () => {
  const [showDropdown, setShowDropdown] = useState({});
  const dispatch = useDispatch();
  const ItineraryInformation = useSelector(
    (state) => state.Itinerary.ItineraryInformation
  );

  useEffect(() => {
    dispatch(
      getItinerary([
        {
          stage: "Invoice",
          acceptPayment: "",
          validDate: "Jan 15, 2024",
          executive: "Sowmya",
          mobileNumber: "9022010183",
          email: "augue@natoquepenatibuset.ca",
          itineraryFor: "",
          destinationTemplate: "",
          subject: "",
          introMessage: "",
          id: "#9265",
          name: "Hakeem Chan",
          days: "",
          description: "",
          tax: "12",
          amount: "150000",
          total: 18000,
        },
        {
          stage: "Invoice",
          acceptPayment: "",
          validDate: "Jan 15, 2024",
          executive: "Sowmya",
          mobileNumber: "9022010183",
          email: "augue@natoquepenatibuset.ca",
          itineraryFor: "",
          destinationTemplate: "",
          subject: "",
          introMessage: "",
          id: "#9265",
          name: "Hakeem Chan",
          days: "",
          description: "",
          tax: "12",
          amount: "150000",
          total: 18000,
        },
        {
          stage: "Invoice",
          acceptPayment: "",
          validDate: "Jan 15, 2024",
          executive: "Sowmya",
          mobileNumber: "9022010183",
          email: "augue@natoquepenatibuset.ca",
          itineraryFor: "",
          destinationTemplate: "",
          subject: "",
          introMessage: "",
          id: "#9265",
          name: "Hakeem Chan",
          days: "",
          description: "",
          tax: "12",
          amount: "150000",
          total: 18000,
        },
        {
          stage: "Invoice",
          acceptPayment: "",
          validDate: "Jan 15, 2024",
          executive: "Sowmya",
          mobileNumber: "9022010183",
          email: "augue@natoquepenatibuset.ca",
          itineraryFor: "",
          destinationTemplate: "",
          subject: "",
          introMessage: "",
          id: "#9265",
          name: "Hakeem Chan",
          days: "",
          description: "",
          tax: "12",
          amount: "150000",
          total: 18000,
        },
        {
          stage: "Invoice",
          acceptPayment: "",
          validDate: "Jan 15, 2024",
          executive: "Sowmya",
          mobileNumber: "9022010183",
          email: "augue@natoquepenatibuset.ca",
          itineraryFor: "",
          destinationTemplate: "",
          subject: "",
          introMessage: "",
          id: "#9265",
          name: "Hakeem Chan",
          days: "",
          description: "",
          tax: "12",
          amount: "150000",
          total: 18000,
        },
        {
          stage: "Invoice",
          acceptPayment: "",
          validDate: "Jan 15, 2024",
          executive: "Sowmya",
          mobileNumber: "9022010183",
          email: "augue@natoquepenatibuset.ca",
          itineraryFor: "",
          destinationTemplate: "",
          subject: "",
          introMessage: "",
          id: "#9265",
          name: "Hakeem Chan",
          days: "",
          description: "",
          tax: "12",
          amount: "150000",
          total: 18000,
        },
        {
          stage: "Invoice",
          acceptPayment: "",
          validDate: "Jan 15, 2024",
          executive: "Sowmya",
          mobileNumber: "9022010183",
          email: "augue@natoquepenatibuset.ca",
          itineraryFor: "",
          destinationTemplate: "",
          subject: "",
          introMessage: "",
          id: "#9265",
          name: "Hakeem Chan",
          days: "",
          description: "",
          tax: "12",
          amount: "150000",
          total: 18000,
        },

        {
          stage: "Invoice",
          acceptPayment: "",
          validDate: "Jan 15, 2024",
          executive: "Sowmiya",
          mobileNumber: "9022010183",
          email: "augue@natoquepenatibuset.ca",
          itineraryFor: "",
          destinationTemplate: "",
          subject: "",
          introMessage: "",
          id: "#9265",
          name: "Hakeem Chan",
          days: "",
          description: "",
          tax: "12",
          amount: "150000",
          total: 18000,
        },
        {
          stage: "Invoice",
          acceptPayment: "",
          validDate: "Jan 15, 2024",
          executive: "Sowmiya",
          mobileNumber: "9022010183",
          email: "augue@natoquepenatibuset.ca",
          itineraryFor: "",
          destinationTemplate: "",
          subject: "",
          introMessage: "",
          id: "#9265",
          name: "Hakeem Chan",
          days: "",
          description: "",
          tax: "12",
          amount: "150000",
          total: 18000,
        },
        {
          stage: "Invoice",
          acceptPayment: "",
          validDate: "Jan 15, 2024",
          executive: "Sowmiya",
          mobileNumber: "9022010183",
          email: "augue@natoquepenatibuset.ca",
          itineraryFor: "",
          destinationTemplate: "",
          subject: "",
          introMessage: "",
          id: "#9265",
          name: "Hakeem Chan",
          days: "",
          description: "",
          tax: "12",
          amount: "150000",
          total: 18000,
        },
      ])
    );
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ItineraryInformation.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(ItineraryInformation.length / 10);

  const handleShowDrapdown = (index) => {
    setShowDropdown((prev) => ({
      [index]: !prev[index], // Toggle the dropdown visibility
    }));
  };
  const handleShowFilters = (e) => {
    const filterEl = document.getElementById("ItineraryfilterEl");
    filterEl.classList.replace("hidden", "block");
    e.stopPropagation();
  };

  const handleHideFilter = () => {
    const filterEl = document.getElementById("ItineraryfilterEl");
    filterEl.classList.replace("block", "hidden");
  };

  return (
    <div className="w-full flex mt-16 justify-end mb-10 bg-gray-200 ">
      <div
        className="md:w-[93%] text-black  lg:w-[80%]   items-end bg-gray-100 
      "
        onClick={handleHideFilter}
      >
        <h1 className="mt-10 px-2 text-lg poppins-semibold">
          Itinerary & Quotation
        </h1>
        <section className="w-full bg-white h-[100vh] rounded-xl">
          <div className="flex items-center justify-end py-3 gap-x-3 px-3">
            <div
              onClick={handleShowFilters}
              className="flex items-center hover:cursor-pointer mx-4 ring-1 filterDiv py-2 ring-gray-300 px-5"
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
              to="/itinerary/addItinerary"
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
                      className="w-4 rounded-[0.2rem] h-4"
                    />
                  </th>
                  <th>Action</th>
                  <th className="">Full name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>User ID</th>
                  <th>Executive</th>
                  <th>Valid till</th>
                  <th>Stage</th>
                  <th>Total</th>
                  <th className="pl-3">Download</th>
                </tr>
              </thead>
              <tbody className="">
                {currentItems.map((person, index) => (
                  <tr key={index} className=" text-xs">
                    <td className="pt-5 pl-4    ">
                      <input
                        type="checkbox"
                        className="w-4 rounded-[0.2rem] h-4"
                      />
                    </td>
                    <td className="pt-5 ">
                      <Link
                        to={`/itinerary/viewItinerary/${person.id.replace(
                          "#",
                          ""
                        )}`}
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
                    <td className="px-1 pt-5 ">{person.validDate}</td>
                    <td className={`text-[${person.textColor}]px-1 pt-5 `}>
                      {person.stage}
                    </td>
                    <td className="px-1 pt-5">{person.total}</td>
                    <td className="px-2 pt-5">
                      <svg
                        width="23"
                        height="23"
                        className="text-right"
                        viewBox="0 0 23 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <rect
                          x="0.000976562"
                          width="23"
                          height="23"
                          fill="url(#pattern0_312_5301)"
                        />
                        <defs>
                          <pattern
                            id="pattern0_312_5301"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              xlinkHref="#image0_312_5301"
                              transform="scale(0.02)"
                            />
                          </pattern>
                          <image
                            id="image0_312_5301"
                            width="50"
                            height="50"
                            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7UlEQVR4nO2YvYoUQRSFr5oI/kQaCIqZRoIrBjJJcc+53dOikTCIgbKRPoGB0aCxoeHqwAb6Cv7ALqxPsLBioj6AoGu2iKBSOgNN0zvM9MpOXawPDjQNdbkfVVRVt0gmk1kYJJcADGLis3iF5AuSv8Z5Ll4B8LYmsiFeAfBpIgLgozjlAMmd2ozsxHfijaqqTtYk/iSEcEK8QXKpKVIUxUXxBsnrTREzuybeAHCvKULyrngDwKMWkYfiDZLPmiIAnoo3SL5qEXkp3iD5rmVpbYk3AHxrEdkWTxRFcaRFYnIoHhUvqOr53URInhMvmBl3E1FViBdI3pkicltSvBhi/AVYD8nVKUtrtW1MrCWLYjgcHiS5NqXpmRI/wAaDwSFZJCGE0wC+7EFkW1XPSgqY2Y2uIqp6S1KC5EoHkZGkeAgCeD+HxIeqqo5LigC4BOD7DBI/zOyKpAzJ+zOIPJDUGf7dkl9PkdjY162W5GMAb2JUtZxnbL/fPwXgc4vE17Isz8xTS1XLSR+xp7lFAKzXDqzlDuOvkvzZELnZoc5yrY/1fReJkHxSk1jpUgMpiIQQDpPcjFttr9c75lYkYmYXzOyydASpiOwVZJExeUZSXlokR/G/7YIy+pciSQT/tQhrd61Uwi53rUwmk5EU+Q003AOVH0EK9AAAAABJRU5ErkJggg=="
                          />
                        </defs>
                      </svg>
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
      </div>
      <div id="ItineraryfilterEl" className="hidden">
        <ItineraryFilter ItineraryInformation={ItineraryInformation} />
      </div>
    </div>
  );
};

export default Itinerary;
