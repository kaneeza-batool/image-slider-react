import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

const ImageSlider = (props) => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);

      const response = await fetch(
        `${getUrl}?page=${props.page}&limit=${props.limit}`
      );

      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (e) {
      setErrorMessage(e.message);
      setLoading(false);
    }
  }

  function handlePrevious() {
    setCurrentSlide(
      currentSlide === 0 ? images.length - 1 : currentSlide - 1
    );
  }

  function handleNext() {
    setCurrentSlide(
      currentSlide === images.length - 1 ? 0 : currentSlide + 1
    );
  }

  useEffect(() => {
    if (props.url !== "") {
      fetchImages(props.url);
    }
  }, [props.url, props.page, props.limit]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-125 text-xl font-semibold text-gray-600">
        Loading data! Please wait...
      </div>
    );
  }

  if (errorMsg !== null) {
    return (
      <div className="flex justify-center items-center h-125 text-xl font-semibold text-red-500">
        Error Occurred! {errorMsg}
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-10 overflow-hidden rounded-3xl shadow-2xl bg-black">
      <BsArrowLeftCircleFill
        onClick={handlePrevious}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-white text-5xl z-10 cursor-pointer hover:scale-110 transition-all duration-300 drop-shadow-lg"
      />

      <div className="relative w-full h-125">
        {images && images.length
          ? images.map((imageItem, index) => (
              <img
                key={imageItem.id}
                alt={imageItem.author}
                src={imageItem.download_url}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                  currentSlide === index ? "block" : "hidden"
                }`}
              />
            ))
          : null}
      </div>

      <BsArrowRightCircleFill
        onClick={handleNext}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-white text-5xl z-10 cursor-pointer hover:scale-110 transition-all duration-300 drop-shadow-lg"
      />

      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
        {images && images.length
          ? images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-white"
                    : "w-3 bg-white/50 hover:bg-white"
                }`}
              />
            ))
          : null}
      </span>
    </div>
  );
};

export default ImageSlider;