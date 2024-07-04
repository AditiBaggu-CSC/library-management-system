import React, { useState } from "react";
import { Upload, Button, Form, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UpdateImages = () => {
  const [registrationImage, setRegistrationImage] = useState(null);
  const [paymentsImage, setPaymentsImage] = useState(null);

  const handleUpdate = async () => {
    const formData = new FormData();
    if (registrationImage)
      formData.append("registrationImage", registrationImage);
    if (paymentsImage) formData.append("paymentsImage", paymentsImage);

    try {
      const response = await fetch("http://localhost:4444/api/update/images", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        notification.success({
          message: "Success",
          description: "Images updated successfully!",
        });
      } else {
        throw new Error("Failed to update images");
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to update images. Please try again.",
      });
    }
  };

  return (
    <Form>
      <Form.Item label="Registration Image">
        <Upload
          beforeUpload={(file) => {
            setRegistrationImage(file);
            return false;
          }}
        >
          <Button icon={<UploadOutlined />}>Select Registration Image</Button>
        </Upload>
      </Form.Item>
      <Form.Item label="Payments Image">
        <Upload
          beforeUpload={(file) => {
            setPaymentsImage(file);
            return false;
          }}
        >
          <Button icon={<UploadOutlined />}>Select Payments Image</Button>
        </Upload>
      </Form.Item>
      <Button type="primary" onClick={handleUpdate}>
        Update Images
      </Button>
    </Form>
  );
};

export default UpdateImages;
