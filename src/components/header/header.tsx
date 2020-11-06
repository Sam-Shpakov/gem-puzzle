import * as React from 'react';
import { Typography } from 'antd';

import './header.scss';

export const Header: React.FC = () => {
  const { Title } = Typography;
  return (
    <div className="header">
      <Title>Gem puzzle</Title>
    </div>
  );
};
