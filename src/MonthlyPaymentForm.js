import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Upload,
  Card,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./MonthlyPaymentForm.css";

const { Item } = Form;

const MonthlyPaymentForm = () => {
  const [fileList, setFileList] = useState([]);

  const handleUploadChange = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1); // Limit to 1 file
    setFileList(newFileList);
  };

  const onFinish = async (values) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    // Append file to formData
    if (fileList.length > 0) {
      formData.append("paymentScreenshot", fileList[0].originFileObj);
    }

    try {
      const response = await fetch(
        `https://modern-study-library.drhlabs.com/api/users/monthly/payment`,
        {
          method: "POST",
          body: formData,
        }
      );
      console.log("Received response: ", response);
      notification.success({
        message: "Success",
        description: "Monthly payment recorded successfully!",
      });
    } catch (error) {
      console.error("Error creating monthly payment: ", error);
      notification.error({
        message: "Error",
        description: "Failed to record monthly payment. Please try again.",
      });
    }
  };

  return (
    <div className="monthly">
      <div className="container mx-auto p-4">
        <Card className="form-card">
          <center>
            <h1 className="text-2xl font-bold mb-4">Monthly Payment</h1>
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <p className="mb-2 font-medium">
                To make a payment, you can use the following details:
              </p>
              <p className="mb-1">
                <strong>UPI ID:</strong> 8447627281@paytm
              </p>
              <p className="mb-2">
                <strong>Bank transfer:</strong>
              </p>
              <div className="pl-4">
                <p className="mb-1">
                  <strong>Account Holder:</strong> Chahat Sharma
                </p>
                <p className="mb-1">
                  <strong>Account Number:</strong> 2010101028727
                </p>
                <p className="mb-1">
                  <strong>IFSC Code:</strong> CNRB0002010
                </p>
                <p className="mb-1">
                  <strong>Bank:</strong> Canara Bank
                </p>
              </div>
            </div>
          </center>
          <Form layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email address",
                    },
                  ]}
                >
                  <Input />
                </Item>
              </Col>
              <Col xs={24} md={12}>
                <Item
                  name="paymentAmount"
                  label="Payment Amount"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the payment amount",
                    },
                  ]}
                >
                  <Input type="number" />
                </Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Item
                  name="paymentScreenshot"
                  label="Payment Screenshot"
                  rules={[
                    {
                      required: true,
                      message: "Please upload the payment screenshot",
                    },
                  ]}
                >
                  <Upload
                    accept=".jpg,.jpeg,.png,.pdf"
                    fileList={fileList}
                    beforeUpload={() => false}
                    onChange={handleUploadChange}
                  >
                    <Button icon={<UploadOutlined />}>
                      Upload (JPG/PNG/PDF)
                    </Button>
                  </Upload>
                </Item>
              </Col>
            </Row>
            <Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default MonthlyPaymentForm;
