import { render, screen } from '@testing-library/react'
import MarkdownRenderer from './MarkdownRenderer';

const serializedOptions = {
    NAME: "TEST NAME",
    AGE: "99"
}

const template = {
    "id": 1,
    "title": "Letter to Santa",
    "body": "## Dear Santa,\nMy name is {NAME}. I am {AGE} years old. I'm really looking forward to Christmas and your visit! I've been a really {DISPOSITION} {GENDER} this year!\nThere are a few very special things I would really like. They are:\n\n{ITEM_LIST}\n\nYour friend,\n{NAME}\n\n{SALUTATION}",
    "created_at": "2021-11-06T02:11:28.654Z",
    "updated_at": "2021-11-06T02:11:28.654Z"
}

const templateOptions = [
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

const markdownRendererWithoutSerializedOptions = <MarkdownRenderer template={template} templateOptions={templateOptions} serializedOptions={null} />
const markdownRendererWithSerializedOptions = <MarkdownRenderer template={template} templateOptions={templateOptions} serializedOptions={serializedOptions} />

it('displays markdown', () => {
    render(markdownRendererWithSerializedOptions);
    expect(screen.getByText(/My name is/i)).toBeInTheDocument()

})

it('displays markdown with header formatting', () => {
    render(markdownRendererWithSerializedOptions);
    expect(screen.getByRole('heading', { name: /Dear Santa/i })).toBeInTheDocument()
})

it('displays default tag values with no serialized options', () => {
    render(markdownRendererWithoutSerializedOptions);
    for (let [key, value] of Object.entries(serializedOptions)) {
        let reg = new RegExp(value, "gi")
        expect(screen.queryAllByText(reg)).toHaveLength(0)
    }
})

it('displays replaced tags with serialized options', () => {
    render(markdownRendererWithSerializedOptions);
    for (let [key, value] of Object.entries(serializedOptions)) {
        let reg = new RegExp(value, "gi")
        expect(screen.getAllByText(reg)[0]).toBeInTheDocument()
    }
})

it('displays markdown with list formatting', () => {
    render(markdownRendererWithoutSerializedOptions);
    expect(screen.getByRole('list')).toBeInTheDocument()
})