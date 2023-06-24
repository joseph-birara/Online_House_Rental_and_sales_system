import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 mt-16 w-screen bg-half-transparent text-white">
      <div className="container w-11/12 mx-auto shadow-lightBlue shadow-xl">
        <div className="flex  justify-center flex-wrap">
          <div className="lg:w-1/4 flex flex-col">
            <div className="rounded-lg p-6 flex flex-col">
              <h5 className="text-lg font-bold text-blueBlack mb-4">
                About Us
              </h5>
              <p className="text-gray-300">
                Welcome to our premier online house rental and sales system. We
                simplify finding your dream home or selling your property. With
                personalized solutions and exceptional service, we'll guide you
                every step of the way. Trust us to make your real estate journey
                seamless and rewarding. Contact us today and unlock your future
              </p>
            </div>
          </div>
          <div className="lg:w-1/4 flex flex-col">
            <div className="rounded-lg p-6 flex-grow">
              <h5 className="text-lg font-bold text-blueBlack mb-4">
                Contact Us
              </h5>
              <p className="text-gray-300">Email: house.rental.et@gmail.com</p>
              <p className="text-gray-300">Phone: +1 123 456 7890</p>
            </div>
          </div>
          <div className="lg:w-1/4 flex flex-col">
            <div className="rounded-lg p-6 flex-grow">
              <h5 className="text-lg font-bold text-blueBlack mb-4">
                Follow Us
              </h5>
              <div className="flex justify-center md:justify-start">
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {/* Insert the SVG path for the Facebook icon */}
                </a>
                <a
                  href="#"
                  className="ml-3 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {/* Insert the SVG path for the Twitter icon */}
                </a>
                <a
                  href="#"
                  className="ml-3 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {/* Insert the SVG path for the Instagram icon */}
                </a>
              </div>
            </div>
          </div>
          <div className="lg:w-1/4 flex flex-col">
            <div className="rounded-lg p-6 flex-grow">
              <h5 className="text-lg font-bold text-blue-400 mb-4 text-blueBlack">
                Quick Links
              </h5>
              <ul className="">
                <li className="mb-2">
                  <a
                    href="/team"
                    className="hover:text-lightBlue transition-colors duration-200"
                  >
                    Team
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="/service"
                    className="hover:text-lightBlue transition-colors duration-200"
                  >
                    Services
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-sm text-gray-300">
          &copy; {new Date().getFullYear()} Hommie. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
