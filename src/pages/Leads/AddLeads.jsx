import { useEffect, useState, useRef } from "react";
import InputBox from "./InputBox";
import { Datepicker } from "flowbite";
import "flowbite/dist/flowbite.min.css";

const AddLeads = () => {
  const datepickerRef = useRef(null);
  const datepickerRef2 = useRef(null);
  const initialState = {
    firstName: "",
    lastName: "",
    enquiryType: "",
    mobileNumber: "",
    email: "",
    dealStage: "",
    dealValue: "",
    package: "",
    executive: "",
    plannedNoOfDays: "",
    destination: "",
    billingAmount: "",
    paid: "",
    balancePayment: "",
  };
  const [addLeadsData, setAddLeadsData] = useState(initialState);

  useEffect(() => {
    const datepickerEl = document.getElementById("default-datepicker");
    const datepickerE2 = document.getElementById("default-datepickertwo");

    if (datepickerEl || datepickerE2) {
      const options = {
        autohide: false,
        format: "dd/mm/yyyy",
        maxDate: null,
        minDate: null,
        orientation: "bottom",
        buttons: false,
        autoSelectToday: false,
        title: null,
        rangePicker: false,
        onShow: () => {},
        onHide: () => {},
      };

      datepickerRef.current = new Datepicker(datepickerEl, options);
      datepickerRef2.current = new Datepicker(datepickerE2, options);

      return () => {
        if (datepickerRef.current) {
          datepickerRef.current.destroy();
        }
        if (datepickerRef2.current) {
          datepickerRef2.current.destroy();
        }
      };
    } else {
      console.error(
        "Element with ID 'default-datepicker' or 'default-datepickertwo' not found."
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddLeadsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const followup1 = datepickerRef.current?.getDate();
    const followup2 = datepickerRef2.current?.getDate();
    if (followup1 && followup2) {
      const dateObj1 = new Date(followup1);
      const dateObj2 = new Date(followup2);

      const followUpDate = dateObj1.toLocaleDateString("en-GB");
      const followUpDate1 = dateObj2.toLocaleDateString("en-GB");
    } else {
      console.error("Datepicker instance is not initialized.");
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
            <InputBox
              label={"First Name"}
              type={"text"}
              placeholder={"John"}
              name={"firstName"}
              inputWidth={"w-[23%]"}
              className={
                "px-3 py-3 border-none ring-1  ring-gray-300 w-full text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
              }
            />
            <InputBox
              label={"Last Name"}
              type={"text"}
              placeholder={"Doe"}
              name={"lastName"}
              inputWidth={"w-[23%]"}
              className={
                "px-3 py-3 border-none ring-1 ring-gray-300 w-full text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
              }
            />
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
                <option value="Flight Booking">Flight</option>
                <option value="Canceled">Canceled</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Meeting Fixed">Meeting Fixed</option>
                <option value="Yes To Confirm">Yes to Confirm </option>
              </select>
            </div>
            <InputBox
              label={"Mobile Phone"}
              type={"text"}
              inputWidth={"w-[27%]"}
              name={"mobileNumber"}
              placeholder={"Enter Your Phone Number"}
              className={
                "px-3 py-3 border-none ring-1 ring-gray-300 w-full text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
              }
            />
            <InputBox
              label={"Email"}
              type={"email"}
              inputWidth={"w-[27%]"}
              name={"email"}
              placeholder={"example@email.com"}
              className={
                "px-3 py-3 border-none ring-1 ring-gray-300 w-full  text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
              }
            />
            <InputBox
              label={"Executive Name"}
              type={"text"}
              inputWidth={"w-[27%]"}
              name={"executive"}
              placeholder={"Executive Name"}
              className={
                "px-3 py-3 border-none ring-1 ring-gray-300 w-full  text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
              }
            />
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
                <option value="Canceled">Canceled</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Meeting Fixed">Meeting Fixed</option>
                <option value="yes To Confirm">Yes to Confirm </option>
              </select>
            </div>

            <InputBox
              label={"Deal Value"}
              type={"text"}
              name={"dealValue"}
              inputWidth={"w-[23%]"}
              placeholder={"Deal Value"}
              className={
                "px-3 py-3 border-none ring-1 ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
              }
            />
            <div className="flex flex-col w-[15%]">
              <label className={`  text-sm mb-2`}>Followup date</label>
              <div className="relative max-w-sm">
                <input
                  data-datepicker
                  id="default-datepicker"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date"
                />
                <div className="absolute inset-y-0 right-2 flex items-center ps-3.5 pointer-events-none">
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
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[15%]">
              <label className={`  text-sm mb-2`}>Expected closure date</label>
              <div className="relative max-w-sm">
                <input
                  data-datepicker
                  id="default-datepickertwo"
                  type="text"
                  className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date"
                />
                <div className="absolute inset-y-0 right-2 flex items-center ps-3.5 pointer-events-none">
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
                </div>
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
            </div>

            <InputBox
              label={"Planned No of Days"}
              type={"text"}
              placeholder={"Planned No of Days"}
              name={"plannedNoOfDays"}
              inputWidth={"w-1/4"}
              className={
                "px-3 py-3 border-none ring-1 ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
              }
            />
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
            </div>
          </div>
        </section>
        <section className="my-1">
          <h1 className="bg-[#003E78] py-2 px-6 text-white  text-lg rounded-t-lg">
            Budget
          </h1>
          <div className=" text-black px-5 flex gap-x-10 bg-white flex-wrap py-4  items-center">
            <InputBox
              label={"Billing Amount"}
              type={"text"}
              name={"billingAmount"}
              inputWidth={"w-1/6 "}
              className={
                "px-3 py-3 border-none ring-1  ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
              }
            />
            <InputBox
              label={"Paid"}
              type={"text"}
              name={"paid"}
              inputWidth={"w-1/6 "}
              className={
                "px-3 py-3 border-none ring-1 ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
              }
            />
            <InputBox
              label={"Balance Payment"}
              type={"text"}
              inputWidth={"w-1/6 "}
              name={"balancePayment"}
              className={
                "px-3 py-3 border-none ring-1 ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
              }
            />
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
