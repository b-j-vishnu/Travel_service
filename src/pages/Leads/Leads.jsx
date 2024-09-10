import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LeadsFilters from "./LeadsFilters";
import { useDispatch, useSelector } from "react-redux";
import { getLeads } from "../../Actions/LeadsActions";

const Leads = () => {
  const dispatch = useDispatch();
  const leadsInformations = useSelector(
    (state) => state.leads.LeadsInformation
  );
  useEffect(() => {
    dispatch(
      getLeads([
        {
          firstName: "Hakeem Chan",
          email: "augue@natoquepenatibuset.ca",
          mobileNumber: 9022010183,
          userId: "#9265",
          executive: "Sowmiya",
          package: "Domestic",
          enquiryType: "Flight Booking",
          dealStage: "Converted to Deal",
          textColor: "00AC4F",
        },
        {
          firstName: "Ham Chan",
          email: "augue@natoquepenatibuset.ca",
          mobileNumber: "9022010183",
          userId: "#9566",
          executive: "Thilak",
          package: "Domestic",
          enquiryType: "Flight Booking",
          dealStage: "Converted To Deal",
          textColor: "00AC4F",
        },
        {
          firstName: "Hakeem Chan",
          email: "augue@natoquepenatibuset.ca",
          mobileNumber: "9022010183",
          userId: "#9267",
          executive: "Sowmiya",
          package: "Domestic",
          enquiryType: "Flight Booking",
          dealStage: "Cancelled",
          textColor: "FF0202",
        },
        {
          firstName: "Hakeem Chan",
          email: "augue@natoquepenatibuset.ca",
          mobileNumber: "9022010183",
          userId: "#9268",
          executive: "Sowmiya",
          package: "Domestic",
          enquiryType: "Flight Booking",
          dealStage: "Active",
          textColor: "0079FF",
        },
        {
          firstName: "Hakeem Chan",
          email: "augue@natoquepenatibuset.ca",
          mobileNumber: " 9022010183",
          userId: "#9269",
          executive: "Sowmiya",
          package: "Domestic",
          enquiryType: "Flight Booking",
          dealStage: "Meeting Fixed",
          textColor: "FF00C8",
        },
        {
          firstName: "Hakeem Chan",
          email: "augue@natoquepenatibuset.ca",
          mobileNumber: "9022010183",
          userId: "#9270",
          executive: "Sowmiya",
          package: "Domestic",
          enquiryType: "Flight Booking",
          dealStage: "Converted to Deal",
          textColor: "00AC4F",
        },
        {
          firstName: "Hakeem Chan",
          email: "augue@natoquepenatibuset.ca",
          mobileNumber: "9022010183",
          userId: "#9271",
          executive: "Sowmiya",
          package: "Domestic",
          enquiryType: "Flight Booking",
          dealStage: "Proposal Sent",
          textColor: "FF6200",
        },
        {
          firstName: "Hakeem Chan",
          email: "augue@natoquepenatibuset.ca",
          mobileNumber: 9022010183,
          userId: "#9272",
          executive: "Sowmiya",
          package: "Domestic",
          enquiryType: "Flight Booking",
          dealStage: "Closed",
          textColor: "0E2238",
        },
        {
          firstName: "Hakeem Chan",
          email: "augue@natoquepenatibuset.ca",
          mobileNumber: 9022010183,
          userId: "#9273",
          executive: "Sowmiya",
          package: "Domestic",
          enquiryType: "Flight Booking",
          dealStage: "Converted to Deal",
          textColor: "00AC4F",
        },
        {
          firstName: "Hakeem Chan",
          email: "augue@natoquepenatibuset.ca",
          mobileNumber: 9022010183,
          userId: "#9274",
          executive: "Sowmiya",
          package: "Domestic",
          enquiryType: "Flight Booking",
          dealStage: "Converted to Deal",
          textColor: "00AC4F",
        },
        {
          firstName: "Hakeem Chan",
          email: "augue@natoquepenatibuset.ca",
          mobileNumber: 9022010183,
          userId: "#9275",
          executive: "Sowmiya",
          package: "Domestic",
          enquiryType: "Flight Booking",
          dealStage: "Converted to Deal",
          textColor: "00AC4F",
        },
        {
          firstName: "Hakeem Chan",
          email: "augue@natoquepenatibuset.ca",
          mobileNumber: 9022010183,
          userId: "#9276",
          executive: "Sowmiya",
          package: "Domestic",
          enquiryType: "Flight Booking",
          dealStage: "Converted to Deal",
          textColor: "00AC4F",
        },
        {
          firstName: "Hakeem Chan",
          email: "augue@natoquepenatibuset.ca",
          mobileNumber: 9022010183,
          userId: "#9277",
          executive: "Sowmiya",
          package: "Domestic",
          enquiryType: "Flight Booking",
          dealStage: "Converted to Deal",
          textColor: "00AC4F",
        },
      ])
    );
  }, [dispatch]);
  let values = leadsInformations.map((item) => {
    return { [item.userId]: false };
  });

  const [showDropdown, setShowDropdown] = useState({});
  const [checkBox, setCheckBox] = useState(false);

  const [viewPerson, setViewPerson] = useState();
  const [showView, setShowView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [checked, setChecked] = useState({});
  const handleDropdown = (index) => {
    setShowDropdown((prev) => ({ [index]: !prev[index] }));
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handleShowFilters = (e) => {
    const filterEl = document.getElementById("filterEl");
    filterEl.classList.replace("hidden", "block");
    e.stopPropagation();
  };

  const handleHideFilter = () => {
    const filterEl = document.getElementById("filterEl");
    filterEl.classList.replace("block", "hidden");
  };

  const handleView = (e, person) => {
    e.stopPropagation();
    setShowView(true);
    const selectedToView = leadsInformations.filter(
      (eachPerson) => eachPerson.userId === person.userId
    );
    setViewPerson(selectedToView);
  };
  const handleChecked = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  console.log(checked);

  const handleAllChecked = () => {
    const ids = leadsInformations.map((item) => item.userId);
    const allChecked = ids.reduce((acc, id) => {
      acc[id] = checkBox ? false : true;
      return acc;
    }, {});
    setChecked(allChecked);
    setCheckBox(!checkBox);
  };
  console.log(checked);
  const currentItems = leadsInformations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(leadsInformations.length / 10);

  return (
    <div className="w-full flex mt-16 justify-end mb-10 bg-gray-200 ">
      <div
        className="md:w-[93%] text-black  lg:w-[80%]   items-end bg-gray-100"
        onClick={() => {
          handleHideFilter();
          setShowView(false);
        }}
      >
        <h1 className="mt-10 px-2 text-lg poppins-semibold">Leads</h1>
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
              to="/leads/addLeads"
              className="flex items-center  text-sm gap-x-2 text-white ring-1 bg-[#0E2238]  ring-gray-300 px-4 py-2 rounded-sm"
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
                      onChange={handleAllChecked}
                      className="rounded-[0.2rem] w-4 h-4"
                    />
                  </th>
                  <th>Action</th>
                  <th className="">Full name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>User ID</th>
                  <th>Executive</th>
                  <th>Package</th>
                  <th>Enquiry Type</th>
                  <th className="pl-3">Stage</th>
                </tr>
              </thead>
              <tbody className="">
                {currentItems.map((person, index) => (
                  <tr key={index} className=" text-xs">
                    <td className="pt-5 pl-4    ">
                      <input
                        type="checkbox"
                        checked={checked[person.userId]}
                        onChange={() => handleChecked(person.userId)}
                        className="w-4 rounded-[0.2rem] h-4"
                      />
                    </td>
                    <td className="pt-5 ">
                      <button
                        onClick={(e) => handleView(e, person)}
                        className="bg-[#003E78] px-3 rounded-md text-white py-1"
                      >
                        View
                      </button>
                    </td>
                    <td className="flex items-center relative pt-5  text-sm">
                      <p className=" poppins-bold  px-1">{person.firstName}</p>
                      <svg
                        width="12"
                        height="12"
                        onClick={() => handleDropdown(index)}
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
                        <ul className="absolute left-36 w-36 px-2 py-2 rounded-lg text-white bg-gray-400">
                          <li className="my-2 bg-gray-300 rounded-md p-2">
                            Duplicate
                          </li>
                          <li className="my-2 bg-gray-300 rounded-md p-2">
                            Send Email
                          </li>
                          <li className="my-2 bg-gray-300 rounded-md p-2">
                            Add Note
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
                    <td className="px-1 pt-5 ">{person.userId}</td>
                    <td className="px-1 pt-5 ">{person.executive}</td>
                    <td className="px-1 pt-5 ">{person.package}</td>
                    <td className="px-1 pt-5 ">{person.enquiryType}</td>
                    <td
                      className="pt-5  text-start"
                      style={{ color: `#${person.textColor}` }}
                    >
                      {person.dealStage}
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

      <div id="filterEl" className="hidden">
        <LeadsFilters leadsInfo={leadsInformations} />
      </div>
      {showView ? (
        <div className=" fixed overflow-y-scroll pb-7 w-1/4 px-7 poppins-medium rounded-l-md h-[100vh] right-0 top-0 z-50   bg-[#1B3C6D]">
          {viewPerson.length ? (
            <div className="">
              <h1 className="roboto-bold text-sm my-6 text-white">{`View _ ${viewPerson[0].firstName.toUpperCase()}`}</h1>
              <p className="mt-6 border-b-[1px] w-20 text-center text-white">
                Details
              </p>
              <section className="px-4 text-sm text-white">
                <p className="text-[#30BDFA] mt-4 mb-2">Primary Information</p>
                <p>
                  Name:{" "}
                  <span className="text-xs text-gray-300 mx-2">
                    {viewPerson[0].firstName}
                  </span>
                </p>
                <p className="my-1">
                  Contact No:
                  <span className="text-xs text-gray-300  mx-2">
                    {viewPerson[0].mobileNumber}
                  </span>
                </p>
                <p className="text-sm  my-1 whitespace-nowrap">
                  Email ID:
                  <span className="text-xs whitespace-nowrap text-gray-300 mx-2">
                    {viewPerson[0].email}
                  </span>
                </p>
                <p>
                  Enquiry Type:
                  <span className="text-xs text-gray-300  mx-2">
                    {viewPerson[0].enquiryType}
                  </span>
                </p>
              </section>
              <section className="px-4 text-sm text-white">
                <p className="text-[#30BDFA] mt-4 mb-2">Deal Details</p>
                <p>
                  Deal Stage:{" "}
                  <span className="text-xs text-gray-300 mx-2">
                    {viewPerson[0].dealStage}
                  </span>
                </p>
                <p className="my-1">
                  Deal Value:
                  <span className="text-xs text-gray-300  mx-2">
                    {viewPerson[0].dealValue}
                  </span>
                </p>
                <p className="text-sm  my-1 whitespace-nowrap">
                  Followup Date:
                  <span className="text-xs whitespace-nowrap text-gray-300 mx-2">
                    {"12-12-2024"}
                  </span>
                </p>
                <p>
                  Expected closure date:
                  <span className="text-xs text-gray-300  mx-2">
                    12-12-2024
                  </span>
                </p>
              </section>
              <section className="px-4 text-sm text-white">
                <p className="text-[#30BDFA] mt-4 mb-2">Travel Details</p>
                <p>
                  Package:
                  <span className="text-xs text-gray-300 mx-2">
                    {viewPerson[0].package}
                  </span>
                </p>
                <p className="my-1">
                  Planned No Of Days:
                  <span className="text-xs text-gray-300  mx-2">{"4"}</span>
                </p>
                <p className="text-sm  my-1 whitespace-nowrap">
                  Destination:
                  <span className="text-xs whitespace-nowrap text-gray-300 mx-2">
                    {"Dubai"}
                  </span>
                </p>
              </section>
              <section className="px-4 text-sm text-white">
                <p className="text-[#30BDFA] mt-4 mb-2">Budget Details</p>
                <p>
                  Billing Amount:
                  <span className="text-xs text-gray-300 mx-2">{"100000"}</span>
                </p>
                <p className="my-1">
                  Paid:
                  <span className="text-xs text-gray-300  mx-2">{"70000"}</span>
                </p>
                <p className="text-sm  my-1 whitespace-nowrap">
                  Balance Payment:
                  <span className="text-xs whitespace-nowrap text-gray-300 mx-2">
                    {"30000"}
                  </span>
                </p>
              </section>
              <section className="px-4 text-sm text-white">
                <p className="text-[#30BDFA] mt-4 mb-2">Executive</p>
                <p>
                  Creator:
                  <span className="text-xs text-gray-300 mx-2">{"Thilak"}</span>
                </p>
                <p className="my-1">
                  Created On:
                  <span className="text-xs text-gray-300  mx-2">
                    {"Jul 19,2024 01:45 PM"}
                  </span>
                </p>
              </section>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Leads;
