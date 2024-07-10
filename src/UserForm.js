import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Space,
  Upload,
  Select,
  Card,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./UserForm.css";

const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;

const UserForm = () => {
  const [fileList, setFileList] = useState({
    aadharCardPhoto: [],
    paymentScreenshot: [],
  });

  const handleUploadChange = (info, key) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1); // Limit to 1 file
    setFileList((prevList) => ({ ...prevList, [key]: newFileList }));
  };

  const onFinish = async (values) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key === "familyMembers") {
        formData.append(key, JSON.stringify(values[key]));
      } else {
        formData.append(key, values[key]);
      }
    });

    // Append files to formData
    if (fileList.aadharCardPhoto.length > 0) {
      formData.append(
        "aadharCardPhoto",
        fileList.aadharCardPhoto[0].originFileObj
      );
    }
    if (fileList.paymentScreenshot.length > 0) {
      formData.append(
        "paymentScreenshot",
        fileList.paymentScreenshot[0].originFileObj
      );
    }

    try {
      const response = await fetch(
        `https://modern-study-library.drhlabs.com/api/users/create/user`,
        {
          method: "POST",
          body: formData,
        }
      );
      console.log("Received response: ", response);
      notification.success({
        message: "Success",
        description: "User created successfully!",
      });
    } catch (error) {
      console.error("Error creating user: ", error);
      notification.error({
        message: "Error",
        description: "Failed to create user. Please try again.",
      });
    }
  };

  return (
    <div className="userform">
      <div className="container mx-auto p-4">
        <Card className="form-card">
          <h1 className="heading">Registration Form</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={24} md={12}>
                <Item
                  name="name"
                  label="Name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
                >
                  <Input />
                </Item>
              </Col>
              <Col span={24} md={12}>
                <Item
                  name="fatherName"
                  label="Father's Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your father's name",
                    },
                  ]}
                >
                  <Input />
                </Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24} md={12}>
                <Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please enter a valid email address",
                    },
                  ]}
                >
                  <Input />
                </Item>
              </Col>
              <Col span={24} md={12}>
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
            </Row>
            <Row gutter={16}>
              <Col span={24} md={12}>
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
              <Col span={24} md={12}>
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
              <Col span={24} md={12}>
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
              <Col span={24} md={12}>
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
              <Col span={24} md={12}>
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
              <Col span={24} md={12}>
                <Item
                  label="Aadhar Card Photo"
                  rules={[
                    {
                      required: true,
                      message: "Please upload your Aadhar card photo",
                    },
                  ]}
                >
                  <Upload
                    name="aadharCardPhoto"
                    accept=".jpg,.jpeg,.png,.pdf"
                    fileList={fileList.aadharCardPhoto}
                    beforeUpload={() => false}
                    onChange={(info) =>
                      handleUploadChange(info, "aadharCardPhoto")
                    }
                  >
                    <Button icon={<UploadOutlined />}>
                      Upload (JPG/PNG/PDF)
                    </Button>
                  </Upload>
                </Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24} md={12}>
                <Item
                  name="slotBooking"
                  label="Slot Booking"
                  rules={[{ required: true, message: "Please select a slot" }]}
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
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: 8,
                      }}
                      align="baseline"
                    >
                      <Item
                        {...restField}
                        name={[name, "name"]}
                        fieldKey={[fieldKey, "name"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing family member name",
                          },
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
              <Col span={24} md={12}>
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
              <Col span={24} md={12}>
                <Item
                  label="Payment Screenshot"
                  rules={[
                    {
                      required: true,
                      message: "Please upload the payment screenshot",
                    },
                  ]}
                >
                  <Upload
                    name="paymentScreenshot"
                    accept=".jpg,.jpeg,.png,.pdf"
                    fileList={fileList.paymentScreenshot}
                    beforeUpload={() => false}
                    onChange={(info) =>
                      handleUploadChange(info, "paymentScreenshot")
                    }
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

export default UserForm;
