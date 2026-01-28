import { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, Divider } from 'antd';
import { Column } from '@ant-design/charts';
import { getStatus, StatusItem } from '@/services/status';

interface ChartData {
  name: string;
  value: number;
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<StatusItem[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getStatus();
      const statusData = response.data || [];
      setData(statusData);
    } catch (error) {
      console.error('获取数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // 每30秒刷新一次数据
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const columnConfig = (data: ChartData[]) => ({
    data,
    xField: 'name',
    yField: 'value',
    markBackground: {
      style: {
        fill: '#eee',
      },
    },
    axis: { y: false },
    scale: {
      y: {
        domain: [0, 1],
      },
    },
    // yAxis: {
    //   min: 0,
    //   max: 1,
    //   label: {
    //     formatter: '.0%',
    //   },
    // },
    // xAxis: {
    //   label: {
    //     style: {
    //       fontSize: 12,
    //     },
    //   },
    // },
    meta: {
      value: {
        alias: '使用率',
      },
      name: {
        alias: '指标',
      },
    },
    label: {
      // position: 'top' as const,
      textBaseline: 'bottom',
      formatter: (datum: any) => {
        return `${(datum * 100).toFixed(1)}%`;
      },
    },
  });

  return (
    <div style={{ padding: '24px' }}>
      <Spin spinning={loading}>
        <Row gutter={[16, 16]}>
          {data.map((item, index) => (
            <Col xs={24} sm={12} md={12} lg={6} xl={6} key={index}>
              <Card
                title={`NPU ${index + 1}`}
                style={{ borderColor: '#d9d9d9' }}
              >
                <div style={{ marginBottom: '16px' }}>
                  {/* <div style={{ marginBottom: '8px', fontWeight: 500 }}>内存使用率</div> */}
                  <Column
                    {...columnConfig([
                      { name: 'MEM', value: item.mem },
                      { name: 'AI Core', value: item.npu },
                    ])}
                    height={240}
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Spin>
    </div>
  );
};

export default Dashboard;
