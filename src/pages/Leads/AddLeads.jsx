import { useEffect, useState } from "react";
import InputBox from "./InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddLeads = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const initialState = {
    firstName: "",
    lastName: "",
    enquiryType: "",
    mobile: "",
    email: "",
    dealStage: "",
    dealValue: "",
    package: "",
    followUpDate: "",
    expectedClosureDate: "",
    executiveName: "",
    plannedNoOfDays: "",
    destination: "",
    billingAmount: "",
    paid: "",
    balanceAmount: "",
  };
  const [addLeadsData, setAddLeadsData] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setAddLeadsData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  function validate() {
    let valid = true;
    if (
      addLeadsData.firstName.length < 3 ||
      addLeadsData.firstName.length == 0
    ) {
      setErrors((prev) => ({ ...prev, firstName: true }));
      valid = false;
    }
    if (
      addLeadsData.lastName.length > 10 ||
      addLeadsData.lastName.length == 0
    ) {
      setErrors((prev) => ({ ...prev, lastName: true }));
      valid = false;
    }
    if (addLeadsData.enquiryType.length == "") {
      setErrors((prev) => ({ ...prev, enquiryType: true }));
      valid = false;
    }

    if (addLeadsData.mobile.length != 10) {
      setErrors((prev) => ({ ...prev, mobile: true }));
      valid = false;
    }
    if (
      !addLeadsData.email.includes("@gmail.com") ||
      addLeadsData.email.length === 0
    ) {
      setErrors((prev) => ({ ...prev, email: true }));
      valid = false;
    }
    if (
      addLeadsData.executiveName.length > 15 ||
      addLeadsData.executiveName.length === 0
    ) {
      setErrors((prev) => ({ ...prev, executiveName: true }));
      valid = false;
    }
    if (addLeadsData.dealStage.length == "") {
      setErrors((prev) => ({ ...prev, dealStage: true }));
      valid = false;
    }
    if (addLeadsData.followUpDate == "") {
      setErrors((prev) => ({ ...prev, followUpDate: true }));
      valid = false;
    }
    if (addLeadsData.expectedClosureDate == "") {
      setErrors((prev) => ({ ...prev, expectedClosureDate: true }));
      valid = false;
    }
    if (addLeadsData.package == "") {
      setErrors((prev) => ({ ...prev, package: true }));
      valid = false;
    }
    if (
      addLeadsData.plannedNoOfDays > 30 ||
      addLeadsData.plannedNoOfDays.length === 0
    ) {
      setErrors((prev) => ({ ...prev, plannedNoOfDays: true }));
      valid = false;
    }
    if (addLeadsData.destination == "") {
      setErrors((prev) => ({ ...prev, destination: true }));
      valid = false;
    }
    if (addLeadsData.billingAmount == "") {
      setErrors((prev) => ({ ...prev, billingAmount: true }));
      valid = false;
    }
    if (addLeadsData.paid == "") {
      setErrors((prev) => ({ ...prev, paid: true }));
      valid = false;
    }
    if (addLeadsData.balanceAmount == "") {
      setErrors((prev) => ({ ...prev, balanceAmount: true }));
      valid = false;
    }
    return valid;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return console.log("error in form validation");
    try {
      const followUpDate = new Date(addLeadsData.followUpDate);
      const expectedClosureDate = new Date(addLeadsData.expectedClosureDate);
      const dataToSend = {
        ...addLeadsData,
        followUpDate,
        expectedClosureDate,
      };
      const sendDeals = await axios.post(
        "http://localhost:4000/leads/addLeads",
        dataToSend,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/leads");
    }
  };

  return (
    <div className="w-full flex mt-16 roboto-semibold justify-end bg-gray-100">
      <form
        onChange={handleChange}
        onSubmit={handleSubmit}
        className="md:w-[93%] px-1 lg:w-[80%] my-6 items-end"
      >
        <h1 className="poppins-semibold text-lg">Add Leads</h1>
        <section className="my-1 roboto-semibold">
          <h1 className="bg-[#003E78] py-2 px-6 text-white text-lg rounded-t-lg">
            Primary Information
          </h1>
          <div className="w-full bg-[#FFFFFF] gap-x-4  w- text-black flex flex-wrap gap-y-6  p-5  items-center">
            <div className="w-[23%] flex flex-col">
              <label className="roboto-semibold  text-sm mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className="px-3 py-3 border-none ring-1  ring-gray-300 w-full text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={"John"}
              ></input>
              {errors && errors.firstName ? (
                <p className="text-xs text-red-600">
                  FirstName must be 3 characters above
                </p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>
            <div className="w-[23%] flex flex-col">
              <label className="roboto-semibold  text-sm mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="px-3 py-3 border-none ring-1  ring-gray-300 w-full text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={"Doe"}
              ></input>
              {errors && errors.lastName ? (
                <p className="text-xs text-red-600">
                  LastName must be 10 characters below
                </p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>

            <div className="flex flex-col flex-wrap w-[30%]">
              <label
                htmlFor="countries"
                className="  text-sm mb-2  text-black   dark:text-white"
              >
                Enquiry Type
              </label>
              <select
                id="countries"
                name="enquiryType"
                className="bg-gray-50 w-11/12 border-gray-300 text-gray-400 text-[14px]  rounded-[0.3rem] focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option hidden disabled selected>
                  Enquiry Type
                </option>
                <option value="Flight Booking">Flight Booking</option>
                <option value="Hotel Booking">Hotel Booking</option>
                <option value="Sight Seeing">Sight Seeing</option>
                <option value="Transport">Transport</option>
                <option value="Others">Others</option>
              </select>
              {errors && errors.enquiryType ? (
                <p className="text-xs text-red-600">Enquiry Type is required</p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>

            <div className="w-[23%] flex flex-col">
              <label className="roboto-semibold  text-sm mb-2">
                Mobile Phone
              </label>
              <input
                type="number"
                name="mobile"
                className="px-3 py-3 border-none ring-1  ring-gray-300 w-full text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter Your Phone Numbe"
              ></input>

              {errors && errors.mobile ? (
                <p className="text-xs text-red-600">
                  Mobile Number must be 10 digits
                </p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>

            <div className="w-[25%] flex flex-col">
              <label className="roboto-semibold  text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="px-3 py-3 border-none ring-1  ring-gray-300 w-full text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="example@email.com"
              ></input>

              {errors && errors.email ? (
                <p className="text-xs text-red-600">Email must be valid</p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>

            <div className="w-[25%] flex flex-col">
              <label className="roboto-semibold  text-sm mb-2">
                Executive Name
              </label>
              <input
                type="text"
                name="executiveName"
                className="px-3 py-3 border-none ring-1  ring-gray-300 w-full text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Executive Name"
              ></input>
              {errors && errors.executiveName ? (
                <p className="text-xs text-red-600">
                  Executive Name must be 15 characters below
                </p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>
          </div>
        </section>
        <section className="my-1 ">
          <h1 className="bg-[#003E78] py-2 px-6 text-white  text-lg rounded-t-lg">
            Deal Details
          </h1>
          <div className="w-full relative bg-[#FFFFFF] gap-x-9 text-black flex flex-wrap gap-y-6 p-5 items-center">
            <div className="flex flex-col flex-wrap w-[23%]">
              <label
                htmlFor="countries"
                className="   text-sm mb-2  text-black   dark:text-white"
              >
                Deal Stage
              </label>
              <select
                id="countries"
                name="dealStage"
                className="bg-gray-50 w-full roboto-semibold border-gray-300 text-[14px]  rounded-[0.3rem] focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option style={{ opacity: 0.3 }} hidden disabled selected>
                  Deal Stage
                </option>
                <option value="Converted To Deal">Converted to Deal</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Meeting Fixed">Meeting Fixed</option>
                <option value="Yes To Confirm">Yes to Confirm </option>
              </select>
              {errors && errors.dealStage ? (
                <p className="text-xs text-red-600">dealStage required</p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>

            <div className="w-[25%] flex flex-col">
              <label className="roboto-semibold  text-sm mb-2">
                Deal Value
              </label>
              <input
                type="text"
                name="dealValue"
                className={
                  "px-3 py-3 border-none ring-1 ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                }
                placeholder="Deal Value"
              ></input>

              <p className="h-4"></p>
            </div>
            <div className="flex flex-col w-[15%]">
              <label className={`  text-sm mb-2`}>Followup date</label>
              <div className="relative max-w-sm">
                <input
                  type="date"
                  name="followUpDate"
                  placeholder="date"
                  className="appearance-none"
                ></input>
                {errors && errors.followUpDate ? (
                  <p className="text-xs text-red-600">Followup date required</p>
                ) : (
                  <p className="h-4"></p>
                )}
                {/*<div className="absolute inset-y-0 right-2 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5498 3.5V4.25H4.5498V20.75H21.0498V4.25H18.0498V3.5H16.5498V4.25H9.0498V3.5H7.5498ZM6.0498 5.75H7.5498V6.5H9.0498V5.75H16.5498V6.5H18.0498V5.75H19.5498V7.25H6.0498V5.75ZM6.0498 8.75H19.5498V19.25H6.0498V8.75ZM10.5498 10.25V11.75H12.0498V10.25H10.5498ZM13.5498 10.25V11.75H15.0498V10.25H13.5498ZM16.5498 10.25V11.75H18.0498V10.25H16.5498ZM12.7998 12.5V15.5H15.7998V12.5H12.7998ZM7.5498 13.25V14.75H9.0498V13.25H7.5498ZM10.5498 13.25V14.75H12.0498V13.25H10.5498ZM16.5498 13.25V14.75H18.0498V13.25H16.5498ZM7.5498 16.25V17.75H9.0498V16.25H7.5498ZM10.5498 16.25V17.75H12.0498V16.25H10.5498ZM13.5498 16.25V17.75H15.0498V16.25H13.5498Z"
                      fill="#6E7491"
                    />
                  </svg>
                </div>*/}
              </div>
            </div>
            <div className="flex flex-col w-[15%]">
              <label className={`  text-sm mb-2`}>Expected closure date</label>
              <div className="relative max-w-sm">
                <input
                  type="date"
                  name="expectedClosureDate"
                  placeholder="date"
                ></input>
                {errors && errors.expectedClosureDate ? (
                  <p className="text-xs text-nowrap text-red-600">
                    expectedClosureDate required{" "}
                  </p>
                ) : (
                  <p className="h-4"></p>
                )}
                {/*<div className="absolute inset-y-0 right-2 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5498 3.5V4.25H4.5498V20.75H21.0498V4.25H18.0498V3.5H16.5498V4.25H9.0498V3.5H7.5498ZM6.0498 5.75H7.5498V6.5H9.0498V5.75H16.5498V6.5H18.0498V5.75H19.5498V7.25H6.0498V5.75ZM6.0498 8.75H19.5498V19.25H6.0498V8.75ZM10.5498 10.25V11.75H12.0498V10.25H10.5498ZM13.5498 10.25V11.75H15.0498V10.25H13.5498ZM16.5498 10.25V11.75H18.0498V10.25H16.5498ZM12.7998 12.5V15.5H15.7998V12.5H12.7998ZM7.5498 13.25V14.75H9.0498V13.25H7.5498ZM10.5498 13.25V14.75H12.0498V13.25H10.5498ZM16.5498 13.25V14.75H18.0498V13.25H16.5498ZM7.5498 16.25V17.75H9.0498V16.25H7.5498ZM10.5498 16.25V17.75H12.0498V16.25H10.5498ZM13.5498 16.25V17.75H15.0498V16.25H13.5498Z"
                      fill="#6E7491"
                    />
                  </svg>
                </div>*/}
              </div>
            </div>
          </div>
        </section>
        <section className="my-1">
          <h1 className="bg-[#003E78] py-2 px-6 text-white  text-lg rounded-t-lg">
            Travel Details
          </h1>
          <div className="w-full relative gap-x-5 bg-[#FFFFFF] text-black flex flex-wrap gap-y-6 p-5 items-center">
            <div className="flex flex-col flex-wrap w-1/4">
              <label
                htmlFor="countries"
                className="    text-sm mb-2  text-black   dark:text-white"
              >
                Package
              </label>
              <select
                id="countries"
                name="package"
                className="bg-gray-50 w-full border-gray-300 text-[14px]  rounded-[0.3rem] focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option hidden disabled selected>
                  Package
                </option>
                <option value="Domestic">Domastic</option>
                <option value="International">International</option>
              </select>
              {errors && errors.package ? (
                <p className="text-xs text-red-600">package is required</p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>

            <div className="w-[25%] flex flex-col">
              <label className="roboto-semibold  text-sm mb-2">
                Planned No of Days
              </label>
              <input
                type="text"
                name="plannedNoOfDays"
                className={
                  "px-3 py-3 border-none ring-1 ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                }
                placeholder="Planned No of Days"
              ></input>
              {errors && errors.plannedNoOfDays ? (
                <p className="text-xs text-red-600">
                  Planned No of days should be 30days below
                </p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>
            <div className="flex flex-col flex-wrap w-1/4">
              <label
                htmlFor="countries"
                className="   text-sm mb-2  text-black   dark:text-white"
              >
                Destination
              </label>
              <select
                id="countries"
                name="destination"
                className="bg-gray-50 w-full border-gray-300 text-gray-400 text-[14px]  rounded-[0.3rem] focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option hidden disabled selected>
                  Destination
                </option>
                <option value="Dubai">Dubai</option>
                <option value="Singapore">Singapore</option>
                <option value="Maldives">Maldives</option>
                <option value="UK">UK</option>
                <option value="Malta">Malta</option>
              </select>
              {errors && errors.destination ? (
                <p className="text-xs text-red-600">Destination is required</p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>
          </div>
        </section>
        <section className="my-1">
          <h1 className="bg-[#003E78] py-2 px-6 text-white  text-lg rounded-t-lg">
            Budget
          </h1>
          <div className=" text-black px-5 flex gap-x-10 bg-white flex-wrap py-4  items-center">
            <div className="w-[18%] flex flex-col">
              <label className="roboto-semibold  text-sm mb-2">
                Billing Amount
              </label>
              <input
                type="text"
                name="billingAmount"
                className={
                  "px-3 py-3 border-none ring-1  ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                }
              ></input>
              {errors && errors.billingAmount ? (
                <p className="text-xs text-red-600">
                  Billing amount is required
                </p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>

            <div className="w-[18%] flex flex-col">
              <label className="roboto-semibold  text-sm mb-2">Paid</label>
              <input
                type="text"
                name="paid"
                className={
                  "px-3 py-3 border-none ring-1  ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                }
              ></input>
              {errors && errors.paid ? (
                <p className="text-xs text-red-600">paid is required</p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>

            <div className="w-[18%] flex flex-col">
              <label className="roboto-semibold  text-sm mb-2">
                Balance Payment
              </label>
              <input
                type="text"
                name="balanceAmount"
                className={
                  "px-3 py-3 border-none ring-1  ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                }
              ></input>
              {errors && errors.balanceAmount ? (
                <p className="text-xs text-red-600">
                  BalancePayment is required
                </p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>
            <button
              onClick={() => navigate("/leads")}
              className="bg-gray-800 px-6 py-3.5 text-white text-sm mt-6 poppins-medium  rounded-md"
            >
              Cancel
            </button>
            <button className="bg-[#1B3C6D] px-6 py-3.5 text-white text-sm mt-6 poppins-medium  rounded-md">
              Submit
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default AddLeads;
