import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EmployeeForm from './EmployeeForm';
import axios from 'axios';

// Mocking axios
jest.mock('axios');

describe('EmployeeForm', () => {
  beforeEach(() => {
    // Mock successful response
    axios.post.mockResolvedValue({ data: { success: true } });
  });

  test('renders the form and submits successfully', async () => {
    render(<EmployeeForm selectedEmployee={null} onSave={() => {}} />);

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/First Name/), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/Last Name/), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText(/Gross Salary/), { target: { value: '60000' } });

    // Simulate form submission
    fireEvent.click(screen.getByText(/Save/));

    // Wait for the axios call to be made and verify it
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/employee', {
      employeeID: '',
      firstName: 'Jane',
      lastName: 'Smith',
      salutation: '',
      gender: '',
      profileColor: '',
      grossSalary: '60000',
    });
  });
});
