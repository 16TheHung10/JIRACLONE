import React from "react";

import ReactHtmlParser from "react-html-parser";
import { Avatar, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ModalJira from "../Modal/ModalJira";
const ContentMain = (props) => {
  const dispatch = useDispatch();
  const { projectDetail } = props;
  const handleDragEnd = (result) => {
    let { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    let itemDrag =
      projectDetail.lstTask[Number(source.droppableId) - 1].lstTaskDeTail[
        Number(source.index)
      ];
    projectDetail.lstTask[Number(source.droppableId) - 1].lstTaskDeTail.splice(
      source.index,
      1
    );
    projectDetail.lstTask[
      Number(destination.droppableId) - 1
    ].lstTaskDeTail.splice(destination.index, 0, itemDrag);
    // let itemDrag =
    //   projectDetail?.lstTask[Number(source.droppableId) - 1].lstTaskDetail[
    //     Number(source.index)
    //   ];
    // dispatch({
    //   type: "UPDATE_STATUS_TASK_API",
    //   payload: {
    //     taskId: draggableId,
    //     statusId: destination.droppableId,
    //   },
    // });
    console.log("DRAG", itemDrag);
    console.log("DRAG", result);
  };
  const renderTaskList = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {projectDetail.lstTask?.map((item, index) => {
          return (
            <Droppable droppableId={item.statusId} key={index}>
              {(provided) => {
                return (
                  <div
                    key={index}
                    className="card"
                    style={{
                      width: "23.5%",
                      height: "100%",
                      backgroundColor: "#f0f2f5",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      border: "none",
                      borderRadius: "15px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.1) 0px -4px 28px, rgba(0, 0, 0, 0.04) 0px 10px 10px",
                    }}
                  >
                    <div
                      className="card-header"
                      style={{
                        backgroundColor: "white",
                        textAlign: "center",
                        borderTopLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                      }}
                    >
                      {item.statusName}
                    </div>
                    {/* status task */}
                    <div style={{ padding: "10px", height: "auto" }}>
                      <ul
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="list-group list-group-flush"
                        style={{ padding: "10px 15px", position: "relative" }}
                      >
                        {item.lstTaskDeTail?.map((taskDetail, index2) => {
                          return (
                            <Draggable
                              key={taskDetail.taskId.toString()} //để phân biệt các elem với nhau. không nên để = index vì có thể sau khi drag thì index sẽ trùng nhau
                              index={index2}
                              draggableId={taskDetail.taskId?.toString()}
                            >
                              {(provided) => {
                                return (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    onClick={() => {
                                      dispatch({
                                        type: "GET_TASK_DETAIL_API",
                                        payload: taskDetail.taskId,
                                      });
                                    }}
                                    className="list-group-item list-item"
                                    data-toggle="modal"
                                    data-target="#infoModal"
                                  >
                                    {ReactHtmlParser(taskDetail.taskName)}
                                    <div
                                      className="block"
                                      style={{ display: "flex" }}
                                    >
                                      <div className="block-left">
                                        <svg
                                          className="svg-inline--fa fa-bookmark fa-w-12"
                                          aria-hidden="true"
                                          focusable="false"
                                          data-prefix="fa"
                                          data-icon="bookmark"
                                          role="img"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 384 512"
                                          data-fa-i2svg
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"
                                          />
                                        </svg>
                                        <svg
                                          className="svg-inline--fa fa-arrow-up fa-w-14"
                                          aria-hidden="true"
                                          focusable="false"
                                          data-prefix="fa"
                                          data-icon="arrow-up"
                                          role="img"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 448 512"
                                          data-fa-i2svg
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
                                          />
                                        </svg>
                                      </div>
                                      <div className="block-right">
                                        <div
                                          className="avatar-group"
                                          style={{ display: "flex" }}
                                        >
                                          {taskDetail.assigness
                                            ?.slice(0, 3)
                                            .map((assignes, index3) => {
                                              return (
                                                <div
                                                  key={index3}
                                                  className="avatar item-hover-avatar"
                                                >
                                                  <img
                                                    src={assignes.avatar}
                                                    alt={assignes.avatar?.toString()}
                                                  />
                                                </div>
                                              );
                                            })}
                                          {taskDetail?.assigness.length > 3 ? (
                                            <Tooltip
                                              className="avatar"
                                              title="Ant User"
                                              placement="top"
                                            >
                                              <Avatar
                                                className="avatar item-hover-avatar"
                                                style={{
                                                  backgroundColor: "#87d068",
                                                  width: "40px",
                                                  height: "40px",
                                                }}
                                                icon={<UserOutlined />}
                                              />
                                            </Tooltip>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </ul>
                    </div>
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    );
  };
  return (
    <>
      <div
        className="content"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {renderTaskList()}
      </div>
    </>
  );
};

export default ContentMain;
