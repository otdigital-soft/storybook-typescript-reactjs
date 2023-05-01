import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Space, TableProps, Tag } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { ColumnsType } from 'antd/lib/table/interface';
import Table from 'components/Table';

interface User {
  key: string;
  age: number;
  address: string;
  tags: string[];
  name: string;
}

export default {
  title: 'antd/Table',
  component: Table,
  argTypes: {
    bordered: {
      control: 'boolean',
    },
    expandable: {
      control: 'boolean',
      mapping: {
        true: {
          expandedRowRender: (record: User) => <span>{record.address}</span>,
        },
        false: undefined,
      },
    },
    title: {
      control: 'boolean',
      mapping: {
        true: () => 'Here is title',
        false: undefined,
      },
    },
    footer: {
      control: 'boolean',
      mapping: {
        true: () => 'Here is footer',
        false: undefined,
      },
    },
    pagination: {
      control: 'boolean',
      mapping: {
        true: { position: 'bottom' },
        false: undefined,
      },
    },
    rowSelection: {
      options: ['checkbox', 'radio', undefined],
      control: { type: 'select' },
      mapping: {
        checkbox: { type: 'checkbox' },
        radio: { type: 'radio' },
      },
    },
    loading: {
      control: 'boolean',
    },
    showHeader: {
      control: 'boolean',
    },
    size: {
      options: ['default', 'middle', 'small'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Table>;

const columns: ColumnsType<User> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 1,
    },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: {
      compare: (a, b) => a.age - b.age,
      multiple: 1,
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    sorter: {
      compare: (a, b) => a.address.localeCompare(b.address),
      multiple: 1,
    },
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: string[]) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: User[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const Template: ComponentStory<typeof Table> = (args) => (
  <Table columns={columns} dataSource={data} {...(args as TableProps<User>)} />
);

export const Default = Template.bind({});
Default.args = {
  bordered: false,
  loading: false,
  showHeader: true,
  size: 'default' as unknown as SizeType,
};
