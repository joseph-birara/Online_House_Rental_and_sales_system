import React from "react";
import { BsTwitter, BsFacebook, BsLinkedin, BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="py-15 mt-52 bg-[#1579e1] text-white w-screen ">
      <div className="container text-justify mt-10">
        <div className="flex justify-around flex-wrap px-4">
          <div className="w-5/12 flex flex-col">
            <div className="  border-[black] rounded-lg  p-6   flex flex-col">
              <h5 className="font-bold text-xl text-[black]  mb-4">About Us</h5>
              <p className="text-gray-300">
                Welcome to our premier online house rental and sales system. We
                simplify finding your dream home or selling your property. With
                personalized solutions and exceptional service, we'll guide you
                every step of the way. Trust us to make your real estate journey
                seamless and rewarding. Contact us today and unlock your future
              </p>
            </div>
          </div>
          <div className=" rounded-lg pt-6 flex flex-col">
            <div className="rounded-lg p-1 flex-grow">
              <h5 className="text-lg font-bold text-blueBlack mb-4">
                Contact Us
              </h5>
              <a
                href="mailto:house.rental.et@gmail.com?subject=User%20Report&body=Hi%20there,%0D%0A%0D%0AHow%20can%20we%20help%20you?."
                target="_blank"
                className="bg-blueBlack p-2 rounded-md hover:bg-main-dark-bg"
              >
                Contact admins
              </a>

              <p className="text-gray-300 mt-4">Phone: +1 123 456 7890</p>
            </div>
          </div>
          <div className=" rounded-lg pt-6 flex flex-col">
            <div className="rounded-lg">
              <h5 className="text-lg font-bold text-blueBlack mb-4">
                Follow Us
              </h5>
              <div className="flex justify-center md:justify-start">
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {/* Insert the SVG path for the Facebook icon */}
                  <BsLinkedin />
                </a>
                <a
                  href="#"
                  className="ml-3 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {/* Insert the SVG path for the Twitter icon */}
                  <BsFacebook />
                </a>
                <a
                  href="#"
                  className="ml-3 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {/* Insert the SVG path for the Instagram icon */}
                  <BsYoutube />
                </a>
                <a
                  href="#"
                  className="ml-3 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {/* Insert the SVG path for the Instagram icon */}
                  <BsTwitter />
                </a>
              </div>
            </div>
          </div>
          <div className="rounded-lg  w-2.5/12 pt-6 flex flex-col">
            <div className="rounded-lg">
              <h5 className="text-lg font-bold text-blue-400 mb-4 text-blueBlack">
                Quick Links
              </h5>
              <ul className="">
                <li className="mb-2">
                  <a
                    href="/team"
                    className="hover:underline transition-colors duration-200"
                  >
                    Team
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="/service"
                    className="hover:underline transition-colors duration-200"
                  >
                    Services
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="/termsofservice"
                    className="hover:underline transition-colors duration-200"
                  >
                    Terms of Services
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-10">
        <p className="text-sm text-[black] ">
          &copy; {new Date().getFullYear()} Hommie. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
