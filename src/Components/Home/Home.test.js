import { render, screen, within } from '@testing-library/react';
import App from '../../App'
import userEvent from '@testing-library/user-event'

test('displays input field', () => {
    render(<App />);
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByLabelText('What is your name?')).toBeInTheDocument()
});

test('can type into username field', async () => {
    render(<App />);
    let username = 'test_username'
    let textbox = screen.getByRole('textbox')
    userEvent.type(textbox, username)
    userEvent.type(textbox, '{enter}')

    let label = await screen.findByText(/Welcome/)

    expect(label).toBeInTheDocument()
});

test('autocomplete box displays after entering username', async () => {
    render(<App />);
    let username = 'test_username'
    let textbox = screen.getByRole('textbox')
    userEvent.type(textbox, username)
    userEvent.type(textbox, '{enter}')

    let autocomplete = await screen.findByRole('combobox')

    expect(autocomplete).toBeInTheDocument()
});

test('can select a template', async () => {
    render(<App />);
    let username = 'test_username'
    let textbox = screen.getByRole('textbox')
    userEvent.type(textbox, username)
    userEvent.type(textbox, '{enter}')

    const autocomplete = screen.getByTestId('autocomplete');

    // const input = within(autocomplete).querySelector('input')

    // autocomplete.focus()
    // // assign value to input field
    // fireEvent.change(input, { target: { value: value } })
    // await wait()
    // // navigate to the first item in the autocomplete box
    // fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    // await wait()
    // // select the first item
    // fireEvent.keyDown(autocomplete, { key: 'Enter' })
    // await wait()
    // // check the new value of the input field
    // expect(input.value).toEqual('some_value')
});