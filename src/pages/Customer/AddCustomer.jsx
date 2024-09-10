/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import InputBox from "../Leads/InputBox";
import { Datepicker } from "flowbite";
import "flowbite/dist/flowbite.min.css";

const AddCustomer = () => {
  const datepickerRef = useRef(null);
  const datepickerRef2 = useRef(null);
  const [addCustomer, setAddCustomer] = useState({
    firstName: "",
    lastName: "",
    enquiryType: "",
    mobilePhone: "",
    email: "",
    package: "",
    stage: "",
    executive: "",
    startDate: "",
    endDate: "",
    passport: "",
    adults: "",
    children: "",
    visaFile: "",
    billingAmount: "",
    paid: "",
    balancePayment: "",
  });

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
    const { name, value, files } = e.target;
    setAddCustomer((prev) => ({
      ...prev,
      if(files) {
        return { [name]: files[0] };
      },
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

      const startDate = dateObj1.toLocaleDateString("en-GB");
      const endDate = dateObj2.toLocaleDateString("en-GB");
    } else {
      console.error("Datepicker instance is not initialized.");
    }
  };

  return (
    <div className="w-full flex mt-16 justify-end bg-gray-100">
      <form
        onChange={handleChange}
        onSubmit={handleSubmit}
        className="md:w-[93%] px-1 font-medium lg:w-[80%] my-6 items-end"
      >
        <h1 className="poppins-semibold  text-lg">Add New Customer</h1>
        <section className="my-1">
          <h1 className="bg-[#003E78] py-2 px-6 text-white  text-lg rounded-t-lg">
            Primary Information
          </h1>

          <div className="w-full bg-[#FFFFFF] roboto-semibold font-medium text-black flex flex-col  flex-wrap gap-y-3  p-5  items-start">
            <div className="w-full flex">
              <InputBox
                label={"First Name"}
                inputWidth={"w-1/4"}
                type={"text"}
                value={addCustomer.firstName}
                placeholder={"John"}
                name={"firstName"}
                className={
                  "px-3 py-3 border-none ring-1 ring-gray-300 w-11/12 text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                }
              />
              <InputBox
                label={"Last Name"}
                type={"text"}
                placeholder={"Doe"}
                inputWidth={"w-1/4"}
                name={"lastName"}
                className={
                  "px-3 py-3 border-none ring-1 ring-gray-300 w-11/12 text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
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
                  className="bg-gray-50 w-4/5 border-gray-300 text-gray-400 text-[14px]  rounded-[0.3rem] focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            </div>

            <h3 className="">Contact Detail</h3>
            <div className="w-full flex">
              <InputBox
                label={"Mobile Phone"}
                type={"text"}
                name={"mobilePhone"}
                inputWidth={"w-1/4"}
                placeholder={"Enter Your Phone Number"}
                className={
                  "px-3 py-3 border-none ring-1 ring-gray-300 w-full text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                }
              />
              <InputBox
                label={"Email"}
                type={"email"}
                inputWidth={"w-1/4"}
                name={"email"}
                placeholder={"example@email.com"}
                labelClassName={"mx-5"}
                className={
                  "px-3 py-3 border-none ring-1 ring-gray-300 w-11/12 mx-5 text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                }
              />
              <div className="flex flex-col flex-wrap mx-7 w-[30%]">
                <label
                  htmlFor="countries"
                  className="   text-sm mb-2  text-black  font-medium dark:text-white"
                >
                  Package
                </label>
                <select
                  id="countries"
                  name="package"
                  className="bg-gray-50 w-4/5 border-gray-300 text-gray-400 text-[14px] rounded-[0.3rem] focus:ring-blue-500 focus:border-blue-500 block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden disabled selected>
                    Package
                  </option>
                  <option value="domestic">Domestic</option>
                  <option value="international">International</option>
                </select>
              </div>
            </div>
          </div>
        </section>
        <section className="my-1">
          <h1 className="bg-[#003E78] py-2 px-6 text-white  text-lg rounded-t-lg">
            Additional Information
          </h1>
          <div className="w-full relative bg-[#FFFFFF] gap-x-5 text-black flex flex-wrap gap-y-6 p-5 items-center">
            <div className="flex flex-col flex-wrap w-1/5">
              <label
                htmlFor="countries"
                className="   text-sm mb-2  text-black  font-medium dark:text-white"
              >
                Stage
              </label>
              <select
                id="countries"
                name="stage"
                className="bg-gray-50 w-full border-gray-300 text-[14px] rounded-[0.3rem] focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option style={{ opacity: 0.3 }} hidden disabled selected>
                  Stage
                </option>
                <option value="confirmed">Confirmed</option>
                <option value="canceled">Canceled</option>
                <option value="pending">Pending</option>
                <option value="waiting">Waiting</option>
                <option value="ontrip">On Trip</option>
              </select>
            </div>
            <InputBox
              label={"Executive"}
              type={"text"}
              name={"executive"}
              placeholder={"Executive "}
              inputWidth={"w-1/5"}
              className={
                "px-3 py-3 border-none ring-1  ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
              }
            />
            <div className="flex flex-col w-1/5">
              <label className={` text-sm mb-2`}>Start date</label>
              <div className="relative max-w-sm">
                <input
                  data-datepicker
                  id="default-datepicker"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <div className="flex flex-col w-1/5">
              <label className={`  text-sm mb-2`}>End date</label>
              <div className="relative max-w-sm">
                <input
                  data-datepicker
                  id="default-datepickertwo"
                  type="text"
                  className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <div className="w-[18%] mr-2 ">
              <h4 className="mb-2 text-sm">VISA</h4>
              <div className="flex  py-2.5 w-full border-[1px] rounded-sm px-2 justify-between items-center border-gray-400 hover:bg-stone-300">
                <label
                  className="text-sm bg-stone-200   block"
                  htmlFor="fileUpload"
                >
                  <input
                    type="file"
                    className="hidden"
                    name="visaFile"
                    id="fileUpload"
                  />
                  Choose File
                </label>
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 1.25C12.1083 1.24993 12.2153 1.27331 12.3137 1.31854C12.4121 1.36377 12.4995 1.42977 12.57 1.512L15.57 5.012C15.6994 5.16317 15.7635 5.35957 15.7481 5.55798C15.7327 5.7564 15.6392 5.94057 15.488 6.07C15.3368 6.19943 15.1404 6.2635 14.942 6.24812C14.7436 6.23274 14.5594 6.13917 14.43 5.988L12.75 4.028V15C12.75 15.1989 12.671 15.3897 12.5303 15.5303C12.3897 15.671 12.1989 15.75 12 15.75C11.8011 15.75 11.6103 15.671 11.4697 15.5303C11.329 15.3897 11.25 15.1989 11.25 15V4.027L9.57 5.988C9.50591 6.06285 9.42771 6.12435 9.33986 6.16898C9.25201 6.21361 9.15623 6.2405 9.05798 6.24812C8.95974 6.25573 8.86096 6.24392 8.76728 6.21336C8.6736 6.1828 8.58685 6.13409 8.512 6.07C8.43715 6.00592 8.37565 5.92771 8.33102 5.83986C8.28639 5.75201 8.2595 5.65623 8.25188 5.55798C8.24427 5.45974 8.25608 5.36096 8.28664 5.26728C8.3172 5.1736 8.36592 5.08685 8.43 5.012L11.43 1.512C11.5005 1.42977 11.5879 1.36377 11.6863 1.31854C11.7847 1.27331 11.8917 1.24993 12 1.25ZM6.996 8.252C7.19491 8.25094 7.3861 8.32894 7.5275 8.46884C7.6689 8.60874 7.74894 8.79909 7.75 8.998C7.75106 9.19691 7.67306 9.3881 7.53316 9.5295C7.39326 9.6709 7.20291 9.75094 7.004 9.752C5.911 9.758 5.136 9.786 4.547 9.894C3.981 9.999 3.652 10.166 3.409 10.409C3.132 10.686 2.952 11.075 2.853 11.809C2.752 12.564 2.75 13.565 2.75 15V16C2.75 17.436 2.752 18.437 2.853 19.192C2.952 19.926 3.133 20.314 3.409 20.592C3.686 20.868 4.074 21.048 4.809 21.147C5.563 21.249 6.565 21.25 8 21.25H16C17.435 21.25 18.436 21.249 19.192 21.147C19.926 21.048 20.314 20.868 20.591 20.591C20.868 20.314 21.048 19.926 21.147 19.192C21.248 18.437 21.25 17.436 21.25 16V15C21.25 13.565 21.248 12.564 21.147 11.808C21.048 11.075 20.867 10.686 20.591 10.409C20.347 10.166 20.019 9.999 19.453 9.894C18.864 9.786 18.089 9.758 16.996 9.752C16.8975 9.75147 16.8001 9.73155 16.7093 9.69338C16.6185 9.6552 16.5361 9.59952 16.4668 9.5295C16.3976 9.45949 16.3428 9.37651 16.3056 9.28532C16.2684 9.19412 16.2495 9.09649 16.25 8.998C16.2505 8.89951 16.2704 8.80209 16.3086 8.71129C16.3468 8.6205 16.4025 8.53811 16.4725 8.46884C16.5425 8.39957 16.6255 8.34477 16.7167 8.30756C16.8079 8.27035 16.9055 8.25147 17.004 8.252C18.086 8.258 18.987 8.284 19.724 8.419C20.482 8.559 21.127 8.824 21.652 9.349C22.254 9.95 22.512 10.709 22.634 11.609C22.75 12.475 22.75 13.578 22.75 14.945V16.055C22.75 17.423 22.75 18.525 22.634 19.392C22.512 20.292 22.254 21.05 21.652 21.652C21.05 22.254 20.292 22.512 19.392 22.634C18.525 22.75 17.422 22.75 16.055 22.75H7.945C6.578 22.75 5.475 22.75 4.608 22.634C3.708 22.513 2.95 22.254 2.348 21.652C1.746 21.05 1.488 20.292 1.367 19.392C1.25 18.525 1.25 17.422 1.25 16.055V14.945C1.25 13.578 1.25 12.475 1.367 11.608C1.487 10.708 1.747 9.95 2.348 9.348C2.873 8.824 3.518 8.558 4.276 8.419C5.013 8.284 5.914 8.258 6.996 8.252Z"
                      fill="#999999"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <InputBox
              label={"Passport"}
              type={"text"}
              name={"passport"}
              inputWidth={"w-[20%]"}
              className={
                "px-3 py-3 border-none ring-1  ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
              }
            />
            <InputBox
              label={"No of Adults"}
              type={"text"}
              name={"adults"}
              inputWidth={"w-[20%]"}
              className={
                "px-3 py-3 border-none ring-1  ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
              }
            />
            <InputBox
              label={"No of Children"}
              type={"text"}
              name={"children"}
              inputWidth={"w-[20%]"}
              className={
                "px-3 py-3 border-none ring-1  ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
              }
            />{" "}
            <InputBox
              label={"Billing amount"}
              type={"text"}
              name={"billingAmount"}
              inputWidth={"w-[20%]"}
              className={
                "px-3 py-3 border-none ring-1  ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
              }
            />{" "}
            <InputBox
              label={"Paid"}
              type={"text"}
              name={"paid"}
              inputWidth={"w-[20%]"}
              className={
                "px-3 py-3 border-none ring-1  ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
              }
            />{" "}
            <InputBox
              label={"Balance Payment"}
              type={"text"}
              name={"balancePayment"}
              inputWidth={"w-[20%]"}
              className={
                "px-3 py-3 border-none ring-1  ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
              }
            />
            <button className="bg-[#0E2238] px-6 py-3 text-white text-sm mt-6 poppins-medium  rounded-md">
              Submit
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default AddCustomer;
