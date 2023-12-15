import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';  // userEvent ko import karo
import configureStore from 'redux-mock-store';
import PremiumNav from './PremiumNav';

const mockStore = configureStore();
const initialState = { theme: { darkMode: false } };
const store = mockStore(initialState);

describe('PremiumNav Component', () => {
  test('PremiumNav mock data aur Redux store ke saath sahi se render hota hai', async () => {
    render(
      <Provider store={store}>
        <PremiumNav onLogoutClick={() => {}} />
      </Provider>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
    expect(screen.getByText('change Theme')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('Download button pe click hone par handleDownload function call hoti hai', async () => {
    render(
      <Provider store={store}>
        <PremiumNav onLogoutClick={() => {}} />
      </Provider>
    );

    // Download button pe click simulate karo
    userEvent.click(screen.getByRole('button', { name: /Download/i }));

    // handleDownload function call hone ka wait karo
    await waitFor(() => {
      expect(store.getActions()).toContainEqual({ type: 'expenses/downloadCSV' });
    });
  });

  test('Theme Toggle Switch pe click hone par handleToggleTheme function call hoti hai', async () => {
    render(
      <Provider store={store}>
        <PremiumNav onLogoutClick={() => {}} />
      </Provider>
    );

    // Theme Toggle Switch pe click simulate karo
    userEvent.click(screen.getByLabelText('change Theme'));

    // handleToggleTheme function call hone ka wait karo
    await waitFor(() => {
      expect(store.getActions()).toContainEqual({ type: 'theme/toggleTheme' });
    });
  });

  // PremiumNav ke aur functionalities ke liye zarurat ke hisaab se aur test cases add karo
});
