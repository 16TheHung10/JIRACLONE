import React, { Fragment } from "react";
import { Route } from "react-router";
import Header from "../../Components/Header";

const UserLoginTemplate = (props) => {
  //props này là mấy cái path,exact...
  const { Component, ...restRoute } = props;
  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Header />
            <Component {...propsRoute} />
          </Fragment>
        );
      }}
    />
  );
};

export default UserLoginTemplate;
