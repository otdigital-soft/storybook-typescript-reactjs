import logo from 'assets/images/logo.svg';
import { Flexbox } from 'components/Box';
import { Container } from './Public.styled';

interface PublicProps {
  children: JSX.Element;
}

const Public = ({ children }: PublicProps) => {
  return (
    <Container>
      <Flexbox justifyContent="center">
        <img src={logo} alt="Stepwise Logo" />
      </Flexbox>
      {children}
    </Container>
  );
};

export default Public;
