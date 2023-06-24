import React from "react";
import { BsLinkedin, BsFacebook, BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className=" py-2 mt-36">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-4/6 ">
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
          <div>
            <h5 className="text-lg font-bold text-blueBlack mb-4">
              Contact Us
            </h5>
            <a
              href="mailto:house.rental.et@gmail.com?subject=User%20Report&body=How%20can%20we%20help%20you?"
              target="_blank"
              className="bg-lightBlue p-2 rounded"
            >
              Email us
            </a>

            <p className="text-gray-400 mt-2">Phone: +1 123 456 7890</p>
          </div>
          <div>
            <h5 className="text-lg font-bold text-blueBlack mb-4">Follow Us</h5>
            <div className="flex justify-center md:justify-start">
              <a
                href="#"
                className="text-gray-300 hover:text-black transition-colors duration-200"
              >
                <BsLinkedin />
              </a>
              <a
                href="#"
                className="ml-3 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <BsFacebook />
              </a>
              <a
                href="#"
                className="ml-3 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <BsYoutube />
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
