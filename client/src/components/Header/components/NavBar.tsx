import Logo from "helpers/Logo";
import React from "react";
import { Link, redirect } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  notifications: number;
}

const NavBar = ({ children }: Props) => {
  return (
    <nav className="flex-shrink-0 flex-grow-0 bg-blue-700 px-2.5 py-2.5 text-white sm:px-4">
      <div className="flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" onClick={() => redirect("/")}>
          <div className="whitespace-nowrap flex items-center text-xl font-semibold cursor-pointer">
            <Logo className="w-8 h-8" />
          </div>
        </Link>

        <ul className="xs:space-x-6 flex items-center space-x-4 bg-blue-700 rounded-lg">
          {children}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
