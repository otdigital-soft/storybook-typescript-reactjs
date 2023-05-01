import { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectCardList from 'components/SelectCardList';
import { ProjectListFactory } from 'factories';

export default {
  title: 'components/SelectCardList',
  component: SelectCardList,
  argTypes: {
    onSelect: { action: 'on select' },
    onPageChange: { action: 'on page change' },
    onClickDetails: { action: 'on click details' },
  },
} as ComponentMeta<typeof SelectCardList>;

const Template: ComponentStory<typeof SelectCardList> = (args) => (
  <SelectCardList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: ProjectListFactory.buildList(3),
  page: 1,
  loading: false,
  error: false,
  pageSize: 10,
  count: 30,
};
