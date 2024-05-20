import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import '../../../css/bootstrap.min.css';

interface DialogProps {
    title: string;
    body: string;
    show: boolean;
    handleClose: () => void;
    className?: string
}

const Dialog: React.FC<DialogProps> = (props: DialogProps) => {
    return (
        <Modal className={props.className} show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Dialog;
