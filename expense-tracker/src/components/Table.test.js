import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';  // userEvent ko import karo
import Table from './Table';

describe('Table Component', () => {
  test('Table successfully render hota hai mock data ke saath', () => {
    // Mock data for expenses
    const expensesMock = [
      { id: 1, category: 'Food', amount: 50, description: 'Lunch' },
      { id: 2, category: 'Transportation', amount: 30, description: 'Bus fare' },
    ];

    // Table component ko mock data ke saath render karo
    render(<Table expenses={expensesMock} onDelete={() => {}} onEdit={() => {}} />);

    // Har expense ke liye sahi se render ho raha hai ya nahi, ye check karo
    expensesMock.forEach((expense) => {
      expect(screen.getByText(expense.category)).toBeInTheDocument();
      expect(screen.getByText(`₹${expense.amount}`)).toBeInTheDocument();
      expect(screen.getByText(expense.description)).toBeInTheDocument();
    });
  });

  test('Edit button pe click hone par onEdit function sahi expense ke saath call hota hai', () => {
    // Mock function for onEdit
    const onEditMock = jest.fn();
    const expensesMock = [
      { id: 1, category: 'Food', amount: 50, description: 'Lunch' },
      { id: 2, category: 'Transportation', amount: 30, description: 'Bus fare' },
    ];

    // Table component ko mock data aur onEditMock function ke saath render karo
    render(<Table expenses={expensesMock} onDelete={() => {}} onEdit={onEditMock} />);

    // Maan lo ki pehli row edit button ke sath render hui hai
    userEvent.click(screen.getAllByTestId('edit-button')[0]);  // userEvent ka istemal karke click simulate karo

    // Check karo ki onEdit function sahi expense ke saath call hua hai ya nahi
    expect(onEditMock).toHaveBeenCalledWith(expensesMock[0]);
  });

  test('Delete button pe click hone par onDelete function sahi expense ke saath call hota hai', () => {
    // Mock function for onDelete
    const onDeleteMock = jest.fn();
    const expensesMock = [
      { id: 1, category: 'Food', amount: 50, description: 'Lunch' },
      { id: 2, category: 'Transportation', amount: 30, description: 'Bus fare' },
    ];

    // Table component ko mock data aur onDeleteMock function ke saath render karo
    render(<Table expenses={expensesMock} onDelete={onDeleteMock} onEdit={() => {}} />);

    // Maan lo ki pehli row delete button ke sath render hui hai
    userEvent.click(screen.getAllByTestId('delete-button')[0]);  // userEvent ka istemal karke click simulate karo

    // Check karo ki onDelete function sahi expense ke saath call hua hai ya nahi
    expect(onDeleteMock).toHaveBeenCalledWith(expensesMock[0]);
  });
});
