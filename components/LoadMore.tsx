
"use client"

import fetchAnime from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { AnimeProp } from "./AnimeCard";


let page = 2 ;

function LoadMore() {
  const { ref, inView } = useInView();  // We use the useInView hook to detect when the spinner is in the viewport.
  const [data , setData] = useState<AnimeProp[]>([]) ; // We use the useState hook to store the data we get from the API.

  useEffect(() => {
    if (inView) {
      fetchAnime(page).then((res) => {
        setData([...data, ...res]); // We use the spread operator to add the new data to the existing data.
        page++;
      });
    }
  }, [inView, data]);

  return (
    <>
     <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
       {data}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
