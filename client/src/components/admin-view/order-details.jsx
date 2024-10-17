import { useState } from "react"
import CommonForm from "../common/form"
import { DialogContent } from "../ui/dialog"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"


const initalFormData = {
    status: ''
}

function AdminOrderDetailsView() {

    const [formData, setFormData] = useState(initalFormData);

    function onSubmit(event) {
        event.preventDefault();
        console.log(event);
        
    }

    return <DialogContent className="sm:max-w-[600px]">
        <div className="grid gap-6">
            <div className="grid gap-2">
                <div className="flex mt-4 items-center justify-between">
                    <p className="font-medium">Order ID</p>
                    <Label>123123123</Label>
                </div>
                <div className="flex mt-4 items-center justify-between">
                    <p className="font-medium">Order Date</p>
                    <Label>123123123</Label>
                </div>
                <div className="flex mt-4 items-center justify-between">
                    <p className="font-medium">Order Status</p>
                    <Label>123123123</Label>
                </div>
                <div className="flex mt-4 items-center justify-between">
                    <p className="font-medium">Order Price</p>
                    <Label>123123123</Label>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium mt-2">Order Details</div>
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span>PRO1</span>
                                <span>PRICEE100</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium mt-2">Shipping Info</div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>JOHN DOE</span>
                            <span>address</span>
                            <span>city</span>
                            <span>phone</span>
                        </div>
                    </div>
                </div>
                <div>
                    <CommonForm
                        formControls={[
                            {
                                label: "Order Status",
                                name: "status",
                                componentType: "select",
                                placeholder: 'Order Status',
                                options: [
                                    { id: "pending", value: "Pending" },
                                    { id: "inProcess", value: "In Process" },
                                    { id: "inShipping", value: "In Shipping" },
                                    { id: "delivered", value: "Delivered" },
                                    { id: "rejected", value: "Rejected" },
                                ]
                            }
                        ]}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={"Update Order Status"}
                        onSubmit={onSubmit}
                    />
                </div>
            </div>
        </div>
    </DialogContent>
}

export default AdminOrderDetailsView