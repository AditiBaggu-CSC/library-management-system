import React from "react";
import { Form, Input, Button, Row, Col, Upload} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Item } = Form;

const MonthlyPaymentForm = () => {
  const onFinish = (values) => {
    console.log("Received values: ", values);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Monthly Payment</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              name="paymentAmount"
              label="Payment Amount"
              rules={[
                { required: true, message: "Please enter the payment amount" },
              ]}
            >
              <Input type="number" />
            </Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
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
              <Upload accept=".jpg,.jpeg,.png,.pdf" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Upload (JPG/PNG/PDF)</Button>
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
    </div>
  );
};

export default MonthlyPaymentForm;
