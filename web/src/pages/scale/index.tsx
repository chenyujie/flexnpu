import { useState } from 'react';
import { Button, Form, Card, InputNumber, Select, message } from 'antd';

const Scale: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const handleScale = async (values: any) => {
    setLoading(true);
    try {
      console.log('扩容配置:', values);
      // 这里可以添加实际的扩容逻辑
      message.success('扩容请求已提交');
      form.resetFields();
    } catch (error) {
      message.error('扩容失败');
      console.error('扩容失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card title="推理服务扩容" bordered={false}>
        <Form form={form} layout="vertical" onFinish={handleScale}>
          <Form.Item
            label="推理实例选择"
            name="instance"
            rules={[{ required: true, message: '请选择推理实例' }]}
          >
            <Select placeholder="请选择推理实例">
              <Select.Option value="instance1">实例 1</Select.Option>
              <Select.Option value="instance2">实例 2</Select.Option>
              <Select.Option value="instance3">实例 3</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="副本数"
            name="replicas"
            rules={[{ required: true, message: '请输入副本数' }]}
          >
            <InputNumber min={1} max={10} placeholder="请输入副本数" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="卡数"
            name="cards"
            rules={[{ required: true, message: '请输入卡数' }]}
          >
            <InputNumber min={1} max={8} placeholder="请输入卡数" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              开始扩容
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Scale;
