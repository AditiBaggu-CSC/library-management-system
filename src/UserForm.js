import React from "react";
import { Form, Input, Button, Row, Col, Space, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;

const UserForm = () => {
  const onFinish = (values) => {
    console.log("Received values: ", values);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              name="fatherName"
              label="Father's Name"
              rules={[
                { required: true, message: "Please enter your father's name" },
              ]}
            >
              <Input />
            </Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Item
              name="occupation"
              label="Occupation"
              rules={[
                { required: true, message: "Please enter your occupation" },
              ]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              name="officePhoneNumber"
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
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Item
              name="age"
              label="Age"
              rules={[{ required: true, message: "Please enter your age" }]}
            >
              <Input type="number" />
            </Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Item
              name="presentAddress"
              label="Present Address"
              rules={[
                {
                  required: true,
                  message: "Please enter your present address",
                },
              ]}
            >
              <TextArea rows={4} />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              name="permanentAddress"
              label="Permanent Address"
              rules={[
                {
                  required: true,
                  message: "Please enter your permanent address",
                },
              ]}
            >
              <TextArea rows={4} />
            </Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Item
              name="aadharCard"
              label="Aadhar Card"
              rules={[
                {
                  required: true,
                  message: "Please enter your Aadhar card number",
                },
              ]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              name="aadharCardPhoto"
              label="Aadhar Card Photo"
              rules={[
                {
                  required: true,
                  message: "Please upload your Aadhar card photo",
                },
              ]}
            >
              <Upload accept=".jpg,.jpeg,.png,.pdf" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Upload (JPG/PNG/PDF)</Button>
              </Upload>
            </Item>
          </Col>
        </Row>
        <h2 className="text-xl font-semibold mt-4">Slot Booking</h2>
        <Row gutter={16}>
          <Col span={12}>
            <Item
              name="slotBooking"
              label="Slot Booking"
              rules={[
                {
                  required: true,
                  message: "Please select a slot",
                },
              ]}
            >
              <Select placeholder="Select a slot">
                <Option value="morning">Morning</Option>
                <Option value="evening">Evening</Option>
                <Option value="fullDay">Full Day</Option>
              </Select>
            </Item>
          </Col>
        </Row>
        <h2 className="text-xl font-semibold mt-4">Family Members</h2>
        <Form.List name="familyMembers">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Item
                    {...restField}
                    name={[name, "name"]}
                    fieldKey={[fieldKey, "name"]}
                    rules={[
                      { required: true, message: "Missing family member name" },
                    ]}
                  >
                    <Input placeholder="Name" />
                  </Item>
                  <Item
                    {...restField}
                    name={[name, "age"]}
                    fieldKey={[fieldKey, "age"]}
                    rules={[{ required: true, message: "Missing age" }]}
                  >
                    <Input placeholder="Age" type="number" />
                  </Item>
                  <Item
                    {...restField}
                    name={[name, "relationship"]}
                    fieldKey={[fieldKey, "relationship"]}
                    rules={[
                      { required: true, message: "Missing relationship" },
                    ]}
                  >
                    <Input placeholder="Relationship" />
                  </Item>
                  <Button type="danger" onClick={() => remove(name)}>
                    Remove
                  </Button>
                </Space>
              ))}
              <Button type="dashed" onClick={() => add()} block>
                Add Family Member
              </Button>
            </>
          )}
        </Form.List>
        <h2 className="text-xl font-semibold mt-4">Payment Information</h2>
        <Row gutter={16}>
          <Col span={12}>
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

export default UserForm;
