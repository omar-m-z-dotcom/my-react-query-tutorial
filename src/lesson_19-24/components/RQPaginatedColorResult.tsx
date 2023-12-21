import { useState } from "react";
import useColorsData from "../hooks/useColorsData";

const RQPaginatedColorResult = () => {
    const [page, setPage] = useState<string | undefined>(undefined)
    const { data: response, error, isFetching, isPlaceholderData } = useColorsData(page)
    const links = response?.link
    const colors = response?.data
    const handleNextPage = () => {
        setPage(() => {
            if (links?.has("next")) {
                return links.get("next")
            }
        })
    }
    const handlePrevPage = () => {
        setPage(() => {
            if (links?.has("prev")) {
                return links.get("prev")
            }
        })
    }
    if (error) {
        throw error
    }
    return (
        <div>
            {colors && (
                <div>
                    <button type="button" onClick={handlePrevPage} disabled={!links?.has("prev")}>Prev</button>
                    <button type="button" onClick={handleNextPage} disabled={!links?.has("next")}>Next</button>
                    {isPlaceholderData && <div>placing a placeholder for now...</div>}
                    <ul>
                        {colors.map((color) => (
                            <li key={color.id}>{color.label}</li>
                        ))}
                    </ul>
                </div>
            )}
            {isFetching && <div>loading...</div>}
        </div>
    )
}

export default RQPaginatedColorResult