import {
  render,
  screen,
} from '@testing-library/react';
import { PageWrapper } from './PageWrapper';

jest.mock('../components/AppBar/ApplicationBar', () => ({
  ApplicationBar: () => <p>ApplicationBar component</p>,
}));

it('should render applicationBar and given children', () => {
  render(
    <PageWrapper>
      <p>test</p>
    </PageWrapper>
  );

  expect(screen.getByText(/applicationbar component/i)).toBeInTheDocument();
  expect(screen.getByText(/test/i)).toBeInTheDocument();
});
