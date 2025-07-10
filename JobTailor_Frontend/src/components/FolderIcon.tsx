import React from 'react';
import { FolderOutlined, FolderOpenOutlined, FolderAddOutlined } from '@ant-design/icons';

interface FolderIconProps {
  type?: 'default' | 'open' | 'add';
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const FolderIcon: React.FC<FolderIconProps> = ({
  type = 'default',
  size = 24,
  color = '#1890ff',
  className = '',
  onClick
}) => {
  const iconProps = {
    style: { fontSize: size, color },
    className,
    onClick
  };

  switch (type) {
    case 'open':
      return <FolderOpenOutlined {...iconProps} />;
    case 'add':
      return <FolderAddOutlined {...iconProps} />;
    default:
      return <FolderOutlined {...iconProps} />;
  }
};

export default FolderIcon; 