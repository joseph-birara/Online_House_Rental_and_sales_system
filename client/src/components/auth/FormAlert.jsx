export default function FormAlert({ message }) {
  return (
    <div
      className={`mb-4 rounded-xl border px-3 py-2 text-sm ${
        message
          ? "border-red-500/30 bg-red-50 text-red-600"
          : "invisible border-transparent"
      }`}
    >
      {message || "=="}
    </div>
  );
}
