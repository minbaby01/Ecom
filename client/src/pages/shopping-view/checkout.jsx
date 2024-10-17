import Address from "@/components/shoppping-view/address";
import UserCartItemsContent from "@/components/shoppping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";


function ShoppingCheckout() {
    const { cartItems } = useSelector(state => state.shoppingCarts);

    const totalCartAmount = cartItems && cartItems.products && cartItems.products.length > 0 ?
        cartItems.products.reduce((sum, currentItem) => sum +
            (
                currentItem?.salePrice ? currentItem?.salePrice : currentItem?.price) * currentItem?.quantity, 0
        ) : 0;

    return (
        <div className="flex flex-col">
            <div className="relative h-[300px] w-full overflow-hidden">
                <img src="" alt=""
                    className="h-full w-full object-cover object-center" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
                <Address />
                <div className="flex flex-col gap-4">
                    {
                        cartItems && cartItems.products && cartItems.products.length > 0 ?
                            cartItems.products.map(item =>
                                <UserCartItemsContent
                                    key={item.productId}
                                    cartItem={item} />)
                            : null
                    }

                    <div className="mt-8 space-y-4">
                        <div className="flex justify-between">
                            <span className="font-bold">Total</span>
                            <span className="font-bold">{totalCartAmount.toFixed(2)}$</span>
                        </div>
                    </div>

                    <div className="mt-4">
                        <Button className="w-full">Checkout</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCheckout;