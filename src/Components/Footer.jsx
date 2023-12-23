import { FaTwitter, FaYoutube } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div className="p-10 bg-neutral bg-gray-900 text-white text-neutral-content">
        <div className="flex justify-center items-center">
          <div className="flex items-center mx-auto">
            
            <p className="font-font1 text-xl font-semibold">
             Task Management
            </p>
          </div>
        </div>
        <p className="text-center">Connect Us with this social links</p>
        <div className="flex justify-center items-center gap-4">
          <FaSquareFacebook />
          <FaTwitter />
          <FaYoutube />
        </div>
        <div className="text-center">
          <p>Copyright © 2023 - All right reserved </p>
        </div>
      </div>
      <div className="p-4 footer-center bg-base-300 text-base-content"></div>
    </footer>
  );
};

export default Footer;
