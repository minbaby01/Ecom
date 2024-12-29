import ShoppingProductTile from "@/components/shoppping-view/product-tile";
import { Input } from "@/components/ui/input"
import { getSearchResults, setSearchResults } from "@/store/shop/search-slice";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";


function SearchProducts() {
    const [keyword, setKeyword] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { searchResults } = useSelector(state => state.shopSearch);

    useEffect(() => {
        if (keyword && keyword.trim() !== '' && keyword.length > 3) {
            const getData = setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
                dispatch(getSearchResults(keyword))
            }, 1000);
            return () => clearTimeout(getData)
        } else {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
            dispatch(setSearchResults());
        }
    }, [keyword])

    return <div className="container mx-auto md:px-6 px-4 py-8">
        <div className="flex justify-center mb-8">
            <div className="w-full flex items-center">
                <Input
                    value={keyword}
                    name="keyword"
                    className="py-6"
                    placeholder="Search here..."
                    onChange={(e) => setKeyword(e.target.value)}></Input>
            </div>
        </div>

        {!searchResults.length ? <h1>Not found</h1> : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {
                searchResults.map((item) => <ShoppingProductTile key={item._id} product={item} />)
            }
        </div>
    </div >
}

export default SearchProducts