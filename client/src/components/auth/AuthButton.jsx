import LoadingOverlay from "react-loading-overlay-ts";

export default function AuthButton({ loading, loadingText, children, className = "" }) {
  return (
    <button
      type="submit"
      className={`primary relative mt-4 bg-lightBlue font-medium tracking-wide hover:bg-lbHover ${className}`}
    >
      <LoadingOverlay
        active={loading}
        spinner
        className="loading-overlay"
        spinnerClassName="w-12 h-12"
        contentClassName="opacity-50 pointer-events-none"
        spinnerProps={{
          style: {
            borderTopColor: "lightblue",
            borderLeftColor: "lightblue",
          },
        }}
      />
      {loading ? loadingText : children}
    </button>
  );
}
