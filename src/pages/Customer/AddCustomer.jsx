import { useEffect, useState } from "react";
import moment from "moment-timezone";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
const AddCustomer = ({ mode }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const params = useParams();

  const CustomerInformation = useSelector(
    (state) => state.customer.customerInformation
  );
  const [customerDatas, setCustomerDatas] = useState({
    firstName: "",
    lastName: "",
    enquiryType: "",
    mobile: "",
    email: "",
    package: "",
    stage: "",
    executiveName: "",
    paid: "",
    startDate: "",
    endDate: "",
    visa: "",
    passport: "",
    noOfAdults: "",
    noOfChildren: "",
    billingAmount: "",
    balancePayment: "",
  });
  useEffect(() => {
    if (mode === "edit") {
      const userId = `#${params.id}`;
      const leadToEdit = CustomerInformation.find(
        (data) => data.userId == userId
      );
      const data = {
        ...leadToEdit,
        startDate: leadToEdit.startDate.split("T")[0],
        endDate: leadToEdit.endDate.split("T")[0],
      };

      setCustomerDatas(data);
    }
  }, [CustomerInformation]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type == "file") {
      setCustomerDatas((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setCustomerDatas((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  console.log(customerDatas);

  function validate() {
    let valid = true;
    const errors = {};
    if (
      customerDatas.firstName.length < 3 ||
      customerDatas.firstName.length == 0
    ) {
      errors.firstName = "FirstName must be 3 characters above";
      valid = false;
    }
    if (
      customerDatas.lastName.length > 10 ||
      customerDatas.lastName.length == 0
    ) {
      errors.lastName = "LastName must be 10 characters below";

      valid = false;
    }
    if (customerDatas.enquiryType.length == "") {
      errors.enquiryType = "EnquirtType is required";
      valid = false;
    }

    if (String(customerDatas.mobile).length != 10) {
      errors.mobile = "mobile Number must be 10 numbers";
      valid = false;
    }
    if (
      !customerDatas.email.includes("@gmail.com") ||
      customerDatas.email.length === 0
    ) {
      errors.email = "Email should be valid";

      valid = false;
    }
    if (customerDatas.package.length === 0) {
      errors.package = "Package is required";

      valid = false;
    }
    if (customerDatas.stage.length == "") {
      errors.stage = "Stage is required";
      valid = false;
    }
    if (
      customerDatas.executiveName.length < 3 ||
      customerDatas.executiveName.length === 0
    ) {
      errors.executiveName = "name must be 3 characters above";

      valid = false;
    }
    if (customerDatas.startDate == "") {
      errors.startDate = "startDate is required";

      valid = false;
    }
    if (customerDatas.endDate == "") {
      errors.endDate = "endDate is required";
      valid = false;
    }

    if (customerDatas.billingAmount == "") {
      errors.billingAmount = "billingAmount is required";

      valid = false;
    }
    if (customerDatas.paid == "") {
      errors.paid = "paid is required";

      valid = false;
    }
    if (customerDatas.balancePayment == "") {
      errors.balancePayment = "balancePayment is required";

      valid = false;
    }

    setErrors(errors);
    return valid;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const datas = Object.entries(customerDatas);
    datas.forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (!validate()) return console.log("invalid inputs");
    if (mode === "add") {
      console.log("add", datas);
      try {
        console.log(mode);
        const response = await axios.post(
          "http://localhost:4000/customer/addCustomer",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (response.status === 200) {
          navigate("/customer");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(mode);
      console.log("edit", datas);

      try {
        const encodedUserId = encodeURIComponent(`#${params.id}`);
        const response = await axios.put(
          `http://localhost:4000/customer/editCustomer/${encodedUserId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (response.status === 200) {
          navigate("/customer");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="w-full flex mt-16 justify-end bg-gray-100">
      <form
        onChange={handleChange}
        onSubmit={handleSubmit}
        className="md:w-[93%] px-1 font-medium lg:w-[80%] my-6 items-end"
      >
        <h1 className="poppins-semibold  text-lg">
          {mode === "add" ? "Add New Customer" : "Edit Customer"}
        </h1>
        <section className="my-1">
          <h1 className="bg-[#003E78] py-2 px-6 text-white  text-lg rounded-t-lg">
            Primary Information
          </h1>

          <div className="w-full bg-[#FFFFFF] roboto-semibold font-medium text-black flex flex-col  flex-wrap gap-y-3  p-5  items-start">
            <div className="w-full flex">
              <div className={` w-1/4 flex flex-col`}>
                <label className=" roboto-semibold  text-sm mb-2">
                  First Name
                </label>

                <input
                  type="text"
                  name="firstName"
                  value={customerDatas.firstName}
                  placeholder="John"
                  className={
                    "px-3 py-3 border-none ring-1 ring-gray-300 w-11/12 text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  }
                />
                {errors && errors.firstName ? (
                  <p className="text-xs text-red-600">{errors.firstName}</p>
                ) : (
                  <p className="h-4"></p>
                )}
              </div>
              <div className={` w-1/4 flex flex-col`}>
                <label className=" roboto-semibold  text-sm mb-2">
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastName"
                  value={customerDatas.lastName}
                  placeholder="Doe"
                  className={
                    "px-3 py-3 border-none ring-1 ring-gray-300 w-11/12 text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  }
                />
                {errors && errors.lastName ? (
                  <p className="text-xs text-red-600">{errors.lastName}</p>
                ) : (
                  <p className="h-4"></p>
                )}
              </div>
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
                  value={customerDatas.enquiryType}
                  className="bg-gray-50 w-4/5 border-gray-300 text-gray-400 text-[14px]  rounded-[0.3rem] focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden selected>
                    Enquiry Type
                  </option>
                  <option value="Flight Booking">Flight Booking</option>
                  <option value="Hotel Booking">Hotel Booking</option>
                  <option value="Sight Seeing">Sight Seeing</option>
                  <option value="Transport">Transport</option>
                  <option value="Others">Others</option>
                </select>
                {errors && errors.enquiryType ? (
                  <p className="text-xs text-red-600">{errors.enquiryType}</p>
                ) : (
                  <p className="h-4"></p>
                )}
              </div>
            </div>

            <h3 className="">Contact Detail</h3>
            <div className="w-full flex">
              <div className={` w-1/4 flex flex-col`}>
                <label className=" roboto-semibold  text-sm mb-2">
                  Mobile Phone
                </label>

                <input
                  type="number"
                  name="mobile"
                  value={customerDatas.mobile}
                  placeholder="Enter Your Phone Number"
                  className={
                    "px-3 py-3 border-none ring-1 ring-gray-300 w-11/12 text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  }
                />
                {errors && errors.mobile ? (
                  <p className="text-xs text-red-600">{errors.mobile}</p>
                ) : (
                  <p className="h-4"></p>
                )}
              </div>
              <div className={` w-1/4 flex flex-col relative left-2`}>
                <label className=" roboto-semibold  text-sm mb-2">Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={customerDatas.email}
                  className={
                    "px-3 py-3 border-none ring-1 ring-gray-300 w-11/12 text-xs rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  }
                />

                {errors && errors.email ? (
                  <p className="text-xs text-red-600">{errors.email}</p>
                ) : (
                  <p className="h-4"></p>
                )}
              </div>
              <div className="flex flex-col flex-wrap mx-7 w-[30%]">
                <label
                  htmlFor="countries"
                  className="   text-sm mb-2  text-black  font-medium dark:text-white"
                >
                  Package
                </label>
                <select
                  name="package"
                  value={customerDatas.package}
                  className="bg-gray-50 w-4/5 border-gray-300 text-gray-400 text-[14px] rounded-[0.3rem] focus:ring-blue-500 focus:border-blue-500 block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden selected>
                    Package
                  </option>
                  <option value="Domestic">Domestic</option>
                  <option value="International">International</option>
                </select>
                {errors && errors.package ? (
                  <p className="text-xs text-red-600">{errors.package}</p>
                ) : (
                  <p className="h-4"></p>
                )}
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
                value={customerDatas.stage}
                name="stage"
                className="bg-gray-50 w-full border-gray-300 text-[14px] rounded-[0.3rem] focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option style={{ opacity: 0.3 }} hidden selected>
                  Stage
                </option>
                <option value="Confirmed">Confirmed</option>
                <option value="Canceled">Canceled</option>
                <option value="Pending">Pending</option>
                <option value="Waiting">Waiting</option>
                <option value="OnTrip">On Trip</option>
              </select>
              {errors && errors.stage ? (
                <p className="text-xs text-red-600">{errors.stage}</p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>
            <div className={` w-1/5 flex flex-col relative `}>
              <label className=" roboto-semibold  text-sm mb-2">
                Executive
              </label>

              <input
                type="text"
                name="executiveName"
                value={customerDatas.executiveName}
                placeholder="Executive Name"
                className={
                  "px-3 py-3 border-none ring-1  ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                }
              />

              {errors && errors.executiveName ? (
                <p className="text-xs text-red-600">{errors.executiveName}</p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>
            <div className="flex flex-col w-1/5">
              <label className={` text-sm mb-2`}>Start date</label>
              <div className="relative max-w-sm">
                <input
                  type="date"
                  value={customerDatas.startDate}
                  name="startDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date"
                />{" "}
                {errors && errors.startDate ? (
                  <p className="text-xs text-red-600">{errors.startDate}</p>
                ) : (
                  <p className="h-4"></p>
                )}
              </div>
            </div>
            <div className="flex flex-col w-1/5">
              <label className={`  text-sm mb-2`}>End date</label>
              <div className="relative max-w-sm">
                <input
                  type="date"
                  value={customerDatas.endDate}
                  name="endDate"
                  className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date"
                />{" "}
                {errors && errors.endDate ? (
                  <p className="text-xs text-red-600">{errors.endDate}</p>
                ) : (
                  <p className="h-4"></p>
                )}
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
                    name="visa"
                    className="hidden"
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
            <div className={` w-1/5 flex flex-col relative `}>
              <label className=" roboto-semibold  text-sm mb-2">Passport</label>

              <input
                type="text"
                name="passport"
                value={customerDatas.passport}
                placeholder=""
                className={
                  "px-3 py-3 border-none ring-1  ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                }
              />
            </div>
            <div className={` w-1/5 flex flex-col relative `}>
              <label className=" roboto-semibold  text-sm mb-2">
                No of Adults
              </label>

              <input
                type="number"
                name="noOfAdults"
                value={customerDatas.noOfAdults}
                placeholder=""
                className={
                  "px-3 py-3 border-none ring-1  ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                }
              />
            </div>
            <div className={` w-1/5 flex flex-col relative `}>
              <label className=" roboto-semibold  text-sm mb-2">
                No of Children
              </label>

              <input
                type="number"
                name="noOfChildren"
                value={customerDatas.noOfChildren}
                className={
                  "px-3 py-3 border-none ring-1  ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                }
              />
            </div>
            <div className={` w-1/5 flex flex-col relative `}>
              <label className=" roboto-semibold  text-sm mb-2">
                Billing amount
              </label>
              <input
                type="number"
                value={customerDatas.billingAmount}
                name="billingAmount"
                className={
                  "px-3 py-3 border-none ring-1  ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                }
              />
              {errors && errors.billingAmount ? (
                <p className="text-xs text-red-600">{errors.billingAmount}</p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>
            <div className={` w-1/5 flex flex-col relative `}>
              <label className=" roboto-semibold  text-sm mb-2">Paid</label>
              <input
                type="number"
                name="paid"
                value={customerDatas.paid}
                className={
                  "px-3 py-3 border-none ring-1  ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                }
              />{" "}
              {errors && errors.paid ? (
                <p className="text-xs text-red-600">{errors.paid}</p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>

            <div className={` w-1/5 flex flex-col relative `}>
              <label className=" roboto-semibold  text-sm mb-2">
                Balance Payment
              </label>

              <input
                value={customerDatas.balancePayment}
                type="number"
                name="balancePayment"
                className={
                  "px-3 py-3 border-none ring-1  ring-gray-300 w-full text-sm rounded-sm focus:ring-2 focus:ring-blue-500 outline-none"
                }
              />
              {errors && errors.balancePayment ? (
                <p className="text-xs text-red-600">{errors.balancePayment}</p>
              ) : (
                <p className="h-4"></p>
              )}
            </div>
            <Link
              to="/customer"
              className="bg-[#0E2238] px-6 py-3 text-white text-sm mt-6 poppins-medium  rounded-md"
            >
              Cancel
            </Link>
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
