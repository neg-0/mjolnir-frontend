import { render, screen } from '@testing-library/react';
import App from '../../App'

test('displays input field', () => {
    render(<App />);
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByLabelText('What is your name?')).toBeInTheDocument()
});