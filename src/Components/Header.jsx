import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { USER_INFO } from "../util/constants/settingSystem";

const Header = () => {
  const userInfo = useSelector((state) => state.UserLoginReducer.user);
  return (
    <Fragment>
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
        <a className="navbar-brand">Navbar</a>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {localStorage.getItem(USER_INFO) ? (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  {userInfo.hoTen}
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
