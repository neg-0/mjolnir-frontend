import { render, screen, state } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Editor from './Editor';

test('displays editor paper', () => {
    render(<Editor />);
    expect(screen.getByTestId('editor')).toBeInTheDocument()
})

test('displays markdown without any formatting', () => {
    let testMarkdown = "test"
    render(<Editor testMarkdown={testMarkdown} />);
    expect(screen.getByText(testMarkdown)).toBeInTheDocument()
})

test('displays markdown with header formatting', () => {
    render(<Editor testMarkdown="# test" />);
    expect(screen.getByRole('heading', { name: 'test' })).toBeInTheDocument()
})

test('displays markdown with list formatting', () => {
    let list = `
    - item 1
    - item 2
    - item 3`
    render(<Editor testMarkdown={list} />);
    expect(screen.getByRole('list')).toBeInTheDocument()
})