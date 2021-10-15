import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Avatar,
  Popconfirm,
  message,
  Popover,
  AutoComplete,
} from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import FormEditProject from "../../Components/Form/FormEditProject";

export default function ProjectManagement(props) {
  const projectList = useSelector(
    (state) => state.ProjectCategoryReducer.projectList
  );
  const { userSearch } = useSelector((state) => {
    return state.UserLoginReducer;
  });
  // const { userSearch } = useSelector(
  //   (state) => state.UserLoginCyberBugsReducer
  // );
  const [value, setValue] = useState("");
  //SearchRef dùng để lưu trữ giá trị người dùng vừa search. useRef cũng được coi như là store ở component
  const searchRef = useRef(null);
  //Sử dụng useDispatch để gọi action
  const dispatch = useDispatch();
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const confirm = (e, id) => {
    dispatch({ type: "DELETE_PROJECT_API", payload: id });
    message.success(`Xóa thành công`);
  };

  const cancel = (e) => {
    message.error("Đã hủy");
  };
  useEffect(() => {
    dispatch({ type: "GET_LIST_PROJECT_API" });
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age",
      },
    });
  };
  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
      sortDirections: ["descend"],
    },
    {
      title: "projectName",
      dataIndex: "projectName",
      key: "projectName",
      render: (text, record, index) => {
        return <NavLink to={`/project/detail/${record.id}`}> {text}</NavLink>;
      },
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
    },

    {
      title: "category",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "creator",
      // dataIndex: 'creator',
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "members",
      key: "members",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement="top"
                  title="members ( cái này là popover của thg antd)"
                  content={() => {
                    return (
                      <table className="table" style={{ borderRadius: "20px" }}>
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>avatar</th>
                            <th>name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.userId}</td>
                                <td>
                                  <img
                                    src={item.avatar}
                                    width="30"
                                    height="30"
                                    style={{ borderRadius: "15px" }}
                                    alt={item.avatar?.toString()}
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      dispatch({
                                        type: "REMOVE_USER_PROJECT_API",
                                        payload: {
                                          userId: Number(item.userId),
                                          projectId: Number(record.id),
                                        },
                                      });
                                    }}
                                    className="btn btn-danger"
                                    style={{ borderRadius: "50%" }}
                                  >
                                    X
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar key={index} src={member.avatar} />
                </Popover>
              );
            })}

            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}

            <Popover
              placement="rightTop"
              title={"Add user"}
              content={() => {
                return (
                  <AutoComplete
                    options={userSearch?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    //set gias trij cua hoopj thoaij
                    value={value}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    onSelect={(valueSelect, option) => {
                      //valueSelect là id của người dùng
                      //option gồm label và value
                      //set giá trị của hộp thọa = option.label
                      setValue(option.label);
                      //Gọi api gửi về backend
                      dispatch({
                        type: "ADD_USER_PROJECT_API",
                        payload: {
                          projectId: record.id,
                          userId: Number(valueSelect),
                        },
                      });
                    }}
                    onBlur={() => {
                      setValue("");
                    }}
                    style={{ width: "100%" }}
                    onSearch={(value) => {
                      //Lần đầu chạy thì searchRef.curren ko có gì hết lên nó sẽ chạy dispatch bên dưới
                      //khi người dùng bắt đầu gõ từ khóa thì nó sẽ kiểm tra searchRef.curren có hay ko ( đương  nhiên là có rồi vì chạy lần 1 mình gán nó = setTimeout mà)
                      //Nếu mà có searchRef.curren thì nó sẽ clearTimeout(nghĩa là set lại Timeout về = 0 và phải đợi 300ms để setTimeout chạy)
                      // và khi setTimeout đợi 300ms mà ko thấy có gì thì nó sẽ dispatch (tức là sau 300ms người dùng ko nhập gì nữa)
                      //Nếu trong 300s đó người dùng gõ thì nó lại render lại comp(vì state thay đổi (hàm onChange bên trên))
                      //nó sẽ kiểm tra searchRef có hay ko (sau lần đầu thì auto có)->nó sẽ clearTimeout. và nếu ko có gì thay đổi thì sau 300ms nó sẽ chạy hàm bên dưới
                      //(Mỗi lần người dùng gõ từ khóa thì hàm onChange sẽ chạy và setState nên component sẽ render lại và chạy lại các hàm dưới này)

                      if (searchRef.current) {
                        clearTimeout(searchRef.current);
                      }
                      searchRef.current = setTimeout(() => {
                        dispatch({
                          type: "GET_USER_API",
                          payload: value,
                        });
                      }, 500);
                    }}
                  />
                );
              }}
              trigger="click"
            >
              <Button style={{ borderRadius: "50%" }}>+</Button>
            </Popover>
          </div>
        );
      },
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record, index) => {
        const dataEdit = {
          id: record.id,
          projectName: record.projectName,
          creator: 0,
          description: record.description,
          categoryId: record.categoryId,
        };
        return (
          <div>
            <button
              onClick={() => {
                dispatch({
                  type: "EDIT_PROJECT",
                  payload: dataEdit,
                });
                dispatch({
                  type: "OPEN_FORM",
                  payload: { Comp: <FormEditProject />, title: "EDIT PROJECT" },
                });
              }}
              className="btn mr-2 btn-primary"
            >
              <FormOutlined style={{ fontSize: 17 }} />
            </button>
            <Popconfirm
              title="Are you sure to delete this project?"
              // onConfirm={() => {
              //   // dispatch({ type: "DELETE_PROJECT_API", idProject: record.id });
              //   alert("xóa thành công");
              // }}
              okText="Yes"
              cancelText="No"
              onConfirm={(e) => {
                confirm(e, record.id);
              }}
              onCancel={cancel}
            >
              <button className="btn btn-danger">
                <DeleteOutlined style={{ fontSize: 17 }} />
              </button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <div className="container-fluid">
      <h3>Project management</h3>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={projectList.reverse()}
        onChange={handleChange}
      />
    </div>
  );
}
