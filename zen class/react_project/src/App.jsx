import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

const API_URL = "http://localhost:5000/items"; // Replace with your API URL

const CrudApp = () => {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Fetch all items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Add a new item
  const handleAdd = async (values, { resetForm }) => {
    try {
      const response = await axios.post(API_URL, values);
      setItems([...items, response.data]);
      resetForm();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Update an existing item
  const handleUpdate = async (values, { resetForm }) => {
    try {
      const response = await axios.put(`${API_URL}/${currentItem.id}`, values);
      setItems(
        items.map((item) =>
          item.id === currentItem.id ? response.data : item
        )
      );
      setIsEditing(false);
      setCurrentItem(null);
      resetForm();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Delete an item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Edit an item
  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  // Manual validation function
  const validate = (values) => {
    const errors = {};
    if (!values.name.trim()) {
      errors.name = "Name is required";
    } else if (values.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    return errors;
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>CRUD App (Formik + Axios without Yup)</h1>

      <Formik
        initialValues={{
          name: currentItem?.name || "",
        }}
        enableReinitialize
        validate={validate}
        onSubmit={isEditing ? handleUpdate : handleAdd}
      >
        {({ resetForm }) => (
          <Form style={{ marginBottom: "20px" }}>
            <Field
              type="text"
              name="name"
              placeholder="Enter item name"
              style={{
                marginRight: "10px",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <ErrorMessage
              name="name"
              component="span"
              style={{ color: "red", marginLeft: "10px" }}
            />
            <button
              type="submit"
              style={{
                padding: "5px 10px",
                marginLeft: "10px",
                background: isEditing ? "orange" : "green",
                color: "white",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              {isEditing ? "Update" : "Add"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentItem(null);
                  resetForm();
                }}
                style={{
                  padding: "5px 10px",
                  marginLeft: "10px",
                  background: "grey",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            )}
          </Form>
        )}
      </Formik>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            {item.name}
            <div>
              <button
                onClick={() => handleEdit(item)}
                style={{
                  marginRight: "10px",
                  padding: "5px 10px",
                  background: "blue",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                style={{
                  padding: "5px 10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudApp;
