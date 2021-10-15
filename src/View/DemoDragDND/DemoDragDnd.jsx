import React, { useState } from "react";
import _ from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const DemoDragDnd = () => {
  const [state, setState] = useState({
    toDo: {
      id: "toDo",
      items: [
        { id: "1", taskName: "Task 1" },
        { id: "2", taskName: "Task 2" },
        { id: "3", taskName: "Task 3" },
      ],
    },
    inProgress: {
      id: "inProgress",
      items: [
        { id: "4", taskName: "Task 4" },
        { id: "5", taskName: "Task 5" },
        { id: "6", taskName: "Task 6" },
      ],
    },
    done: {
      id: "done",
      items: [
        { id: "7", taskName: "Task 7" },
        { id: "8", taskName: "Task 8" },
        { id: "9", taskName: "Task 9" },
      ],
    },
  });
  const handleDragEnd = (result) => {
    let { destination, source } = result;
    if (!destination) return; //phòng trường hợp bị lỗi gì đó thì ta thêm dòng này
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return; //neeus nó drop tại vj trí hiện tại thì return

    //tạo ra 1 bản copy của cái thg đang được drag
    let itemCopy = { ...state[source.droppableId].items[source.index] };
    //Lấy ra cái Droppable Source và xóa cái thg đang được kéo (itemCopy) ra khỏi source
    // let dropSource = state[source.droppableId].items.filter(
    //   (item) => item.id !== itemCopy.id
    // );
    state[source.droppableId].items.splice(source.index, 1);
    //xóa cái thg đang được kéo khỏi Dropable Source

    // console.log("đã xóa", dropSource);
    // state[source.droppableId] = dropSource;
    //Laays ra Dr=opable Destination
    let dropDestination = state[destination.droppableId].items;
    //Thêm cái thg đang được kéo (itemCopy) vào nơi drop
    dropDestination.splice(destination.index, 0, itemCopy);
    //cập nhật lại taskList
    // return { ...state };
  };
  return (
    <div className="container bg-success">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="row">
          {_.map(state, (statusTask, index) => {
            return (
              <Droppable droppableId={statusTask.id}>
                {(provided) => {
                  return (
                    <div
                      style={{
                        width: "30%",
                        marginRight: "20px",
                        height: "auto",
                      }}
                      className="col-4 mr-4 bg-dark"
                      key={index}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {statusTask.items.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id} //để phân biệt các elem với nhau. không nên để = index vì có thể sau khi drag thì index sẽ trùng nhau
                            index={index}
                            draggableId={item.id}
                          >
                            {(provided) => {
                              return (
                                <div
                                  className="m-3 p-4 bg-white text-center"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {item.taskName}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default DemoDragDnd;
