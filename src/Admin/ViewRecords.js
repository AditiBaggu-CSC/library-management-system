import React, { useEffect, useState } from "react";
import { Table, Button, notification, Modal, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import "./ViewRecords.css";

const { Search } = Input;

const ViewRecords = ({ isAuthenticated }) => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [emailVisible, setEmailVisible] = useState(false);
  const [form] = Form.useForm();
  const [emailForm] = Form.useForm();
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
        "https://modern-study-library.drhlabs.com/api/users/get/all/users"
      );
      const data = await response.json();
      setRecords(data.users);
      setFilteredRecords(data.users);
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

  const handleSearch = (value) => {
    const filtered = records.filter((record) =>
      record.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRecords(filtered);
  };

  const handleSelectAll = () => {
    if (selectedRecords.length === filteredRecords.length) {
      setSelectedRecords([]);
    } else {
      setSelectedRecords(filteredRecords);
    }
  };

  const handleSendEmail = () => {
    setEmailVisible(true);
  };

  const handleEmailSubmit = async () => {
    try {
      const values = emailForm.getFieldsValue();
      const userIds = selectedRecords.map((record) => record._id);

      const response = await fetch(
        "https://modern-study-library.drhlabs.com/api/email/send/email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userIds: userIds,
            subject: values.subject,
            message: values.message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Email sending failed");
      }

      notification.success({
        message: "Success",
        description: "Emails sent successfully!",
      });

      setEmailVisible(false);
      emailForm.resetFields();
      setSelectedRecords([]);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to send emails. Please try again.",
      });
    }
  };

  const handleEmailCancel = () => {
    setEmailVisible(false);
    emailForm.resetFields();
  };

  const columns = [
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
      render: (text, record) => (
        <input
          type="checkbox"
          checked={selectedRecords.includes(record)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRecords([...selectedRecords, record]);
            } else {
              setSelectedRecords(
                selectedRecords.filter((item) => item._id !== record._id)
              );
            }
          }}
        />
      ),
    },
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
    {
      title: "Renewal Date",
      dataIndex: "renewalDate",
      key: "renewalDate",
      render: (renewalDate) => {
        const date = renewalDate
          ? new Date(renewalDate).toLocaleDateString()
          : "N/A";
        return <span>{date}</span>;
      },
    },
    {
      title: "Payment Amount",
      dataIndex: "payments",
      key: "payments",
      render: (payments) =>
        payments && payments.length > 0
          ? payments[payments.length - 1].amount
          : "N/A",
    },
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
      <div className="search-bar-container">
        <Search
          placeholder="Search by name"
          onSearch={handleSearch}
          style={{ width: 300 }}
          className="search-input"
        />
      </div>
      {selectedRecords.length > 0 && (
        <div className="action-buttons-container">
          <Button className="select-all-button" onClick={handleSelectAll}>
            {selectedRecords.length === filteredRecords.length
              ? "Deselect All"
              : "Select All"}
          </Button>
          <Button
            className="send-email-button"
            onClick={() => setEmailVisible(true)}
            style={{ marginLeft: "10px" }}
          >
            Send Email
          </Button>
        </div>
      )}
      <Table dataSource={filteredRecords} columns={columns} rowKey="_id" />

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

      <Modal
        title="Send Email"
        visible={emailVisible}
        onCancel={handleEmailCancel}
        footer={[
          <Button key="back" onClick={handleEmailCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleEmailSubmit}>
            Send
          </Button>,
        ]}
      >
        <Form form={emailForm} layout="vertical">
          <Form.Item name="subject" label="Subject">
            <Input />
          </Form.Item>
          <Form.Item name="message" label="Message">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewRecords;
