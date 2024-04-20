import { Link } from "react-router-dom";
import aboutImage from "../assets/hero6.jpg";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img src={aboutImage} alt="About Us" className="rounded-lg shadow-md w-full" />
        </div>
        <div className="md:w-1/2 md:pl-8"> {/* Added left padding */}
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <p className="text-lg mb-6">
            At GroceryToGo, we are dedicated to revolutionizing the way you shop for groceries. With our user-friendly platform, you can browse through a diverse selection of fresh produce, pantry staples, and specialty items—all from the comfort of your own home.
          </p>
          <p className="text-lg mb-6">
            Our mission is to provide you with a seamless online shopping experience, exceptional customer service, and high-quality products delivered straight to your doorstep. We strive to make grocery shopping convenient, enjoyable, and hassle-free for everyone.
          </p>
          <div className="flex items-center mb-4">
            <span className="text-green-500 mr-3">&#10003;</span> {/* Checkmark icon using Unicode character */}
            <p className="text-lg">Wide selection of products</p>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-green-500 mr-3">&#10003;</span> {/* Checkmark icon using Unicode character */}
            <p className="text-lg">Fast and reliable delivery</p>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-green-500 mr-3">&#10003;</span> {/* Checkmark icon using Unicode character */}
            <p className="text-lg">Exceptional customer service</p>
          </div>
        </div>
      </div>
      <div className="py-4">
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
