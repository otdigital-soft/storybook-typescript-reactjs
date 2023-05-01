import { LayoutTabs } from 'components/LayoutSwitch/LayoutSwitch.styled';
import { ReactComponent as CardOutlined } from 'assets/icons/CardOutlined.svg';
import { ReactComponent as ListOutlined } from 'assets/icons/ListOutlined.svg';
import useLayoutSwitch from 'components/LayoutSwitch/useLayoutSwitch';
import { LayoutType } from 'components/LayoutSwitch/LayoutSwitchProvider';

const LayoutSwitch = () => {
  const { changeLayoutType, layoutType } = useLayoutSwitch();

  return (
    <LayoutTabs
      activeKey={layoutType}
      onChange={(activeKey) => changeLayoutType(activeKey as LayoutType)}
    >
      <LayoutTabs.TabPane
        tab={
          <span className="anticon">
            <CardOutlined title="Cards" />
          </span>
        }
        key={LayoutType.Card}
      />
      <LayoutTabs.TabPane
        tab={
          <span className="anticon">
            <ListOutlined title="List" />
          </span>
        }
        key={LayoutType.List}
      />
    </LayoutTabs>
  );
};

export default LayoutSwitch;
