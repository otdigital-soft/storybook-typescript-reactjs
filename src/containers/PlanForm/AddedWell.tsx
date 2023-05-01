import { Col } from 'antd';
import { ReactComponent as DragOutlined } from 'assets/icons/DragOutlined.svg';
import Box, { Flexbox } from 'components/Box';
import DraggableCard from 'components/DraggableCard';
import { Row } from 'components/Grid';
import { Text, Title } from 'components/Typography';
import { FormWellValues, labels } from 'containers/PlanForm/form';
import { useField } from 'formik';
import { forwardRef } from 'react';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { prettyPlaceholder } from 'utils/format';
import {
  Timeline,
  TimelineDotContainer,
  TimelineDotIcon,
  WellContainer,
  WellFormInput,
} from './AddedWell.styled';

interface AddedWellProps {
  name: string;
  onRemove: () => void;
  isFirst: boolean;
  isLast: boolean;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | undefined;
}

const AddedWell = forwardRef<HTMLDivElement, AddedWellProps>(
  (
    { isFirst, isLast, name, onRemove, draggableProps, dragHandleProps },
    ref,
  ) => {
    const [, meta] = useField<FormWellValues>(name);
    return (
      <Box {...draggableProps} ref={ref}>
        <Flexbox position="relative">
          <Timeline isFirst={isFirst} isLast={false} dotPosition={40} />
          <TimelineDotContainer marginTop={40}>
            <TimelineDotIcon />
          </TimelineDotContainer>
          <WellContainer
            alignItems="center"
            paddingX={24}
            paddingY={16}
            flexGrow={1}
            marginBottom={20}
          >
            <Row gutter={8} flexGrow={1}>
              <Col span={12}>
                <Flexbox alignItems="center" height="100%">
                  <Text
                    fontSize={32}
                    lineHeight={0}
                    type="secondary"
                    cursor="pointer"
                    title="Drag well"
                    {...dragHandleProps}
                  >
                    <DragOutlined />
                  </Text>
                  <Flexbox
                    flexDirection="column"
                    justifyContent="center"
                    height="100%"
                    marginLeft={8}
                  >
                    <Title level={5}>Move</Title>
                    <Text>From previous well</Text>
                  </Flexbox>
                </Flexbox>
              </Col>
              <Col span={12}>
                <WellFormInput
                  name={`${name}.distance_from_previous_location`}
                  formItemProps={{
                    label: labels.distance_from_previous_location,
                  }}
                  inputNumberProps={{
                    placeholder: prettyPlaceholder`Enter ${labels.distance_from_previous_location}`,
                  }}
                />
              </Col>
            </Row>
          </WellContainer>
        </Flexbox>
        <Flexbox position="relative">
          <Timeline isFirst={false} isLast={isLast} dotPosition={21} />
          <TimelineDotContainer marginTop={21}>
            <TimelineDotIcon />
          </TimelineDotContainer>
          <DraggableCard
            onRemove={onRemove}
            dragHandleProps={dragHandleProps}
            title={meta.value.name}
            elementName="well"
            flexGrow={1}
          >
            <Flexbox flexDirection="column" flexGrow={1}>
              <Flexbox flexDirection="column">
                <Box>Distances to</Box>
                <Row gutter={[30, 20]}>
                  <Col span={12}>
                    <WellFormInput
                      name={`${name}.distance_to_helicopter_base`}
                      formItemProps={{
                        label: 'Helicopter base (nm)',
                      }}
                      inputNumberProps={{
                        placeholder: prettyPlaceholder`Enter ${labels.distance_to_helicopter_base}`,
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <WellFormInput
                      name={`${name}.distance_to_psv_base`}
                      formItemProps={{
                        label: 'PSV base (nm)',
                      }}
                      inputNumberProps={{
                        placeholder: prettyPlaceholder`Enter ${labels.distance_to_psv_base}`,
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <WellFormInput
                      name={`${name}.distance_to_ahv_base`}
                      formItemProps={{
                        label: 'AHV base (nm)',
                      }}
                      inputNumberProps={{
                        placeholder: prettyPlaceholder`Enter ${labels.distance_to_ahv_base}`,
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <WellFormInput
                      name={`${name}.distance_to_tug_base`}
                      formItemProps={{
                        label: 'Tug base (nm)',
                      }}
                      inputNumberProps={{
                        placeholder: prettyPlaceholder`Enter ${labels.distance_to_tug_base}`,
                      }}
                    />
                  </Col>
                </Row>
              </Flexbox>
              <Flexbox flexDirection="column" marginTop={16}>
                <Box>Time</Box>
                <Row gutter={[30, 20]}>
                  <Col span={12}>
                    <WellFormInput
                      name={`${name}.jackup_positioning_time`}
                      formItemProps={{
                        label: labels.jackup_positioning_time,
                      }}
                      inputNumberProps={{
                        placeholder: `Enter ${labels.jackup_positioning_time}`,
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <WellFormInput
                      name={`${name}.semi_positioning_time`}
                      formItemProps={{
                        label: labels.semi_positioning_time,
                      }}
                      inputNumberProps={{
                        placeholder: `Enter ${labels.semi_positioning_time}`,
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <WellFormInput
                      name={`${name}.operational_time`}
                      formItemProps={{
                        label: labels.operational_time,
                      }}
                      inputNumberProps={{
                        placeholder: prettyPlaceholder`Enter ${labels.operational_time}`,
                      }}
                    />
                  </Col>
                </Row>
              </Flexbox>
            </Flexbox>
          </DraggableCard>
        </Flexbox>
      </Box>
    );
  },
);

export default AddedWell;
