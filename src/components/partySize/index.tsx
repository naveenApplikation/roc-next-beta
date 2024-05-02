import React, { useState } from 'react';
import './index.css';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';



interface PaginationProps {
    totalItems: number; // Total number of items
    itemsPerPage: number; // Number of items per page
    onPageChange: (page: number) => void; // Callback function when page changes
}

const PartySize: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Number of page numbers to display at a time
    const pageRange = 10;

    // State for the current page
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Calculate the range of pages to display based on the current page
    const startPage = Math.floor((currentPage - 1) / pageRange) * pageRange + 1;
    const endPage = Math.min(startPage + pageRange - 1, totalPages);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        onPageChange(page);
    };

    // Handle next and previous page ranges
    const handleNextRange = () => {
        if (endPage < totalPages) {
            handlePageChange(endPage + 1);
        }
    };

    const handlePreviousRange = () => {
        if (startPage > 1) {
            handlePageChange(startPage - pageRange);
        }
    };

    return (
        <div className="pagination">
            {/* Previous page range button */}
            <button
                className="pagination-button"
                onClick={handlePreviousRange}
                disabled={startPage === 1}
            >
                <LeftOutlined />
            </button>

            <div className="numbers_count">
                {/* Page number buttons */}
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                    const page = startPage + i;
                    return (

                        <button
                            key={page}
                            className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    );
                })}

            </div>
            {/* Next page range button */}
            <button
                className="pagination-button"
                onClick={handleNextRange}
                disabled={endPage === totalPages}
            >
                <RightOutlined />
            </button>
        </div>
    );
};

export default PartySize;
