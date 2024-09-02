

'use client';

import { useRouter } from 'next/navigation';
import { Box, Button } from '@mui/material';

export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter();

  const goToPage = (pageNumber) => {
    router.push(`/?page=${pageNumber}`);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem", gap: 1,   width: "clamp(250px, 100%, 2000px)",
      margin: "1 auto", paddingBottom:"2rem" }}>
      {currentPage > 1 && (
        <Button variant="outlined" onClick={() => goToPage(currentPage - 1)}>
          {"<"}
        </Button>
      )}
      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i + 1}
          onClick={() => goToPage(i + 1)}
          variant={currentPage === i + 1 ? 'contained' : 'outlined'}
        >
          {i + 1}
        </Button>
      ))}
      {currentPage < totalPages && (
        <Button variant="outlined" onClick={() => goToPage(currentPage + 1)}>
          {">"}
        </Button>
      )}
    </Box>
  );
}
