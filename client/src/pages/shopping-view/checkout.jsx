import UserCartItemsContent from "@/components/shoppping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getAddress } from "@/store/shop/address-slice";
import { createNewOrder } from "@/store/shop/order-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function ShoppingCheckout() {
    const { cartItems } = useSelector(state => state.shoppingCarts);
    const { user } = useSelector(state => state.auth);
    const { addressList } = useSelector(state => state.shoppingAddress);
    const [addressId, setAddressId] = useState(null);
    const [note, setNote] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { toast } = useToast();

    const totalCartAmount = cartItems && cartItems.products && cartItems.products.length > 0 ?
        cartItems.products.reduce((sum, currentItem) => sum +
            (currentItem?.salePrice ? currentItem?.salePrice : currentItem?.price) * currentItem?.quantity, 0) : 0;

    function handlePayment() {
        setIsLoading(true);

        if (!addressId) {
            toast({
                title: "Select address",
                variant: "destructive"
            })
            return
        }

        const orderData = {
            userId: user?.id,
            addressId: addressId,
            note: note && note.length ? note : null
        }

        dispatch(createNewOrder(orderData)).then((data) => {
            if (data?.payload?.success) {
                console.log(data);
                setIsLoading(false)
                window.location.href = '/shop/home'
            }
        })
    }

    useEffect(() => {
        dispatch(getAddress(user?.id));
    }, [dispatch]);

    console.log(cartItems);


    return (
        <div className="flex flex-col">
            <div className="relative h-[300px] w-full overflow-hidden">
                <img src="" alt=""
                    className="h-full w-full object-cover object-center" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
                <div className="flex flex-col gap-4">
                    <div className="text-2xl font-semibold">Address</div>

                    <Select onValueChange={(e) => setAddressId(e)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select address" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                addressList && addressList.length > 0 ? addressList.map(
                                    item => <SelectItem key={item._id} value={item._id} className="">
                                        <>
                                            {`Name: Hello, Phone: ${item.phone}, `}
                                            {`Address: ${item.address}, ${item.city}`}
                                        </>
                                    </SelectItem>
                                ) : <div>No address</div>
                            }
                        </SelectContent>
                    </Select>

                    <Textarea placeholder="Note here" onChange={(e) => setNote(e.target.value)}></Textarea>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="text-2xl font-semibold">Cart</div>

                    {
                        cartItems && cartItems.products && cartItems.products.length > 0 ?
                            <>
                                {cartItems.products.map(item =>
                                    <UserCartItemsContent
                                        key={item.productId}
                                        cartItem={item} />)
                                }

                                <div className="mt-8 space-y-4">
                                    <div className="flex justify-between">
                                        <span className="font-bold">Total</span>
                                        <span className="font-bold">{totalCartAmount.toFixed(2)}$</span>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <Button disabled={isLoading} onClick={handlePayment} className="w-full">Checkout</Button>
                                </div>
                            </>
                            : <div>You need add cart</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ShoppingCheckout;