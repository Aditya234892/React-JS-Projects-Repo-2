import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

const Images = () => {
  const [allImages, setAllImages] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const lastImageElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const getImages = useCallback(async () => {
    const apiKey = "R7WSmf3RTWfeGpJ0PQV-C6WBBWB0Am8LL80cTXWa9qM";
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=cars&client_id=${apiKey}&per_page=10`;

    setLoading(true);
    try {
      const res = await axios.get(url);
      setAllImages((prevImages) => [...prevImages, ...res.data.results]);
      setHasMore(res.data.results.length > 0);
    } catch (err) {
      setError("Failed to fetch images");
      console.error("Error: ", err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    getImages();
  }, [getImages]);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {error && <p className="text-red-500 col-span-full">{error}</p>}
        {allImages.map((imgObj, index) => (
          <div
            key={`${imgObj.id}_${index}`}
            ref={index === allImages.length - 1 ? lastImageElementRef : null}
            className="flex flex-col items-center"
          >
            <img
              src={imgObj.urls.regular}
              alt={imgObj.alt_description || "Image from Unsplash"}
              className="w-full h-64 object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
      {loading && <p className="text-center mt-4 font-semibold text-2xl text-blue-900">Loading more images...</p>}
      {!hasMore && <p className="text-center mt-4">No more images to load.</p>}
    </div>
  );
};

export default Images;