import { Col, Collapse, Result, Row, Spin } from 'antd';
import Box from 'components/Box';
import Center from 'components/Center';
import { Title } from 'components/Typography';
import useFaq from './useFaq';

const Faq = () => {
  const {
    data: faqData,
    isLoading: isFaqDataLoading,
    error: isError,
  } = useFaq();

  if (isFaqDataLoading) {
    return (
      <Center>
        <Spin size="large" />
      </Center>
    );
  }

  if (isError || !faqData) {
    return <Result status="error" subTitle="Unable to load FAQ data" />;
  }

  return (
    <>
      <Row gutter={[54, 32]}>
        {faqData.map((faq) => (
          <Col span={12} key={faq.id}>
            <Title level={4}>{faq.title}</Title>
            <Box marginTop={28}>
              <Collapse>
                {faq.elements.map((faqElement) => (
                  <Collapse.Panel
                    key={faqElement.id}
                    header={faqElement.question}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: faqElement?.answer || '',
                      }}
                    />
                  </Collapse.Panel>
                ))}
              </Collapse>
            </Box>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Faq;
