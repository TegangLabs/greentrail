import React from "react";
import { Link } from "react-router-dom";

const WasteCard = ({ waste, wasteIdx }) => {
  return (
    <>
      <Link
        to={`/waste/${waste.id}`}
        key={wasteIdx}
        className="card-item col-span-12 md:col-span-3 bg-white rounded-lg px-3 py-3"
      >
        <div className="waste-img rounded-sm md:rounded-md mb-3">
          <img src={waste.image} alt={wasteIdx} />
        </div>

        <div className="waste-data grid grid-cols-12 gap-x-2">
          <div className="left-content col-span-7 text-primary">
            <div className="category font-bold md:text-base text-sm">
              {waste?.category}
            </div>
            <div className="waste-id font-light md:text-xs text-xs">
              {waste?.id}
            </div>
          </div>
          <div className="right-content col-span-5">
            <div className="status text-primary text-sm mb-1">Status</div>
            <ol className="flex items-center w-full">
              <li
                className={`flex w-full items-center  after:content-[''] after:w-full after:h-1 after:border-b ${
                  waste.status[1].station
                    ? "after:border-primary"
                    : "after:border-gray-200"
                }  after:border-4 after:inline-block`}
              >
                <span
                  className={`flex items-center ${
                    waste.status[0].station
                      ? "text-white bg-primary"
                      : "text-gray-600 bg-gray-200"
                  }  justify-center w-5 h-5 rounded-full md:text-xs  shrink-0`}
                >
                  1
                </span>
              </li>{" "}
              <li
                className={`flex w-full items-center  after:content-[''] after:w-full after:h-1 after:border-b ${
                  waste.status[2].station
                    ? "after:border-primary"
                    : "after:border-gray-200"
                }  after:border-4 after:inline-block`}
              >
                <span
                  className={`flex items-center ${
                    waste.status[1].station
                      ? "text-white bg-primary"
                      : "text-gray-600 bg-gray-200"
                  } justify-center w-5 h-5 rounded-full md:text-xs  shrink-0`}
                >
                  2
                </span>
              </li>{" "}
              <li className="flex w-full items-center  ">
                <span
                  className={`flex items-center ${
                    waste.status[2].station
                      ? "text-white bg-primary"
                      : "text-gray-600 bg-gray-200"
                  } justify-center w-5 h-5 rounded-full md:text-xs  shrink-0`}
                >
                  3
                </span>
              </li>
            </ol>
          </div>
        </div>
      </Link>
    </>
  );
};

export default WasteCard;
