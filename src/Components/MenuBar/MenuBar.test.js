import { render, screen, state } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'

test('displays menu button', () => {
    render(<App />);
    let button = screen.getByRole('button');
    expect(button).toBeInTheDocument()
})

it('drop down the drawer on click', async () => {
    render(<App />);
    let button = screen.getByRole('button')
    userEvent.click(button);

    let login = await screen.findByText('Login')
    expect(login).toBeInTheDocument();
})

it('renders the modal after clicking the login button', async () => {
    //open drawer
    render(<App />);
    let button = screen.getByRole('button')
    userEvent.click(button);

    //click modal after drawer is open
    let login = await screen.findByText('Login')
    userEvent.click(login);

    //should see the Please Login text
    const modal = await screen.findByText('Please Login');
    expect(modal).toBeInTheDocument();
})

it('can type into login feilds', async () => {
    //open drawer
    render(<App />);
    let button = screen.getByRole('button')
    userEvent.click(button);

    //click modal after drawer is open
    let login = await screen.findByText('Login')
    userEvent.click(login);

    //type into feilds 
    let textbox = await screen.findByPlaceholderText('Username/Email')
    userEvent.type(textbox, 'Brian')
})