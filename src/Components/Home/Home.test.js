import { render, screen } from '@testing-library/react';
import App from '../../App'
import userEvent from '@testing-library/user-event'
import Home from './Home'

it('displays What is your name? input field if logged out', () => {
    render(<Home />);
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByLabelText('What is your name?')).toBeInTheDocument()
});

it('can type into username field', async () => {
    render(<Home />);
    let username = 'Floyd'
    let nameField = screen.getByLabelText('What is your name?')

    userEvent.type(nameField, username)

    expect(nameField).toHaveValue(username)
});