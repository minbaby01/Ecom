import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";


function AddressCard({ addressInfo, handleUpdate, handleDelete }) {
    return <Card>
        <CardContent className="grid gap-4 p-4">
            <Label className="text-ellipsis text-nowrap overflow-hidden">Address: {addressInfo?.address}</Label>
            <Label className="text-ellipsis text-nowrap overflow-hidden">City: {addressInfo?.city}</Label>
            <Label className="text-ellipsis text-nowrap overflow-hidden">Phone: {addressInfo?.phone}</Label>
        </CardContent>
        <CardFooter className="p-3 flex justify-between ">
            <Button onClick={() => handleUpdate(addressInfo)}>Edit</Button>
            <Button onClick={() => handleDelete(addressInfo)}>Delete</Button>
        </CardFooter>
    </Card>
}

export default AddressCard