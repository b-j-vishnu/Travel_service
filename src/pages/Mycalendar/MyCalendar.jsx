import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useRef } from "react";
import styled from "styled-components";
import { parse, format } from "date-fns";
const Wrapper = styled.div`
  .fc-col-header-cell,
  .fc-day fc-day-mon {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .fc-toolbar {
    display: flex;
    margin-right: 10px;
    margin-left: 10px;
  }
  .fc-button {
    border-radius: 0.5rem;
  }
  .fc-daygrid-day-frame {
    display: flex;
    padding-left: 1rem;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-style: normal;
  }
  .fc {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  .fc-day-sun {
    color: red;
  }
`;

const MyCalander = () => {
  const [color, setColor] = useState(false);
  const [events, setEvents] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [colors, setColors] = useState([
    "bg-yellow-500",
    "bg-blue-900",
    "bg-green-900",
    "bg-red-900",
  ]);
  const [bgColor, setBgColor] = useState(colors[0].slice(3, 9));
  const [eventFormDetails, setEventFormDetails] = useState({
    title: "",
    start: "",
    end: "",
    note: "",
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  console.log(selectedMonth);
  const calendarRef = useRef(null);
  console.log(bgColor);

  const handleAddEvent = (e) => {
    e.preventDefault();
    const groupId = events.length ? events[events.length - 1].groupId + 1 : 1;
    const parsedStart = parse(eventFormDetails.start, "dd-MM-yyyy", new Date());
    const parsedEnd = parse(eventFormDetails.end, "dd-MM-yyyy", new Date());
    const formattedStart = format(parsedStart, "yyyy-MM-dd");
    const formattedEnd = format(parsedEnd, "yyyy-MM-dd");
    setEvents([
      ...events,
      {
        groupId,
        ...eventFormDetails,
        start: formattedStart,
        end: formattedEnd,
        backgroundColor: bgColor,
      },
    ]);
    console.log({
      groupId,
      ...eventFormDetails,
      start: formattedStart,
      end: formattedEnd,
      backgroundColor: bgColor,
    });
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value);
    setSelectedMonth(month);
    const calendarApi = calendarRef.current.getApi();
    const year = new Date().getFullYear();
    calendarApi.gotoDate(new Date(year, month, 1));
  };

  const handleChangeColor = (color, index) => {
    setColor(!color);
    let newIndex = index;
    setBgColor(color.toString().slice(3, 9));
    const newColors = colors.filter((color, index) => newIndex !== index);
    newColors.unshift(color);
    setColors(newColors);
  };

  return (
    <div className="md:w-[93%] px-4 lg:w-[80%] bg-gray-100  flex justify-center relative md:left-[7%] poppins-medium text-sm lg:left-[20%] top-16">
      <div
        className="w-full mt-16 
      rounded-xl bg-white my-5 ring-1 ring-gray-500"
        onClick={() => setIsOpen(false)}
      >
        <div className="w-full flex justify-end">
          <select
            className="px-1 py-1 w-[4.6rem] text-sm text-black ring-1 ring-gray-600 rounded-md relative right-28 top-8"
            onChange={handleMonthChange}
            value={selectedMonth}
          >
            <option className="text-xs" value="0">
              January
            </option>
            <option className="text-xs" value="1">
              February
            </option>
            <option className="text-xs" value="2">
              March
            </option>
            <option className="text-xs" value="3">
              April
            </option>
            <option className="text-xs" value="4">
              May
            </option>
            <option className="text-xs" value="5">
              June
            </option>
            <option className="text-xs" value="6">
              July
            </option>
            <option className="text-xs" value="7">
              August
            </option>
            <option className="text-xs" value="8">
              September
            </option>
            <option className="text-xs" value="9">
              October
            </option>
            <option className="text-xs" value="10">
              November
            </option>
            <option className="text-xs" value="11">
              December
            </option>
          </select>
        </div>

        <Wrapper>
          <FullCalendar
            plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            ref={calendarRef}
            weekends={true}
            selectable={true}
            dayHeaderFormat={{ weekday: "long" }}
            events={events}
            headerToolbar={{
              end: "AddEventBtn",
              start: "timeGridWeek",
            }}
            eventTextColor="white"
            eventClick={function (info) {
              handleShowEvent(info.event.id);
            }}
            fixedWeekCount={false}
            firstDay={1}
            customButtons={{
              AddEventBtn: {
                text: "+ Add Event",
                click: function (e) {
                  e.stopPropagation();
                  setIsOpen(!isOpen);
                },
              },
              monthsMenu: {
                text: "month",
                click: function () {},
              },
            }}
          />
        </Wrapper>
      </div>

      {isOpen ? (
        <div className="fixed h-[100vh] bg-[#1B3C6D] text-white text-xs poppins-medium w-[28%] top-0 z-50 right-0 rounded-t-xl rounded-b-xl py-5 px-9">
          <p className="text-lg">Add Event</p>
          <form
            className="flex w-full flex-col items-center my-14 gap-y-1"
            onChange={handleChange}
            onSubmit={handleAddEvent}
          >
            <div className="w-full flex flex-col">
              <label className="whitespace-nowrap">Title</label>
              <input
                type="text"
                name="title"
                className="px-2 my-2 text-black w-full py-2 rounded-sm"
                placeholder="Event Title"
                value={eventFormDetails.title}
              />
            </div>
            <div className="flex w-full flex-col">
              <label className="whitespace-nowrap">Start Date</label>
              <input
                type="text"
                name="start"
                className="px-2 py-2 text-black w-full my-2 text-xs rounded-sm"
                placeholder="24-07-2024"
                value={eventFormDetails.start}
              />
            </div>
            <div className="flex w-full flex-col">
              <label className="my-2 whitespace-nowrap">End Date</label>
              <input
                type="text"
                name="end"
                className="px-2 py-2 text-black w-full text-xs rounded-sm"
                placeholder="24-07-2024"
                value={eventFormDetails.end}
              />
            </div>
            <div className="w-full mt-2 flex flex-col">
              <label className="my-2 ">Choose Color</label>
              <input
                type="color"
                className="w-6 border-none outline-none appearance-none"
              ></input>
            </div>
            <div className="w-full my-2">
              <p>Note</p>
              <textarea
                name="note"
                className="rounded-md text-black px-2 py-1 mt-2 w-full"
                rows={5}
              ></textarea>
            </div>
            <div className="flex w-full gap-x-7 my-2 text-sm">
              <button
                type="submit"
                className="bg-green-400 disabled:bg-gray-600 w-1/5 rounded-md px-2 py-1 text-black"
              >
                Add
              </button>
              <button
                className="bg-red-400 rounded-md px-2 py-1 w-3/12 transition-all text-black"
                onClick={() => setIsOpen(!isOpen)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default MyCalander;
