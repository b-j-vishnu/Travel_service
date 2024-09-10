import searchIcon from "../Images/search.png";
import notifyIcon from "../Images/notifiy.png";
import userIcon from "../Images/user.png";
import Input from "./pages/Custom/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    let data = await axios.get("http://localhost:4000/client/logout", {
      withCredentials: true,
    });
    if (data.status === 200) navigate("/");
  };

  return (
    <div className="md:w-[93%] z-50 px-4 lg:w-[80%]  fixed top-0 right-0  flex justify-center bg-gray-100">
      <div className=" w-full  flex justify-between items-center  h-16 bg-[#CDEEFF]  md:px-4 lg:px-6 rounded-md">
        <section className="flex flex-col justify-center items-center">
          <p className="poppins-bold">Hello Thilak</p>
          <p className="poppins-regular">Good Morning</p>
        </section>
        <section className="h-1/2 flex items-center md:w-1/4 lg:w-1/5 bg-white px-2 rounded-lg">
          <img src={searchIcon} className=" md:w-4 lg:w-5"></img>
          <Input
            type={"text"}
            divElement={" w-[60%] h-[60%] "}
            placeholder={"Search..."}
            className={
              "w-full h-full px-2 outline-none focus:ring-0 border-none "
            }
          />
        </section>
        <section className="flex lg:w-1/4 items-center justify-around h-1/2">
          <img src={notifyIcon} className="md:w-5 lg:w-7"></img>
          <div className="flex relative items-center justify-around">
            <img
              src={userIcon}
              onClick={() => setShowLogout(!showLogout)}
              className="md:w-9 cursor-pointer lg:w-12"
            ></img>
            {showLogout && (
              <ul className="bg-blue-500 absolute px-2 py-2 right-16 top-12 rounded-md">
                <li className="whitespace-nowrap hover:bg-blue-gray-50 hover:text-black text-white bg-gray-400 px-2 rounded-sm ">
                  <button type="button" onClick={handleLogout}>
                    Log out
                  </button>
                </li>
              </ul>
            )}
            <div className="flex flex-col mx-2 justify-center items-center">
              <p className="poppins-bold">Thilak</p>
              <p className="poppins-regular">Manager</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Header;
