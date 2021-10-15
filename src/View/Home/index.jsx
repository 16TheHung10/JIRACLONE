import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentMain from "../../Components/Main/ContentMain";
import HeaderMain from "../../Components/Main/HeaderMain";
import InfoMain from "../../Components/Main/InfoMain";

const Home = (props) => {
  const dispatch = useDispatch();
  const { projectDetail } = useSelector((state) => {
    return state.ProjectReducer;
  });
  const id = props.match.params.projectId;
  useEffect(() => {
    dispatch({ type: "GET_PROJECT_DETAIL_API", payload: id });
  }, []);
  return (
    <Fragment>
      <div className=" container-fluid px-15">
        <HeaderMain />
        <InfoMain projectDetail={projectDetail} />
        <ContentMain projectDetail={projectDetail} />
      </div>
    </Fragment>
  );
};

export default Home;
