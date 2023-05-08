import { useState } from "react";

export default function HouesPhotosManager({ houseImages, setHouseImages }) {
  const [imageFiles, setImageFile] = useState([]);

  const houseImageHandler = (ev) => {
    const files = ev.target.files;

    let imgobj = [];
    for (let i = 0; i < files.length; i++) {
      imgobj.push(URL.createObjectURL(files[i]));
    }
    setImageFile([...imageFiles, ...imgobj]);
  };

  const removeImage = (img) => {
    const newimgObj = imageFiles.filter((images) => images !== img);
    setImageFile(newimgObj);
  };

  return (
    <>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <label className="outline h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={houseImageHandler}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </label>

        {imageFiles.length > 0 &&
          imageFiles.map((img) => {
            return (
              <div className="h-32 flex relative">
                <img
                  className="rounded-2xl w-full object-cover"
                  src={img}
                  alt=""
                />
                <button
                  className="absolute top-0 right-0 bg-lightBlue  text-white rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    removeImage(img);
                  }}
                >
                  Cancel
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}
