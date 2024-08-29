import React, { useState } from 'react';
import './MedicalTests.css';
import { Table, Button, Modal, Form, Input, DatePicker, notification, Tooltip, Popconfirm } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const MedicalTests = () => {
  const [testsData, setTestsData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);
  const [form] = Form.useForm();

  const handleAddTest = () => {
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleEditTest = (test) => {
    setCurrentTest(test);
    form.setFieldsValue({
      testName: test.testName,
      date: moment(test.date, 'YYYY-MM-DD'),
      result: test.result,
      comments: test.comments,
    });
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleModalOk = (values) => {
    if (isEditing) {
      const updatedTests = testsData.map(test =>
        test.key === currentTest.key ? { ...test, ...values, date: values.date.format('YYYY-MM-DD') } : test
      );
      setTestsData(updatedTests);
      notification.success({
        message: 'Test Updated',
        description: 'The medical test has been updated successfully.',
        placement: 'topRight',
      });
    } else {
      const newTest = {
        key: uuidv4(),
        ...values,
        date: values.date.format('YYYY-MM-DD'),
      };
      setTestsData([...testsData, newTest]);
      notification.success({
        message: 'Test Added',
        description: 'The new medical test has been added successfully.',
        placement: 'topRight',
      });
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteTest = (key) => {
    const updatedTests = testsData.filter(test => test.key !== key);
    setTestsData(updatedTests);
    notification.success({
      message: 'Test Deleted',
      description: 'The medical test has been deleted successfully.',
      placement: 'topRight',
    });
  };

  const columns = [
    {
      title: 'Test Name',
      dataIndex: 'testName',
      key: 'testName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result',
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="action-buttons">
          <Tooltip title="View Details">
            <Button icon={<EyeOutlined />} onClick={() => handleEditTest(record)} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button icon={<EditOutlined />} onClick={() => handleEditTest(record)} />
          </Tooltip>
          <Popconfirm
            title="Are you sure to delete this test?"
            onConfirm={() => handleDeleteTest(record.key)}
          >
            <Tooltip title="Delete">
              <Button icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="medical-tests-container">
      <div className="medical-tests-header">
        <h2>Medical Tests</h2>
        <Button className="add-test-btn" type="primary" onClick={handleAddTest}>
          Add Test
        </Button>
      </div>
      <Table
        className="medical-tests-table"
        columns={columns}
        dataSource={testsData}
        pagination={false}
        rowKey="key"
      />
      <Modal
        title={isEditing ? 'Edit Medical Test' : 'Add New Medical Test'}
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        className="add-test-modal"
      >
        <Form onFinish={handleModalOk} form={form} layout="vertical">
          <Form.Item
            label="Test Name"
            name="testName"
            rules={[{ required: true, message: 'Please enter the test name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please select the test date!' }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            label="Result"
            name="result"
            rules={[{ required: true, message: 'Please enter the result!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Comments"
            name="comments"
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {isEditing ? 'Save Changes' : 'Add Test'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MedicalTests;
