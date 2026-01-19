import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];

    pages.push(1);

    // Calculate range around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push("...");
    }

    // Add pages in range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-1">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        className="border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Link href={currentPage === 1 ? "#" : `?page=${currentPage - 1}`}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Link>
      </Button>

      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <Button
            key={`page-${page}`}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            className={
              currentPage === page
                ? "bg-pink-500 hover:bg-pink-600"
                : "border-gray-800 hover:border-pink-500 hover:text-pink-500"
            }
            onClick={() => onPageChange(page as number)}
          >
            <Link href={`?page=${page}`}>{page}</Link>
          </Button>
        ),
      )}

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        className="border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Link
          href={currentPage === totalPages ? "#" : `?page=${currentPage + 1}`}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Link>
      </Button>
    </div>
  );
}
