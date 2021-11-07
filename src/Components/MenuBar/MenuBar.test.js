import { render, screen, state } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MenuBar from './MenuBar'
import { BrowserRouter as Router } from 'react-router-dom';

const menuBar = (<Router>
    <MenuBar />
</Router>)

it('displays menu button', () => {
    render(menuBar);
    let button = screen.getByTestId('menu-bar-button');
    expect(button).toBeInTheDocument()
})

it('drop down the drawer on click', async () => {
    render(menuBar);
    let button = screen.getByTestId('menu-bar-button');
    userEvent.click(button);

    let home = await screen.findByText('Home')
    expect(home).toBeInTheDocument();
})

it('renders the modal after clicking the login button', async () => {
    //open drawer
    render(menuBar);
    let button = screen.getByTestId('menu-bar-button');
    userEvent.click(button);

    //click modal after drawer is open
    let login = await screen.findByText('Login')
    userEvent.click(login);

    //should see the Please Login text
    const modal = await screen.findByText('Please Login');
    expect(modal).toBeInTheDocument();
})

it('can type into login fields', async () => {
    //open drawer
    render(menuBar);
    let button = screen.getByTestId('menu-bar-button');
    userEvent.click(button);

    //click modal after drawer is open
    let login = await screen.findByText('Login')
    userEvent.click(login);

    //type into fields 
    let usernameField = await screen.findByLabelText(/username/i)
    let passwordField = await screen.findByLabelText(/password/i)

    userEvent.type(usernameField, 'Brian')
    userEvent.type(passwordField, 'password')

    // check the value of the field
    expect(usernameField).toHaveValue('Brian')
    expect(passwordField).toHaveValue('password')
})