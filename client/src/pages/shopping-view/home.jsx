import { Button } from '@/components/ui/button';
import { BabyIcon, BedIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, CpuIcon, HopIcon, PiIcon, ShirtIcon, TvIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFilterdProducts, getProductDetails } from '@/store/shop/products-slice';
import ShoppingProductTile from '@/components/shoppping-view/product-tile';
import { useNavigate } from 'react-router-dom';
import { addToCart, getCart } from '@/store/shop/carts-slice';
import { useToast } from '@/hooks/use-toast';
import ProductDetailsDialog from '@/components/shoppping-view/product-details';
import { getFeatureImages } from '@/store/common-slice';

const categoies = [
    { id: "men", value: "Men", icon: ShirtIcon },
    { id: "woman", value: "Woman", icon: CloudLightning },
    { id: "kids", value: "Kids", icon: BabyIcon },
    { id: "shoes", value: "Shoes", icon: TvIcon },
    { id: "gg", value: "GG", icon: BedIcon }
];

const brands = [
    { id: "nike", label: "Nike", icon: HopIcon },
    { id: "adidas", label: "Adidas", icon: PiIcon },
    { id: "puma", label: "Puma", icon: CpuIcon },
];

function ShoppingHome() {
    const { productLists, productDetails } = useSelector(state => state.shoppingProducts);
    const { user } = useSelector(state => state.auth);
    const { featureImageList } = useSelector(state => state.commonFeature)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [currentSlide, setCurrentSlide] = useState(0);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    function handleNavigateToListingPage(getCurrentItem, section) {
        sessionStorage.removeItem('filters');
        const currentFilter = {
            [section]: [getCurrentItem.id]
        }
        sessionStorage.setItem('filters', JSON.stringify(currentFilter));
        navigate(`/shop/listing`);
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
        const timer = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % featureImageList.length)
        }, 10000)
        return () => clearInterval(timer)
    }, [featureImageList]);

    useEffect(() => {
        dispatch(getAllFilterdProducts({ filtersParams: {}, sortParams: 'price-lowtohigh' }));
    }, [dispatch]);

    useEffect(() => {
        if (productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails])

    useEffect(() => {
        dispatch(getFeatureImages());
    }, [dispatch]);

    return <div className="flex flex-col min-h-screen">
        <div className="relative w-full h-[600px] overflow-hidden">
            {
                featureImageList.map((item, index) => <img
                    src={item.image}
                    key={index}
                    className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                >
                </img>
                )
            }
            <Button variant="outline" size='icon'
                className="absolute top-1/2 left-4 transform -translate-y-1/2 rounded-full"
                onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + featureImageList.length) % featureImageList.length)}>
                <ChevronLeftIcon className='w-10 h-10' />
            </Button>
            <Button variant="outline" size='icon'
                className="absolute top-1/2 right-4 transform -translate-y-1/2 rounded-full"
                onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)}>
                <ChevronRightIcon className='w-10 h-10' />
            </Button>
        </div>
        <section className='py-12 bg-gray-50'>
            <div className='container mx-auto px-4'>
                <h2 className='text-3xl font-bold text-center my-8'>Category</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                    {
                        categoies.map(item => <Card key={item.id} onClick={() => handleNavigateToListingPage(item, 'category')} className="cursor-pointer hover:shadow-lg transition-shadow">
                            <CardContent className="flex flex-col items-center justify-center p-6">
                                <item.icon className='w-12 h-12 mb-4 text-primary' />
                                <span className='font-bold'>{item.value}</span>
                            </CardContent>
                        </Card>)
                    }
                </div>
            </div>
        </section>

        <section className='py-12 bg-gray-50'>
            <div className='container mx-auto px-4'>
                <h2 className='text-3xl font-bold text-center my-8'>Brands</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                    {
                        brands.map(item => <Card key={item.id} onClick={() => handleNavigateToListingPage(item, 'brand')} className="cursor-pointer hover:shadow-lg transition-shadow">
                            <CardContent className="flex flex-col items-center justify-center p-6">
                                <item.icon className='w-12 h-12 mb-4 text-primary' />
                                <span className='font-bold'>{item.label}</span>
                            </CardContent>
                        </Card>)
                    }
                </div>
            </div>
        </section>

        <section className='py-12'>
            <div className='container mx-auto px-4'>
                <h2 className='text-3xl font-bold text-center my-8'>Feature Products</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {
                        productLists && productLists.length > 0 ? productLists.map(product => 
                        <ShoppingProductTile
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart} 
                            handleGetProductDetails={handleGetProductDetails}
                            />) : null
                    }
                </div>
            </div>
        </section>

        <ProductDetailsDialog
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails} />
    </div>
}

export default ShoppingHome;