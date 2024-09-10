import Revenue from "./Revenue";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import LineChartComponent from "./LineChartComponent";
import "./DashboardCss/DashboardCalendar.scss";

const DashBoard = () => {
  const sampleDatas = [
    {
      id: 1,
      name: "Hakeem Chan",
      email: "hakeen chan@gmail.com",
      number: "1234567890",
      userID: "#9236",
      depature: "11.00PM",
      arrival: "10.00AM",
      status: "Waiting",
      img: "../../../Images/image.png",
    },
    {
      id: 2,
      name: "Hakeem Chan",
      email: "hakeen chan@gmail.com",
      number: "1234567890",
      userID: "#9236",
      depature: "11.00PM",
      arrival: "10.00AM",
      status: "Waiting",
      img: "../../../Images/image.png",
    },
    {
      id: 3,
      name: "Hakeem Chan",
      email: "hakeen chan@gmail.com",
      number: "1234567890",
      userID: "#9236",
      depature: "11.00PM",
      arrival: "10.00AM",
      status: "Waiting",
      img: "../../../Images/image.png",
    },
    {
      id: 4,
      name: "Hakeem Chan",
      email: "hakeen chan@gmail.com",
      number: "1234567890",
      userID: "#9236",
      depature: "11.00PM",
      arrival: "10.00AM",
      status: "Waiting",
      img: "../../../Images/image.png",
    },
    {
      id: 5,
      name: "Hakeem Chan",
      email: "hakeen chan@gmail.com",
      number: "1234567890",
      userID: "#9236",
      depature: "11.00PM",
      arrival: "10.00AM",
      status: "Waiting",
      img: "../../../Images/image.png",
    },
  ];

  return (
    <div className="w-[100%] flex mt-16  justify-end">
      <div className="  md:w-[93%]  px-4 lg:w-[80%]   items-end bg-gray-100 ">
        <div className=" lg:px-2">
          <h3 className="poppins-bold text-xl mt-3">Dashboard</h3>
          <p className="lato-thin text-gray-500 my-1">
            Lates update for 1 month
          </p>
          <div className="my-4 flex w-full  items-center md:gap-x-4 lg:justify-between ">
            <Revenue
              Content={"Flight Bookings"}
              textColor={"text-red-700"}
              Icon={
                <svg
                  className=" md:h-10  lg:h-12"
                  viewBox="0 0 54 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <rect
                    x="0.246094"
                    width="53.7539"
                    height="53.7539"
                    fill="url(#pattern0_312_518)"
                  />
                  <defs>
                    <pattern
                      id="pattern0_312_518"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlinkHref="#image0_312_518"
                        transform="scale(0.015625)"
                      />
                    </pattern>
                    <image
                      id="image0_312_518"
                      width="64"
                      height="64"
                      xlinkHref="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              }
              StockIcon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_312_514)">
                    <path
                      d="M13.3337 15L15.242 13.0917L11.1753 9.025L7.84199 12.3583L1.66699 6.175L2.84199 5L7.84199 10L11.1753 6.66667L16.4253 11.9083L18.3337 10V15H13.3337Z"
                      fill="#C00808"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_312_514">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              }
              Value={86}
              Percent={2.2}
            />
            <Revenue
              Content={"Hotel Booking"}
              Icon={
                <svg
                  className=" md:h-10  lg:h-12"
                  viewBox="0 0 54 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <rect width="54" height="55" fill="url(#pattern0_312_531)" />
                  <defs>
                    <pattern
                      id="pattern0_312_531"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlinkHref="#image0_312_531"
                        transform="matrix(0.0159144 0 0 0.015625 -0.00925926 0)"
                      />
                    </pattern>
                    <image
                      id="image0_312_531"
                      width="64"
                      height="64"
                      xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB2AAAAdgB+lymcgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAozSURBVHic7Zt7VFV1Fsc/5577BpELCohgIoXII/FRmI8kJ3McHStL0zI1e4yVM5M9plY2syYnK9c4lS1zXFOmo01hKaalZPbANPJFCgoJiLxfhqIgr3u598wfl3vlyL1yQK4a+V3rrHXu77t/+7f3Pr+zf4/zu6AcPsCbQAkgXaVXCfBGi62KICiU8wL2AHEqlUBokD+iqAKVBlRiB9R4DlarleKSMmw2G8AhYAxQ1149tUL9C4G4scMj+fiNBQT4+UBgNHgHdd5iD6Dy5M9Mf2A+3+3ZOwT4M/Bqe3WUPrq9QHzmlteICu9rf+phYztQ/fIhMyubmGHjwG7zLe3JK+0BvQAi+rc8cbWBPakH2P7FNzw6737C+vcD4O13VmO2WHj2qfkAVJ85ywcfbqKouJSgoAAemHE3QYEB7NiZQtKW5DaNeHsZef2VRby9cjU5uSdknE8Pb5YuWcSqd9dTe+4cf3n6CQSh7QMYGBHuuO2t0DdFOA5IzRlrJenoOknK3STNmTVNAqSVy1+TpIZSSWoolQRBkADpXFWuVFF4WAoKDJAlKR+fHlLOkT3SvDkz3Caygux9LssFQZBOlWVKOp1WAqTT5VnOdltfzeeKHHWOK3FM1ZVRao331nxEReVJEm69hd1fb+buKROpqall+Tvv8eriF9i5LZGlSxYBEB01kJ3bEvlh12eEhgQ7daSmbOVgajIHU5P56fAu/Ey+XW6n0legw8jJzQNg5vS7GD3yZqqrz7J5azLHso8TGNCbwHHne6hvTx9uHzcGwJHFARgaF4tOp/WUiUAXBODtlatJ2rIdAEmSnOUWS7O9AbW9CY1GLStXgiefehFRFJkzaxojRwy/VFNd4pIDUF/fQHX12a6wpQ1Wr/0IgOvD+1+9AXjh2QU8/thsAFTGEFkvuFQ0nsn3+CvgsSQYGGB/x4tLygAoKCwBICiwS0enS4bHkuAdt9/KWyve5ZXXl7NjZwqH0o8C8Ns7blOsY2TCFOdY7+vrw7bN653cuAnTEEURgCfnz+Wh2fd1ys5OB2BQ5A30CQogfMB1zrKhcbGYLWZ0Oi0TJ4xj+bLFLHtrFT/sSyMoMIDHn5vN3AenO+WD+wQS0rcPN8YOcpYJgkBMdCSlpeXkFxQ5yw0GPWazmdjoQeSdKKCwqMTJVZ78ubNuKJ7LHgfCmzPWIqpUoPOCkBGKG7HZbKhUHnvbZLBarai9+wHkAde3J39ZrLpczncGSl6BIMAI8O7GFFSCAGodmBTNNC87bDbnKGTEbntFZ3XpgfcFaObKb3R06mqxfXWLLy7hLgcIwA5gfJDWwJ2mfoTovRD9Tai8DUqCd8VRXHuGTTkZUkVdjcOXidgDI4O7ANwHJMYYTXwRNR6TWofmumA0oVfXBkh7ON1YT0LiCo5UlQNMBz65UMZddpoJ8I9+QzCpdSAIaIIDPGeph+CnN/L6rZMdP2e6knEXgL4AcV7+AAgaNYhXbya/GIYGhjpuQ13x7rxSAWgcOy4udl5+KdC2zBZx4+sv87F2Ia4F4EobcKWheDEkIfFy6g425WRQbzHLOL1aw+TwKJaMnoT6ItNeq2Tjr3uS2Zp3lAaLRcYZNBruuj6WxaMm2mebbtBss/Hi7m1sO5FFY7Nch1Gj5d6Iwfxt5B0ICpc5igPw0U+HeDl1h1s+61QF1/n48UTcKLcya4/u57V9X7nlM6sqCPftxUMxN7uVWZX+Pf888I1b/mhVORF+vZkZOdStTGsoDkBaZTEA65f+jmkTImTc13uLmDQ/iQMVRYD7AKRV2pewG9+awuSEATLu85QT3PvUVg5UFF00AA4d21ZN5Tcj+sm4T3bk8ODz2zlYUewMgF5UoxVFyWy1nnGlT3EOsLVsdem0YhtOpxFlMp3Soe2gDo0yHUaNls+nPlYOzHOl71eRBMf3j2gECl1xv4oATP30/QDgT664bh+A0431bM494g3MccUrToImvX0ZvCbpKPszymVcXrE9v/jpjYp0/OfjDHYdKJZx2fnVynTo7DpWJh7miz35Mi7z+ClZO0qgOABzo2/m34e/J3l3Psm789vwfgYjfxg88qI6Ho4dwXsZe/ksJY/PUtryvY3ePHLjxfcaHxt8C+uyDpC0M9clH+TVg7nR7keRC+FutpAGDC0ZPh2TWoeg02K4KYbqxnq+L82n4YIJiE6tZmRwGL0MXu02eKqhjtSygjaTGL1aw6i+Ye32AICqhjpSy/JpapZ/ZjOoNYwOGYCv7nwPON1Yj/+KRQA/AsMu1NWhbXGT3sjk8OiOVGkDf4MXv79EHb0MXkwJj7kkHQ50+yTYHjz2ZciBoppqnknZwleFOZxpalBUx1dnYHz/gfwr4U5Ce3T9mYDW8GgACmuqiVu3jDON9aDRQkAwKkFAL6oQVe4XK7UnK/kk+zBfF+VwePZzHg1ChwKQf/YUyfnHqDU3ysqNai0TwiKJMMk/fC78drPd+YnT4f75iBotU8P70FN78WZtFgv73lhC5odrWPjtp2ycMlfGZ58+yZcF2dQ3y1elPbR6JoZFEtbTX7FP7iz5cYDBZ0gPUet8TJlVFcT/703qLlgKO6AT1eyasYD4Pue/FX5ZkA16AzzwBIgi/gZNu84DqDQa4p95iZzNG/iy4JiM21teSELiCpqsrg9aeGm07J+1kCh/ZTvY7qx5NP2maXNUZrPGUbAh+xB1FjOz74wm/ka58iM5VazakM76rIPOAEhI9mCZ+kDLvpxRbLuAcQeVWo3ez5/a0mIkJOf6/oOsgzRZm3l8xmBibuglq7Mvo4J1WzJJPHaIxaMmKmrHXQAEi2RD16qg1twEwOSEAUy5LVwmvCetlFUb0p0ynoSjjXvGRzB6WF8Z19vPyLotmR2yw90w+EHM/o/VFsnmhu4+cBeAyLKmOuGc1eKG7j64NhFSLNiy2VlSUUt+ifxUWFF5jUzGk3C0UVReQ36Jt4wrqajtsB2KAzA2JJxlB77l6aUpPL00xaVMQmi7BzIuGWNDwnn/yD7mveR+g7YjdigOwOTwaFZPmEFSbkabMVijEpk0IIpZUW0WW12OB6OHU2NuZPuJn7DYrDJOJ6q5J2IwkwZEKdbXoZngvNh45sXGd6RKl0NAYMGQMSwYMqZL9P3qk+C1AFxpA640LlyTisD92P8d5h9rNKEWVKASUBk7fjYorbIYNBoIsX8F0ooqfBQshhyoPp6N1WxmWKDLsw2K0Gyzkv5zGcAp7P99+hCwupIVgSSugtNdHr420qrnt+4Bc4E1g/oaWfVIBNEhRmwBwVhNV9fh5s5Asklk5lXxx1e+4Vj+abD7+l+QB2ATMPW7v8cxJrInAE0DB4PQfdLE7rQSxj+8Eey+3gvyJBgCMDDYvi0tqTXdynmAyDA/x60zqXQvDzuBawFodS8BWM8fNu52aOWbc6en9aCcAcQPeT4NL50KBAFJva9b5YG6BucGT7orPgBIBsxc+bHaU5cZ2N7iKwD/B4VGGKSxaIpYAAAAAElFTkSuQmCC"
                    />
                  </defs>
                </svg>
              }
              StockIcon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_312_527)">
                    <path
                      d="M13.3327 8L15.241 9.90833L11.1743 13.975L7.84102 10.6417L1.66602 16.825L2.84102 18L7.84102 13L11.1743 16.3333L16.4243 11.0917L18.3327 13V8H13.3327Z"
                      fill="#087E29"
                      fillOpacity="0.5"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_312_527">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              }
              Value={43}
              Percent={4.3}
              textColor={"text-green-500"}
            />
            <Revenue
              Content={"Total Vehicle"}
              StockIcon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_312_527)">
                    <path
                      d="M13.3327 8L15.241 9.90833L11.1743 13.975L7.84102 10.6417L1.66602 16.825L2.84102 18L7.84102 13L11.1743 16.3333L16.4243 11.0917L18.3327 13V8H13.3327Z"
                      fill="#087E29"
                      fillOpacity="0.5"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_312_527">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              }
              Value={17}
              Icon={
                <svg
                  className=" md:h-10  lg:h-12"
                  viewBox="0 0 54 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <rect width="54" height="55" fill="url(#pattern0_312_542)" />
                  <defs>
                    <pattern
                      id="pattern0_312_542"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlinkHref="#image0_312_542"
                        transform="matrix(0.0159144 0 0 0.015625 -0.00925926 0)"
                      />
                    </pattern>
                    <image
                      id="image0_312_542"
                      width="64"
                      height="64"
                      xlinkHref="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              }
              textColor={"text-green-500"}
              Percent={0.3}
            />
          </div>
          <div className="grid grid-cols-2 my-10 ">
            <div className="flex flex-col  ">
              <section className="md:w-[92%] lg:w-[95%] border-2 flex flex-col grid-rows-1  bg-white items-center px-4 py-3 rounded-xl">
                <div className=" flex mb-5 w-full justify-between ">
                  <h2 className="poppins-bold">Growth</h2>
                  <select className="border-none outline-none">
                    <option>Weekly</option>
                  </select>
                </div>
                <LineChartComponent />
              </section>

              <section className=" md:w-[92%] lg:w-[95%] bg-white my-4 py-5 px-2 rounded-xl">
                <div className="flex gap-x-3 items-center">
                  <svg
                    width="47"
                    height="41"
                    viewBox="0 0 47 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="47" height="41" rx="10" fill="#E2FBBE" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M21.5574 6H26.7682C29.8458 6 32.2837 6 34.1909 6.25354C36.1533 6.51537 37.7423 7.06554 38.9965 8.30509C40.5436 9.83794 41.0376 11.8895 41.2167 14.5525C42.1829 14.9718 42.9129 15.8617 42.9916 16.9885C43 17.0896 43 17.1973 43 17.2967V23.7033C43 23.8027 43 23.9104 42.9933 24.0098C42.9129 25.1367 42.1829 26.0282 41.2167 26.4491C41.0376 29.1105 40.5436 31.1621 38.9965 32.6949C37.7423 33.9345 36.1533 34.4846 34.1909 34.7465C32.282 35 29.8458 35 26.7682 35H21.5574C18.4798 35 16.0419 35 14.1347 34.7465C12.1723 34.4846 10.5833 33.9345 9.32912 32.6949C8.07665 31.4537 7.52074 29.8811 7.25619 27.9389C7 26.0498 7 23.6386 7 20.5928V20.4072C7 17.3614 7 14.9486 7.25619 13.0611C7.52074 11.1189 8.07665 9.54629 9.32912 8.30509C10.5833 7.06554 12.1723 6.51537 14.1347 6.25354C16.0435 6 18.4798 6 21.5574 6ZM38.6766 26.7143H35.4316C31.84 26.7143 28.7658 24.0165 28.7658 20.5C28.7658 16.9835 31.84 14.2857 35.43 14.2857H38.675C38.4841 12.0635 38.0538 10.8886 37.2182 10.0633C36.51 9.36234 35.5388 8.94143 33.8543 8.71771C32.1347 8.48903 29.8659 8.48571 26.6727 8.48571H21.6495C18.4564 8.48571 16.1892 8.48903 14.4662 8.71771C12.7834 8.94143 11.8123 9.36234 11.104 10.0633C10.3957 10.7643 9.97042 11.7254 9.74437 13.3925C9.5133 15.0961 9.50995 17.3398 9.50995 20.5C9.50995 23.6602 9.5133 25.9056 9.74437 27.6091C9.97042 29.2746 10.3957 30.2357 11.104 30.9367C11.8123 31.6377 12.7834 32.0586 14.4679 32.2823C16.1892 32.511 18.4564 32.5143 21.6495 32.5143H26.6727C29.8659 32.5143 32.1347 32.511 33.856 32.2823C35.5388 32.0586 36.51 31.6377 37.2182 30.9367C38.0538 30.1114 38.4858 28.9382 38.6766 26.7143ZM13.6977 13.8714C13.6977 13.5418 13.83 13.2257 14.0655 12.9926C14.301 12.7595 14.6204 12.6286 14.9535 12.6286H21.6512C21.9842 12.6286 22.3036 12.7595 22.5392 12.9926C22.7747 13.2257 22.907 13.5418 22.907 13.8714C22.907 14.2011 22.7747 14.5172 22.5392 14.7503C22.3036 14.9833 21.9842 15.1143 21.6512 15.1143H14.9535C14.6204 15.1143 14.301 14.9833 14.0655 14.7503C13.83 14.5172 13.6977 14.2011 13.6977 13.8714ZM39.9425 16.7714H35.4316C33.0473 16.7714 31.2774 18.5263 31.2774 20.5C31.2774 22.4737 33.0473 24.2286 35.43 24.2286H39.981C40.326 24.207 40.475 23.9767 40.4867 23.8375V17.1625C40.475 17.0233 40.326 16.793 39.981 16.7731L39.9425 16.7714Z"
                      fill="#0FA958"
                    />
                  </svg>
                  <p className="poppins-bold">0</p>
                </div>
                <p className="poppins-light poppins-regular ">
                  Total Invoice / Bill Paid Amount
                </p>
                <div className="flex gap-x-3 mt-3 items-center">
                  <svg
                    width="47"
                    height="41"
                    viewBox="0 0 47 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="47" height="41" rx="10" fill="#FBE2BE" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M21.5574 6H26.7682C29.8458 6 32.2837 6 34.1909 6.25354C36.1533 6.51537 37.7423 7.06554 38.9965 8.30509C40.5436 9.83794 41.0376 11.8895 41.2167 14.5525C42.1829 14.9718 42.9129 15.8617 42.9916 16.9885C43 17.0896 43 17.1973 43 17.2967V23.7033C43 23.8027 43 23.9104 42.9933 24.0098C42.9129 25.1367 42.1829 26.0282 41.2167 26.4491C41.0376 29.1105 40.5436 31.1621 38.9965 32.6949C37.7423 33.9345 36.1533 34.4846 34.1909 34.7465C32.282 35 29.8458 35 26.7682 35H21.5574C18.4798 35 16.0419 35 14.1347 34.7465C12.1723 34.4846 10.5833 33.9345 9.32912 32.6949C8.07665 31.4537 7.52074 29.8811 7.25619 27.9389C7 26.0498 7 23.6386 7 20.5928V20.4072C7 17.3614 7 14.9486 7.25619 13.0611C7.52074 11.1189 8.07665 9.54629 9.32912 8.30509C10.5833 7.06554 12.1723 6.51537 14.1347 6.25354C16.0435 6 18.4798 6 21.5574 6ZM38.6766 26.7143H35.4316C31.84 26.7143 28.7658 24.0165 28.7658 20.5C28.7658 16.9835 31.84 14.2857 35.43 14.2857H38.675C38.4841 12.0635 38.0538 10.8886 37.2182 10.0633C36.51 9.36234 35.5388 8.94143 33.8543 8.71771C32.1347 8.48903 29.8659 8.48571 26.6727 8.48571H21.6495C18.4564 8.48571 16.1892 8.48903 14.4662 8.71771C12.7834 8.94143 11.8123 9.36234 11.104 10.0633C10.3957 10.7643 9.97042 11.7254 9.74437 13.3925C9.5133 15.0961 9.50995 17.3398 9.50995 20.5C9.50995 23.6602 9.5133 25.9056 9.74437 27.6091C9.97042 29.2746 10.3957 30.2357 11.104 30.9367C11.8123 31.6377 12.7834 32.0586 14.4679 32.2823C16.1892 32.511 18.4564 32.5143 21.6495 32.5143H26.6727C29.8659 32.5143 32.1347 32.511 33.856 32.2823C35.5388 32.0586 36.51 31.6377 37.2182 30.9367C38.0538 30.1114 38.4858 28.9382 38.6766 26.7143ZM13.6977 13.8714C13.6977 13.5418 13.83 13.2257 14.0655 12.9926C14.301 12.7595 14.6204 12.6286 14.9535 12.6286H21.6512C21.9842 12.6286 22.3036 12.7595 22.5392 12.9926C22.7747 13.2257 22.907 13.5418 22.907 13.8714C22.907 14.2011 22.7747 14.5172 22.5392 14.7503C22.3036 14.9833 21.9842 15.1143 21.6512 15.1143H14.9535C14.6204 15.1143 14.301 14.9833 14.0655 14.7503C13.83 14.5172 13.6977 14.2011 13.6977 13.8714ZM39.9425 16.7714H35.4316C33.0473 16.7714 31.2774 18.5263 31.2774 20.5C31.2774 22.4737 33.0473 24.2286 35.43 24.2286H39.981C40.326 24.207 40.475 23.9767 40.4867 23.8375V17.1625C40.475 17.0233 40.326 16.793 39.981 16.7731L39.9425 16.7714Z"
                      fill="#A9610F"
                    />
                  </svg>
                  <p className="poppins-bold">2400000</p>
                </div>
                <p className="poppins-light poppins-regular text-">
                  Total Invoice / Bill Paid Amount
                </p>
              </section>
            </div>

            <div className="flex justify-end ">
              <div className="h-[430px] w-[93%] bg-white rounded-3xl px-3 py-1 ">
                <article className="">
                  <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    height={385}
                  />
                </article>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <section className="basis-[47%] rounded-2xl p-5 bg-white flex flex-col gap-y-5 ">
              <p className="mb-3 poppins-semibold">Bookings</p>
              <div className="w-11/12 flex justify-between">
                <div className="flex gap-x-3">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11" cy="11" r="11" fill="#69E26D" />
                  </svg>

                  <p>Confirmed</p>
                </div>
                <p>12,368,79</p>
              </div>
              <div className="w-11/12  flex justify-between">
                <div className="flex gap-x-3">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11" cy="11" r="11" fill="#3257EB" />
                  </svg>

                  <p className="">Pending</p>
                </div>
                <p>1,89,32</p>
              </div>
              <div className="w-11/12 flex justify-between">
                <div className="flex gap-x-3">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11" cy="11" r="11" fill="#FFAE00" />
                  </svg>

                  <p>Wait</p>
                </div>
                <p>12,0000</p>
              </div>
              <div className="w-11/12 flex justify-between">
                <div className="flex gap-x-3">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11" cy="11" r="11" fill="#00693C" />
                  </svg>

                  <p>On Trip</p>
                </div>
                <p>13,456,12</p>
              </div>
              <div className="w-11/12 flex justify-between">
                <div className="flex gap-x-3">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11" cy="11" r="11" fill="#FF0000" />
                  </svg>

                  <p className="">Cancelled</p>
                </div>
                <p>12,904,90</p>
              </div>
            </section>
            <section className=" basis-[47%] rounded-2xl p-5 bg-white flex flex-col gap-y-5 ">
              <p className="mb-3 poppins-semibold">Leads</p>
              <div className="w-11/12 flex justify-between">
                <div className="flex gap-x-3">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11" cy="11" r="11" fill="#066F36" />
                  </svg>

                  <p className="w-[#066F36]">Converted to Deal</p>
                </div>
                <p>12,368,79</p>
              </div>
              <div className="w-11/12 flex justify-between">
                <div className="flex gap-x-3">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11" cy="11" r="11" fill="#FF0000" />
                  </svg>

                  <p className="text-[#FF0000]">Cancelled</p>
                </div>
                <p>1,89,32</p>
              </div>
              <div className="w-11/12 flex justify-between">
                <div className="flex gap-x-3">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11" cy="11" r="11" fill="#FFC267" />
                  </svg>
                  <p className="text-[#FFC267]">Proposal Sent</p>
                </div>
                <p>12,0000</p>
              </div>
              <div className="w-11/12 flex justify-between">
                <div className="flex gap-x-3">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11" cy="11" r="11" fill="#EF48F2" />
                  </svg>

                  <p className="text-[#EF48F2]">Meeting Fixed</p>
                </div>
                <p>13,456,12</p>
              </div>
              <div className="w-11/12 flex justify-between">
                <div className="flex gap-x-3">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11" cy="11" r="11" fill="#003BA8" />
                  </svg>

                  <p className="text-[#003BA8]">Yes to Confirm</p>
                </div>
                <p>12,904,90</p>
              </div>
            </section>
          </div>
          <section className=" bg-white my-10 p-4 rounded-lg poppins-light ">
            <div className="flex justify-between my-4 ">
              <p className="poppins-regular poppins-semibold">
                The Trip Scheduled for Today
              </p>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.00002 3.79167C8.04706 3.79167 8.89585 2.94287 8.89585 1.89583C8.89585 0.848793 8.04706 0 7.00002 0C5.95298 0 5.10419 0.848793 5.10419 1.89583C5.10419 2.94287 5.95298 3.79167 7.00002 3.79167Z"
                  fill="#9EA9B4"
                />
                <path
                  d="M7.00002 8.89616C8.04706 8.89616 8.89585 8.04737 8.89585 7.00033C8.89585 5.95329 8.04706 5.10449 7.00002 5.10449C5.95298 5.10449 5.10419 5.95329 5.10419 7.00033C5.10419 8.04737 5.95298 8.89616 7.00002 8.89616Z"
                  fill="#9EA9B4"
                />
                <path
                  d="M7.00002 13.9997C8.04706 13.9997 8.89585 13.1509 8.89585 12.1038C8.89585 11.0568 8.04706 10.208 7.00002 10.208C5.95298 10.208 5.10419 11.0568 5.10419 12.1038C5.10419 13.1509 5.95298 13.9997 7.00002 13.9997Z"
                  fill="#9EA9B4"
                />
              </svg>
            </div>
            <table className="md:w-[80%] lg:w-full rounded-lg  text-xs  ">
              <tr className="poppins-regular  bg-gray-100">
                <th className="border flex items-center text-gray-400 justify-around  poppins-regular whitespace-nowrap border-gray-300 poppins-bold py-2">
                  <p>Full Name </p>
                  <div>
                    <svg
                      width="10"
                      height="5"
                      viewBox="0 0 10 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.17188 0.75L9.67188 4.75H0.671875L5.17188 0.75Z"
                        fill="#A5ABB3"
                      />
                    </svg>
                    <svg
                      width="10"
                      height="5"
                      viewBox="0 0 10 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1_320)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.17188 4.75L9.67188 0.75H0.671875L5.17188 4.75Z"
                          fill="#A5ABB3"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_320">
                          <rect
                            width="9"
                            height="4"
                            fill="white"
                            transform="translate(0.671875 0.75)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </th>
                <th className="border py-2 poppins-bold text-gray-400  whitespace-nowrap border-gray-300 ">
                  <div className="flex justify-start gap-x-6 px-4 items-center">
                    <p>Email</p>
                    <div className="">
                      <svg
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.17188 0.75L9.67188 4.75H0.671875L5.17188 0.75Z"
                          fill="#A5ABB3"
                        />
                      </svg>
                      <svg
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1_320)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.17188 4.75L9.67188 0.75H0.671875L5.17188 4.75Z"
                            fill="#A5ABB3"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_320">
                            <rect
                              width="9"
                              height="4"
                              fill="white"
                              transform="translate(0.671875 0.75)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </th>
                <th className="border py-2  poppins-bold text-gray-400 whitespace-nowrap border-gray-300  ">
                  Phone Number
                </th>
                <th className="border py-2  poppins-bold text-gray-400 whitespace-nowrap border-gray-300 ">
                  <div className="flex justify-around items-center">
                    <p>User ID</p>
                    <div className="">
                      <svg
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.17188 0.75L9.67188 4.75H0.671875L5.17188 0.75Z"
                          fill="#A5ABB3"
                        />
                      </svg>
                      <svg
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1_320)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.17188 4.75L9.67188 0.75H0.671875L5.17188 4.75Z"
                            fill="#A5ABB3"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_320">
                            <rect
                              width="9"
                              height="4"
                              fill="white"
                              transform="translate(0.671875 0.75)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </th>
                <th className="border py-2 poppins-bold text-gray-400 whitespace-nowrap border-gray-300 ">
                  <div className="flex justify-evenly items-center">
                    <p>Time</p>
                    <div className="">
                      <svg
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.17188 0.75L9.67188 4.75H0.671875L5.17188 0.75Z"
                          fill="#A5ABB3"
                        />
                      </svg>
                      <svg
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1_320)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.17188 4.75L9.67188 0.75H0.671875L5.17188 4.75Z"
                            fill="#A5ABB3"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_320">
                            <rect
                              width="9"
                              height="4"
                              fill="white"
                              transform="translate(0.671875 0.75)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </th>
                <th className="border py-2 poppins-bold text-gray-400 whitespace-nowrap border-gray-300 ">
                  <div className="flex justify-around items-center">
                    <p>Status</p>
                    <div className="">
                      <svg
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.17188 0.75L9.67188 4.75H0.671875L5.17188 0.75Z"
                          fill="#A5ABB3"
                        />
                      </svg>
                      <svg
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1_320)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.17188 4.75L9.67188 0.75H0.671875L5.17188 4.75Z"
                            fill="#A5ABB3"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_320">
                            <rect
                              width="9"
                              height="4"
                              fill="white"
                              transform="translate(0.671875 0.75)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </th>
              </tr>
              {sampleDatas.map((data) => (
                <tr className="w-full" key={data.id}>
                  <td className="border border-gray-300   lg:py-2 text-sm  ">
                    <div className="flex md:flex-col lg:flex-row lg:ml-8 lg:mx-2 items-center ">
                      <img
                        className="md:w-6 md:h-6 lg:w-8 lg:h-8"
                        src={data.img}
                      />
                      <p className="poppins-semibold mx-2 md:text-xs whitespace-nowrap ">
                        {data.name}
                      </p>
                    </div>
                  </td>
                  <td className="border lato-regular border-gray-300 whitespace-nowrap pl-4 md:py-1 lg:py-2 md:text-xs lg:text-sm">
                    {data.email}
                  </td>
                  <td className="border lato-regular border-gray-300 text-center md:py-1 lg:py-2 md:text-xs lg:text-sm">
                    {data.number}
                  </td>
                  <td className="border lato-regular border-gray-300 text-center md:py-1 lg:py-2  md:text-xs lg:text-sm">
                    {data.userID}
                  </td>
                  <td className="border flex items-center  lato-regular py-4  border-gray-300">
                    <div className="w-full flex md:px-2 lg:px-0 justify-center items-center ">
                      <span className="text-sm ">{data.depature}</span>
                      <span className="text-xs mx-1">transit</span>
                      <span className="text-sm ">{data.arrival}</span>
                    </div>
                  </td>
                  <td className="border border-gray-300 md:py-1 lg:py-2  lato-regular text-xs">
                    <div className="flex justify-center gap-x-2 md:px-1 border-none outline-none items-center">
                      <svg
                        className="md:w-2 md:h-2 lg:w-4 lg:h-4"
                        viewBox="0 0 7 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          y="0.5"
                          width="7"
                          height="7"
                          rx="3.5"
                          fill="#FF5C00"
                          fillOpacity="0.5"
                        />
                      </svg>
                      <p className="lato-regular">{data.status}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </table>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
