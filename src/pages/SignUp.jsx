import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [errors, setErrors] = useState();
  const [credentials, setCredentials] = useState({
    userName: "",
    email: "",
    mobile: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  function validate() {
    const errors = {};
    let valid = true;
    console.log("enterd in validate function");

    if (credentials.userName.length < 3 || credentials.userName.length === 0) {
      errors.userName = "userName must be 3 characters below";
      valid = false;
    }
    if (!credentials.email.includes("@gmail.com") || credentials.email === "") {
      errors.email = "Invalid email";
      valid = false;
    }
    if (credentials.mobile.length != 10 || credentials.mobile.length === 0) {
      errors.mobile = "Mobile number should be 10 numbers";
      valid = false;
    }
    if (credentials.password.length == 0) {
      errors.password = "Enter Password";
      valid = false;
    }
    setErrors(errors);
    return valid;
  }
  function validateForLogin() {
    const errors = {};
    let valid = true;
    console.log("enterd in validate function");
    if (!credentials.email.includes("@gmail.com") || credentials.email === "") {
      errors.email = "Invalid email";
      valid = false;
    }
    if (credentials.password.length == 0) {
      errors.password = "Enter Password";
      valid = false;
    }
    setErrors(errors);
    return valid;
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return console.log("validation error");
    }
    try {
      const datas = await axios.post(
        "http://localhost:4000/signup",
        credentials
      );
      if (datas.status === 200) {
        setIsLogin(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForLogin()) {
      return console.log("validation error");
    }
    const sendData = async () => {
      const dataToLogin = {
        email: credentials.email,
        password: credentials.password,
      };

      try {
        const datas = await axios.post(
          "http://localhost:4000/login",
          dataToLogin,
          { withCredentials: true }
        );
        if (datas?.data?.token) {
          navigate("/dashboard");
        }
      } catch (err) {
        const msg = err.response.data.message;
        if (msg.includes("Email")) {
          setErrors({ email: msg });
        }
        if (msg.includes("Password")) {
          setErrors({ password: msg });
        }
      }
    };
    sendData();
  };
  const handleShowLogin = () => {
    setIsLogin(!isLogin);
    setCredentials({
      userName: "",
      email: "",
      mobile: "",
      password: "",
    });
  };
  useEffect(() => {
    setErrors({});
    setCredentials({
      userName: "",
      email: "",
      mobile: "",
      password: "",
    });
  }, [isLogin]);
  return (
    <div className="bg-signup roboto-regular w-full h-[100vh]">
      <div className="bg-shadow flex justify-center items-center w-full h-[100vh]">
        <section className="flex w-[85%]   h-[80%]">
          <div className="basis-2/5 flex  items-center ">
            <h1 className="text-3xl w-3/5 text-center text-white ">
              Travel safely and make unforgettable memories
            </h1>
          </div>
          <div className="basis-3/5 flex justify-end  ">
            <div className="w-[80%] bg-gray-900 border-2 rounded-2xl border-orange-200 bg-opacity-25  text-white  h-full">
              <div className="flex justify-around text-2xl items-center  h-1/5">
                <p
                  onClick={handleShowLogin}
                  className={`${
                    isLogin ? "text-orange-500" : ""
                  } hover:cursor-pointer`}
                >
                  Login
                </p>
                <p
                  onClick={handleShowLogin}
                  className={`${
                    !isLogin ? "text-orange-500" : ""
                  } hover:cursor-pointer`}
                >
                  Signup
                </p>
              </div>
              <div className="w-full h-3/4 text-white roboto-medium flex justify-center">
                <form
                  className="w-[70%] h-full flex flex-col  justify-evenly items-center "
                  onChange={handleChange}
                >
                  {!isLogin && (
                    <div className="w-full flex flex-col items-start">
                      <label className="w-full flex pl-2 pr-4 items-center bg-blue-gray-900 text-white border-4  border-orange-400 focus:ring-0 focus:outline-none focus:border-orange-400  rounded-2xl ">
                        <input
                          type="text"
                          placeholder="Enter username"
                          name="userName"
                          value={credentials.userName}
                          className="px-4 py-2.5  w-full focus:ring-0 focus:outline-none  bg-transparent border-none rounded-xl"
                        />
                        <span className="flex flex-col  items-center">
                          <svg
                            className="w-3 h-3"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.33268 17.6667C13.843 17.6667 17.4993 13.9357 17.4993 9.33333C17.4993 4.73096 13.843 1 9.33268 1C4.82236 1 1.16602 4.73096 1.16602 9.33333C1.16602 13.9357 4.82236 17.6667 9.33268 17.6667Z"
                              stroke="white"
                              strokeWidth="2"
                            />
                          </svg>
                          <svg
                            className="w-7 h-5"
                            viewBox="0 0 35 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M33.6667 11.207C33.6667 16.3847 33.6667 20.582 17.3333 20.582C1 20.582 1 16.3847 1 11.207C1 6.02932 8.31268 1.83203 17.3333 1.83203C26.354 1.83203 33.6667 6.02932 33.6667 11.207Z"
                              stroke="white"
                              strokeWidth="2"
                            />
                          </svg>
                        </span>
                      </label>
                      {errors && errors.userName ? (
                        <p className="text-sm relative left-2 text-red-600 brightness-200 poppins-medium">
                          {errors.userName}
                        </p>
                      ) : (
                        <p className="h-5"></p>
                      )}
                    </div>
                  )}
                  <div className="w-full flex flex-col items-start">
                    <label className="w-full flex pl-2 pr-4 items-center bg-blue-gray-900 text-white border-4  border-orange-400 focus:ring-0 focus:outline-none focus:border-orange-400  rounded-2xl ">
                      <input
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        value={credentials.email}
                        className="px-4 py-2.5 w-full focus:ring-0 focus:outline-none  bg-transparent  bg-blue-gray-900 border-none rounded-xl"
                      />
                      <span className="flex flex-col  items-center">
                        <svg
                          className="w-7"
                          viewBox="0 0 33 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 8.095V20.5C0 21.8261 0.579462 23.0979 1.61091 24.0355C2.64236 24.9732 4.04131 25.5 5.5 25.5H27.5C28.9587 25.5 30.3576 24.9732 31.3891 24.0355C32.4205 23.0979 33 21.8261 33 20.5V5.5C33 4.17392 32.4205 2.90215 31.3891 1.96447C30.3576 1.02678 28.9587 0.5 27.5 0.5H5.5C4.04131 0.5 2.64236 1.02678 1.61091 1.96447C0.579462 2.90215 0 4.17392 0 5.5V8.095ZM5.5 3H27.5C28.2293 3 28.9288 3.26339 29.4445 3.73223C29.9603 4.20107 30.25 4.83696 30.25 5.5V7.35L16.5 14.08L2.75 7.35V5.5C2.75 4.83696 3.03973 4.20107 3.55546 3.73223C4.07118 3.26339 4.77065 3 5.5 3ZM2.75 10.19L15.8483 16.6C16.0486 16.698 16.2725 16.7493 16.5 16.7493C16.7275 16.7493 16.9514 16.698 17.1518 16.6L30.25 10.19V20.5C30.25 21.163 29.9603 21.7989 29.4445 22.2678C28.9288 22.7366 28.2293 23 27.5 23H5.5C4.77065 23 4.07118 22.7366 3.55546 22.2678C3.03973 21.7989 2.75 21.163 2.75 20.5V10.19Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                    </label>
                    {errors && errors.email ? (
                      <p className="text-sm relative left-2 text-red-600 brightness-200 poppins-medium">
                        {errors.email}
                      </p>
                    ) : (
                      <p className="h-5"></p>
                    )}
                  </div>
                  {!isLogin && (
                    <div className="w-full flex flex-col items-start">
                      <label className="w-full flex pl-2 pr-4 items-center bg-blue-gray-900 text-white border-4  border-orange-400 focus:ring-0 focus:outline-none focus:border-orange-400  rounded-2xl ">
                        <input
                          type="number"
                          placeholder="Enter Mobile Number"
                          name="mobile"
                          value={credentials.mobile}
                          className="px-4 py-2.5 w-full no-spinner focus:outline-none  bg-transparent  focus:ring-0 border-none rounded-xl"
                        />
                        <span className="flex flex-col  items-center">
                          <svg
                            className="w-6 h-6"
                            viewBox="0 0 34 34"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M32.2421 23.0816L24.1227 19.443C23.7548 19.2853 23.3534 19.222 22.9549 19.2586C22.5563 19.2952 22.1732 19.4306 21.8402 19.6527C21.8064 19.6744 21.7743 19.6986 21.7439 19.7248L17.5003 23.3342C17.4563 23.3582 17.4073 23.3717 17.3572 23.3734C17.3071 23.3752 17.2572 23.3653 17.2116 23.3445C14.4839 22.028 11.6583 19.2195 10.3366 16.5297C10.3146 16.4847 10.3031 16.4354 10.3031 16.3853C10.3031 16.3353 10.3146 16.2859 10.3366 16.2409L13.958 11.9441C13.984 11.9123 14.0081 11.879 14.0302 11.8444C14.2491 11.5101 14.3814 11.1265 14.415 10.7283C14.4486 10.3302 14.3825 9.92986 14.2227 9.5636L10.6099 1.45797C10.4047 0.97949 10.0499 0.580454 9.59865 0.320755C9.14744 0.0610562 8.62416 -0.0452953 8.10736 0.0176619C5.86134 0.312937 3.79968 1.41593 2.30765 3.12052C0.815621 4.82511 -0.0046882 7.01466 2.01564e-05 9.28001C2.01564e-05 22.7378 10.9485 33.6863 24.4063 33.6863C26.6715 33.6906 28.8609 32.8702 30.5654 31.3782C32.2699 29.8862 33.373 27.8248 33.6686 25.5789C33.7314 25.0645 33.6265 24.5436 33.3695 24.0937C33.1125 23.6437 32.717 23.2887 32.2421 23.0816ZM24.4063 31.6238C12.0863 31.6238 2.06252 21.6 2.06252 9.28001C2.05677 7.51645 2.69331 5.81112 3.85319 4.48265C5.01308 3.15417 6.61696 2.29344 8.36518 2.06126H8.40471C8.47397 2.06255 8.54123 2.08474 8.59766 2.12492C8.65409 2.16509 8.69707 2.22139 8.72096 2.28641L12.3475 10.3834C12.3682 10.4285 12.3789 10.4774 12.3789 10.527C12.3789 10.5765 12.3682 10.6255 12.3475 10.6705L8.71924 14.9777C8.6923 15.0085 8.6676 15.0413 8.64533 15.0756C8.4183 15.4222 8.2846 15.8216 8.2572 16.235C8.2298 16.6484 8.30962 17.0619 8.48893 17.4355C10.0135 20.5567 13.1588 23.678 16.3144 25.2025C16.6901 25.3808 17.1056 25.4587 17.5204 25.4286C17.9352 25.3985 18.3351 25.2614 18.6811 25.0306C18.7138 25.0083 18.7464 24.9842 18.7774 24.9584L23.0192 21.3491C23.0611 21.3266 23.1074 21.3134 23.1549 21.3104C23.2023 21.3074 23.2499 21.3148 23.2942 21.3319L31.4153 24.9705C31.4817 24.9987 31.5374 25.0471 31.5748 25.1088C31.6121 25.1705 31.6291 25.2424 31.6233 25.3142C31.3923 27.0632 30.5324 28.6683 29.2042 29.8295C27.876 30.9907 26.1705 31.6285 24.4063 31.6238Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </label>
                      {errors && errors.mobile ? (
                        <p className="text-sm relative left-2 text-red-600 brightness-200 poppins-medium">
                          {errors.mobile}
                        </p>
                      ) : (
                        <p className="h-5"></p>
                      )}
                    </div>
                  )}
                  <div className="w-full flex flex-col items-start">
                    <label className="w-full flex pl-2 pr-4 items-center bg-blue-gray-900 text-white border-4  border-orange-400 focus:ring-0 focus:outline-none focus:border-orange-400  rounded-2xl ">
                      <div className="flex items-center w-full">
                        <input
                          type="password"
                          placeholder="Enter password"
                          name="password"
                          value={credentials.password}
                          className="px-4 py-2.5 w-full focus:ring-0 focus:outline-none  bg-transparent  border-none rounded-xl"
                        />
                        <span className="flex flex-col  items-center">
                          <svg
                            className="w-4 h-3"
                            viewBox="0 0 22 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.5 15V11.5C1.5 5.70101 5.86522 1 11.25 1C16.6348 1 21 5.70101 21 11.5V15"
                              stroke="#DBDBDB"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <svg
                            className="w-7 h-4"
                            viewBox="0 0 35 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 11.5C1 6.5503 1 4.07545 2.42786 2.53773C3.85571 1 6.1538 1 10.75 1H23.75C28.3461 1 30.6442 1 32.0721 2.53773C33.5 4.07545 33.5 6.5503 33.5 11.5C33.5 16.4497 33.5 18.9245 32.0721 20.4623C30.6442 22 28.3461 22 23.75 22H10.75C6.1538 22 3.85571 22 2.42786 20.4623C1 18.9245 1 16.4497 1 11.5Z"
                              stroke="#DBDBDB"
                              strokeWidth="2"
                            />
                          </svg>
                        </span>
                      </div>
                    </label>
                    {errors && errors.password ? (
                      <p className="text-sm relative left-2 text-red-600 brightness-200 poppins-medium">
                        {errors.password}
                      </p>
                    ) : (
                      <p className="h-5"></p>
                    )}
                  </div>

                  {isLogin && (
                    <div className="flex -mt-5 w-full justify-end">
                      <Link className=" ">Forgot Password?</Link>
                    </div>
                  )}
                  {isLogin && (
                    <button
                      type="submit"
                      onClick={handleLogin}
                      className="bg-[#C0690E]  py-1.5 rounded-xl w-[30%] align-middle"
                    >
                      Login
                    </button>
                  )}

                  {!isLogin && (
                    <button
                      type="submit"
                      onClick={handleSignup}
                      className="bg-[#C0690E]  py-1.5 rounded-xl w-[30%] align-middle"
                    >
                      Sign Up
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
        <div className="absolute  left-0 bottom-0 ">
          <svg
            className="w-56 "
            viewBox="0 0 394 361"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect
              x="39.3672"
              y="0.25"
              width="391.084"
              height="228.53"
              transform="rotate(25.2178 39.3672 0.25)"
              fill="url(#pattern0_312_7790)"
              fillOpacity="0.48"
            />
            <defs>
              <pattern
                id="pattern0_312_7790"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlinkHref="#image0_312_7790"
                  transform="matrix(0.00121803 0 0 0.00208441 0 0.024754)"
                />
              </pattern>
              <image
                id="image0_312_7790"
                width="821"
                height="456"
                xlinkHref="data:image/png;base64,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"
              />
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
