import { useState } from "react";

const AddFinance = () => {
  const [addFinanceData, setAddFinanceData] = useState({
    id: "",
    amount: "",
    income: "",
    pending: "",
    tax: "",
    tds: "",
    totalAmount: "",
    date: "",
    time: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setAddFinanceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className=" fixed w-1/4 px-7 rounded-l-md h-[100vh] right-0 top-0 z-20  overflow-y-auto  bg-[#1B3C6D]">
      <h1 className=" text-sm my-6 text-white">Add Finance</h1>
      <form className="w-3/4 roboto-semibold mx-3" onChange={handleChange}>
        <div className="flex flex-col w-full">
          <label className="block mt-5  text-xs mb-2  text-gray-100  font-medium dark:text-white">
            ID
          </label>
          <input
            type="text"
            placeholder="Type"
            name="id"
            className="rounded-[0.3rem] w-full text-[14px] roboto-medium  "
          ></input>
          <label
            htmlFor="countries"
            className="block mt-5  text-xs mb-2  text-gray-100  font-medium dark:text-white"
          >
            Amount
          </label>
          <input
            type="text"
            placeholder="Type"
            name="amount"
            className="rounded-[0.3rem] w-full text-[14px] roboto-medium  "
          ></input>
        </div>

        <label className="block mt-5   text-xs mb-2  text-gray-100  font-medium dark:text-white">
          Tax
        </label>
        <input
          type="text"
          placeholder="Type"
          name="tax"
          className="rounded-[0.3rem] w-full text-[14px] roboto-medium  "
        ></input>
        <label className="block mt-5  text-xs mb-2  text-gray-100  font-medium dark:text-white">
          TDS
        </label>
        <input
          type="text"
          placeholder="Type"
          name="tds"
          className="rounded-[0.3rem] w-full text-[14px] roboto-medium   "
        ></input>
        <label className="block mt-5  text-xs mb-2  text-gray-100  font-medium dark:text-white">
          Total Amount
        </label>
        <input
          type="text"
          placeholder="Type"
          name="totalAmount"
          className="rounded-[0.3rem] mb-4 w-full text-[14px] roboto-medium"
        ></input>
        <div className="relative my-2 max-w-sm">
          <label className="text-blue-gray-100 text-sm  mb-1">Date</label>
          <input
            type="date"
            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full  py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date"
          />
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

        <label
          htmlFor="time"
          className="block mb-2 text-sm font-medium text-white"
        >
          Select time:
        </label>
        <div className="flex">
          <input
            type="time"
            className="rounded-none rounded-s-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            min="09:00"
            id="time"
            max="18:00"
            required
          />
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-s-0 border-s-0 border-gray-300 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>

        <div className="flex my-5  justify-between items-center">
          <button
            type="submit"
            className="px-9  rounded-xl py-1 bg-white text-black"
          >
            Add
          </button>
          <button className="px-4   text-gray-500 rounded-xl py-1 bg-gray-200">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFinance;
