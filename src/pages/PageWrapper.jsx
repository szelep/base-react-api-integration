import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import { ApplicationBar } from '../components/AppBar/ApplicationBar';

/**
 * Customized page wrapper with toolbar header.
 *
 * @param {object} props - root props
 * @param {Node} props.children - component children
 * @returns {Container}
 */
export function PageWrapper({ children }) {
  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 10,
        mb: 4,
      }}
    >
      <ApplicationBar />
      {children}
    </Container>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
