import useInfiniteColorsData from "../hooks/useInfiniteColorsData";

const RQInfiniteColorsResult = () => {
    const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, } = useInfiniteColorsData()

    if (error) {
        throw error
    }

    return (
        <div>
            <div>
                {data?.pages.map((page, index) => (
                    <div key={index}>
                        {page.colors.map((color) => (
                            <div key={color.id}>
                                {color.label}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button type="button" onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                {isFetchingNextPage ? "Loading more..."
                    : hasNextPage ? "Load More"
                        : "Nothing more to load"}
            </button>
        </div>
    )
}

export default RQInfiniteColorsResult