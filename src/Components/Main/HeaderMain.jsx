import React from "react";

const HeaderMain = (props) => {
  return (
    <div className="header">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
          <li className="breadcrumb-item">Project</li>
        </ol>
      </nav>
    </div>
  );
};

export default HeaderMain;
