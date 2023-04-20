import { MdOutlineBalcony, MdOutlineKitchen } from "react-icons/md";
import { GiWaterTank, GiHomeGarage, GiGardeningShears } from "react-icons/gi";
import { BsFuelPump } from "react-icons/bs";
import { BiCar } from "react-icons/bi";


export default function AmenitiesInput({ selected, onChange }) {
  function handleCbClick(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  }
  return (
    <>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("wifi")}
          name="wifi"
          onChange={handleCbClick}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
          />
        </svg>
        <span>Wifi</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("kitchen")}
          name="kitchen"
          onChange={handleCbClick}
        />
       <MdOutlineKitchen className="w-6 h-6" />
        <span>Kictchen</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("parking")}
          name="parking"
          onChange={handleCbClick}
        />
       <BiCar className="w-6 h-6" />
        <span>Free parking</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("furnished")}
          name="furnished"
          onChange={handleCbClick}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
        <span>Furnished</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("balcony")}
          name="balcony"
          onChange={handleCbClick}
        />
       <MdOutlineBalcony className="w-6 h-6" />
        <span>Balcony</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("waterTank")}
          name="waterTank"
          onChange={handleCbClick}
        />
        <GiWaterTank className="w-6 h-6" />
        <span>Water tank</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("garage")}
          name="garage"
          onChange={handleCbClick}
        />
        <GiHomeGarage className="w-6 h-6" />
        <span>Garage</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("garden")}
          name="garden"
          onChange={handleCbClick}
        />
        <GiGardeningShears className="w-6 h-6" />
        <span>Garden</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("waterPump")}
          name="waterPump"
          onChange={handleCbClick}
        />
        <BsFuelPump className="w-6 h-6" />
        <span>Water pump</span>
      </label>
    </>
  );
}
