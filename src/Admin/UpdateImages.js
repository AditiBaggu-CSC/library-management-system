import React, { useState, useEffect } from "react";
import { Upload, Button, Form, notification, Card, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import "./UpdateImages.css"; // Import the CSS file

const UpdateImages = ({ isAuthenticated }) => {
  const [registrationImage, setRegistrationImage] = useState(null);
  const [paymentsImage, setPaymentsImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  const handleUpdate = async () => {
    const formData = new FormData();
    if (registrationImage)
      formData.append("registrationImage", registrationImage);
    if (paymentsImage) formData.append("paymentsImage", paymentsImage);

    try {
      const response = await fetch(
        `${process.env.REACTAPP_BACKEND_URL}/api/images/update/images`,
        {
          method: "POST",
          body: formData,
        }
      );

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
    <div className="update-images">
      <div className="container">
        <Card className="form-card">
          <div className="heading">Update Images</div>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Registration Image">
                  <Upload
                    beforeUpload={(file) => {
                      setRegistrationImage(file);
                      return false;
                    }}
                  >
                    <Button icon={<UploadOutlined />}>
                      Select Registration Image
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Payments Image">
                  <Upload
                    beforeUpload={(file) => {
                      setPaymentsImage(file);
                      return false;
                    }}
                  >
                    <Button icon={<UploadOutlined />}>
                      Select Payments Image
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" onClick={handleUpdate}>
              Update Images
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default UpdateImages;
