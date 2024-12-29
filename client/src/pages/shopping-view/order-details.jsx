import { useEffect } from "react";
import { Label } from "../../components/ui/label"
import { Separator } from "../../components/ui/separator"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail } from "@/store/shop/order-slice";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Undo2Icon } from "lucide-react";

function ShoppingOrderDetailsView() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { order } = useSelector(state => state.shopOrder)
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getOrderDetail(id));
    }, [id]);

    console.log(order);
    

    return <Card className="container mx-auto">
        <Button variant="ghost" onClick={() => navigate(-1)}>
            <Undo2Icon></Undo2Icon>
        </Button>
        <div className="grid gap-6 mx-5">
            <div className="grid gap-2">
                <div className="flex mt-4 items-center justify-between">
                    <p className="font-medium">Order ID</p>
                    <Label>{order?._id}</Label>
                </div>
                <div className="flex mt-4 items-center justify-between">
                    <p className="font-medium">Order Date</p>
                    <Label>{order?.createdAt}</Label>
                </div>
                <div className="flex mt-4 items-center justify-between">
                    <p className="font-medium">Order Status</p>
                    <Label>{order?.orderStatus}</Label>
                </div>

                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium mt-2">Order Details</div>
                        <ul className="grid gap-3">
                            {
                                order?.cartItems?.map(item =>
                                    <li key={item._id} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img src={"https://cdn-media.sforum.vn/storage/app/media/Van%20Pham/7/hinh-nen-desktop-35.jpg"} alt="" className="max-w-16" />
                                            <span>{item?.title}</span>
                                        </div>
                                        <span>x{item?.quantity}</span>
                                        <span>{item?.price}$</span>
                                    </li>)
                            }

                        </ul>
                    </div>

                    <div className="flex mt-4 items-center justify-between">
                        <p className="font-medium">Order Price</p>
                        <Label>{order?.totalAmount}</Label>
                    </div>
                </div>

                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium mt-2">Shipping Info</div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <div>Name: {order?.addressInfo?.name}</div>
                            <div>Phone: {order?.addressInfo?.phone}</div>
                            <div>Address: {order?.addressInfo?.address}, {order?.addressInfo?.city}</div>
                            <div>Note: {order?.addressInfo?.note}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Card>
}

export default ShoppingOrderDetailsView