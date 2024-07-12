import React, { useEffect, useState } from "react";
import { Table, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import "./ViewRecords.css";

const ViewSuggestions = ({ isAuthenticated }) => {
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const response = await fetch(
        `http://localhost:4444/api/suggestions/get/all/suggestions`
      );
      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to fetch suggestions. Please try again.",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(
        `http://localhost:4444/api/suggestions/delete/suggestion/${id}`,
        {
          method: "DELETE",
        }
      );
      notification.success({
        message: "Success",
        description: "Suggestion deleted successfully!",
      });
      fetchSuggestions();
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to delete suggestion. Please try again.",
      });
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Suggestions", dataIndex: "comments", key: "comments" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Action",
      key: "action",
      render: (text, suggestion) => (
        <Button
          type="danger"
          className="delete-button"
          onClick={() => handleDelete(suggestion._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="table-container">
      <Table dataSource={suggestions} columns={columns} rowKey="_id" />
    </div>
  );
};

export default ViewSuggestions;
