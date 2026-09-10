import React from "react";
import { BsTwitter, BsFacebook, BsLinkedin, BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="mt-16 bg-blueBlack text-white">
      <div className="mx-auto w-full max-w-[1120px] px-6 pt-14">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-md">
            <h5 className="mb-4 text-xl font-semibold text-white">About us</h5>
            <p className="leading-7 text-slate-300">
              Welcome to Homiee, a premier online house rental and sales system.
              We simplify finding your dream home or selling your property, with
              personalized solutions and a calmer experience every step of the way.
            </p>
          </div>
          <div>
            <h5 className="mb-4 text-lg font-semibold text-white">
              Contact us
            </h5>
            <a
              href="mailto:house.rental.et@gmail.com?subject=User%20FeedBack&body=Hi%20there,%0D%0A%0D%0AHow%20can%20we%20help%20you?."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-lightBlue px-4 py-2 text-sm font-medium text-white hover:bg-lbHover"
            >
              Email admins
            </a>
            <p className="mt-4 text-slate-300">Phone: +1 123 456 7890</p>
          </div>
          <div>
            <h5 className="mb-4 text-lg font-semibold text-white">
              Follow us
            </h5>
            <div className="flex">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-slate-300 hover:text-white transition-colors duration-200"
              >
                <BsLinkedin />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="ml-3 text-slate-300 hover:text-white transition-colors duration-200"
              >
                <BsFacebook />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="ml-3 text-slate-300 hover:text-white transition-colors duration-200"
              >
                <BsYoutube />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="ml-3 text-slate-300 hover:text-white transition-colors duration-200"
              >
                <BsTwitter />
              </a>
            </div>
          </div>
          <div>
            <h5 className="mb-4 text-lg font-semibold text-white">
              Quick links
            </h5>
            <ul>
              <li className="mb-2">
                <a
                  href="/team"
                  className="text-slate-300 hover:text-white hover:underline transition-colors duration-200"
                >
                  Team
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/service"
                  className="text-slate-300 hover:text-white hover:underline transition-colors duration-200"
                >
                  Services
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/termsofservice"
                  className="text-slate-300 hover:text-white hover:underline transition-colors duration-200"
                >
                  Terms of Services
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-white/10 py-5 text-center">
        <p className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Homiee. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
