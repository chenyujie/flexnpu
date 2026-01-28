import { useState } from 'react';
import { Button, Form, Card, InputNumber, Select, message } from 'antd';

const Deploy: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeploy = async (values: any) => {
    setLoading(true);
    try {
      console.log('部署配置:', values);
      // 这里可以添加实际的部署逻辑
      message.success('部署请求已提交');
      form.resetFields();
    } catch (error) {
      message.error('部署失败');
      console.error('部署失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card title="推理服务部署" bordered={false}>
        <Form form={form} layout="vertical" onFinish={handleDeploy}>
          <Form.Item
            label="模型选择"
            name="model"
            rules={[{ required: true, message: '请选择模型' }]}
          >
            <Select placeholder="请选择模型">
              <Select.Option value="model1">模型 1</Select.Option>
              <Select.Option value="model2">模型 2</Select.Option>
              <Select.Option value="model3">模型 3</Select.Option>
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

          <Form.Item
            label="vCPU"
            name="vcpu"
            rules={[{ required: true, message: '请输入vCPU数量' }]}
          >
            <InputNumber min={1} placeholder="请输入vCPU数量" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="内存 (GB)"
            name="memory"
            rules={[{ required: true, message: '请输入内存大小' }]}
          >
            <InputNumber min={1} placeholder="请输入内存大小" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="AI core"
            name="aiCore"
            rules={[{ required: true, message: '请输入AI core数量' }]}
          >
            <InputNumber min={1} placeholder="请输入AI core数量" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="显存 (GB)"
            name="vram"
            rules={[{ required: true, message: '请输入显存大小' }]}
          >
            <InputNumber min={1} placeholder="请输入显存大小" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              开始部署
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Deploy;
