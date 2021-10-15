import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_CATEGORY_API } from "../../Store/Constant";
const FormEditProject = (props) => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => {
    return state.ProjectCategoryReducer;
  });
  const projectDetail = useSelector((state) => {
    return state.ProjectReducer.projectEdit;
  });

  const formik = useFormik({
    initialValues: {
      id: 0,
      projectName: "",
      creator: 0,
      description: "",
      categoryId: "",
    },
    onSubmit: (values) => {
      dispatch({ type: "UPDATE_PROJECT_API", payload: values });
    },
  });

  const handleEditorChange = (content) => {
    formik.setFieldValue("description", content);
  };
  useEffect(() => {
    dispatch({ type: GET_CATEGORY_API });
    dispatch({ type: "SET_SUBMIT_EDIT_PROJECT", payload: formik.handleSubmit });
  }, []);
  useEffect(() => {
    formik.setValues(projectDetail);
  }, [projectDetail]);
  return (
    <form className="container-fuild" onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project id</p>
            <input
              // value={values.id}
              disabled
              onChange={formik.handleChange}
              className="form-control"
              name="id"
              value={formik.values.id}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project name</p>
            <input
              value={formik.values.projectName}
              onChange={formik.handleChange}
              className="form-control"
              name="projectName"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <select
              className="form-control"
              onChange={formik.handleChange}
              name="categoryId"
              value={formik.values.categoryId}
            >
              {category?.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
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
      </div>
    </form>
  );
};

export default FormEditProject;
