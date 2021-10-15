import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Select } from "antd";
import { Slider, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

const FormCreateTask = () => {
  const dispatch = useDispatch();
  const { projectList, taskType, priority } = useSelector(
    (state) => state.ProjectCategoryReducer
  );
  const { statusList } = useSelector((state) => state.ProjectReducer);
  const formik = useFormik({
    initialValues: {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: "1",
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: "",
      typeId: 0,
      priorityId: 0,
    },
    onSubmit: (values) => {
      dispatch({
        type: "CREATE_TASK_API",
        payload: { values: values, projectId: formik.values.projectId },
      });
    },
  });

  const userProject = projectList.find(
    (item) => item.id == formik.values.projectId
  );
  const { Option } = Select;
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  const minTime = 0;
  const [size, setSize] = React.useState("default");
  const [spentTime, setSpentTime] = React.useState(0);
  const [remainTime, setRemainTime] = React.useState(0);

  const selectAssignes = userProject?.members.map((item) => {
    return { value: item.userId, label: item.name };
  });
  const handleChange = (value) => {
    formik.setFieldValue("listUserAsign", value);
  };
  const handleEditorChange = (content, editor) => {
    formik.setFieldValue("description", content);
  };

  useEffect(() => {
    dispatch({ type: "GET_LIST_PROJECT_API" });
    dispatch({ type: "GET_TASK_TYPE_API" });
    dispatch({ type: "GET_PRIORITY_API" });
    dispatch({ type: "GET_USER_API" });
    dispatch({ type: "GET_STATUS_LIST_API" });
    dispatch({ type: "SET_SUBMIT_CREATE_TASK", payload: formik.handleSubmit });
  }, []);
  console.log("selectAssignes", projectList);
  return (
    <div className="container">
      <form action="">
        <div className="form-group">
          <p>Project</p>

          <select
            className="form-control "
            onChange={formik.handleChange}
            value={formik.values.projectId}
            name="projectId"
          >
            {projectList.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.projectName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <p>Status</p>

          <select
            className="form-control "
            onChange={formik.handleChange}
            value={formik.values.statusId}
            name="statusId"
          >
            {statusList?.map((item, index) => {
              return (
                <option key={index} value={item.statusId}>
                  {item.statusName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <p>Task Name</p>

          <input
            type="text"
            className="form-control"
            name="taskName"
            value={formik.values.taskName}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-6">
              <p>Task Priority</p>
              <select
                name="priorityId"
                id=""
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.priorityId}
              >
                <option disabled value="0">
                  Choose priority
                </option>
                {priority.map((item, index) => (
                  <option key={index} value={item.priorityId}>
                    {item.priority}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <p>Task Type</p>
              <select
                name="typeId"
                id=""
                className="form-control"
                value={formik.values.typeId}
                onChange={formik.handleChange}
              >
                <option disabled>Choose task type</option>
                {taskType.map((task, index) => {
                  return (
                    <option key={index} value={task.id}>
                      {task.taskType?.toUpperCase()}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-12">
              <p>Assinges member</p>
              <Select
                mode="tags"
                options={selectAssignes}
                size={size}
                defaultValue={formik.values.listUserAsign}
                placeholder="Please select"
                optionFilterProp="label"
                onChange={handleChange}
                //casi onSearch này chỉ tìm kiếm dựa trên opttion của thg Select
                onSearch={(value) => {}}
                style={{ width: "100%", marginBottom: "20px" }}
              >
                {children}
              </Select>
            </div>
            <div className="col-12">
              <p>Original estiamte</p>
              <input
                value={formik.values.originalEstimate}
                onChange={formik.handleChange}
                className="form-control mb-3"
                type="number"
                name="originalEstimate"
                min={minTime}
              />
            </div>
            <div className="col-12">
              <p>Time Tracking</p>
              <Slider
                style={{ marginBottom: 0 }}
                min={minTime}
                max={Number(spentTime) + Number(remainTime)}
                value={Number(spentTime)}
              />
              <div className="row mb-4">
                <div className="col-6 pl-5 font-weight-bold">
                  {spentTime} Time logged
                </div>
                <div className="col-6 text-right pr-5 font-weight-bold">
                  {remainTime} Time remain
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="">
                  <span>Time Spent:</span>
                  <InputNumber
                    min="0"
                    style={{ margin: "0 16px" }}
                    value={spentTime}
                    onChange={(value) => {
                      formik.setFieldValue("timeTrackingSpent", value);
                      setSpentTime(value);
                    }}
                    name="timeTrackingSpent"
                  />
                </div>
                <div className="">
                  <InputNumber
                    min="0"
                    style={{ margin: "0 16px" }}
                    value={remainTime}
                    name="timeTrackingRemaining"
                    onChange={(value) => {
                      formik.setFieldValue("timeTrackingRemaining", value);
                      setRemainTime(value);
                    }}
                  />
                  <span>Time Remain</span>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <p>Task Description</p>
            <Editor
              id="tiny-mce"
              name="description"
              //initialValue={formik.values.description}
              value={formik.values.description}
              init={{
                selector: "textarea#myTextArea",
                height: 500,

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
              onEditorChange={handleEditorChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCreateTask;
