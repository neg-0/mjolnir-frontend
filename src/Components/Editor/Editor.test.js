import { render, screen, state } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom';
import Editor from './Editor';

const testPackage = {
    "testHistoryObject": {
        "history_id": 2,
        "user_id": 2,
        "template_id": 1,
        "file_name": "NOT Mario's Letter",
        "serialized_options": {
            "NAME": "I'm NOT Mario!",
            "AGE": "99"
        },
        "created_at": "2021-11-06T02:11:28.659Z",
        "updated_at": "2021-11-06T02:11:28.659Z"
    },
    "testTemplate": {
        "id": 1,
        "title": "Letter to Santa",
        "body": "## Dear Santa,\nMy name is {NAME}. I am {AGE} years old. I'm really looking forward to Christmas and your visit! I've been a really {DISPOSITION} {GENDER} this year!\nThere are a few very special things I would really like. They are:\n\n{ITEM_LIST}\n\nYour friend,\n{NAME}\n\n{SALUTATION}",
        "created_at": "2021-11-06T02:11:28.654Z",
        "updated_at": "2021-11-06T02:11:28.654Z"
    },
    "testTemplateOptions": [
        {
            "id": 1,
            "template_id": 1,
            "option_name": "NAME",
            "option_type": "string",
            "option_value": "Little Timmy",
            "created_at": "2021-11-06T02:11:28.665Z",
            "updated_at": "2021-11-06T02:11:28.665Z"
        },
        {
            "id": 2,
            "template_id": 1,
            "option_name": "AGE",
            "option_type": "number",
            "option_value": "7",
            "created_at": "2021-11-06T02:11:28.665Z",
            "updated_at": "2021-11-06T02:11:28.665Z"
        },
        {
            "id": 3,
            "template_id": 1,
            "option_name": "DISPOSITION",
            "option_type": "dropdown",
            "option_value": [
                "good",
                "naughty"
            ],
            "created_at": "2021-11-06T02:11:28.665Z",
            "updated_at": "2021-11-06T02:11:28.665Z"
        },
        {
            "id": 4,
            "template_id": 1,
            "option_name": "GENDER",
            "option_type": "dropdown",
            "option_value": [
                "boy",
                "girl"
            ],
            "created_at": "2021-11-06T02:11:28.665Z",
            "updated_at": "2021-11-06T02:11:28.665Z"
        },
        {
            "id": 5,
            "template_id": 1,
            "option_name": "ITEM_LIST",
            "option_type": "unordered_list",
            "option_value": [
                "train set",
                "pony",
                "transformer"
            ],
            "created_at": "2021-11-06T02:11:28.665Z",
            "updated_at": "2021-11-06T02:11:28.665Z"
        },
        {
            "id": 6,
            "template_id": 1,
            "option_name": "SALUTATION",
            "option_type": "boolean",
            "option_value": "Merry Christmas",
            "created_at": "2021-11-06T02:11:28.665Z",
            "updated_at": "2021-11-06T02:11:28.665Z"
        }
    ]
}

const editorRenderer = (<Router><Editor testTemplate={testPackage.testTemplate} testTemplateOptions={testPackage.testTemplateOptions} testHistoryObject={testPackage.testHistoryObject} /></Router>)

it('displays editor paper', () => {
    render(editorRenderer);
    expect(screen.getByTestId('editor')).toBeInTheDocument()
})

xit('displays markdown without any formatting', () => {
    let testMarkdown = "test"
    render(editorRenderer);
    expect(screen.getByText(testMarkdown)).toBeInTheDocument()
})

xit('displays markdown with header formatting', () => {
    render(editorRenderer);
    expect(screen.getByRole('heading', { name: 'test' })).toBeInTheDocument()
})

xit('displays markdown with list formatting', () => {
    let list = `
    - item 1
    - item 2
    - item 3`
    render(editorRenderer);
    expect(screen.getByRole('list')).toBeInTheDocument()
})