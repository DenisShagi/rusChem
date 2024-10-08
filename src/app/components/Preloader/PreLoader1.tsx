'use client';

import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

interface Post {
  title: string;
}

function PreLoader1() {
  const [data, setData] = useState<Post[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Здесь заменить "" на реальный URL API
      fetch("") 
        .then((response) => response.json())
        .then((json: Post[]) => {
          console.log(json);
          setData(json);
          setDone(true);
        });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      {!done ? (
        <ReactLoading
          type={"bars"}
          color={"#03fc4e"}
          height={100}
          width={100}
        />
      ) : (
        <div className="text-white">
          {data.map((post, index) => (
            <div key={index} className="mt-2">{post.title}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PreLoader1;
