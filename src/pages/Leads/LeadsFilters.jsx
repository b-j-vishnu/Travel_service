/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getLeads } from "../../Actions/LeadsActions";
// eslint-disable-next-line react/prop-types
const LeadsFilters = ({ leadsInformation, handleHideFilter }) => {
  const dispatch = useDispatch();
  const [filterOptions, setFilterOptions] = useState({
    dealStage: "",
    enquiryType: "",
    package: "",
    mobileNumber: "",
    userId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post(
      "http://localhost:4000/leads/filterLeads",
      filterOptions
    );
    console.log(data.data.filteredLeads);
    dispatch(getLeads(data.data.filteredLeads));
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
          htmlFor="dealStage"
          className="block  roboto-bold text-xs mb-2  text-gray-100  font-medium dark:text-white"
        >
          Deal Stage
        </label>
        <select
          id="dealStage"
          name="dealStage"
          value={filterOptions.dealStage}
          className="bg-gray-50 borde border-gray-300 text-gray-900 text-[14px] roboto-medium rounded-[0.3rem] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option hidden selected>
            Select
          </option>
          <option value="Converted To Deal"> Converted to Deal</option>
          <option value="Cancelled">Cancelled</option>
          <option value="proposal Sent">Proposal Sent</option>
          <option value="Meeting Fixed">Meeting Fixed</option>
          <option value="Yes To Confirm">Yes to Confirm </option>
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
          className="bg-gray-50 border text-[14px] roboto-medium  border-gray-300 text-gray-900  rounded-[0.3rem] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          className="bg-gray-50 border text-[14px] roboto-medium  border-gray-300 text-gray-900  rounded-[0.3rem] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          Phone Number
        </label>
        <input
          type="text"
          value={filterOptions.mobileNumber}
          placeholder="Type"
          name="mobileNumber"
          className="rounded-[0.3rem] w-full text-[14px] roboto-medium  "
        ></input>
        <label className="block mt-5 roboto-bold text-xs mb-2  text-gray-100  font-medium dark:text-white">
          User ID
        </label>
        <input
          type="text"
          placeholder="Type"
          name="userId"
          value={filterOptions.userId}
          className="rounded-[0.3rem] w-full text-[14px] roboto-medium   "
        ></input>
        <div className="flex my-5  justify-between items-center">
          <button className="px-9 roboto-bold rounded-xl py-1 bg-white text-black">
            Filter
          </button>
          <button
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

export default LeadsFilters;
