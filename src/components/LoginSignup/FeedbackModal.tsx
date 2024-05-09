import React from 'react';

interface FeedbackModalProps {
    // Define your props here
}

const FeedbackModal: React.FC<FeedbackModalProps> = (props) => {
    return (
        <iframe
            style={{ border: 'none' }}
            src="https://forms.gle/rMb2fNQPgHiSWPBq7" height="500px" width="100%" title="Leave Feedback"></iframe>
    );
};

export default FeedbackModal;