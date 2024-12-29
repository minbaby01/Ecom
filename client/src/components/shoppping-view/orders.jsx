import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { getOrders } from "@/store/shop/order-slice"
import { useDispatch, useSelector } from "react-redux"
import { Badge } from "../ui/badge"
import { useNavigate } from "react-router-dom"


function ShoppingOrders() {

    const { user } = useSelector(state => state.auth);
    const { orders } = useSelector(state => state.shopOrder);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getOrders(user?.id));
    }, [dispatch]);

    const formatDateWithTime = (date) => {
        if (!date) return '';

        const parsedDate = new Date(date);
        if (isNaN(parsedDate)) return '';

        const formatter = new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });

        return formatter.format(parsedDate).replace(',', '');
    };

    return <Card>
        <CardHeader>
            <CardTitle>Orders History</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Order Date</TableHead>
                        <TableHead>Order Status</TableHead>
                        <TableHead>Order Price</TableHead>
                        <TableHead>
                            <span className="sr-only">Details</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        orders.map(order =>
                            <TableRow
                                onClick={() => {
                                    navigate(`order/${order._id}`)
                                }}
                                className="cursor-pointer"
                                key={order._id}>
                                <TableCell>{order._id}</TableCell>
                                <TableCell>{formatDateWithTime(order.createdAt)}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={order?.orderStatus === 'confirmed' ? 'bg-green-500' : 'bg-black'}>
                                        {order.orderStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell>{order.totalAmount}$</TableCell>
                            </TableRow>)
                    }
                </TableBody>
            </Table>
        </CardContent>
    </Card>
}

export default ShoppingOrders