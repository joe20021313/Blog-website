import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBox from '../app/components/searchbox';  
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('searchbox component', () => {

    let pushMock;

    beforeEach(() => {


        pushMock = jest.fn();
        useRouter.mockReturnValue({push: pushMock});
    });

    test('should send search query back to the main page to pass to api and display results', () => {


        render(<SearchBox/>);
        const input = screen.getByPlaceholderText('Search...');
        const submitButton = screen.getByRole('button', {name: /Search/i});


        fireEvent.change(input, {target : {value: 'test query'}});

        fireEvent.click(submitButton);

        expect(pushMock).toHaveBeenCalledWith('/?search=test%20query')
    });


});