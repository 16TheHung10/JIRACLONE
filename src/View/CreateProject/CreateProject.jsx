import React, { memo, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { CREATE_PROJECT_API, GET_CATEGORY_API } from "../../Store/Constant";

const CreateProject = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => {
    return state.ProjectCategoryReducer.category;
  });
  const formik = useFormik({
    initialValues: {
      projectName: "",
      description: "",
      categoryId: 1,
      alias: "",
    },
    onSubmit: (values) => {
      dispatch({ type: CREATE_PROJECT_API, payload: values });
    },
  });
  const { setFieldValue } = formik;
  const editorRef = useRef(null);

  useEffect(() => {
    dispatch({ type: GET_CATEGORY_API });
  }, []);
  const handleEditorChange = (content, editor) => {
    let newContent = content.replace(/<[^>]+>/g, "");
    setFieldValue("description", newContent);
  };
  return (
    <>
      <div className="container-fluid">
        <h3>Create Project</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="projectName"> Name :</label>
            <input
              onChange={formik.handleChange}
              value={formik.values.projectName}
              type="text"
              className="form-control "
              name="projectName"
              id="projectName"
              placeholder="Projet Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description"> Description :</label>
            <Editor
              onEditorChange={handleEditorChange}
              value={formik.values.description}
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            {/* <textarea
              multiple
              type="text"
              className="form-control "
              name="description"
              id="description"
            /> */}
          </div>
          <div className="form-group">
            <select
              onChange={formik.handleChange}
              name="categoryId"
              className="form-control"
              id=""
              defaultValue={"DEFAULT"}
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
          <button type="submit" className="btn btn-success">
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default memo(CreateProject);
