import React from 'react';
import Button from '@material-ui/core/Button';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const currentPageGroup = Math.ceil(currentPage / 10);
  const startPage = (currentPageGroup - 1) * 10 + 1;
  const endPage = Math.min(currentPageGroup * 10, totalPages);
  const pageButtons = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Button variant="outlined" color="primary" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} style={{ margin: '4px' }} >
        이전
      </Button>
      {pageButtons.map(page => (
        <Button key={page} variant="outlined" color="primary" onClick={() => onPageChange(page)} disabled={currentPage === page} style={{ margin: '4px' }} >
          {page}
        </Button>
      ))}
      <Button variant="outlined" color="primary" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} style={{ margin: '4px' }} >
        다음
      </Button>
    </div>
  );
};

export default Pagination;
