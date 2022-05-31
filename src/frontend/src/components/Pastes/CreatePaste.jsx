import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

import { useAuth } from "../Auth";
import config from "../../config";

export default function CreatePaste() {
    const auth = useAuth();
    const navigate = useNavigate();

    const { access_token } = auth.user;

    const onSubmitPaste = event => {
        event.preventDefault();

        const newPaste = new FormData(event.currentTarget);

        axios.post(`${config.apiUrl}/pastes/create`, newPaste, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${access_token}`,
            },
        }).then(res => {
            navigate(`/pastes/${res.data.id}`);
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <Form onSubmit={onSubmitPaste}>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control name="title" type="text" placeholder="Enter Title" />
            </Form.Group>
           <SelectListForLangs />
            <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={5} name="content" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Is private" name="is_private" />
            </Form.Group>
            <Button variant="primary" type="submit">Create Paste</Button>
        </Form>
    );
};


function SelectListForLangs() {
    const [langs, setLangs] = useState([]);

    useEffect(() => {
        fetch(
            'https://parseapi.back4app.com/classes/All_Programming_Languages?limit=50&order=ProgrammingLanguage&keys=ProgrammingLanguage',
            {
              headers: {
                'X-Parse-Application-Id': 'XpRShKqJcxlqE5EQKs4bmSkozac44osKifZvLXCL', // This is the fake app's application id
                'X-Parse-Master-Key': 'Mr2UIBiCImScFbbCLndBv8qPRUKwBAq27plwXVuv', // This is the fake app's readonly master key
              }
            }
        )
        .then(res => res.json())
        .then(data => setLangs(data.results));
    }, [langs]);

    return (
        <Form.Select name="language">
            <option>Select Language</option>
            {langs.map(lang => <option key={lang.objectId} value={lang.ProgrammingLanguage}>{lang.ProgrammingLanguage}</option>)}
    </Form.Select>
    );
}