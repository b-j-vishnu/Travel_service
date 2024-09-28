/* eslint-disable no-unused-vars */
import axios from "axios";
import { Datepicker } from "flowbite";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getItinerary } from "../../Actions/ItineraryActions";

const ItineraryFilter = () => {
  const dispatch = useDispatch();
  const [filterOptions, setFilterOptions] = useState({
    stage: "",
    validDate: "",
    total: "",
    executiveName: "",
    id: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(filterOptions);
    try {
      const response = await axios.get(
        `http://localhost:4000/itinerary/filterItinerary?validDate=${
          filterOptions.validDate
        }&total=${filterOptions.total}&executiveName=${
          filterOptions.executiveName
        }&userId=${filterOptions.id.replace("#", "")}`
      );
      if (response.status === 200) {
        dispatch(getItinerary(response.data.foundedItineraries));
      }
    } catch (err) {
      console.log(err);
      dispatch(getItinerary([]));
    }
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
          Stage
        </label>
        <select
          id="stage"
          name="stage"
          value={filterOptions.stage}
          className="bg-gray-50 borde border-gray-300 text-gray-900 text-[14px] roboto-medium rounded-[0.3rem] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option hidden selected>
            Select
          </option>
          <option value="Invoice">Invoice</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Closed">Closed</option>
        </select>

        <div className="flex flex-col w-full">
          <label
            className={` roboto-bold  text-blue-gray-100 text-sm mt-3 mb-1`}
          >
            Valid Date
          </label>
          <div className="relative max-w-sm">
            <input
              type="date"
              name="validDate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full  py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
            />
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
          name="executiveName"
          value={filterOptions.executiveName}
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

export default ItineraryFilter;
