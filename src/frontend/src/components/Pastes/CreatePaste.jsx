import React from "react";
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
            const { data } = res;
            console.log(data)
            navigate(`/pastes/${data.id}`);
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
            <Form.Group className="mb-3">
                <Form.Label>Language</Form.Label>
                <Form.Control name="language" type="text" placeholder="Select Language" />
            </Form.Group>
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