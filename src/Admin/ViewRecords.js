import React, { useEffect, useState } from "react";
import { Table, Button, notification, Modal } from "antd";
import UpdateUserForm from "./UpdateUser";

const ViewRecords = () => {
  const [records, setRecords] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateVisible, setUpdateVisible] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch(
        "http://localhost:4444/api/users/get/all/users"
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
      await fetch(`http://localhost:4444/api/users/delete/user/${id}`, {
        method: "DELETE",
      });
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
    setUpdateVisible(true);
  };

  const handleUpdateSubmit = async (id, values) => {
    try {
      const response = await fetch(
        `http://localhost:4444/api/users/update/user/${id}`,
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
    { title: "Father's Name", dataIndex: "fatherName", key: "fatherName" },
    { title: "Occupation", dataIndex: "occupation", key: "occupation" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Seat Number", dataIndex: "seatNumber", key: "seatNumber" },
    { title: "Slot Booking", dataIndex: "slotBooking", key: "slotBooking" },
    {
      title: "Present Address",
      dataIndex: "presentAddress",
      key: "presentAddress",
    },
    {
      title: "Permanent Address",
      dataIndex: "permanentAddress",
      key: "permanentAddress",
    },
    { title: "Aadhar Card", dataIndex: "aadharCard", key: "aadharCard" },
    { title: "Renewal Date", dataIndex: "renewalDate", key: "renewalDate" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => handleUpdate(record)}>
            Update
          </Button>
          <Button type="danger" onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={records} columns={columns} rowKey="_id" />
      <Modal
        title="Update User"
        visible={updateVisible}
        onCancel={handleUpdateCancel}
        footer={null}
      >
        <UpdateUserForm
          initialValues={selectedUser}
          onUpdate={handleUpdateSubmit}
          onCancel={handleUpdateCancel}
        />
      </Modal>
    </>
  );
};

export default ViewRecords;
