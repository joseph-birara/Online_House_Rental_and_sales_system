import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="text-lg font-bold text-blueBlack mb-4">About Us</h5>
            <p className="text-gray-400">
              Welcome to All in one online house rental and sales syetem, your
              premier destination for home rental and selling services. We
              simplify the process of finding the perfect home or selling your
              property. With a wide selection of listings, personalized
              solutions, and exceptional customer service, we're here to guide
              you every step of the way. Trust us to make your real estate
              journey seamless and rewarding. Contact us today and unlock the
              door to your future
            </p>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="text-lg font-bold text-blueBlack mb-4">
              Contact Us
            </h5>
            <p className="text-gray-400">Email: info@example.com</p>
            <p className="text-gray-400">Phone: +1 123 456 7890</p>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="text-lg font-bold text-blueBlack mb-4">Follow Us</h5>
            <div className="flex justify-center md:justify-start">
              <a
                href="#"
                className="text-gray-300 hover:text-black transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6 text-blue-400 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 2H7.5C4.468 2 2 4.468 2 7.5v8c0 3.032 2.468 5.5 5.5 5.5h9c3.032 0 5.5-2.468 5.5-5.5v-8C22 4.468 19.532 2 16.5 2zM19 9h-2v2h2v6H5v-6h2v-2H5.5C4.673 9 4 9.673 4 10.5v6c0 .827.673 1.5 1.5 1.5h13c.827 0 1.5-.673 1.5-1.5v-6C20 9.673 19.327 9 18.5 9h-.5zm-4-7c2.486 0 4.5 2.014 4.5 4.5S17.486 11 15 11s-4.5-2.014-4.5-4.5S12.514 2 15 2zm0 2c-1.378 0-2.5 1.122-2.5 2.5S13.622 9 15 9s2.5-1.122 2.5-2.5S16.378 4 15 4z"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="ml-3 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6 text-blue-400 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1.75-5.875c-.834 0-1.5.669-1.5 1.5v1.75H7.75V9.375h1.343v.782c.188-.431.605-.875 1.343-.875h1.281v1.625H9.375v.812h1.313v1.219c0 .834-.669 1.5-1.5 1.5zM12 7c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6.25c-.689 0-1.25-.561-1.25-1.25s.561-1.25 1.25-1.25 1.25.561 1.25 1.25-.561 1.25-1.25 1.25z"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="ml-3 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6 text-blue-400 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm3.17-11.462c.303-.118.518-.4.585-.721.076-.369-.068-.76-.37-.987-.322-.254-.737-.295-1.107-.101-.334.175-.667.37-1.004.543-.536.275-1.161.117-1.578-.359-.214-.236-.465-.557-.76-.549-.143.003-.334.198-.437.338-.23.33-.416.696-.602 1.05-.132.255-.26.516-.323.795-.097.421.133.849.509.974 1.069.369 2.147.764 3.195 1.214.3.127.619.174.932.116.595-.114 1.146-.379 1.604-.825.317-.31.464-.73.392-1.163-.062-.387-.384-.69-.773-.732-.365-.036-.737.152-1.03.423-.136.117-.28.252-.418.38-.149-.287-.316-.558-.526-.798z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-sm">&copy; 2023 Hommie. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
