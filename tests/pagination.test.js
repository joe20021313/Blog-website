
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../app/components/pagination'; 
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Pagination componenent', () => {
  let pushMock;

  beforeEach(() => {
    pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });
  });

  test('should render pagination buttons', () => {
    render(<Pagination currentPage={2} totalPages={5} />);

   
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

   
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();

   
   
  });

  test('go to correct page when button is clicked', () => {
    render(<Pagination currentPage={2} totalPages={5} />);

    
    fireEvent.click(screen.getByText('3'));
    expect(pushMock).toHaveBeenCalledWith('/?page=3');

 
    fireEvent.click(screen.getByText('<'));
    expect(pushMock).toHaveBeenCalledWith('/?page=1');


    fireEvent.click(screen.getByText('>'));
    expect(pushMock).toHaveBeenCalledWith('/?page=3');
  });

  test('should not render a previous button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} />);

    
    expect(screen.queryByText('<')).not.toBeInTheDocument();
  });

  test('should not render a next button on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} />);
    
   
    expect(screen.queryByText('>')).not.toBeInTheDocument();
  });
});
