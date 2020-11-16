import * as React from 'react';
import './instruction.scss';
import { Typography, Space } from 'antd';
import {
  LeftCircleOutlined,
  DownCircleOutlined,
  UpCircleOutlined,
  RightCircleOutlined,
} from '@ant-design/icons';

type Props = {
  size: number;
};

export const Instruction: React.FC<Props> = ({ size }) => {
  const { Title } = Typography;
  const fontSize = 36;
  const colorIcon = '#595959';
  return (
    <div className="instruction">
      <div className="instruction__content">
        <Title level={4}>
          Move tiles in grid to order them from 1 to {size * size - 1}
          <br/> The game starts with the movement of the tiles
        </Title>
      </div>
      <div className="instruction__icons">
        <UpCircleOutlined
          style={{
            fontSize: `${fontSize}px`,
            color: colorIcon,
            marginBottom: '3px',
          }}
        />
        <Space size={2}>
          <LeftCircleOutlined
            style={{ fontSize: `${fontSize}px`, color: colorIcon }}
          />
          <DownCircleOutlined
            style={{ fontSize: `${fontSize}px`, color: colorIcon }}
          />
          <RightCircleOutlined
            style={{ fontSize: `${fontSize}px`, color: colorIcon }}
          />
        </Space>
      </div>
    </div>
  );
};
