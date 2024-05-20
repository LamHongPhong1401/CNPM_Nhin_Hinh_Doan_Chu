import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import '../../../css/bootstrap.min.css';

interface DialogProps {
    title: string;
    body: string;
    show: boolean;
    handleClose: () => void;
}

const Dialog: React.FC<DialogProps> = (props: DialogProps) => {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Dialog;
