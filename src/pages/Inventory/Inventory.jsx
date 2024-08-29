import React, { useState, useEffect } from 'react';
import './Inventory.css';
import { Table, Button, Modal, Form, Input, Select, notification, Pagination, Input as AntInput } from 'antd';

const { Option } = Select;

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [filters, setFilters] = useState({ category: '', search: '' });

  useEffect(() => {
    fetchInventory();
  }, [pagination.current, pagination.pageSize, filters]);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const fetchedInventory = await fetchInventoryData(filters, pagination);
      setInventory(fetchedInventory.items);
      setPagination(prev => ({ ...prev, total: fetchedInventory.total }));
    } catch (error) {
      openNotification('Error', 'Failed to fetch inventory data.');
    } finally {
      setLoading(false);
    }
  };

  const openNotification = (message, description) => {
    notification.success({
      message,
      description,
      placement: 'topRight',
      duration: 3,
    });
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingItem(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    setInventory(inventory.filter(item => item.id !== record.id));
    openNotification('Item Deleted', `${record.name} has been removed from the inventory.`);
  };

  const handleModalOk = async (values) => {
    try {
      if (editingItem) {
        const updatedInventory = inventory.map(item =>
          item.id === editingItem.id ? { ...editingItem, ...values } : item
        );
        setInventory(updatedInventory);
        openNotification('Item Updated', `${values.name} has been updated.`);
      } else {
        const newItem = { id: Date.now(), ...values };
        setInventory([...inventory, newItem]);
        openNotification('Item Added', `${values.name} has been added to the inventory.`);
      }
      setIsModalVisible(false);
    } catch (error) {
      openNotification('Error', 'Failed to save item.');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handlePageChange = (page, pageSize) => {
    setPagination({ ...pagination, current: page, pageSize });
  };

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleCategoryChange = (value) => {
    setFilters({ ...filters, category: value });
  };

  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      filterDropdown: () => (
        <AntInput.Search
          placeholder="Search by name"
          onChange={handleSearchChange}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Medicines', value: 'Medicines' },
        { text: 'Equipment', value: 'Equipment' },
        { text: 'Supplies', value: 'Supplies' },
      ],
      onFilter: (value, record) => record.category === value,
      filterMultiple: false,
      onChange: handleCategoryChange,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      sorter: (a, b) => a.unitPrice - b.unitPrice,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h2>Inventory Management</h2>
        <Button className="add-item-btn" type="primary" onClick={handleAdd}>Add New Item</Button>
      </div>
      <Table
        className="inventory-table"
        columns={columns}
        dataSource={inventory}
        rowKey="id"
        loading={loading}
        pagination={false}
      />
      <Pagination
        className="pagination"
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onChange={handlePageChange}
      />
      <Modal
        title={editingItem ? "Edit Item" : "Add New Item"}
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        centered
      >
        <Form
          initialValues={editingItem || { name: '', category: '', quantity: 1, unitPrice: 0 }}
          onFinish={handleModalOk}
          layout="vertical"
        >
          <Form.Item
            label="Item Name"
            name="name"
            rules={[{ required: true, message: 'Please input the item name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select the category!' }]}
          >
            <Select>
              <Option value="Medicines">Medicines</Option>
              <Option value="Equipment">Equipment</Option>
              <Option value="Supplies">Supplies</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please input the quantity!' }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
          <Form.Item
            label="Unit Price"
            name="unitPrice"
            rules={[{ required: true, message: 'Please input the unit price!' }]}
          >
            <Input type="number" min={0} step="0.01" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingItem ? "Update Item" : "Add Item"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const fetchInventoryData = async (filters, pagination) => {
  // Replace with actual API call
  return {
    items: [
      { id: 1, name: 'Paracetamol', category: 'Medicines', quantity: 100, unitPrice: 5 },
      { id: 2, name: 'Syringe', category: 'Supplies', quantity: 200, unitPrice: 1 },
      { id: 3, name: 'Stethoscope', category: 'Equipment', quantity: 10, unitPrice: 150 },
    ].filter(item =>
      (!filters.category || item.category === filters.category) &&
      (!filters.search || item.name.toLowerCase().includes(filters.search.toLowerCase()))
    ),
    total: 3, // Replace with actual total count from API
  };
};

export default Inventory;
