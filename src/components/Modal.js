import React from 'react';
import './Modal.css'; // Import the CSS for the modal

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // Don't render anything if the modal is not open

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    &times; {/* Close button */}
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
