import ProductFilter from "@/components/shoppping-view/filter";
import ProductDetailsDialog from "@/components/shoppping-view/product-details";
import ShoppingProductTile from "@/components/shoppping-view/product-tile";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { sortOption } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addToCart, getCart } from "@/store/shop/carts-slice";
import { getAllFilterdProducts, getProductDetails } from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";


function createSearchParamsHelper(filterParams) {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
        if (Array.isArray(value) && value.length > 0) {
            const paramValue = value.join(',');
            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`) //encode = , -> %2C
        }
    }

    return queryParams.join('&');
}

function ShoppingListing() {

    const { user } = useSelector(state => state.auth);
    const { productLists, productDetails } = useSelector(state => state.shoppingProducts);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    const categorySearchParam = searchParams.get('category');

    function handleSort(value) {
        setSort(value);
    }

    function handleFilter(getSectionId, getCurrentOption) {

        let cpyFilters = { ...filters };
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId); // find sort cate, brand checked?

        if (indexOfCurrentSection === -1) { // no one selected yet -> add new
            cpyFilters = {
                ...cpyFilters,
                [getSectionId]: [getCurrentOption]
            }
        } else {
            const indexOfCurrentSection = cpyFilters[getSectionId].indexOf(getCurrentOption) // selected

            if (indexOfCurrentSection === -1) {
                cpyFilters[getSectionId].push(getCurrentOption); // no checked
            } else {
                cpyFilters[getSectionId].splice(indexOfCurrentSection, 1); // checked
            }
        }
        setFilters(cpyFilters);
        sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
    }

    function handleAddToCart(getCurrentProductId) {
        if (!user) {
            toast({
                title: "Please login/register",
                variant: "destructive"
            })
            return;
        }
        dispatch(addToCart({ productId: getCurrentProductId, userId: user?.id, quantity: 1 })).then((data) => {
            if (data?.payload?.success) {
                dispatch(getCart(user?.id));
                toast({
                    title: data?.payload?.message,
                })
            } else {
                toast({
                    title: "Error",
                    variant: "destructive"
                })
            }
        })
    }

    function handleGetProductDetails(getCurrentProductId) {
        dispatch(getProductDetails(getCurrentProductId));
    }

    useEffect(() => {
        setSort("price-lowtohigh");
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
    }, [categorySearchParam])

    useEffect(() => {
        if (filters && Object.keys(filters).length > 0) {
            const createQueryString = createSearchParamsHelper(filters);
            setSearchParams(new URLSearchParams(createQueryString));
        }
    }, [filters])

    useEffect(() => {
        if (filters !== null && sort !== null) {
            dispatch(getAllFilterdProducts({ filtersParams: filters, sortParams: sort }));
        }
    }, [dispatch, sort, filters]);

    useEffect(() => {
        if (productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails])

    return (
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
            <ProductFilter filters={filters} handleFilter={handleFilter} />
            <div className="bg-background w-full rounded-lg shadow-sm">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-extrabold">All Products</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">{productLists?.length} Products</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className=" flex items-center gap-1">
                                    <ArrowUpDownIcon className="h-4 w-4" />
                                    <span>Sort by</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className='w-[200px]'>
                                <DropdownMenuRadioGroup
                                    value={sort}
                                    onValueChange={handleSort}>
                                    {
                                        sortOption.map(sortItem =>
                                            <DropdownMenuRadioItem
                                                key={sortItem.id}
                                                value={sortItem.id}>
                                                {sortItem.label}
                                            </DropdownMenuRadioItem>)
                                    }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {
                        productLists && productLists.length > 0 ? productLists.map(productItem =>
                            <ShoppingProductTile
                                key={productItem._id}
                                product={productItem}
                                handleAddToCart={handleAddToCart}
                                handleGetProductDetails={handleGetProductDetails}
                            />) : null
                    }
                </div>
            </div>
            <ProductDetailsDialog
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails} />
        </div>
    );
}

export default ShoppingListing;