import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios'; // Mock axios
import ExpenseForm from './ExpenseForm';

// Mock axios for testing
jest.mock('axios');

// Mock the useDispatch and useSelector hooks
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Create a mock Redux store
const mockStore = configureStore([]);

describe('ExpenseForm Component', () => {
  it('renders ExpenseForm component and handles form submission', async () => {
    // Mock useSelector to return an empty array initially
    useSelector.mockReturnValue([]);

    // Mock useDispatch
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    // Mock axios post and get methods
    axios.post.mockResolvedValueOnce({});
    axios.get.mockResolvedValueOnce({ data: {} });

    render(
      <Provider store={mockStore({ expenses: { expenses: [] } })}>
        <ExpenseForm />
      </Provider>
    );

    // Check if the form elements are rendered
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit expense/i })).toBeInTheDocument();

    // Trigger form submission
    screen.getByLabelText(/amount/i).value = '50';
    screen.getByLabelText(/description/i).value = 'Groceries';
    screen.getByLabelText(/category/i).value = 'Food';
    screen.getByRole('button', { name: /submit expense/i }).click();

    // Wait for the asynchronous operations to complete
    await waitFor(() => {});

    // Check if the dispatch function was called with the expected action
    expect(dispatchMock).toHaveBeenCalledWith(expect.objectContaining({ type: 'SET_EXPENSES' }));
  });
});
