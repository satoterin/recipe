'use client'
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ReactPaginate from 'react-paginate';

const Pagination: React.FC<{pageCount:number}> = ({pageCount}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (selectedPage: { selected: number }) => {
        const newSearchParams = new URLSearchParams(searchParams || '');
        //set the page search param to the selected page
        newSearchParams.set('page',selectedPage.selected.toString());
        //update the search params to the query and push to the url
        router.push(`/?${new URLSearchParams(newSearchParams).toString()}`);
    }
    
    return (
        <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            className='flex justify-center mt-8 space-x-2 items-center'
            onPageChange={handlePageChange}
            containerClassName={"flex justify-center mt-8 space-x-2"}
            previousLinkClassName={"px-3 py-2 bg-blue-500 text-white rounded-md"}
            nextLinkClassName={"px-3 py-2 bg-blue-500 text-white rounded-md"}
            activeClassName={"text-blue-500"}
            pageClassName={"px-3 py-2 bg-gray-200"}
            disabledClassName={"opacity-50 cursor-not-allowed"}
            initialPage={parseInt(searchParams?.get('page') || '0')}
        />
                            
    );
}

export default Pagination
