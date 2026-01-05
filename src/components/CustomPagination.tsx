import React from "react";

const styles = {
    wrapper: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px 0",
        fontFamily: "'Nunito Sans', sans-serif",
    },
    paginationStrip: {
        display: "flex",
        flexDirection: "row" as const,
        alignItems: "center",
        gap: "4px",
    },
    textBtn: {
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontFamily: "'Nunito Sans', sans-serif",
        fontSize: "14px",
        fontWeight: 600,
        color: "#333333",
        padding: "0 10px",
        display: "flex",
        alignItems: "center",
        height: "22px",
    },
    textBtnDisabled: {
        color: "#CCCCCC",
        cursor: "not-allowed",
    },
    pageBtn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "24px",
        height: "24px",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: 600,
        fontFamily: "'Open Sans', sans-serif",
        transition: "all 0.2s ease",
        background: "#FFFFFF",
        border: "1px solid #F1F1F1",
        color: "#333333",
    },
    pageBtnActive: {
        background: "#4A58EC",
        border: "1px solid #4A58EC",
        color: "#FFFFFF",
    },
    ellipsis: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "24px",
        height: "24px",
        fontSize: "12px",
        color: "#333333",
        background: "transparent",
        border: "none",
    },
};

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
                                                         currentPage = 1,
                                                         totalItems = 0,
                                                         itemsPerPage = 10,
                                                         onPageChange,
                                                     }) => {
    const safeItemsPerPage = itemsPerPage < 1 ? 10 : itemsPerPage;
    const totalPages = Math.max(1, Math.ceil(totalItems / safeItemsPerPage));

    const getPageNumbers = () => {
        const pages = [];
        pages.push(1);

        let startPage, endPage;

        if (totalPages <= 5) {
            startPage = 2;
            endPage = totalPages;
        } else {
            if (currentPage <= 3) {
                startPage = 2;
                endPage = 4;
            } else if (currentPage >= totalPages - 2) {
                startPage = totalPages - 3;
                endPage = totalPages - 1;
            } else {
                startPage = currentPage - 1;
                endPage = currentPage + 1;
            }
        }

        if (startPage > 2) {
            pages.push("...");
        }

        for (let i = startPage; i <= endPage; i++) {
            if (i > 1 && i < totalPages) {
                pages.push(i);
            }
        }

        if (endPage < totalPages - 1) {
            pages.push("...");
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div style={styles.wrapper}>
            <div style={styles.paginationStrip}>
                {/* PREV BUTTON */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                        ...styles.textBtn,
                        ...(currentPage === 1 ? styles.textBtnDisabled : {}),
                    }}
                >
                    Prev
                </button>

                {/* PAGE NUMBERS */}
                {pages.map((page, index) => {
                    if (page === "...") {
                        return (
                            <div key={`ellipsis-${index}`} style={styles.ellipsis}>
                                ...
                            </div>
                        );
                    }

                    const pageNum = page as number;
                    const isActive = pageNum === currentPage;

                    return (
                        <button
                            key={index}
                            onClick={() => onPageChange(pageNum)}
                            style={{
                                ...styles.pageBtn,
                                ...(isActive ? styles.pageBtnActive : {}),
                            }}
                        >
                            {pageNum}
                        </button>
                    );
                })}

                {/* NEXT BUTTON */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                        ...styles.textBtn,
                        ...(currentPage === totalPages ? styles.textBtnDisabled : {}),
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CustomPagination;