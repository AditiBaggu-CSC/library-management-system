import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <div className="dashboard-content">
        <Card
          className="dashboard-card"
          title="View Records"
          onClick={() => navigate("/admin/view-records")}
        >
          <p>Click here to view all records.</p>
        </Card>
        <Card
          className="dashboard-card"
          title="Update Images"
          onClick={() => navigate("/admin/update-images")}
        >
          <p>Click here to update images.</p>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
