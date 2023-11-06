import { Map } from "../Footer/Map/Map";
import { useEffect, useState } from "react";

export const Contact = ({ contactInfos }) => {
  const [showMap, setShowMap] = useState(false);

  const handleShowMap = () => {
    setShowMap(true);
  };

  return (
    <div className="container !my-[3em] text-black dark:text-white">
      <h1 className="mb-5 text-4xl font-semibold text-center">Bizimlə əlaqə</h1>
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="flex flex-col w-full md:w-[30%] mb-[2em] md:mb-0 items-center md:items-start">
          <div className="flex justify-start mb-[1em]">
            <h4 className="text-[16px] font-normal">
              <span className="font-semibold">Ünvan:</span>{" "}
              {contactInfos.address}
            </h4>
            {/* <p>Bülbül 75C, Bakı</p> */}
          </div>
          <div className="flex justify-start mb-[1em]">
            <h4 className="text-[16px] font-normal">
              <span className="font-semibold">Telefon(Whatsapp):</span>{" "}
              {contactInfos.mobile}
            </h4>
            {/* <p>+994 50 323 19 98</p> */}
          </div>
          <div className="flex justify-start mb-[1em]">
            <h4 className="text-[16px] font-normal">
              <span className="font-semibold">Email:</span>{" "}
              <a href={`mailto:${contactInfos.email}`}>{contactInfos.email}</a>
            </h4>
            {/* <p>
              <a href="mailto:hypertitan.business@gmail.com">hypertitan.business@gmail.com</a>
            </p> */}
          </div>
        </div>
        <div className="w-full md:w-[70%]">
          {!showMap ? (
            <div className="w-[100%] flex flex-row items-center justify-center">
              <button
                className="align-middle border-2 border-gray-500 rounded-md py-[7px] px-[14px] font-semibold hover:bg-green-500 hover:text-white duration-200 hover:duration-300 hover:transition-all"
                onClick={() => handleShowMap()}
              >
                Bizi xəritədə tap
              </button>
            </div>
          ) : (
            <Map width={"100%"} height={"300px"} />
          )}
        </div>
      </div>
    </div>
  );
};
