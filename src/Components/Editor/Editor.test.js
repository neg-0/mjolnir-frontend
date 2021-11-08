import { render, screen, state } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom';
import Editor from './Editor';

const testPackage = {
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

it('displays the title', () => {
    render(editorRenderer);
    expect(screen.getByText(testPackage.testTemplate.title)).toBeInTheDocument()
})

it('displays markdown', () => {
    render(editorRenderer);
    expect(screen.getByText(/Dear Santa/i)).toBeInTheDocument()
})