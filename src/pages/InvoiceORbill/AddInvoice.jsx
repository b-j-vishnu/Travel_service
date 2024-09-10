import { Datepicker } from "flowbite";
import InputBox from "../Leads/InputBox";
import { useEffect, useRef, useState } from "react";
const AddInvoice = () => {
  const datepicker = useRef(null);
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

  const [addItinerary, setAddItineraray] = useState({
    stage: "",
    acceptPayment: "",
    executive: "",
    mobileNumber: "",
    email: "",
    itineraryFor: "",
    destinationTemplate: "",
    subject: "",
    introMessage: "",
    id: "",
    name: "",
    days: "",
    description: "",
    tax: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddItineraray((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date(datepicker.current?.getDate());

    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const total = (Number(addItinerary.amount) * Number(addItinerary.tax)) / 10;
    console.log({ ...addItinerary, validDate: formattedDate, total });
  };
  return (
    <div className="w-full flex mt-16 justify-end bg-gray-100">
      <form
        className="md:w-[93%] px-1   lg:w-[80%] mt-6 items-end"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <h1 className="poppins-semibold text-lg">Add Invoice / Bill</h1>
        <div className="bg-white pb-8 rounded-t-lg">
          <section className="my-1">
            <div className="w-full text-black flex gap-x-4 flex-wrap gap-y-6  pl-5 py-5  items-center">
              <div className="flex flex-col flex-wrap w-[23%]">
                <label
                  htmlFor="countries"
                  className="  roboto-semibold 
                  text-sm mb-2  text-black  font-medium dark:text-white"
                >
                  Stage
                </label>
                <select
                  name="stage"
                  className="bg-gray-50  text-xs border-gray-300 text-gray-400 text-[14px] roboto-medium rounded-[0.3rem] focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden disabled selected>
                    Select value
                  </option>
                  <option value="Invoice">Incvoice</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="flex w-[23%] justify-center  flex-col ">
                <label
                  className={` font-medium   roboto-semibold mb-2 text-sm`}
                >
                  Valid date
                </label>
                <div className="relative max-w-sm">
                  <input
                    data-datepicker
                    name="validDate"
                    id="datepicker-orientation"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date"
                  />
                </div>
              </div>
              <div className="flex flex-col flex-wrap w-[23%]">
                <label
                  htmlFor="countries"
                  className="  roboto-bold text-sm mb-2  text-black  font-medium dark:text-white"
                >
                  Accept Payment Via
                </label>
                <select
                  name="acceptPayment"
                  className="bg-gray-50 w-full border-gray-300 text-gray-400 text-[14px] roboto-medium rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden disabled selected>
                    Select value
                  </option>
                  <option value="cash">Cash</option>
                  <option value="online">online</option>
                </select>
              </div>
              <InputBox
                label={"Executive Name"}
                type={"text"}
                name={"executive"}
                inputWidth={"w-[19%]"}
                labelClassName={"text-lg"}
                placeholder={"Executive Name"}
                className={
                  "px-3 py-3 border-none ring-1 ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                }
              />
              <InputBox
                label={"Mobile Phone"}
                type={"text"}
                inputWidth={"w-1/4"}
                name={"mobileNumber"}
                placeholder={"Enter Your Mobile Number"}
                className={
                  "px-3 py-3 border-none ring-1 ring-gray-300 w-full text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                }
              />
              <InputBox
                label={"Email"}
                type={"text"}
                inputWidth={"w-1/4"}
                name={"email"}
                placeholder={"example@gmail.com"}
                className={
                  "px-3 py-3 border-none ring-1 ring-gray-300 w-full text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                }
              />
              <div className="flex flex-col  flex-wrap w-[19%]">
                <label
                  htmlFor="countries"
                  className="  roboto-semibold text-sm mb-2  text-black  font-medium dark:text-white"
                >
                  Invoice To
                </label>
                <select
                  name="itineraryFor"
                  className="bg-gray-50 w-full border-gray-300 text-gray-400 text-[14px] roboto-medium rounded-[0.3rem] focus:ring-blue-500 focus:border-blue-500 block   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden disabled selected>
                    Select
                  </option>
                  <option value="leads">Leads</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              <div className="flex flex-col    flex-wrap w-[19%]">
                <label
                  htmlFor="countries"
                  className="  roboto-semibold text-sm mb-2  text-black  font-medium dark:text-white"
                >
                  Destination Template
                </label>
                <select
                  name="destinationTemplate"
                  className="bg-gray-50 w-full border-gray-300 text-gray-400 text-[14px] roboto-medium rounded-[0.3rem] focus:ring-blue-500 focus:border-blue-500 block   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden disabled selected>
                    Select
                  </option>
                  <option value="dubai">Dubai</option>
                  <option value="singapore">Singapore</option>
                  <option value="maldives">Maldives</option>
                  <option value="uk">UK</option>
                  <option value="malta">Malta</option>
                </select>
              </div>
            </div>
          </section>
          <section className="my-4">
            <table className="w-full ">
              <tr className=" rounded-t-xl   text-white">
                <th className="py-2 bg-[#003E78]  rounded-ss-xl">Id</th>
                <th className="py-2 bg-[#003E78]  ">Name</th>
                <th className="py-2 bg-[#003E78]  ">Days</th>
                <th className="py-2 bg-[#003E78]  ">Description</th>
                <th className="py-2 bg-[#003E78]  ">Tax</th>
                <th className="py-2 bg-[#003E78]  rounded-se-xl">Amount</th>
              </tr>
              <tr className="text-center">
                <td className="px-4 py-1 w-[15%] border-r-2 border-b-2">
                  <input
                    type="text"
                    placeholder="Id"
                    name="id"
                    className="w-28 focus:ring-0  border-none"
                  ></input>
                </td>
                <td className="px-4 py-1 w-[15%]  border-r-2 border-b-2">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="w-28 focus:ring-0  border-none"
                  ></input>
                </td>
                <td className="px-4 py-1 w-[15%] border-r-2 border-b-2 ">
                  <input
                    type="number"
                    name="days"
                    placeholder="days"
                    className="w-28 focus:ring-0 no-spinner  border-none"
                  ></input>
                </td>
                <td className="px-4 py-1 w-[15%] whitespace-nowrap text-start border-r-2 border-b-2 text-xs ">
                  <input
                    type="text"
                    name="description"
                    placeholder="description"
                    className="border-none focus:ring-0  w-28"
                  ></input>
                </td>
                <td className="w-[15%] py-1 px-4 border-r-2 border-b-2">
                  <input
                    type="number"
                    placeholder="tax"
                    name="tax"
                    className="w-28 focus:ring-0 no-spinner border-none"
                  ></input>
                </td>
                <td className="w-[15%] py-1 px-4 border-r-2 border-b-2">
                  <input
                    type="number"
                    name="amount"
                    placeholder="amount"
                    className="w-28 outline-none focus:ring-0 no-spinner border-none"
                  ></input>
                </td>
              </tr>
            </table>
          </section>
          <section className="w-full px-1 flex roboto-bold flex-col mt-20 items-end ">
            <div className="w-1/4 flex justify-between items-center ">
              <p>sub Total:</p>
              <p className="border-2 border-gray-500 rounded-sm w-1/2 px-2 py-1 h-8">
                {addItinerary.amount}
              </p>
            </div>
            <div className="w-1/4 flex my-2 justify-between items-center ">
              <p>GST (%):</p>
              <p className="border-2 border-gray-500 rounded-sm w-1/2 px-2 py-1">
                {`${addItinerary.tax}%`}
              </p>
            </div>
            <div className="w-1/4 flex justify-between items-center ">
              <p>Total Amount:</p>
              <p className="border-2 border-gray-500 rounded-sm w-1/2 px-2 py-1">
                {(
                  Number(addItinerary.amount) *
                  (Number(addItinerary.tax) / 10)
                ).toFixed(2)}
              </p>
            </div>
          </section>
          <section className="mr-10 ml-3 roboto-medium">
            <p className="my-2">Notes</p>
            <div className="ring-1 ring-gray-300 text-[#CECECE]  px-4 py-5 text-sm">
              <p className="mt-3">Kindly let me know for any clarification.</p>
              <p className="my-3">Thanks & Regards,</p>
              <p className="">
                Disclaimer The information contained in this communication from
                the sender is confidential. It is intended solely for use by the
                recipient and others authorized to receive it. If you are not
                the recipient, you are hereby notified that any disclosure,
                copying, distribution or taking action in relation of the
                contents of this information is strictly prohibited and may be
                unlawful.
              </p>
            </div>
          </section>
          <section className="mr-14 pl-3 mt-7  roboto-medium">
            <p className="my-2">Terms and Conditions</p>
            <div className="ring-1 ring-gray-300 text-[#CECECE]  px-4 py-3 text-sm">
              <p className="mt-3">Terms and Conditions</p>
            </div>
          </section>
          <div className="px-3 mt-8  flex justify-end">
            <button
              type="submit"
              className="px-7 py-3 mx-5 rounded-xl bg-[#0E2238] roboto-medium text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddInvoice;
