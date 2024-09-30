/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
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
          className="bg-gray-50 w-full border-none ring-1 focus:ring-2 ring-gray-300  text-sm  outline-none  roboto-medium rounded-[0.3rem] focus:ring-blue-500  block  px-2 py-3"
        >
          <option hidden selected>
            Select
          </option>
          <option value="Invoice">Invoice</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Closed">Closed</option>
        </select>

        <div className="flex flex-col w-full">
          <label className={` roboto-bold  text-white text-sm mt-3 mb-1`}>
            Valid Date
          </label>
          <div className="relative max-w-sm">
            <input
              type="date"
              name="validDate"
              className="bg-gray-50 w-full border-none ring-1 focus:ring-2 ring-gray-300  text-sm  outline-none  roboto-medium rounded-[0.3rem] focus:ring-blue-500  block  px-2 py-3"
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
          className="bg-gray-50 w-full border-none ring-1 focus:ring-2 ring-gray-300  text-sm  outline-none  roboto-medium rounded-[0.3rem] focus:ring-blue-500  block  px-2 py-3"
        ></input>

        <label className="block mt-5  roboto-bold text-xs mb-2  text-gray-100  font-medium dark:text-white">
          Executive
        </label>
        <input
          type="text"
          placeholder="Type"
          name="executiveName"
          value={filterOptions.executiveName}
          className="bg-gray-50 w-full border-none ring-1 focus:ring-2 ring-gray-300  text-sm  outline-none  roboto-medium rounded-[0.3rem] focus:ring-blue-500  block  px-2 py-3"
        ></input>
        <label className="block mt-5 roboto-bold text-xs mb-2  text-gray-100  font-medium dark:text-white">
          User ID
        </label>
        <input
          type="text"
          placeholder="Type"
          name="id"
          value={filterOptions.id}
          className="bg-gray-50 w-full border-none ring-1 focus:ring-2 ring-gray-300  text-sm  outline-none  roboto-medium rounded-[0.3rem] focus:ring-blue-500  block  px-2 py-3"
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
