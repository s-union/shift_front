"use client";

import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement(".App");

type HomeProps = {
    modalIsOpen: boolean;
    content: string;
};

export default function ModalEx({ modalIsOpen: initialModalIsOpen, content }: HomeProps) {
    const [modalIsOpen, setIsOpen] = useState(initialModalIsOpen);

    return (
        <div className="App test-center">
            <button onClick={() => setIsOpen(true)}>Open Modal</button>
            <Modal isOpen={modalIsOpen}>
                <button onClick={() => setIsOpen(false)}>Close Modal</button>
                <h2>{content}</h2>
            </Modal>
        </div>
    );
}