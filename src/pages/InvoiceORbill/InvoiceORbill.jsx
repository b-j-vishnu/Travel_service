import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getInvoice } from "../../Actions/InvoiceActions";
import InvoiceFilter from "./InvoiceFilter";
import axios from "axios";
import { toast } from "react-toastify";

const InvoiceORbill = () => {
  const InvoiceInformation = useSelector(
    (state) => state.Invoice.InvoiceInformation
  );

  const [showDropdown, setShowDropdown] = useState({});
  const dispatch = useDispatch();
  const [checkBox, setCheckBox] = useState({});
  const [allCheckBox, setAllCheckBox] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [triggerRender, setTriggerRender] = useState(false);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems =
    InvoiceInformation &&
    InvoiceInformation.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const getInvoiceAPI = async () => {
      try {
        const response = await axios("http://localhost:4000/invoice");
        if (response.status === 200) {
          console.log(response.data.Invoices);
          dispatch(getInvoice(response.data.Invoices));
        }
      } catch (err) {
        console.log(err);
      }
    };
    getInvoiceAPI();
  }, [dispatch, triggerRender]);

  const totalPages =
    InvoiceInformation && Math.ceil(InvoiceInformation.length / 10);

  const handleShowInvoiceFilter = (e) => {
    const filterEl = document.getElementById("invoiceFilter");
    filterEl.classList.replace("hidden", "block");
    e.stopPropagation();
  };

  const handleShowDrapdown = (index) => {
    setShowDropdown((prev) => ({
      [index]: !prev[index],
    }));
  };
  const handleHideInvoiceFilter = () => {
    const filterEl = document.getElementById("invoiceFilter");
    filterEl.classList.replace("block", "hidden");
  };

  const handleAllChecked = () => {
    const ids = InvoiceInformation.map((data) => data.userId);
    const checkbox = ids.reduce((acc, value) => {
      acc[value] = allCheckBox ? false : true;
      return acc;
    }, {});
    setCheckBox(checkbox);
    setAllCheckBox(!allCheckBox);
  };
  const handleIndividualDelete = async (userId) => {
    try {
      const encodedUserId = encodeURIComponent(userId); // Encode the use
      const response = await axios.delete(
        `http://localhost:4000/invoice/deleteInvoice/${encodedUserId}`
      );
      if (response.status === 200) {
        setTriggerRender(!triggerRender);

        toast.success("successfull deleted");
      }
      console.log(response.data.message);
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleDeleteAll = async () => {
    const invoiceToDelete = InvoiceInformation.filter((data) => {
      const id = data.userId;
      if (checkBox[id]) {
        return data;
      }
    });
    const userIdsToDelete = invoiceToDelete.map((user) => user.userId);
    console.log(userIdsToDelete);
    try {
      const response = await axios.delete(
        "http://localhost:4000/invoice/bulkDeleteInvoice",
        {
          data: {
            dataToDelete: userIdsToDelete,
          },
        }
      );
      if (response.status === 200) {
        setTriggerRender(!triggerRender);
        setCheckBox(!checkBox);
        setAllCheckBox(!allCheckBox);
        toast.success("successfull deleted");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleCheckbox = (userId) => {
    setCheckBox((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };
  console.log(checkBox);

  const handleDownloadExcel = async () => {
    const invoiceToDelete = InvoiceInformation.filter((data) => {
      const id = data.userId;
      return checkBox[id]; // Simplified condition
    });

    const userIdsToDelete = invoiceToDelete.map((user) => user.userId);
    console.log(userIdsToDelete);

    try {
      const response = await axios.post(
        "http://localhost:4000/invoice/generateExcelSheet",
        { userIds: userIdsToDelete },
        { responseType: "blob" } // Set response type to blob for binary data
      );

      // Create a blob URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Invoices.xlsx"); // Set the file name
      document.body.appendChild(link);
      link.click(); // Simulate a click to trigger the download
      link.remove(); // Clean up the link element
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex mt-16 justify-end mb-10 bg-gray-200 ">
      <div
        className="md:w-[93%] text-black  lg:w-[80%]   items-end bg-gray-100 
      "
      >
        <h1 className="mt-10 px-2 text-lg poppins-semibold">Invoice / Bill</h1>
        <section className="flex mt-5 mb-5 gap-x-10 ">
          <div className="flex items-center w-[22%] gap-x-4 py-3  px-2 rounded-3xl bg-white">
            <svg
              className="w-16 h-16"
              viewBox="0 0 84 84"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="42"
                cy="42"
                r="42"
                fill="url(#paint0_linear_312_814)"
              />
              <path
                d="M43.8375 50.8378H40.5475C38.22 50.8378 36.3125 48.8778 36.3125 46.4628C36.3125 45.7453 36.9075 45.1503 37.625 45.1503C38.3425 45.1503 38.9375 45.7453 38.9375 46.4628C38.9375 47.4253 39.655 48.2128 40.5475 48.2128H43.8375C44.52 48.2128 45.0625 47.6003 45.0625 46.8478C45.0625 45.9028 44.8 45.7628 44.205 45.5528L38.9375 43.7153C37.8175 43.3303 36.3125 42.5078 36.3125 39.9353C36.3125 37.7478 38.045 35.9453 40.1625 35.9453H43.4525C45.78 35.9453 47.6875 37.9053 47.6875 40.3203C47.6875 41.0378 47.0925 41.6328 46.375 41.6328C45.6575 41.6328 45.0625 41.0378 45.0625 40.3203C45.0625 39.3578 44.345 38.5703 43.4525 38.5703H40.1625C39.48 38.5703 38.9375 39.1828 38.9375 39.9353C38.9375 40.8803 39.2 41.0203 39.795 41.2303L45.0625 43.0678C46.1825 43.4528 47.6875 44.2753 47.6875 46.8478C47.6875 49.0528 45.955 50.8378 43.8375 50.8378Z"
                fill="#00AC4F"
              />
              <path
                d="M42 52.5879C41.2825 52.5879 40.6875 51.9929 40.6875 51.2754V35.5254C40.6875 34.8079 41.2825 34.2129 42 34.2129C42.7175 34.2129 43.3125 34.8079 43.3125 35.5254V51.2754C43.3125 51.9929 42.7175 52.5879 42 52.5879Z"
                fill="#00AC4F"
              />
              <path
                d="M42 62.2129C31.6225 62.2129 23.1875 53.7779 23.1875 43.4004C23.1875 33.0229 31.6225 24.5879 42 24.5879C42.7175 24.5879 43.3125 25.1829 43.3125 25.9004C43.3125 26.6179 42.7175 27.2129 42 27.2129C33.075 27.2129 25.8125 34.4754 25.8125 43.4004C25.8125 52.3254 33.075 59.5879 42 59.5879C50.925 59.5879 58.1875 52.3254 58.1875 43.4004C58.1875 42.6829 58.7825 42.0879 59.5 42.0879C60.2175 42.0879 60.8125 42.6829 60.8125 43.4004C60.8125 53.7779 52.3775 62.2129 42 62.2129Z"
                fill="#00AC4F"
              />
              <path
                d="M57.75 35.9629H50.75C50.0325 35.9629 49.4375 35.3679 49.4375 34.6504V27.6504C49.4375 26.9329 50.0325 26.3379 50.75 26.3379C51.4675 26.3379 52.0625 26.9329 52.0625 27.6504V33.3379H57.75C58.4675 33.3379 59.0625 33.9329 59.0625 34.6504C59.0625 35.3679 58.4675 35.9629 57.75 35.9629Z"
                fill="#00AC4F"
              />
              <path
                d="M50.7495 35.9644C50.417 35.9644 50.0845 35.8419 49.822 35.5794C49.3145 35.0719 49.3145 34.2319 49.822 33.7244L58.572 24.9744C59.0795 24.4669 59.9195 24.4669 60.427 24.9744C60.9345 25.4819 60.9345 26.3219 60.427 26.8294L51.677 35.5794C51.4145 35.8419 51.082 35.9644 50.7495 35.9644Z"
                fill="#00AC4F"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_312_814"
                  x1="74.55"
                  y1="2.14197e-06"
                  x2="42"
                  y2="84"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#D3FFE7" />
                  <stop offset="1" stopColor="#EFFFF6" />
                </linearGradient>
              </defs>
            </svg>
            <div>
              <p className="poppins-reqular text-xs">Income</p>
              <h1 className="poppins-semibold text-2xl text-[#333333]">
                1,98,000
              </h1>
              <div className="flex gap-x-1 items-center">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 17L10 5"
                    stroke="#00AC4F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.16699 9.99935L10.0003 4.16602L15.8337 9.99935"
                    stroke="#00AC4F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="poppins-mixed  text-xs">37.8% this month</span>
              </div>
            </div>
          </div>
          <div className="flex items-center w-[22%] gap-x-4 py-3  px-2 rounded-3xl bg-white">
            <svg
              className="w-16 h-16"
              viewBox="0 0 84 84"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="42"
                cy="42"
                r="42"
                fill="url(#paint0_linear_312_832)"
              />
              <path
                d="M33.5472 61.8113C29.3822 61.8113 25.9697 58.7838 25.9697 55.0563V51.4863C25.9697 50.7688 26.5647 50.1738 27.2822 50.1738C27.9997 50.1738 28.5947 50.7688 28.5947 51.4863C28.5947 53.6738 30.7122 55.3188 33.5472 55.3188C36.3822 55.3188 38.4997 53.6738 38.4997 51.4863C38.4997 50.7688 39.0947 50.1738 39.8122 50.1738C40.5297 50.1738 41.1247 50.7688 41.1247 51.4863V55.0563C41.1247 58.7838 37.7297 61.8113 33.5472 61.8113ZM29.0496 56.7713C29.8196 58.2063 31.5522 59.1863 33.5472 59.1863C35.5422 59.1863 37.2747 58.1888 38.0447 56.7713C36.8022 57.5238 35.2622 57.9613 33.5472 57.9613C31.8322 57.9613 30.2921 57.5238 29.0496 56.7713Z"
                fill="#0F5FC2"
              />
              <path
                d="M33.5472 53.1494C30.6772 53.1494 28.1047 51.8369 26.8272 49.7544C26.2672 48.8444 25.9697 47.7769 25.9697 46.6919C25.9697 44.8544 26.7747 43.1394 28.2447 41.8619C31.0797 39.377 35.9622 39.3771 38.8147 41.8446C40.2847 43.1396 41.1072 44.8544 41.1072 46.6919C41.1072 47.7769 40.8097 48.8444 40.2497 49.7544C38.9897 51.8369 36.4172 53.1494 33.5472 53.1494ZM33.5472 42.5621C32.1822 42.5621 30.9222 43.0169 29.9772 43.8394C29.0847 44.6094 28.5947 45.6244 28.5947 46.6919C28.5947 47.3044 28.7522 47.8646 29.0672 48.3896C29.8722 49.7196 31.5872 50.5421 33.5472 50.5421C35.5072 50.5421 37.2221 49.7196 38.0096 48.4071C38.3246 47.8996 38.4822 47.3221 38.4822 46.7096C38.4822 45.6421 37.9922 44.6269 37.0997 43.8394C36.1722 43.0169 34.9122 42.5621 33.5472 42.5621Z"
                fill="#0F5FC2"
              />
              <path
                d="M33.5472 57.9625C29.2247 57.9625 25.9697 55.18 25.9697 51.505V46.6925C25.9697 42.965 29.3647 39.9375 33.5472 39.9375C35.5247 39.9375 37.4147 40.62 38.8322 41.845C40.3022 43.14 41.1247 44.855 41.1247 46.6925V51.505C41.1247 55.18 37.8697 57.9625 33.5472 57.9625ZM33.5472 42.5625C30.8172 42.5625 28.5947 44.4175 28.5947 46.6925V51.505C28.5947 53.6925 30.7122 55.3375 33.5472 55.3375C36.3822 55.3375 38.4997 53.6925 38.4997 51.505V46.6925C38.4997 45.625 38.0097 44.61 37.1172 43.8225C36.1722 43.0175 34.9122 42.5625 33.5472 42.5625Z"
                fill="#0F5FC2"
              />
              <path
                d="M54.3199 47.8996C51.6773 47.8996 49.4373 45.9396 49.2273 43.4196C49.0873 41.9671 49.6123 40.5496 50.6623 39.5171C51.5373 38.6071 52.7799 38.0996 54.0924 38.0996H57.7499C59.4824 38.1521 60.8124 39.5171 60.8124 41.1971V44.8021C60.8124 46.4821 59.4824 47.8471 57.8024 47.8996H54.3199ZM57.6974 40.7246H54.1099C53.4974 40.7246 52.9373 40.9521 52.5348 41.3721C52.0273 41.8621 51.7823 42.5271 51.8523 43.1921C51.9398 44.3471 53.0598 45.2746 54.3199 45.2746H57.7499C57.9774 45.2746 58.1874 45.0646 58.1874 44.8021V41.1971C58.1874 40.9346 57.9774 40.7421 57.6974 40.7246Z"
                fill="#0F5FC2"
              />
              <path
                d="M48.9999 59.1875H44.6249C43.9074 59.1875 43.3124 58.5925 43.3124 57.875C43.3124 57.1575 43.9074 56.5625 44.6249 56.5625H48.9999C53.5149 56.5625 56.4374 53.64 56.4374 49.125V47.9H54.3199C51.6774 47.9 49.4374 45.94 49.2274 43.42C49.0874 41.9675 49.6125 40.55 50.6625 39.5175C51.5375 38.6075 52.7799 38.1 54.0924 38.1H56.4199V36.875C56.4199 32.78 54.0225 29.9625 50.1375 29.5075C49.7175 29.4375 49.3499 29.4375 48.9824 29.4375H33.2324C32.8124 29.4375 32.4099 29.4725 32.0074 29.525C28.1574 30.015 25.7949 32.815 25.7949 36.875V40.375C25.7949 41.0925 25.1999 41.6875 24.4824 41.6875C23.7649 41.6875 23.1699 41.0925 23.1699 40.375V36.875C23.1699 31.485 26.495 27.5825 31.6575 26.935C32.13 26.865 32.6724 26.8125 33.2324 26.8125H48.9824C49.4024 26.8125 49.9449 26.83 50.5049 26.9175C55.6674 27.5125 59.0449 31.4325 59.0449 36.875V39.4125C59.0449 40.13 58.4499 40.725 57.7324 40.725H54.0924C53.4799 40.725 52.92 40.9525 52.5175 41.3725C52.01 41.8625 51.7649 42.5275 51.8349 43.1925C51.9224 44.3475 53.0425 45.275 54.3025 45.275H57.7499C58.4674 45.275 59.0624 45.87 59.0624 46.5875V49.125C59.0624 55.145 55.0199 59.1875 48.9999 59.1875Z"
                fill="#0F5FC2"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_312_832"
                  x1="74.55"
                  y1="2.14197e-06"
                  x2="42"
                  y2="84"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#CAF1FF" />
                  <stop offset="1" stopColor="#CDF4FF" />
                </linearGradient>
              </defs>
            </svg>

            <div>
              <p className="poppins-reqular text-xs">Expenses</p>
              <h1 className="poppins-semibold text-2xl text-[#333333]">
                24000
              </h1>
              <div className="flex gap-x-1 items-center">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 3L10 15"
                    stroke="#D0004B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.833 10.0007L9.99967 15.834L4.16634 10.0007"
                    stroke="#D0004B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="poppins-mixed  text-xs">2% this month</span>
              </div>
            </div>
          </div>
          <div className="flex items-center w-[22%] gap-x-4 py-3  px-2 rounded-3xl bg-white">
            <svg
              className="w-16 h-16"
              viewBox="0 0 84 84"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="42"
                cy="42"
                r="42"
                fill="url(#paint0_linear_312_850)"
              />
              <path
                d="M40.11 56.7H43.785V54.075C45.535 53.76 47.04 53.0775 48.3 52.0275C49.56 50.9775 50.19 49.42 50.19 47.355C50.19 45.885 49.77 44.5375 48.93 43.3125C48.09 42.0875 46.41 41.02 43.89 40.11C41.79 39.41 40.3375 38.7975 39.5325 38.2725C38.7275 37.7475 38.325 37.03 38.325 36.12C38.325 35.21 38.6491 34.4925 39.2973 33.9675C39.9455 33.4425 40.8814 33.18 42.105 33.18C43.225 33.18 44.1 33.4509 44.73 33.9927C45.36 34.5345 45.815 35.2086 46.095 36.015L49.455 34.65C49.07 33.425 48.3616 32.3575 47.3298 31.4475C46.298 30.5375 45.1514 30.03 43.89 29.925V27.3H40.215V29.925C38.465 30.31 37.1 31.08 36.12 32.235C35.14 33.39 34.65 34.685 34.65 36.12C34.65 37.765 35.1316 39.095 36.0948 40.11C37.058 41.125 38.5714 42 40.635 42.735C42.84 43.54 44.3716 44.2575 45.2298 44.8875C46.088 45.5175 46.5164 46.34 46.515 47.355C46.515 48.51 46.1041 49.3591 45.2823 49.9023C44.4605 50.4455 43.4714 50.7164 42.315 50.715C41.1586 50.7136 40.1345 50.3552 39.2427 49.6398C38.3509 48.9244 37.695 47.8478 37.275 46.41L33.81 47.775C34.3 49.455 35.0616 50.8116 36.0948 51.8448C37.128 52.878 38.4664 53.5864 40.11 53.97V56.7ZM42 63C39.095 63 36.365 62.4484 33.81 61.3452C31.255 60.242 29.0325 58.7461 27.1425 56.8575C25.2525 54.9689 23.7566 52.7464 22.6548 50.19C21.553 47.6336 21.0014 44.9036 21 42C20.9986 39.0964 21.5502 36.3664 22.6548 33.81C23.7594 31.2536 25.2553 29.0311 27.1425 27.1425C29.0297 25.2539 31.2522 23.758 33.81 22.6548C36.3678 21.5516 39.0978 21 42 21C44.9022 21 47.6322 21.5516 50.19 22.6548C52.7478 23.758 54.9703 25.2539 56.8575 27.1425C58.7447 29.0311 60.2413 31.2536 61.3473 33.81C62.4533 36.3664 63.0042 39.0964 63 42C62.9958 44.9036 62.4442 47.6336 61.3452 50.19C60.2462 52.7464 58.7503 54.9689 56.8575 56.8575C54.9647 58.7461 52.7422 60.2427 50.19 61.3473C47.6378 62.4519 44.9078 63.0028 42 63ZM42 58.8C46.69 58.8 50.6625 57.1725 53.9175 53.9175C57.1725 50.6625 58.8 46.69 58.8 42C58.8 37.31 57.1725 33.3375 53.9175 30.0825C50.6625 26.8275 46.69 25.2 42 25.2C37.31 25.2 33.3375 26.8275 30.0825 30.0825C26.8275 33.3375 25.2 37.31 25.2 42C25.2 46.69 26.8275 50.6625 30.0825 53.9175C33.3375 57.1725 37.31 58.8 42 58.8Z"
                fill="#FF0000"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_312_850"
                  x1="74.55"
                  y1="2.14197e-06"
                  x2="42"
                  y2="84"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFA3CF" />
                  <stop offset="1" stopColor="#FFD5F3" />
                </linearGradient>
              </defs>
            </svg>

            <div>
              <p className="poppins-reqular text-xs">Pending</p>
              <h1 className="poppins-semibold text-2xl text-[#333333]">
                89000
              </h1>
              <div className="gap-x-1 flex items-center">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 17L10 5"
                    stroke="#00AC4F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.16699 9.99935L10.0003 4.16602L15.8337 9.99935"
                    stroke="#00AC4F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="poppins-mixed  text-xs">11% this month</span>
              </div>
            </div>
          </div>
          <div className="flex items-center w-[22%] gap-x-4 py-3  px-2 rounded-3xl bg-white">
            <svg
              className="w-16 h-16"
              viewBox="0 0 84 85"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="42"
                cy="42.5"
                r="42"
                fill="url(#paint0_linear_312_862)"
              />
              <path
                d="M37.6876 25.2283L37.0997 24.8596C35.9491 24.1541 34.513 23.7443 33.2784 24.1289C31.9514 24.5421 30.8932 25.5642 30.3389 27.0995L29.5495 26.693C28.1889 25.9926 27.4768 25.9816 26.8863 26.247C26.4152 26.4578 25.9239 26.9651 25.3671 27.7058L32.2874 33.0565C33.3708 33.4092 34.9581 33.4008 36.5454 32.9893C38.1411 32.5778 39.7284 31.7715 40.8874 30.6881L43.4993 24.2297C41.1981 22.4115 39.0985 23.4646 37.6876 25.2283ZM42.1471 31.6539C40.7194 33.0985 38.5946 34.0727 36.9401 34.5094C36.3606 34.6606 35.7811 34.7698 35.2184 34.8286C34.9077 35.3409 34.6473 35.8616 34.4458 36.3823C34.8489 38.4315 35.6048 40.1112 36.7386 41.4885L35.5292 42.4963C34.8321 41.6565 34.2106 40.7495 33.7403 39.7416C33.6647 41.6901 34.1014 43.7057 34.8153 45.8053L33.3288 46.3092C32.0186 42.4795 31.5735 38.5575 33.4128 34.8621C32.7913 34.8118 32.2034 34.6942 31.6575 34.501L31.6323 34.4926C31.2712 34.837 30.9268 35.1981 30.5993 35.576C27.9479 38.6498 26.4874 42.7399 27.2517 45.9229C27.6607 47.6278 28.3939 49.2403 29.4487 50.6176C30.994 50.584 32.4554 50.6176 33.7823 51.1215C34.4122 51.0543 35.0589 51.0123 35.7307 51.0123C38.1243 51.0123 40.2911 51.4575 41.9288 52.2301C42.5671 52.5325 43.1466 52.8936 43.6085 53.3051C43.6085 52.86 43.6757 52.3813 43.81 52.0286C43.0626 51.3231 42.5923 50.4664 42.5923 49.4922C42.5923 48.1401 43.4909 47.0231 44.7927 46.2168C44.7927 45.8305 44.8682 45.461 45.0026 45.1082C44.1544 44.3776 43.6085 43.4705 43.6085 42.4123C43.6085 41.7489 43.8268 41.1442 44.1964 40.5983C43.8268 40.0608 43.6085 39.4561 43.6085 38.7926C43.6085 38.4651 43.6589 38.1627 43.7512 37.8688C42.9366 37.1465 42.4243 36.2563 42.4243 35.2317C42.4243 34.2155 42.9282 33.3336 43.7345 32.6198C43.2389 32.2334 42.7098 31.9059 42.1471 31.6539ZM51.503 31.8471C49.3194 31.8471 47.3458 32.309 45.9936 32.9893C44.6331 33.6696 43.9948 34.5094 43.9948 35.2317C43.9948 35.9623 44.6331 36.8022 45.9936 37.4825C47.3458 38.1627 49.3194 38.6246 51.503 38.6246C52.452 38.6246 53.3507 38.5323 54.1821 38.3811V36.9534C55.3495 36.777 56.3153 36.4578 56.9368 36.0463V37.5245C57.9866 37.2221 58.9944 36.1051 59.0196 35.2317C59.0196 34.5094 58.3813 33.6696 57.0208 32.9893C55.6602 32.309 53.695 31.8471 51.503 31.8471ZM59.6075 37.5328C59.3303 37.8268 59.0028 38.1039 58.6333 38.3559L58.6501 40.7914C59.7083 40.1616 60.2038 39.4309 60.2038 38.7926C60.2038 38.3895 60.0106 37.9528 59.6075 37.5328ZM45.179 38.8262C45.2042 39.5485 45.8425 40.3631 47.1778 41.035C48.5384 41.7237 50.5036 42.1772 52.6956 42.1772C54.0645 42.1772 55.3495 41.9924 56.4497 41.6901L56.5085 39.4057C55.0639 39.9096 53.3507 40.1868 51.503 40.1868C49.1095 40.1868 46.9343 39.708 45.2882 38.885C45.2462 38.8682 45.2126 38.843 45.179 38.8262ZM45.347 41.7489C45.2294 41.9756 45.179 42.2024 45.179 42.4123C45.179 43.143 45.8173 43.9828 47.1778 44.6631C48.5384 45.3434 50.5036 45.7969 52.6956 45.7969C53.8042 45.7969 54.854 45.6877 55.803 45.4778V43.4621C54.8288 43.6469 53.7874 43.7393 52.6956 43.7393C50.2936 43.7393 48.1184 43.269 46.4723 42.4375C46.0608 42.236 45.6829 42.0008 45.347 41.7489ZM60.0358 41.7489C59.5235 42.11 59.0784 42.3787 58.5577 42.6055V44.4784C59.6747 43.8317 60.2038 43.0758 60.2038 42.4123C60.2038 42.2024 60.1534 41.9756 60.0358 41.7489ZM60.6657 44.8395C60.4977 45.0075 60.313 45.167 60.1114 45.3266V48.0477C60.9764 47.4598 61.3964 46.8131 61.3964 46.2252C61.3964 45.7801 61.1528 45.3014 60.6657 44.8395ZM46.38 46.0153C46.3716 46.0909 46.3632 46.158 46.3632 46.2252C46.3632 46.9559 47.0014 47.7873 48.362 48.4676C49.7225 49.1563 51.6962 49.6098 53.8798 49.6098C55.1311 49.6098 56.3237 49.4586 57.3567 49.2067V46.6955C55.9878 47.1323 54.4005 47.3674 52.6956 47.3674C50.2936 47.3674 48.1184 46.8887 46.4723 46.0657C46.4387 46.0489 46.4136 46.0321 46.38 46.0153ZM45.2378 47.8125C44.5071 48.3584 44.1628 48.9547 44.1628 49.4922C44.1628 50.2229 44.8011 51.0543 46.1616 51.743C47.5221 52.4233 49.4874 52.8768 51.6794 52.8768C52.4772 52.8768 53.2499 52.818 53.9721 52.7088V51.1803H53.8798C51.4778 51.1803 49.3026 50.7016 47.6565 49.8702C46.6067 49.3494 45.7333 48.6524 45.2378 47.8125ZM58.8852 50.3825C58.2218 50.6176 57.4995 50.8108 56.7268 50.9368V51.953C56.8864 51.8858 57.046 51.8186 57.1971 51.743C58.0202 51.3231 58.5745 50.8528 58.8852 50.3825ZM59.6579 51.911C59.3387 52.2301 58.9692 52.5157 58.5577 52.776V55.178C59.6747 54.5397 60.2038 53.7838 60.2038 53.1203C60.2038 52.734 60.0274 52.3141 59.6579 51.911ZM30.3725 52.1461C29.5159 52.1545 28.5921 52.2637 27.6346 52.4905C25.719 52.9356 24.072 53.7502 22.997 54.6489C21.922 55.5391 21.5021 56.4461 21.6281 57.0928C21.7541 57.7395 22.4175 58.3358 23.7109 58.6801C25.0001 59.0161 26.8032 59.0328 28.718 58.5877C29.4907 58.403 30.213 58.1678 30.8764 57.8907V56.1522C32.1026 55.6063 33.018 54.9512 33.4296 54.3129V56.3621C34.4458 55.4887 34.8405 54.6153 34.7229 53.977C34.6054 53.3303 33.9335 52.734 32.6401 52.3981C31.9934 52.2301 31.2208 52.1377 30.3725 52.1461ZM35.7979 52.5828C36.0247 52.9104 36.1843 53.2799 36.2682 53.6914C36.3606 54.1953 36.3186 54.6825 36.1675 55.1612C36.9989 55.3795 37.7548 55.6735 38.4098 56.043C38.7794 56.2446 39.1237 56.4881 39.4261 56.7401C40.1819 56.5637 40.8202 56.3118 41.2737 56.0094V57.7395C42.6259 57.1012 43.2473 56.3202 43.2473 55.6987C43.2473 55.0688 42.6259 54.2877 41.2653 53.6495C39.9132 53.0196 37.9647 52.5912 35.7979 52.5828ZM45.1874 53.0028C45.179 53.0364 45.179 53.0784 45.179 53.1203C45.179 53.851 45.8173 54.6825 47.1778 55.3711C48.5384 56.0514 50.5036 56.5049 52.6956 56.5049C53.8042 56.5049 54.854 56.3873 55.803 56.1858V53.9266C54.56 54.2625 53.1575 54.4473 51.6794 54.4473C49.2774 54.4473 47.1022 53.9686 45.4561 53.1455C45.3637 53.0952 45.2714 53.0448 45.1874 53.0028ZM45.4225 56.1354C45.2546 56.4125 45.179 56.6813 45.179 56.9416C45.179 57.6723 45.8173 58.5037 47.1778 59.1924C48.5384 59.8727 50.5036 60.3262 52.6956 60.3262C53.8042 60.3262 54.854 60.2086 55.803 60.0071V57.7899C54.8288 57.9746 53.7874 58.0754 52.6956 58.0754C50.2936 58.0754 48.1184 57.5967 46.4723 56.7653C46.0944 56.5805 45.7417 56.3705 45.4225 56.1354ZM59.9602 56.1354C59.4731 56.4629 59.0448 56.7233 58.5577 56.9332V58.9993C59.6747 58.361 60.2038 57.6051 60.2038 56.9416C60.2038 56.6813 60.1282 56.4125 59.9602 56.1354ZM35.3864 56.5889C35.0925 56.9584 34.7481 57.3112 34.3618 57.6303C33.0516 58.7305 31.204 59.6207 29.0708 60.1162C28.3099 60.2926 27.554 60.4018 26.8284 60.4606C27.0971 60.9057 27.57 61.3424 28.262 61.7287C29.4067 62.3754 31.0864 62.8121 32.9509 62.8121C33.7991 62.8121 34.6053 62.7198 35.3444 62.5602V60.8133C36.5034 60.637 37.4776 60.3178 38.0991 59.9063V61.4516C38.9389 60.8637 39.3421 60.2002 39.3421 59.5703C39.3421 58.8397 38.7962 58.0586 37.6456 57.4119C37.0241 57.0676 36.2514 56.7821 35.3864 56.5889Z"
                fill="#003C1B"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_312_862"
                  x1="74.55"
                  y1="0.500002"
                  x2="42"
                  y2="84.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#91FF69" />
                  <stop offset="1" stopColor="#DFF5C4" />
                </linearGradient>
              </defs>
            </svg>

            <div>
              <p className="poppins-reqular text-xs">Total Amount</p>
              <h1 className="poppins-semibold text-2xl text-[#333333]">
                99000
              </h1>
              <div className="flex gap-x-1 items-center">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 17L10 5"
                    stroke="#00AC4F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.16699 9.99935L10.0003 4.16602L15.8337 9.99935"
                    stroke="#00AC4F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="poppins-mixed  text-xs">11% this month</span>
              </div>
            </div>
          </div>
        </section>
        <section
          onClick={handleHideInvoiceFilter}
          className="w-full bg-white h-[100vh] rounded-xl"
        >
          <div className="flex items-center justify-end py-3 gap-x-3 px-3">
            {InvoiceInformation && InvoiceInformation.length ? (
              <>
                <button
                  type="button"
                  disabled={!allCheckBox}
                  onClick={handleDeleteAll}
                  className="disabled:bg-gray-400 text-wrap  disabled:hidden bg-red-500 disabled:text-white py-1 px-4 rounded-md "
                >
                  Bulk Delete
                </button>
                <button
                  type="button"
                  onClick={handleDownloadExcel}
                  disabled={!allCheckBox}
                  className="flex bg-[#0E2238] w-[15%]   disabled:hidden whitespace-nowrap px-2 text-xs items-center gap-x-2 py-1.5 rounded-md text-white"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 15.3656C24 18.6598 21.5359 21.3399 18.507 21.3399H4.87298C2.18602 21.3399 0 18.968 0 16.0525C0 14.9904 0.291703 13.9643 0.843562 13.0853C1.22067 12.4847 1.70034 11.9803 2.25567 11.5956C2.09077 10.9021 2.00752 10.1878 2.00752 9.46253C2.00752 7.22275 2.79905 5.11183 4.23628 3.51859C5.70014 1.89587 7.65525 1.00141 9.74147 1H9.74639C11.7726 1 13.6907 1.85608 15.1481 3.41097C16.5811 4.93975 17.4094 6.97984 17.4804 9.1555C17.483 9.23397 17.4845 9.31258 17.4851 9.39123H18.5069C19.0764 9.39123 19.5382 9.85295 19.5382 10.4225C19.5382 10.992 19.0764 11.4537 18.5069 11.4537H16.4148C16.0993 11.4537 15.801 11.3093 15.6055 11.0617L15.5939 11.047C15.4233 10.8328 15.345 10.5596 15.3761 10.2876C15.4162 9.93649 15.4306 9.57822 15.419 9.22281C15.3081 5.82536 12.7635 3.0625 9.74625 3.0625C9.74498 3.0625 9.74414 3.0625 9.74288 3.0625C6.61481 3.06466 4.06997 5.9357 4.06997 9.46258C4.06997 10.2535 4.19691 11.0261 4.44717 11.7588C4.62052 12.2662 4.37606 12.8218 3.88481 13.0368C2.79487 13.514 2.0625 14.7259 2.0625 16.0525C2.0625 17.8307 3.32325 19.2774 4.87298 19.2774H18.507C20.3985 19.2774 21.9375 17.5225 21.9375 15.3656C21.9375 14.8549 21.8511 14.3576 21.6807 13.8876C21.4865 13.3521 21.7633 12.7607 22.2987 12.5666C22.834 12.3725 23.4256 12.6491 23.6197 13.1846C23.8721 13.8807 24 14.6145 24 15.3656ZM9.65273 9.34755V13.6088C9.07627 12.956 8.40539 11.8423 7.42673 12.6171C6.99656 12.9904 6.95048 13.6418 7.3238 14.0719C7.3238 14.0719 9.90061 17.0412 9.90061 17.0412C10.2718 17.4854 11.0058 17.5146 11.4068 17.0948C11.4725 17.0372 13.873 14.266 13.9357 14.202C14.8101 13.165 13.2899 11.8406 12.3816 12.846L11.7153 13.6097V9.34755C11.7153 8.77802 11.2536 8.3163 10.684 8.3163C10.1145 8.3163 9.65273 8.77802 9.65273 9.34755Z"
                      fill="#00FF40"
                    />
                    <path
                      d="M21.2344 14.9414C21.8039 14.9414 22.2656 14.4797 22.2656 13.9102C22.2656 13.3406 21.8039 12.8789 21.2344 12.8789C20.6648 12.8789 20.2031 13.3406 20.2031 13.9102C20.2031 14.4797 20.6648 14.9414 21.2344 14.9414Z"
                      fill="#34C759"
                    />
                  </svg>
                  <p className="roboto-medium">Download PDF</p>
                </button>
                <div
                  className="flex items-center hover:cursor-pointer mx-4 ring-1 filterDiv py-2 ring-gray-300 px-5"
                  onClick={(e) => handleShowInvoiceFilter(e)}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.25 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58097 1.5 3.15326 1.5 3.75V4.6275C1.49989 4.93721 1.56372 5.2436 1.6875 5.5275V5.5725C1.79346 5.81323 1.94354 6.032 2.13 6.2175L6.75 10.8075V15.75C6.74974 15.8775 6.78198 16.0029 6.84365 16.1144C6.90533 16.226 6.99442 16.3199 7.1025 16.3875C7.22186 16.4615 7.35958 16.5005 7.5 16.5C7.61741 16.4993 7.73301 16.471 7.8375 16.4175L10.8375 14.9175C10.9612 14.8552 11.0652 14.7598 11.138 14.642C11.2108 14.5242 11.2496 14.3885 11.25 14.25V10.8075L15.84 6.2175C16.0265 6.032 16.1765 5.81323 16.2825 5.5725V5.5275C16.4166 5.24582 16.4907 4.93933 16.5 4.6275V3.75C16.5 3.15326 16.2629 2.58097 15.841 2.15901C15.419 1.73705 14.8467 1.5 14.25 1.5ZM9.9675 9.9675C9.89799 10.0376 9.843 10.1207 9.80567 10.2121C9.76835 10.3034 9.74943 10.4013 9.75 10.5V13.785L8.25 14.535V10.5C8.25057 10.4013 8.23165 10.3034 8.19433 10.2121C8.157 10.1207 8.10201 10.0376 8.0325 9.9675L4.0575 6H13.9425L9.9675 9.9675ZM15 4.5H3V3.75C3 3.55109 3.07902 3.36032 3.21967 3.21967C3.36032 3.07902 3.55109 3 3.75 3H14.25C14.4489 3 14.6397 3.07902 14.7803 3.21967C14.921 3.36032 15 3.55109 15 3.75V4.5Z"
                      fill="#6C6C6C"
                    />
                  </svg>

                  <div className="dropdown-toggle inline-flex justify-center items-center  px-3 text-sm  text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500">
                    Filters
                  </div>
                </div>
              </>
            ) : null}
            <Link
              to="/invoice/addInvoice"
              className="flex items-center text-sm gap-x-2 text-white ring-1 bg-[#0E2238]  ring-gray-300 px-4 py-2 rounded-sm"
            >
              <svg
                width="19"
                height="15"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_218_943)">
                  <path
                    d="M3.5 9H15.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 15V3"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_218_943">
                    <rect
                      width="18"
                      height="18"
                      fill="black"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <p className="bg-[#0E2238] text-white hover:cursor-pointer appearance-none">
                Add
              </p>
            </Link>
          </div>
          {InvoiceInformation && InvoiceInformation.length ? (
            <>
              <div className="w-full">
                <table className="text-left w-full">
                  <thead className="">
                    <tr className="bg-gray-300 text-xs py-7 mb-6  poppins-medium text-gray-500 ">
                      <th className="py-2 pl-4">
                        <input
                          type="checkbox"
                          checked={allCheckBox}
                          onChange={handleAllChecked}
                          className="w-4 rounded-[0.2rem] focus:ring-0 h-4"
                        />
                      </th>
                      <th>Action</th>
                      <th className="">Full name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>User ID</th>
                      <th>Executive</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Pending</th>
                      <th className="pl-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {currentItems.map((person, index) => (
                      <tr key={index} className=" text-xs">
                        <td className="pt-5 pl-4    ">
                          <input
                            type="checkbox"
                            checked={checkBox[person.userId]}
                            onChange={() => handleCheckbox(person.userId)}
                            className="w-4 outline-none rounded-[0.2rem] focus:ring-0 h-4"
                          />
                        </td>
                        <td className="pt-5 ">
                          <Link
                            to={`/invoice/viewInvoice/${person.userId.slice(
                              1
                            )}`}
                            className="bg-[#003E78] px-3 rounded-md text-white py-1"
                          >
                            View
                          </Link>
                        </td>
                        <td className="flex items-center relative pt-5  text-sm">
                          <p className=" poppins-bold px-1">
                            {person.fullName}
                          </p>
                          <svg
                            onClick={() => handleShowDrapdown(index)}
                            width="12"
                            height="12"
                            className="absolute right-3"
                            viewBox="0 0 15 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.84798 3.79167C8.89502 3.79167 9.74381 2.94287 9.74381 1.89583C9.74381 0.848793 8.89502 0 7.84798 0C6.80094 0 5.95215 0.848793 5.95215 1.89583C5.95215 2.94287 6.80094 3.79167 7.84798 3.79167Z"
                              fill="#9EA9B4"
                            />
                            <path
                              d="M7.84798 8.89616C8.89502 8.89616 9.74381 8.04737 9.74381 7.00033C9.74381 5.95329 8.89502 5.10449 7.84798 5.10449C6.80094 5.10449 5.95215 5.95329 5.95215 7.00033C5.95215 8.04737 6.80094 8.89616 7.84798 8.89616Z"
                              fill="#9EA9B4"
                            />
                            <path
                              d="M7.84798 13.9997C8.89502 13.9997 9.74381 13.1509 9.74381 12.1038C9.74381 11.0568 8.89502 10.208 7.84798 10.208C6.80094 10.208 5.95215 11.0568 5.95215 12.1038C5.95215 13.1509 6.80094 13.9997 7.84798 13.9997Z"
                              fill="#9EA9B4"
                            />
                          </svg>

                          {showDropdown[index] && (
                            <ul className="absolute left-36 text-xs roboto-medium -top-4 w-36 px-2 py-2 rounded-lg text-white bg-gray-400">
                              <li className="my-2 bg-gray-300 rounded-md p-2">
                                Send Email
                              </li>
                              <li className="my-2 bg-gray-300 rounded-md p-2">
                                Send by SMS
                              </li>
                              <li className="my-2 bg-gray-300 rounded-md p-2">
                                Send Whatsapp
                              </li>
                              <li className="my-2 bg-gray-300 rounded-md p-2">
                                <Link
                                  to={`/invoice/editInvoice/${person.userId.replace(
                                    "#",
                                    ""
                                  )}`}
                                >
                                  Edit
                                </Link>
                              </li>
                              <li className="my-2 bg-gray-300 rounded-md p-2">
                                <button
                                  onClick={() =>
                                    handleIndividualDelete(person.userId)
                                  }
                                  type="button"
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          )}
                        </td>
                        <td className="px-1 pt-5">{person.email}</td>
                        <td className="px-1 pt-5 ">{person.mobile}</td>
                        <td className="px-1 pt-5 ">{person.userId}</td>
                        <td className="px-1 pt-5 ">{person.executiveName}</td>
                        <td className="px-1 pt-5 ">
                          {person.validDate.split("T")[0]}
                        </td>

                        <td className="px-1 pt-5">{person.total}</td>
                        <td className="px-1 pt-5">{person.pending}</td>
                        <td className="px-2 pt-5">{person.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="w-full flex items-center mt-7 pb-10 justify-end gap-4 px-5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="flex bg-[#0E2238] items-center gap-2 px-4 py-1 font-sans text-xs font-bold text-center text-white uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 18.5L6 12.5L12 6.5" fill="white" />
                    <path d="M19 18.5L13 12.5L19 6.5" fill="white" />
                  </svg>
                  Previous
                </button>
                <div className="flex items-center ring-1 ring-gray-400 rounded-lg px-3 gap-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      className={String.raw`text-white poppins-semibold px-4 py-1 ${
                        currentPage == index + 1 ? " bg-[#0E2238]" : null
                      } rounded-lg`}
                      onClick={() => setCurrentPage(index + 1)}
                      type="button"
                    >
                      <span
                        className={String.raw`${
                          currentPage == index + 1 ? "text-white" : "text-black"
                        } `}
                      >
                        {index + 1}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="flex items-center bg-[#0E2238]  gap-2 px-4 py-1 font-sans text-xs font-bold text-center text-white uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  Next
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 18.5L18 12.5L12 6.5" fill="white" />
                    <path d="M5 18.5L11 12.5L5 6.5" fill="white" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <big>No Invoices</big>
            </div>
          )}
        </section>
        <div id="invoiceFilter" className="hidden">
          <InvoiceFilter InvoiceInformation={InvoiceInformation} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceORbill;
