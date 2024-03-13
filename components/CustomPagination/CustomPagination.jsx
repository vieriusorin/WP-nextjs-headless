import { useRouter } from "next/navigation";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../ui/pagination";

export const PaginationCustom = ({
	totalItems,
	itemsPerPage,
	currentPage,
	setCurrentPage,
}) => {
	let pages = [];
	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pages.push(i);
	}

	const router = useRouter();

	const handlePrevPage = () => {
		if (currentPage !== 1) {
			setCurrentPage(currentPage - 1);
			router.push(`${window.location.pathname}`, {
				shallow: true,
				search: `?page=${currentPage - 1}`,
			});
		}
	};

	const handleNextPage = (e) => {
		e.preventDefault();

		if (currentPage !== Math.ceil(totalItems / itemsPerPage)) {
			setCurrentPage(currentPage + 1);
		}
	};

	return (
		<Pagination>
			<PaginationContent className='justify-center'>
				<PaginationItem>
					<PaginationPrevious
						href='#'
						aria-disabled={currentPage === 1}
						onClick={handlePrevPage}
					/>
				</PaginationItem>
				{pages.map((page) => (
					<PaginationItem key={page}>
						<PaginationLink href='#' onClick={() => setCurrentPage(page)}>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationEllipsis />
				<PaginationItem>
					<PaginationNext href='#' onClick={handleNextPage} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
