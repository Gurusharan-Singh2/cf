import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BooksCard from "./BooksCard";
import Loader from "./Loader";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const RecentlyAdded = () => {
  const [Data, setData] = useState([]);
  const booksContainerRef = useRef(null);

  useGSAP(() => {
    if (booksContainerRef.current) {
      gsap.fromTo(
        booksContainerRef.current,
        { xPercent: 0 }, // Start position
        {
          xPercent: -50, // Moves left by half the width of duplicated items
          duration: 10, // Scrolling speed
          ease: "linear",
          repeat: -1, // Infinite loop
          modifiers: {
            xPercent: gsap.utils.wrap(-100, 0), // Ensures seamless looping
          },
        }
      );
    }
  }, [Data]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-recent-books`);
      setData(response.data.data);
    };
    fetch();
  }, []);

  // Duplicate the data for seamless looping
  const duplicatedData = [...Data, ...Data];

  return (
    <div className="mt-64 lg:mt-8 px-3 overflow-hidden">
      <h4 className="text-3xl text-yellow-100">Recently Added Notebooks</h4>
      {!Data.length && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}
      <div className="relative w-full overflow-hidden">
        <div
          ref={booksContainerRef}
          className="flex space-x-8 w-max whitespace-nowrap"
          
        >
          {duplicatedData.map((item, i) => (
            <div key={i}>
              <BooksCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyAdded;
