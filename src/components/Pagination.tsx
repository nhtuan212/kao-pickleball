"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Pagination as PaginationHeroUI, PaginationProps } from "@heroui/react";

export type IPagination = {
    total: number;
    onPageChange?: (page: number) => void;
} & Omit<PaginationProps, "children">;

export function Pagination({ total = 0, onPageChange, ...props }: IPagination) {
    const [page, setPage] = useState(1);

    const getPageNumbers = () => {
        const pages: (number | "ellipsis")[] = [];

        pages.push(1);

        if (page > 3) {
            pages.push("ellipsis");
        }

        const start = Math.max(2, page - 1);
        const end = Math.min(total - 1, page + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (page < total - 2) {
            pages.push("ellipsis");
        }

        pages.push(total);

        return pages;
    };

    return (
        <div className="w-full max-w-2xs overflow-x-auto sm:max-w-full">
            <PaginationHeroUI {...props} className={twMerge("justify-center", props.className)}>
                <PaginationHeroUI.Content>
                    <PaginationHeroUI.Item>
                        <PaginationHeroUI.Previous
                            isDisabled={page === 1}
                            onPress={() => {
                                setPage(p => p - 1);
                                typeof onPageChange === "function" && onPageChange(page - 1);
                            }}
                        >
                            <PaginationHeroUI.PreviousIcon />
                            <span>Previous</span>
                        </PaginationHeroUI.Previous>
                    </PaginationHeroUI.Item>
                    {getPageNumbers().map((p, i) =>
                        p === "ellipsis" ? (
                            <PaginationHeroUI.Item key={`ellipsis-${i}`}>
                                <PaginationHeroUI.Ellipsis />
                            </PaginationHeroUI.Item>
                        ) : (
                            <PaginationHeroUI.Item key={p}>
                                <PaginationHeroUI.Link
                                    isActive={p === page}
                                    onPress={() => {
                                        setPage(p);
                                        typeof onPageChange === "function" && onPageChange(p);
                                    }}
                                >
                                    {p}
                                </PaginationHeroUI.Link>
                            </PaginationHeroUI.Item>
                        ),
                    )}
                    <PaginationHeroUI.Item>
                        <PaginationHeroUI.Next
                            isDisabled={page === total}
                            onPress={() => {
                                setPage(p => p + 1);
                                typeof onPageChange === "function" && onPageChange(page + 1);
                            }}
                        >
                            <span>Next</span>
                            <PaginationHeroUI.NextIcon />
                        </PaginationHeroUI.Next>
                    </PaginationHeroUI.Item>
                </PaginationHeroUI.Content>
            </PaginationHeroUI>
        </div>
    );
}
