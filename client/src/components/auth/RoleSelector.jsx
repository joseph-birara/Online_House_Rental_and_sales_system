const roles = [
  { value: "owner", label: "Homeowner" },
  { value: "tenant", label: "Tenant" },
  { value: "buyer", label: "Buyer" },
];

export default function RoleSelector({ value, onChange }) {
  return (
    <div className="my-5">
      <p className="mb-2 text-sm font-medium text-blueBlack">I am a</p>
      <fieldset className="grid grid-cols-3 gap-2">
        {roles.map((role, index) => (
          <label
            key={role.value}
            className={`cursor-pointer rounded-xl border px-2 py-3 text-center text-sm font-medium transition ${
              value === role.value
                ? "border-lightBlue bg-[#e8f3ff] text-lightBlue"
                : "border-slate-200 text-slate-600 hover:border-lightBlue hover:text-lightBlue"
            }`}
          >
            <input
              type="radio"
              name="userType"
              value={role.value}
              checked={value === role.value}
              onChange={onChange}
              required={index === 0}
              className="sr-only"
            />
            {role.label}
          </label>
        ))}
      </fieldset>
    </div>
  );
}
