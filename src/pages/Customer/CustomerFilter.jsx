/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCustomer } from "../../Actions/CustomerActions";

// eslint-disable-next-line react/prop-types
const CustomerFilter = ({ handleHideFilter }) => {
  const dispatch = useDispatch();
  const [filterOptions, setFilterOptions] = useState({
    stage: "",
    enquiryType: "",
    package: "",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = async (e) => {
    console.log(filterOptions);

    e.preventDefault();
    const data = await axios.get(
      `http://localhost:4000/customer/filterCustomers?stage=${filterOptions.stage}&enquiryType=${filterOptions.enquiryType}&package=${filterOptions.package}&startDate=${filterOptions.startDate}&endDate=${filterOptions.endDate}`
    );
    console.log(data.data.filteredCustomers);
    dispatch(getCustomer(data.data.filteredCustomers));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className=" fixed w-1/4 px-7 overflow-y-scroll rounded-l-md h-[100vh] right-0 top-0 z-50   bg-[#1B3C6D]">
      <h1 className="roboto-bold text-sm my-6 text-white">Filters</h1>
      <form
        className=" w-3/4 mx-3"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="stage"
          className="block  roboto-bold text-xs mb-2  text-gray-100  font-medium dark:text-white"
        >
          Stage
        </label>
        <select
          id="stage"
          name="stage"
          value={filterOptions.stage}
          className="bg-gray-50 w-full border-none ring-1 focus:ring-2 ring-gray-300  text-sm  outline-none  roboto-medium rounded-[0.3rem] focus:ring-blue-500  block  px-2 py-3"
        >
          <option hidden selected>
            Select
          </option>

          <option value="Confirmed">Confirmed</option>
          <option value="Canceled">Canceled</option>
          <option value="Pending">Pending</option>
          <option value="Waiting">Waiting</option>
          <option value="OnTrip">On Trip</option>
        </select>
        <label
          htmlFor="countries"
          className="block mt-5 roboto-bold text-xs mb-2  text-gray-100  font-medium dark:text-white"
        >
          Enquiry Type
        </label>
        <select
          id="countries"
          value={filterOptions.enquiryType}
          name="enquiryType"
          className="bg-gray-50 w-full border-none ring-1 focus:ring-2 ring-gray-300  text-sm  outline-none  roboto-medium rounded-[0.3rem] focus:ring-blue-500  block  px-2 py-3"
        >
          <option hidden selected>
            Select
          </option>
          <option value="Flight Booking">Flight Booking</option>
          <option value="Hotel Booking">Hotel Booking</option>
          <option value="Sight Seeing">Sight Seeing</option>
          <option value="Transport">Transport</option>
          <option value="Others">Others</option>
        </select>
        <label
          htmlFor="countries"
          className="block mt-5 roboto-bold text-xs mb-2  text-gray-100  font-medium dark:text-white"
        >
          Package
        </label>
        <select
          value={filterOptions.package}
          id="countries"
          name="package"
          className="bg-gray-50 w-full border-none ring-1 focus:ring-2 ring-gray-300  text-sm  outline-none  roboto-medium rounded-[0.3rem] focus:ring-blue-500  block  px-2 py-3"
        >
          <option hidden selected>
            Select
          </option>
          <option value="Domestic" className="">
            Domestic
          </option>
          <option value="International">International</option>
        </select>
        <label className="block mt-5  roboto-bold text-xs mb-2  text-gray-100  font-medium dark:text-white">
          Start Date
        </label>
        <input
          type="date"
          name="startDate"
          className="bg-gray-50 w-full border-none ring-1 focus:ring-2 ring-gray-300  text-sm  outline-none  roboto-medium rounded-[0.3rem] focus:ring-blue-500  block  px-2 py-3"
        ></input>
        <label className="block mt-5 roboto-bold text-xs mb-2  text-gray-100  font-medium dark:text-white">
          End Date
        </label>
        <input
          type="date"
          name="endDate"
          className="bg-gray-50 w-full border-none ring-1 focus:ring-2 ring-gray-300  text-sm  outline-none  roboto-medium rounded-[0.3rem] focus:ring-blue-500  block  px-2 py-3"
        ></input>
        <div className="flex my-5  justify-between items-center">
          <button className="px-9 roboto-bold rounded-xl py-1 bg-white text-black">
            Filter
          </button>
          <button
            type="button"
            onClick={handleHideFilter}
            className="px-4  roboto-bold text-gray-500 rounded-xl py-1 bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerFilter;
