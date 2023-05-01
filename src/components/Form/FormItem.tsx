import { Form } from 'antd';
import styled, { css } from 'styled-components';
import { FormItemProps as AntdFormItemProps } from 'antd/lib/form/FormItem';

export type FormItemProps = AntdFormItemProps & { labelEllipsis?: boolean };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FormItem = styled(({ labelEllipsis, ...props }) => (
  <Form.Item {...props} />
))<{ labelEllipsis?: boolean }>`
  ${({ labelEllipsis }) =>
    labelEllipsis
      ? css`
          .ant-form-item-label label {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: inline-block;
          }
        `
      : undefined}
`;
