"use client";

import React, { useState } from "react";
import "./NavDashboard.scss";
import { IoIosMenu, IoIosSearch } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { IoIosNotificationsOutline } from "react-icons/io";
import Image from "next/image";
import Modal from "@/components/modal/Modal";
import NavMenuDashboard from "../NavMenuDashboard/NavMenuDashboard";

function NavDashBoard() {
  const [showNavigation, setShowNavigation] = useState(false);

  function handleOnClick() {
    setShowNavigation((prev) => !prev);
  }

  return (
    <>
      <nav className="nav-dashboard-container">
        <section className="nav-dashboard-container__admin">
          <section>
            <Image
              height={44}
              width={44}
              src="/IFK_Uppsala_logo.svg.png"
              alt="user profile image"
            />
          </section>

          <section className="notification">
            <span>1</span>
            <IoIosNotificationsOutline />
          </section>

          <section>
            <CiSearch />
          </section>
        </section>

        <section className="nav-dashboard-container__icons">
          <section
            className="nav-dashboard-container__hamburger"
            onClick={handleOnClick}
          >
            {!showNavigation ? (
              <IoIosMenu
                size={30}
                className="nav-dashboard-container__hamburger-icon"
              />
            ) : (
              <RxCross2
                size={30}
                className="nav-dashboard-container__hamburger-icon"
              />
            )}
          </section>
        </section>
      </nav>

      {showNavigation && (
        <Modal isActive={showNavigation}>
          <NavMenuDashboard closeModal={handleOnClick} />
        </Modal>
      )}
    </>
  );
}

export default NavDashBoard;
