import React from "react";
import { Form, Input, Button, Row, Col, Upload, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import "./MonthlyPaymentForm.css"; // Import the CSS file

const { Item } = Form;

const MonthlyPaymentForm = () => {
  const onFinish = async (values) => {
    try {
      const response = await fetch(
        "http://localhost:4444/api/users/monthly/payment",
        values
      );
      console.log("Received response: ", response.data);
    } catch (error) {
      console.error("Error creating monthly payment: ", error.response.data);
    }
  };

  return (
    <div className="monthly">
      <div className="container mx-auto p-4">
        <Card className="form-card">
          <center>
            <h1 className="text-2xl font-bold mb-4">Monthly Payment</h1>
          </center>
          <Form layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
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
                    beforeUpload={() => false}
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
