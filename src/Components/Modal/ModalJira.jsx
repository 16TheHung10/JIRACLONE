import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Select } from "antd";
import { useStyles } from "./style";

const ModalJira = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { taskDetail, taskComment } = props;

  const [visibleEditor, setVidibleEditor] = useState(false);
  const [descriptionEditor, setDescriptionEditor] = useState(
    taskDetail.description
  );
  const { Option } = Select;
  const { projectDetail } = useSelector((state) => {
    return state.ProjectReducer;
  });
  const { statusList } = useSelector((state) => state.ProjectReducer);
  const [comment, setComment] = useState("");
  const [indexComment, setIndexComment] = useState(1);
  const [editComment, setEditComment] = useState(false);
  const [editCommentContent, setEditCommentContent] = useState("");
  const { priority, taskType } = useSelector(
    (state) => state.ProjectCategoryReducer
  );
  const { user } = useSelector((state) => state.UserLoginReducer);

  useEffect(() => {
    dispatch({ type: "GET_STATUS_LIST_API" });
    dispatch({ type: "GET_COMMENT_TASK_API", payload: taskDetail.taskId });
    dispatch({ type: "GET_PRIORITY_API" });
    dispatch({ type: "GET_TASK_TYPE_API" });

    // dispatch({ type: "UPDATE_TASK_DETAIL_API", payload: taskDetail });
  }, [taskDetail]);
  useEffect(() => {
    console.log("olal");
    if (taskDetail.taskId) {
      dispatch({ type: "GET_TASK_DETAIL_API", payload: taskDetail.taskId });
    } else return;
  }, []);
  const handleAddComment = (e) => {
    const newComment = [...taskDetail.lstComment, comment];
    e.preventDefault();
    // dispatch({
    //   type: "ADD_TASK_COMMENT_API",
    //   payload: { taskId: taskDetail.taskId, contentComment: comment },
    // });
    dispatch({
      type: "COMBINE_CHANGE_TASK",
      actionType: "ADD_TASK_COMMENT_API_COMP",
      payload: { taskId: taskDetail.taskId, contentComment: comment },
    });
    setComment("");
  };
  const totalTimeTracking =
    Number(taskDetail.timeTrackingSpent) +
    Number(taskDetail.timeTrackingRemaining);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "COMBINE_CHANGE_TASK",
      actionType: "CHANGE_TASK",
      payload: { name: name, value: value },
      projectId: props.match.params.projectId,
    });
    //dispatch({ type: "CHANGE_TASK", payload: { name: name, value: value } });
  };

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  const renderDescription = () => {
    const jxDescription = ReactHtmlParser(taskDetail.description);
    return (
      <div>
        {visibleEditor ? (
          <>
            <Editor
              name="description"
              initialValue={taskDetail.description}
              // defaultValue={jxDescription}
              init={{
                selector: "textarea#myTextArea",
                height: 300,

                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
    alignleft aligncenter alignright alignjustify | \
    bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={(content) => {
                setDescriptionEditor(content);
              }}
            />
            <button
              type="button"
              onClick={() => {
                dispatch({
                  type: "COMBINE_CHANGE_TASK",
                  actionType: "CHANGE_TASK",
                  payload: { name: "description", value: descriptionEditor },
                });
                // dispatch({
                //   type: "CHANGE_TASK",
                //   payload: { name: "description", value: descriptionEditor },
                // });
                setVidibleEditor(false);
              }}
              className="btn btn-primary my-3 mr-4"
            >
              SAVE
            </button>
            <button
              type="button"
              onClick={() => {
                console.log("v", visibleEditor);
                setVidibleEditor(false);
              }}
              className="btn"
            >
              CANCEL
            </button>
          </>
        ) : (
          <div
            onClick={() => {
              setVidibleEditor(true);
            }}
          >
            {jxDescription}
          </div>
        )}
      </div>
    );
  };
  console.log("Comment", props.match.params);
  return (
    <div>
      <div>
        <div
          className="modal fade"
          id="searchModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="searchModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-search">
            <div className="modal-content">
              <div className="modal-header">
                <div className="search-block">
                  <input className="search" />
                  <i className="fa fa-search" />
                </div>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>RECENT ISSUES</p>
                <div style={{ display: "flex" }}>
                  <div className="icon">
                    <i className="fa fa-bookmark" />
                  </div>
                  <div>
                    <p>cyberlearn</p>
                    <p>BUG-238066</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Info Modal */}
        <div
          className="modal fade"
          id="infoModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="infoModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-info">
            <div className="modal-content">
              <div className="modal-header">
                <div className="task-title">
                  <i className="fa fa-bookmark" />
                  <span>
                    TASK-{" "}
                    <select
                      value={taskDetail.typeId}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      name="typeId"
                    >
                      {taskType.map((item, index) => {
                        return <option value={item.id}>{item.taskType}</option>;
                      })}
                    </select>
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  className="task-click"
                >
                  <div>
                    <i className="fab fa-telegram-plane" />
                    <span style={{ paddingRight: 20 }}>Give feedback</span>
                  </div>
                  <div>
                    <i className="fa fa-link" />
                    <span style={{ paddingRight: 20 }}>Copy link</span>
                  </div>
                  <button
                    type="button"
                    className="btn close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setTimeout(() => {
                        dispatch({
                          type: "DELETE_TASK_API",
                          payload: {
                            taskId: taskDetail.taskId,
                            projectId: props.match.params.projectId,
                          },
                        });
                      }, 100);
                    }}
                  >
                    <i
                      className="fa fa-trash-alt"
                      style={{ cursor: "pointer" }}
                    />
                  </button>

                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
              </div>
              <div className="modal-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-8">
                      <p className="issue">
                        {taskDetail.taskName?.toUpperCase()}
                      </p>
                      <div className="description">
                        <p>Description </p>
                        <div
                          style={{
                            fontWeight: "bold",
                            fontSize: "1.5em",
                            cursor: "text",
                            backgroundColor: "#dbe0e542",
                            padding: " 10px",
                            borderRadius: "6px",
                            boxShadow:
                              "rgb(131 150 170 / 29%) 0px 20px 30px -10px",
                          }}
                        >
                          {renderDescription()}
                        </div>
                      </div>

                      <div className="comment">
                        <h6>Comment</h6>
                        <div
                          className="block-comment"
                          style={{ display: "flex" }}
                        >
                          <div className="avatar">
                            <img
                              src={user.avatar}
                              alt={user.avatar?.toString()}
                            />
                          </div>

                          <div className="input-comment ">
                            <form action="" onSubmit={handleAddComment}>
                              <div className="form-group">
                                <input
                                  type="text"
                                  placeholder="Add a comment ..."
                                  onChange={(e) => {
                                    setComment(e.target.value);
                                  }}
                                  value={comment}
                                  className="form-control"
                                />
                                <button
                                  className="btn d-none"
                                  type="submit"
                                ></button>
                              </div>
                            </form>
                            <p>
                              <span style={{ fontWeight: 500, color: "gray" }}>
                                Protip:
                              </span>
                              <span>
                                press
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    background: "#ecedf0",
                                    color: "#b4bac6",
                                    margin: "0 5px",
                                    borderRadius: "5px",
                                    padding: "3px",
                                  }}
                                >
                                  ENTER
                                </span>
                                to comment
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="lastest-comment">
                          <div className="comment-item">
                            <>
                              {taskComment.map((item, index) => {
                                return (
                                  <>
                                    <div
                                      key={index}
                                      className={`display-comment ${
                                        item.id === indexComment
                                          ? classes.commentItem
                                          : ""
                                      } `}
                                      // ${classes.commentItem}
                                      style={{
                                        display: "flex",
                                        marginBottom: "10px",
                                        position: "relative",
                                      }}
                                      // style={`height:"500px"`}
                                    >
                                      <div className="avatar">
                                        <img
                                          src={item.user.avatar}
                                          alt={item.user.avatar?.toString()}
                                        />
                                      </div>
                                      <div>
                                        <div
                                          className={
                                            indexComment === item.id
                                              ? "d-block"
                                              : "d-none"
                                          }
                                          style={{
                                            position: "absolute",
                                            top: "0",
                                            left: "9%",
                                            width: "82%",
                                          }}
                                        >
                                          <input
                                            type="text"
                                            className="form-control olaaaaaaa "
                                            value={editCommentContent}
                                            onChange={(e) => {
                                              setEditCommentContent(
                                                e.target.value
                                              );
                                            }}
                                            className="form-control"
                                          />
                                          <button
                                            type="button"
                                            onClick={() => {
                                              dispatch({
                                                type: "UPDATE_COMMENT_API",
                                                payload: {
                                                  contentComment:
                                                    ReactHtmlParser(
                                                      editCommentContent
                                                    ),
                                                  id: item.id,
                                                },
                                              });
                                              setIndexComment(0);
                                            }}
                                            style={{ fontSize: "10px" }}
                                            className="btn p-0"
                                          >
                                            UPDATE
                                          </button>
                                          <button
                                            onClick={() => {
                                              setIndexComment(0);
                                            }}
                                            type="button"
                                            className="btn px-2"
                                            style={{ fontSize: "10px" }}
                                          >
                                            CANCEL
                                          </button>
                                        </div>
                                        <p style={{ marginBottom: 5 }}>
                                          {item.user.name?.toUpperCase()}
                                          {" : "}
                                          <span>a month ago</span>
                                        </p>
                                        <div
                                          className={
                                            indexComment === item.id
                                              ? "d-none"
                                              : "d-inline-block"
                                          }
                                        >
                                          <div
                                            className=""
                                            style={{ width: "100%" }}
                                          >
                                            <p
                                              style={{
                                                marginBottom: 5,
                                                backgroundColor: "#1890ff",
                                                color: "white",
                                                borderRadius: "19px",
                                                padding: "8px 10px",
                                              }}
                                            >
                                              {item.contentComment}
                                            </p>
                                          </div>
                                          {/* editne */}
                                          <div>
                                            <span
                                              onClick={() => {
                                                setIndexComment(item.id);
                                                setEditComment(!editComment);
                                                setEditCommentContent(
                                                  item.contentComment
                                                );
                                              }}
                                              style={{
                                                color: "#929398",
                                                cursor: "pointer",
                                                marginRight: "10px",
                                              }}
                                            >
                                              Edit
                                            </span>

                                            <span style={{ color: "#929398" }}>
                                              Delete
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                            </>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="status">
                        <h6>STATUS</h6>
                        <select
                          className="custom-select"
                          name="statusId"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          value={taskDetail.statusId}
                        >
                          {statusList.map((item, index) => {
                            return (
                              <option key={index} value={item.statusId}>
                                {item.statusName}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="assignees">
                        <h6>ASSIGNEES</h6>
                        {taskDetail.assigness?.length ===
                        projectDetail.members?.length ? (
                          ""
                        ) : (
                          <Select
                            options={projectDetail.members
                              ?.filter((member) => {
                                const isUserAssigneed =
                                  taskDetail.assigness?.find(
                                    (item) => item.id === member.userId
                                  );
                                if (isUserAssigneed) return false;
                                else return true;
                              })
                              .map((item, index) => {
                                return { value: item.userId, label: item.name };
                              })}
                            optionFilterProp="label"
                            name="assigness"
                            className="form-control mb-4"
                            value="ADD MORE"
                            onSelect={(value) => {
                              let findUser = projectDetail.members?.find(
                                (mem) => mem.userId == value
                              );
                              findUser = { ...findUser, id: findUser.userId };
                              let newArrAssigness = [
                                ...taskDetail.assigness,
                                findUser,
                              ];
                              dispatch({
                                type: "COMBINE_CHANGE_TASK",
                                actionType: "CHANGE_TASK",
                                payload: {
                                  name: "assigness",
                                  value: newArrAssigness,
                                },
                              });
                              // dispatch({
                              //   type: "CHANGE_TASK",
                              //   payload: {
                              //     name: "assigness",
                              //     value: newArrAssigness,
                              //   },
                              // });
                            }}
                          ></Select>
                        )}

                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {taskDetail.assigness?.map((item, index) => {
                            return (
                              <div
                                key={index}
                                style={{ display: "flex" }}
                                className="item"
                              >
                                <div className="avatar">
                                  <img
                                    src={item.avatar}
                                    alt={item.avatar?.toString()}
                                  />
                                </div>
                                <p className="name">
                                  {item.name}
                                  <button
                                    type="button"
                                    style={{ border: "none" }}
                                    onClick={() => {
                                      let selectUserDelIndex =
                                        taskDetail.assigness.findIndex(
                                          (mem) => mem.id == item.id
                                        );
                                      if (selectUserDelIndex !== -1) {
                                        taskDetail.assigness.splice(
                                          selectUserDelIndex,
                                          1
                                        );
                                      }
                                      dispatch({
                                        type: "COMBINE_CHANGE_TASK",
                                        actionType: "CHANGE_TASK",
                                        payload: {
                                          name: "assigness",
                                          value: taskDetail.assigness,
                                        },
                                      });

                                      // dispatch({
                                      //   type: "CHANGE_TASK",
                                      //   payload: {
                                      //     name: "assigness",
                                      //     value: taskDetail.assigness,
                                      //   },
                                      // });
                                      // console.log("del", newArrAssigness);
                                      console.log(
                                        "casi del",
                                        taskDetail.assigness
                                      );
                                    }}
                                  >
                                    <i
                                      className="fa fa-times"
                                      style={{
                                        marginLeft: 5,
                                        cursor: "pointer",
                                      }}
                                    />
                                  </button>
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div
                        className="priority form-group"
                        style={{ marginBottom: 20 }}
                      >
                        <h6>PRIORITY</h6>
                        <select
                          className="form-control"
                          name="priorityId"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          value={taskDetail.priorityId}
                        >
                          {priority.map((item, index) => {
                            return (
                              <option key={index} value={item.priorityId}>
                                {item.priority}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="estimate">
                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                        <input
                          type="number"
                          min={0}
                          name="originalEstimate"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          className="estimate-hours"
                          defaultValue={taskDetail.originalEstimate}
                        />
                      </div>
                      <div className="time-tracking">
                        <h6>TIME TRACKING</h6>
                        <div style={{ display: "flex" }}>
                          <i className="fa fa-clock" />
                          <div style={{ width: "100%" }}>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: `${
                                    (Number(taskDetail.timeTrackingSpent) *
                                      100) /
                                    totalTimeTracking
                                  }%`,
                                }}
                                aria-valuenow={Number(
                                  taskDetail.timeTrackingSpent
                                )}
                                aria-valuemin={0}
                                aria-valuemax={Number(
                                  taskDetail.timeTrackingRemaining +
                                    taskDetail.timeTrackingSpent
                                )}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p className="logged">
                                {taskDetail.timeTrackingSpent}h logged
                              </p>
                              <p className="estimate-time">
                                {taskDetail.timeTrackingRemaining}h estimated
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <input
                              className="form-control"
                              type="number"
                              value={taskDetail.timeTrackingSpent}
                              name="timeTrackingSpent"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              min={0}
                            />
                          </div>
                          <div className="col-6">
                            <input
                              className="form-control"
                              value={taskDetail.timeTrackingRemaining}
                              type="number"
                              name="timeTrackingRemaining"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              min={0}
                            />
                          </div>
                        </div>
                      </div>

                      <div style={{ color: "#929398" }}>
                        Create at a month ago
                      </div>
                      <div style={{ color: "#929398" }}>
                        Update at a few seconds ago
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalJira;
