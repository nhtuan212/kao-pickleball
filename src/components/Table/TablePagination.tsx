import { useContext, useEffect } from "react";
import { Pagination } from "../Pagination";
import { TableContext } from "./TableProvider";
import { TableProps } from ".";
import { twMerge } from "tailwind-merge";

export default function TablePagination({ ...props }: TableProps["paginationMode"]) {
    //** Destructuring */
    const { total, rowsPerPage, onPageChange } = props || {};

    //** Context */
    const { setCurrentPage, setRowsPerPage } = useContext(TableContext);

    //** Functions */
    const handleOnChange = (page: number) => {
        if (typeof onPageChange === "function") {
            return onPageChange(page);
        }

        setCurrentPage(page);
    };

    //** Effects */
    useEffect(() => {
        setRowsPerPage(rowsPerPage);
    }, [setRowsPerPage, rowsPerPage]);

    //** Render */
    return (
        <Pagination
            className={twMerge("flex justify-end", props.className)}
            total={Math.ceil(total / rowsPerPage)}
            onPageChange={handleOnChange}
        />
    );
}
