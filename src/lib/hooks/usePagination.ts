import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface UsePaginationProps {
  onPageChange?: (page: number) => void;
  initialPage?: number;
  elementId?: string;
}

const usePagination = ({
  onPageChange,
  initialPage = 1,
}: UsePaginationProps = {}) => {
  const params = useSearchParams();
  const pageParam = params.get("page");
  const [page, setPage] = useState(
    pageParam ? parseInt(pageParam, 10) : initialPage
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    onPageChange?.(newPage);
  };

  return {
    page,
    handlePageChange,
  };
};

export default usePagination;
