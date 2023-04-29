import React from "react";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="  rounded-lg shadow dark:bg-gray-900 m-4 -bottom-7 bg-green-500 scale-90 ">
      <div className="w-full max-w-screen-xl mx-auto p-2 md:py-4">
        <span className="block text-sm text-white sm:text-center dark:text-gray-400">
          © {date}{" "}
          <a href="#" className="hover:underline">
            SHALET'S BOUTIQUE™
          </a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
