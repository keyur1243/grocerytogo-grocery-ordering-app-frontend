import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="md:flex md:items-center">
          <Link to="/">
            <img src={Logo} width={110} alt="GroceriesToGo Logo" className="w-28 mb-4 md:mb-8 md:mr-8" />
          </Link>
          <p className="text-white md:w-1/2">
            Welcome to GroceryToGo! Discover fresh produce, pantry staples, and more all delivered to your door. Shop now for convenient, hassle-free grocery shopping!
          </p>
        </div>
        <div className="w-full md:w-auto mt-4 md:mt-0">
          <ul className="grid grid-cols-1 md:flex md:flex-col md:gap-y-2 md:pl-4 md:pr-4">
            <li><Link to="/" className="text-white">Home</Link></li>
            <li><Link to="/about" className="text-white">About</Link></li>
            <li><Link to="/contact-us" className="text-white whitespace-nowrap">Contact Us</Link></li>
            <li><Link to="/shop" className="text-white"></Link></li>
          </ul>
        </div>
      </div>
      <div className="bg-black">
        <div className="container mx-auto py-4">
          <p className="text-white text-center">&copy; 2024 GroceriesToGo</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
