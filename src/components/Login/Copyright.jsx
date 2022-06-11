import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

/**
 * Login page copyright component.
 *
 * @param {object} props - root props
 * @param {object} props.sx - optional sx prop forwarded to root Typography
 * @returns {Copyright}
 */
export function Copyright({ sx }) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={sx}
    >
      {`Copyright © ACME ${new Date().getFullYear()}.`}
    </Typography>
  );
}

Copyright.propTypes = {
  sx: PropTypes.instanceOf(Object),
};

Copyright.defaultProps = {
  sx: {},
};
