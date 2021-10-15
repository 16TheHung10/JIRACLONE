import React, { Fragment, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

import MenuJira from "../../Components/Menu";
import ModalJira from "../../Components/Modal/ModalJira";
import Sidebar from "../../Components/Sidebar";
import { ToastContainer } from "react-toastify";
import "../../index.css";
import { TOKEN } from "../../util/constants/settingSystem";
import { useSelector } from "react-redux";
const HomeTemplate = (props) => {
  const { taskDetail, taskComment } = useSelector((state) => state.TaskReducer);
  const { Component, toast, ...restProps } = props;
  return localStorage.getItem(TOKEN) ? (
    <Route
      {...restProps}
      render={(routeProps) => {
        return (
          <Fragment>
            <div className="jira">
              <ToastContainer />
              <Sidebar />
              <MenuJira />
              <Component {...routeProps} toast={toast} />
              <ModalJira taskDetail={taskDetail} taskComment={taskComment} />
            </div>
          </Fragment>
        );
      }}
    />
  ) : (
    <Redirect to="/login" />
  );
};

export default HomeTemplate;
