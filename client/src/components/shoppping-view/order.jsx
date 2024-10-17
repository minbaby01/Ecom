import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Dialog } from "../ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import ShoppingOrderDetailsView from "./order-details"


function ShoppingOrders() {

    const [openDetailsDialog, setOpendetailsDialog] = useState(false);

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
                    <TableRow>
                        <TableCell>123456</TableCell>
                        <TableCell>123456</TableCell>
                        <TableCell>123456</TableCell>
                        <TableCell>123456</TableCell>
                        <TableCell>
                            <Dialog open={openDetailsDialog} onOpenChange={setOpendetailsDialog}>
                                <Button onClick={() => setOpendetailsDialog(true)}>Details</Button>
                            <ShoppingOrderDetailsView />
                            </Dialog>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
    </Card>
}

export default ShoppingOrders