import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSearchedResult } from "../../Actions/SearchActions";

const AddItinerary = ({ mode }) => {
  const [errors, setErrors] = useState();
  const navigate = useNavigate();
  const params = useParams();

  const dispatch = useDispatch();
  const searchedData = useSelector(
    (state) => state.searchResults.searchInformation
  );
  console.log(searchedData);
  const [itineraryData, setItinerarayData] = useState({
    proposalDate: "",
    validDate: "",
    acceptPaymentVia: "",
    executiveName: "",
    mobile: "",
    email: "",
    itineraryFor: "",
    destinationTemplate: "",
    subject: "",
    userId: "",
    introMsg: "",
  });
  const ItineraryInformation = useSelector(
    (state) => state.Itinerary.ItineraryInformation
  );
  useEffect(() => {
    if (mode === "edit") {
      const userId = `#${params.id}`;
      const itineraryToEdit = ItineraryInformation.find(
        (data) => data.userId == userId
      );
      const data = {
        ...itineraryToEdit,
        proposalDate: itineraryToEdit.proposalDate.split("T")[0],
        validDate: itineraryToEdit.validDate.split("T")[0],
      };

      setItinerarayData(data);
    }
  }, [ItineraryInformation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItinerarayData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  function validate() {
    const errors = {};
    let valid = true;
    if (itineraryData.proposalDate === "") {
      errors.proposalDate = "Proposal Date is required";
      valid = false;
    }
    if (itineraryData.validDate === "") {
      errors.validDate = "validDate is required";
      valid = false;
    }
    if (itineraryData.acceptPaymentVia === "") {
      errors.acceptPaymentVia = "Payment Via required";
      valid = false;
    }
    if (
      itineraryData.executiveName.length > 15 ||
      itineraryData.executiveName.length === 0
    ) {
      errors.executiveName = "Name must be less than 15 ";
      valid = false;
    }
    if (String(itineraryData.mobile).length != 10) {
      errors.mobile = "Mobile Number must be 10 numbers";
      valid = false;
    }
    if (
      itineraryData.email.length === 0 ||
      !itineraryData.email.includes("@gmail.com")
    ) {
      errors.email = "Email must be valid";
      valid = false;
    }
    if (itineraryData.itineraryFor.length === 0) {
      errors.itineraryFor = "required";
      valid = false;
    }
    if (itineraryData.destinationTemplate.length === 0) {
      errors.destinationTemplate = "required";
      valid = false;
    }
    setErrors(errors);
    return valid;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return console.log("invalid input");
    }
    console.log(itineraryData);

    const { userId, stage, firstName, lastName, billingAmount } = searchedData;
    const dataToSend = {
      ...itineraryData,
      userId,
      stage,
      billingAmount,
      fullName: `${firstName} ${lastName}`,
    };
    if (mode === "add") {
      try {
        const response = await axios.post(
          "http://localhost:4000/itinerary/addItinerary",
          dataToSend
        );
        if (response.status === 200) {
          navigate("/itinerary");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const userId = `#${params.id}`;
        console.log(userId);
        const encodedUserId = encodeURIComponent(userId); // Ensures #42 is encoded as %2342
        const response = await axios.put(
          `http://localhost:4000/itinerary/editItinerary/${encodedUserId}`,
          dataToSend
        );
        if (response.status === 200) {
          navigate("/itinerary");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    const search = async () => {
      const userIds = itineraryData.userId && itineraryData.userId.slice(1);
      console.log(userIds);
      await axios
        .get(
          `http://localhost:4000/search/searchById?type=${itineraryData.itineraryFor}&userId=${userIds}`
        )
        .then((response) => {
          console.log(response);
          dispatch(getSearchedResult(response.data.foundedPerson));
        })
        .catch((err) => {
          console.log(err);
          dispatch(getSearchedResult({}));
        });
    };
    search();
  }, [itineraryData.id, itineraryData.itineraryFor]);

  return (
    <div className="w-full flex mt-16 justify-end bg-gray-100">
      <form
        className="md:w-[93%] px-2   lg:w-[80%] mt-6 items-end"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <h1 className="poppins-semibold text-lg mx-2">
          {mode === "add"
            ? "Add Itinerary & Quotation"
            : "Edit Itinerary & Quotation"}
        </h1>
        <div className="bg-white pb-8 rounded-t-lg">
          <section className="my-1">
            <div className="w-full text-black flex gap-x-4 flex-wrap gap-y-6  pl-5 py-5  items-center">
              <div className="flex w-[23%] justify-center  flex-col ">
                <label
                  className={` font-medium   roboto-semibold mb-2 text-sm`}
                >
                  Proposal Date
                </label>
                <div className="relative max-w-sm">
                  <input
                    name="proposalDate"
                    type="date"
                    value={itineraryData.proposalDate}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date"
                  />
                </div>

                {errors && errors.proposalDate ? (
                  <p className="text-xs text-red-600">{errors.proposalDate}</p>
                ) : (
                  <p className="h-4"></p>
                )}
              </div>
              <div className="flex w-[23%] justify-center  flex-col ">
                <label
                  className={` font-medium   roboto-semibold mb-2 text-sm`}
                >
                  Valid date
                </label>
                <div className="relative max-w-sm">
                  <input
                    name="validDate"
                    type="date"
                    value={itineraryData.validDate}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date"
                  />
                  {errors && errors.validDate ? (
                    <p className="text-xs text-red-600">{errors.validDate}</p>
                  ) : (
                    <p className="h-4"></p>
                  )}
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
                  name="acceptPaymentVia"
                  value={itineraryData.acceptPaymentVia}
                  className="bg-gray-50 w-full border-gray-300 text-gray-400 text-[14px] roboto-medium rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden selected>
                    Select value
                  </option>
                  <option value="cash">Cash</option>
                  <option value="online">online</option>
                </select>{" "}
                {errors && errors.acceptPaymentVia ? (
                  <p className="text-xs text-red-600">
                    {errors.acceptPaymentVia}
                  </p>
                ) : (
                  <p className="h-4"></p>
                )}
              </div>

              <div className=" w-[17%] flex flex-col">
                <label className={` roboto-semibold  text-sm mb-2`}>
                  Executive Name
                </label>
                <input
                  type="text"
                  name="executiveName"
                  value={itineraryData.executiveName}
                  placeholder="Executive Name"
                  className={
                    "px-2 py-2.5 border-none ring-1 ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  }
                />{" "}
                {errors && errors.executiveName ? (
                  <p className="text-xs text-red-600">{errors.executiveName}</p>
                ) : (
                  <p className="h-4"></p>
                )}
              </div>
              <div className="w-1/4 flex flex-col">
                <label className={` roboto-semibold  text-sm mb-2`}>
                  Mobile Phone
                </label>
                <input
                  type="number"
                  name="mobile"
                  value={itineraryData.mobile}
                  placeholder="Enter Your Mobile Number"
                  className={
                    "px-3 py-3 border-none ring-1 ring-gray-300 w-full text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  }
                />{" "}
                {errors && errors.mobile ? (
                  <p className="text-xs text-red-600">{errors.mobile}</p>
                ) : (
                  <p className="h-4"></p>
                )}
              </div>
              <div className="w-1/4  flex flex-col">
                <label className={` roboto-semibold  text-sm mb-2`}>
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={itineraryData.email}
                  placeholder="example@gmail.com"
                  className={
                    "px-3 py-3 border-none ring-1 ring-gray-300 w-[100%] text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  }
                />{" "}
                {errors && errors.email ? (
                  <p className="text-xs text-red-600">{errors.email}</p>
                ) : (
                  <p className="h-4"></p>
                )}
              </div>
              <div className="flex flex-col  flex-wrap w-[19%]">
                <label
                  htmlFor="countries"
                  className="  roboto-semibold text-sm mb-2  text-black  font-medium dark:text-white"
                >
                  Itineraray & Quotation For
                </label>
                <select
                  name="itineraryFor"
                  disabled={mode === "edit" ? true : false}
                  value={itineraryData.itineraryFor}
                  className="bg-gray-50 w-full border-gray-300 text-gray-400 text-[14px] roboto-medium rounded-sm focus:ring-blue-500 focus:border-blue-500 block   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden selected>
                    Select
                  </option>
                  <option value="Leads">Leads</option>
                  <option value="Customers">Customer</option>
                </select>{" "}
                {errors && errors.itineraryFor ? (
                  <p className="text-xs text-red-600">{errors.itineraryFor}</p>
                ) : (
                  <p className="h-4"></p>
                )}
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
                  value={itineraryData.destinationTemplate}
                  className="bg-gray-50 w-11/12 border-gray-300 text-gray-400 text-[14px] roboto-medium rounded-smfocus:ring-blue-500 focus:border-blue-500 block   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden selected>
                    Select
                  </option>
                  <option value="Dubai">Dubai</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Maldives">Maldives</option>
                  <option value="UK">UK</option>
                  <option value="Malta">Malta</option>
                </select>{" "}
                {errors && errors.destinationTemplate ? (
                  <p className="text-xs text-red-600">
                    {errors.destinationTemplate}
                  </p>
                ) : (
                  <p className="h-4"></p>
                )}
              </div>
              <div className="w-full flex flex-col">
                <label className="roboto-semibold">Subject</label>
                <input
                  placeholder="Reg: Honeymoon Holiday Package"
                  name="subject"
                  value={itineraryData.subject}
                  className=" py-3  border-none mt-2 ring-1 ring-gray-300 w-[96%] text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  type="text"
                ></input>
              </div>
              <div className="w-full flex flex-col">
                <label className="roboto-semibold">Introduction Message</label>
                <textarea
                  placeholder="Type Something..."
                  name="introMsg"
                  value={itineraryData.introMsg}
                  rows={7}
                  className=" py-2 border-none mt-2 ring-1 ring-gray-300 w-[96%] text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  type="text"
                ></textarea>
              </div>
            </div>
          </section>
          <section className="">
            <table className="w-full ">
              <tr className="    text-white">
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
                    name="userId"
                    disabled={mode === "edit" ? true : false}
                    value={itineraryData.userId}
                    className="w-28 focus:ring-0  border-none"
                  ></input>
                </td>
                <td className="px-4 py-1 w-[15%]  border-r-2 border-b-2">
                  <p className="w-28 focus:ring-0  border-none">
                    {searchedData && searchedData.firstName}
                  </p>
                </td>
                <td className="px-4 py-1 w-[15%] border-r-2 border-b-2 ">
                  <p className="w-28 focus:ring-0  border-none">
                    {searchedData && searchedData.plannedNoOfDays}
                  </p>
                </td>
                <td className="px-4 py-1 w-[15%] whitespace-nowrap text-center border-r-2 border-b-2 text-xs ">
                  <p className=" focus:ring-0  border-none">-NA-</p>
                </td>
                <td className="w-[15%] py-1 px-4 border-r-2 border-b-2">
                  <p className="w-28 focus:ring-0  border-none">Tax</p>
                </td>
                <td className="w-[15%] py-1 px-4 border-r-2 border-b-2">
                  <p className="w-28 focus:ring-0  border-none">
                    {searchedData && searchedData.billingAmount}
                  </p>
                </td>
              </tr>
            </table>
          </section>
          <section className="w-full px-1 flex roboto-bold flex-col mt-20 items-end ">
            <div className="w-1/4 flex justify-between items-center ">
              <p>sub Total:</p>
              <p className="border-2 border-gray-500 rounded-sm w-1/2 px-2 py-1 h-8">
                {itineraryData.amount}
              </p>
            </div>
            <div className="w-1/4 flex my-2 justify-between items-center ">
              <p>GST (%):</p>
              <p className="border-2 border-gray-500 rounded-sm w-1/2 px-2 py-1">
                {`%`}
              </p>
            </div>
            <div className="w-1/4 flex justify-between items-center ">
              <p>Total Amount:</p>
              <p className="border-2 border-gray-500 rounded-sm w-1/2 px-2 py-1">
                {(
                  Number(itineraryData.amount) *
                  (Number(itineraryData.tax) / 10)
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
            <Link
              to="/itinerary"
              className="px-7 py-3 mx-5 rounded-xl bg-[#0E2238] roboto-medium
              text-white"
            >
              Cancel
            </Link>
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

export default AddItinerary;
