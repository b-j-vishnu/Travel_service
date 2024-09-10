/* eslint-disable no-unused-vars */
import { Datepicker } from "flowbite";
import React, { useRef, useState } from "react";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const InvoiceFilter = ({ InvoiceInformation }) => {
  const datepicker = useRef(null);
  const [filterOptions, setFilterOptions] = useState({
    status: "",
    validDate: "",
    total: "",
    executive: "",
    id: "",
  });
  useEffect(() => {
    const $datepickerEl = document.getElementById("datepicker-orientation");
    const options = {
      defaultDatepickerId: null,
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

    const instanceOptions = {
      id: "datepicker-orientation",
      override: true,
    };
    datepicker.current = new Datepicker(
      $datepickerEl,
      options,
      instanceOptions
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date(datepicker.current?.getDate());
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    console.log({
      ...filterOptions,
      total: Number(filterOptions.total),
      validDate: formattedDate,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className=" fixed w-1/4 px-7 rounded-l-md h-[100vh] right-0 top-0 z-50   bg-[#1B3C6D]">
      <h1 className="roboto-bold text-sm my-6 text-white">Filters</h1>
      <form
        className=" w-3/4 mx-3"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="stage"
          className="block  roboto-bold text-xs mb-2  text-gray-200  font-medium dark:text-white"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          value={filterOptions.status}
          className="bg-gray-50 borde border-gray-300 text-gray-900 text-[14px] roboto-medium rounded-[0.3rem] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option hidden selected>
            Select
          </option>
          <option value="1 st payment">1 st Payment</option>
          <option value="2 st payment">2 st Payment</option>
          <option value="3 st payment">3 st payment</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <div className="flex flex-col w-full">
          <label
            className={` roboto-bold  text-blue-gray-100 text-sm mt-3 mb-1`}
          >
            Valid Date
          </label>
          <div className="relative max-w-sm">
            <input
              data-datepicker
              id="datepicker-orientation"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full  py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        <label
          htmlFor="countries"
          className="block mt-5 roboto-bold text-xs mb-2  text-gray-100  font-medium dark:text-white"
        >
          Amount
        </label>
        <input
          type="text"
          placeholder="Type"
          name="total"
          value={filterOptions.total}
          className="rounded-[0.3rem] w-full text-[14px] roboto-medium  "
        ></input>

        <label className="block mt-5  roboto-bold text-xs mb-2  text-gray-100  font-medium dark:text-white">
          Executive
        </label>
        <input
          type="text"
          placeholder="Type"
          name="executive"
          value={filterOptions.executive}
          className="rounded-[0.3rem] w-full text-[14px] roboto-medium  "
        ></input>
        <label className="block mt-5 roboto-bold text-xs mb-2  text-gray-100  font-medium dark:text-white">
          User ID
        </label>
        <input
          type="text"
          placeholder="Type"
          name="id"
          value={filterOptions.id}
          className="rounded-[0.3rem] w-full text-[14px] roboto-medium   "
        ></input>
        <div className="flex my-5  justify-between items-center">
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="px-9 roboto-bold rounded-xl py-1 bg-white text-black"
          >
            Filter
          </button>
          <button className="px-4  roboto-bold text-gray-500 rounded-xl py-1 bg-gray-200">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceFilter;
