import { useState, useEffect } from "react";
import axios from "axios";

const Images = ({ searchQuery }) => {
  const [allImages, setAllImages] = useState([]); 
  const [page, setPage] = useState(1);
  // const [error, setError] = useState(null);

  const getImages = async (currentPage) => {
    const apiKey = "9Vvg-u0ZX3L3oblXrntcuwFQpg0Ks18qANEUHe9VKko";
    const url = `https://api.unsplash.com/search/photos?page=${currentPage}&query=${encodeURIComponent(
      searchQuery
    )}&client_id=${apiKey}&per_page=20`;

    try {
      const res = await axios.get(url);
      console.log("Response: ", res);
      setAllImages((prevImages) => [...prevImages, ...res.data.results]);
    } catch (err) {
      // setError("Failed to fetch images");
      console.log("Error: ", err);
    }
  };

  const getNewImages = async (currentPage) => {
    const apiKey = "9Vvg-u0ZX3L3oblXrntcuwFQpg0Ks18qANEUHe9VKko";
    const url = `https://api.unsplash.com/search/photos?page=${currentPage}&query=${encodeURIComponent(
      searchQuery
    )}&client_id=${apiKey}&per_page=20`;

    try {
      const res = await axios.get(url);
      console.log("Response: ", res);
      setAllImages((prevImages) => [...res.data.results]);
    } catch (err) {
      // setError("Failed to fetch images");
      console.log("Error: ", err);
    }
  };


  useEffect(() => {
    if (searchQuery) {
      console.log("Fetching images for query:", searchQuery);
      getNewImages();
    }
  }, [searchQuery]);

  useEffect( () => {
    getImages(page);
  }, [page  ])

  const handleLoadMoreBtn = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <div className="w-full grid grid-cols-5 auto-rows-max gap-4 img_container">
        {/* {error && <p className="text-red-500">{error}</p>} */}
        {allImages.map((imgObj) => (
          <div key={imgObj.id} className="flex flex-col items-center">
            <img
              src={imgObj.urls.regular}
              alt={imgObj.description || "Image from Unsplash"}
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
      {allImages.length > 0 && (
        <div className="w-full text-center border-2 mt-4">
          <button
            className="bg-blue-600 px-8 text-white rounded-lg text-lg active:bg-indigo-600 active:scale-90 duration-150"
            onClick={handleLoadMoreBtn}
          >
            Load More..
          </button>
        </div>
      )}
    </>
  );
};

export default Images;
