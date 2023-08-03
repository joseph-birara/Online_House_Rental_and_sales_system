import { useState } from "react";

export default function HouesPhotosManager({ houseImageFiles, setHouseImageFiles, houseId, imageLinks }) {

  const [localImageReference, setLocalImageReferece] = useState([]);
  const [uniqeNum, setuniqueNum] = useState(0); // it is used as an id when image is added, so easy to remove image

  const houseImageHandler = (ev) => {
    const files = ev.target.files;

    let imgobj = []; // storing image link for local rendering
    let imgFiles = []; // storing image binary file for uploadig

    for (let i = 0; i < files.length; i++) {
      imgFiles.push({ id: i + uniqeNum, value: files[i] })
      imgobj.push({ id: i + uniqeNum, value: URL.createObjectURL(files[i]) });
    }
    setuniqueNum(prev => prev + 100) // addding 100 make sure it is unique
    setLocalImageReferece([...localImageReference, ...imgobj]);
    setHouseImageFiles(pre => [...pre, ...imgFiles])

  };

  const removeImage = (id) => {
    const newimgObj = localImageReference.filter((img) => img.id !== id);
    setLocalImageReferece(newimgObj);
    const newImgFiles = houseImageFiles.filter((img) => img.id !== id)
    setHouseImageFiles(newImgFiles)
  };

  return (
    <>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {!houseId && <label className="outline h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
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
        </label>}

        {localImageReference.length > 0 &&
          localImageReference.map((img) => {
            return (
              <div key={img.id} className="h-32 flex relative">
                <img
                  className="rounded-2xl w-full object-cover"
                  src={img.value}
                  alt=""
                />
                {houseId && <button
                  className="absolute top-0 right-0 bg-lightBlue  text-white rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    removeImage(img.id);
                  }}
                >
                  Cancel
                </button>}
              </div>
            );
          })}

        {/* to show images onlu */}
        {imageLinks.length > 0 &&
          imageLinks.map((img) => {
            return (
              <div key={img} className="h-32 flex relative">
                <img
                  className="rounded-2xl w-full object-cover"
                  src={img}
                  alt=""
                />
              </div>
            );
          })}




      </div>
    </>
  );
}
