import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import "./AdminDashboard.css";

const AdminDashboard = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/signin");
    return null;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-content">
        <Card
          className="dashboard-card"
          hoverable
          onClick={() => navigate("/admin/view-records")}
        >
          <div className="card-title">View Records</div>
        </Card>
        <Card
          className="dashboard-card"
          hoverable
          onClick={() => navigate("/admin/update-images")}
        >
          <div className="card-title">Update Images</div>
        </Card>
        <Card
          className="dashboard-card"
          hoverable
          onClick={() => navigate("/admin/view-suggestions")}
        >
          <div className="card-title">View Suggestions</div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
