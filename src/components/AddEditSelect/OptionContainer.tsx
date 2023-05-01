import { Flexbox } from 'components/Box';
import { EditButton } from './AddEditSelect.styled';
import { EditOutlined } from '@ant-design/icons';
import React from 'react';
import { ButtonProps } from 'antd/lib/button/button';

type OptionContainerProps = {
  children: React.ReactNode;
  editable: boolean;
  onClick: ButtonProps['onClick'];
};

function OptionContainer({
  children,
  editable,
  onClick,
}: OptionContainerProps) {
  return (
    <Flexbox justifyContent="space-between" alignItems="center" gap={4}>
      {children}
      {editable ? (
        <EditButton
          type="text"
          icon={<EditOutlined />}
          size="small"
          className="ant-select-item-edit"
          onClick={onClick}
        />
      ) : null}
    </Flexbox>
  );
}

export default OptionContainer;
