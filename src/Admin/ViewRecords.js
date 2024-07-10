import React, { useEffect, useState } from "react";
import { Table, Button, notification, Modal, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import "./ViewRecords.css";

const ViewRecords = ({ isAuthenticated }) => {
  const [records, setRecords] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch(
        `https://modern-study-library.drhlabs.com/api/users/get/all/users`
      );
      const data = await response.json();
      setRecords(data.users);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to fetch records. Please try again.",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(
        `https://modern-study-library.drhlabs.com/api/users/delete/user/${id}`,
        {
          method: "DELETE",
        }
      );
      notification.success({
        message: "Success",
        description: "Record deleted successfully!",
      });
      fetchRecords();
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to delete record. Please try again.",
      });
    }
  };

  const handleUpdate = (record) => {
    setSelectedUser(record);
    form.setFieldsValue(record);
    setUpdateVisible(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      const values = form.getFieldsValue();
      const response = await fetch(
        `https://modern-study-library.drhlabs.com/api/users/update/user/${selectedUser._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (!response.ok) {
        throw new Error("Update failed");
      }
      notification.success({
        message: "Success",
        description: "User updated successfully!",
      });
      fetchRecords();
      setUpdateVisible(false);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to update user. Please try again.",
      });
    }
  };

  const handleUpdateCancel = () => {
    setUpdateVisible(false);
    setSelectedUser(null);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Occupation", dataIndex: "occupation", key: "occupation" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Seat Number", dataIndex: "seatNumber", key: "seatNumber" },
    { title: "Slot Booking", dataIndex: "slotBooking", key: "slotBooking" },
    {
      title: "Present Address",
      dataIndex: "presentAddress",
      key: "presentAddress",
    },
    { title: "Renewal Date", dataIndex: "renewalDate", key: "renewalDate" },
    { title: "Amount", dataIndex: "paymentAmount", key: "paymentAmount" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            className="update-button"
            onClick={() => handleUpdate(record)}
          >
            Update
          </Button>
          <Button
            type="danger"
            className="delete-button"
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="table-container">
      <Table dataSource={records} columns={columns} rowKey="_id" />

      <Modal
        title="Update User"
        visible={updateVisible}
        onCancel={handleUpdateCancel}
        footer={[
          <Button key="back" onClick={handleUpdateCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleUpdateSubmit}>
            Update
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="occupation" label="Occupation">
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number">
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="seatNumber" label="Seat Number">
            <Input />
          </Form.Item>
          <Form.Item name="slotBooking" label="Slot Booking">
            <Input />
          </Form.Item>
          <Form.Item name="presentAddress" label="Present Address">
            <Input />
          </Form.Item>
          <Form.Item name="paymentAmount" label="Payment Amount">
            <Input />
          </Form.Item>
          <Form.Item name="renewalDate" label="Renewal Date">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewRecords;
