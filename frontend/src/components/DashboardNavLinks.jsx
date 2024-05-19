import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./DashboardNavigation.module.css";

const DashboardNavLinks = ({ title, image, activeImage, link }) => {
  const [imgColor, setImgColor] = useState();

  return (
    <NavLink
      className={({ isActive }) => {
        if (isActive) {
          setImgColor("black");
          return classes.active;
        } else {
          setImgColor("white");
          return classes.navLink;
        }
      }}
      end
      to={link}
    >
      {imgColor === "white" ? (
        <img className="w-4 pb-[0.05rem]" src={image}></img>
      ) : (
        <img className="w-4 pb-[0.05rem]" src={activeImage}></img>
      )}
      {title}
    </NavLink>
  );
};

export default DashboardNavLinks;
