import React from "react";
import { Form, Input, Button, Row, Col, Card, notification } from "antd";
import "./SuggestionForm.css";

const { Item } = Form;
const { TextArea } = Input;

const SuggestionForm = () => {
  const onFinish = async (values) => {
    try {
      const response = await fetch(
        `http://localhost:4444/api/suggestions/create/suggestion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        notification.success({
          message: "Success",
          description: "Suggestion/Complaint submitted successfully!",
        });
      } else {
        throw new Error("Failed to submit suggestion/complaint");
      }
    } catch (error) {
      console.error("Error submitting suggestion/complaint: ", error);
      notification.error({
        message: "Error",
        description: "Failed to submit suggestion/complaint. Please try again.",
      });
    }
  };

  return (
    <div className="suggestion">
      <div className="container mx-auto p-4">
        <Card className="form-card">
          <center>
            <h1 className="text-2xl font-bold mb-4">Suggestions/Complaints</h1>
          </center>
          <Form layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your name",
                    },
                  ]}
                >
                  <Input />
                </Item>
              </Col>
              <Col xs={24} md={12}>
                <Item
                  name="comments"
                  label="Comments"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your comments",
                    },
                  ]}
                >
                  <TextArea rows={4} />
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

export default SuggestionForm;
