import { Minus, Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { deleteCartProduct, updateCartProduct } from "@/store/shop/carts-slice";
import { useToast } from "@/hooks/use-toast";


function UserCartItemsContent({ cartItem }) {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { toast } = useToast();
    function handleDeleteItems(cartItem) {
        dispatch(deleteCartProduct({
            userId: user?.id,
            productId: cartItem?.productId
        })).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: data?.payload?.message
                })
            }
        })
    }

    function handleUpdateQuantity(cartItem, typeAction) {
        dispatch(updateCartProduct({
            userId: user?.id,
            productId: cartItem?.productId,
            quantity: typeAction === 'plus' ? cartItem?.quantity + 1 : cartItem?.quantity - 1
        })).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: data?.payload?.message
                })
            }
        })
    }

    return <div className="flex items-center space-x-4">
        <img
            src={cartItem?.image}
            alt={cartItem?.title}
            className="w-20 h-20 rounded object-cover" />
        <div className="flex-1">
            <h3 className="font-extrabold">{cartItem?.title}</h3>
            <div className="flex items-center mt-1 gap-2">
                <Button className="h-8 w-8 rounded-full" variant="outline" size="icon" onClick={() => handleUpdateQuantity(cartItem, 'minus')}>
                    <Minus className="w-4 h-4" />
                    <span className="sr-only">Decrease</span>
                </Button>
                <span className="font-semibold">{cartItem?.quantity}</span>
                <Button className="h-8 w-8 rounded-full" variant="outline" size="icon" onClick={() => handleUpdateQuantity(cartItem, 'plus')}>
                    <Plus className="w-4 h-4" />
                    <span className="sr-only">Increase</span>
                </Button>
            </div>
        </div>
        <div className="flex flex-col items-end">
            <p className="font-semibold">
                {((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * (cartItem?.quantity)).toFixed(2)}$
            </p>
            <Trash onClick={() => { handleDeleteItems(cartItem) }} className="cursor-pointer mt-1" size={20} />
        </div>
    </div>
}

export default UserCartItemsContent