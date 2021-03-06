import React from "react";

import ReactHtmlParser from "react-html-parser";
const InfoMain = (props) => {
  const { projectDetail } = props;
  const renderAvatar = () => {
    return projectDetail.members?.map((item, index) => {
      return (
        <div key={index} className="avatar">
          <img src={item.avatar} alt={item.avatar?.toString()} />
        </div>
      );
    });
  };
  console.log("detail", projectDetail);
  return (
    <>
      <h3>{projectDetail.projectName?.toUpperCase()}</h3>
      {ReactHtmlParser(projectDetail.description)}
      <div
        className="info"
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <div className="search-block">
          <input className="search" />
          <svg
            className="svg-inline--fa fa-search fa-w-16"
            aria-hidden="true"
            focusable="false"
            data-prefix="fa"
            data-icon="search"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            data-fa-i2svg
          >
            <path
              fill="currentColor"
              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
            />
          </svg>
          {/* <i class="fa fa-search"></i> */}
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
          {renderAvatar()}
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Only My Issues
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Recently Updated
        </div>
      </div>
    </>
  );
};

export default InfoMain;
