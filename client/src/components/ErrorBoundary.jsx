import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center my-20 px-4">
          <h1 className="text-2xl font-semibold mb-3">Something went wrong</h1>
          <p className="text-gray-600 mb-6">
            Please refresh the page or return to the home page.
          </p>
          <button
            type="button"
            className="bg-lightBlue text-white px-4 py-2 rounded"
            onClick={() => window.location.assign("/")}
          >
            Go home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
