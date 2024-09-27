"use client";
import React, { useState } from "react";
import WalletConnect from "./walletadpater/wallet-connect";

import {

  Menu,

  X,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";






const Navbar = () => {



  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Home", href: "/", current: true },

    { name: "Product", href: "/", current: false },
    { name: "Feature", href: "/#", current: false },
    { name: "About", href: "/#", current: false },
    { name: "Contact", href: "/#", current: false },
  ];
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <div className="w-full flex items-center justify-between mx-10 lg:mx-36 mt-3 mb-2">
      <div>
        <p className="font-semibold text-2xl">StartUp</p>
      </div>
      <div className="hidden lg:block">
        <ul className="flex flex-row items-center justify-between gap-x-5 font-medium text-lg">
          <li>Product</li>
          <li>Fetaures</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>

      <div className="relative lg:hidden ">
         
      <Button
              variant="outline"
              onClick={handleToggleMenu}
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute  -left-44 w-[15rem] lg:hidden z-50`} // Adjust position and z-index here
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4  mt-4 border border-gray-100 rounded-lg bg-gray-50  rtl:space-x-reverse   dark:bg-neutral-900  dark:border-gray-700">
            <li className="my-2">
            <WalletConnect/>

            </li>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} onClick={handleCloseMenu}>
                  {/* Wrapping the `p` tag in a `div` for better semantics or accessibility if necessary */}
                  <div
                    className={` py-2 px-3 rounded  ${
                      item.current
                        ? "dark:hover:bg-muted-foreground/70 text-white md:bg-transparent md:text-blue-700 dark:text-white border "
                        : "text-gray-900 hover:bg-gray-100  dark:text-white  dark:hover:bg-muted-foreground/40 dark:hover:text-white "
                    }`}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hidden lg:block">
        <WalletConnect />
      </div>
    </div>
  );
};

export default Navbar;
