const Revenue = ({ Content, Icon, textColor, StockIcon, Value, Percent }) => {
  return (
    <section className=" p-2 lg:w-[28%] md:w-[37%]   flex   bg-white  justify-around  md:gap-x-3  rounded-3xl items-center ">
      {Icon}
      <div className="flex flex-col w-2/4  md:items-center lg:items-center xl:items-start">
        <p className="mb-2 text-[15px] whitespace-nowrap poppins-semibold">
          {Content}
        </p>
        <div className="flex w-full justify-start  gap-x-6">
          <p className={`${textColor} text-lg`}>{Value}</p>
          <div className="flex items-center">
            {StockIcon}
            <p className={`text-sm ${textColor} mx-2 `}>{`${Percent}%`}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Revenue;
