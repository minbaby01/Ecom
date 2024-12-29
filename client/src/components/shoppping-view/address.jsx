import { addressFormControls } from "@/config";
import CommonForm from "../common/form";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, deleteAddress, getAddress, updateAddress } from "@/store/shop/address-slice";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AddressCard from "./address-card";
import { Button } from "../ui/button";


const initialState = {
    city: '',
    address: '',
    phone: ''
}

function Address() {

    const { user } = useSelector(state => state.auth);
    const { addressList } = useSelector(state => state.shoppingAddress);
    const [formData, setFormData] = useState(initialState);
    const [currentEditedId, setCurrentEditedId] = useState(null);

    const dispatch = useDispatch();
    const { toast } = useToast();

    function onSubmit(event) {
        event.preventDefault();

        if (currentEditedId !== null) {

            dispatch(updateAddress({
                userId: user?.id,
                addressId: currentEditedId,
                formData
            })).then((data) => {
                if (data?.payload?.success) {
                    dispatch(getAddress(user?.id));
                    setFormData(initialState);
                    setCurrentEditedId(null);
                    toast({
                        title: data?.payload?.message,
                    })
                } else {
                    toast({
                        title: data?.payload?.message,
                        variant: "destructive"
                    })
                }
            })
        } else {
            if (addressList.length >= 3) {
                setFormData(initialState);
                toast({
                    title: "Max 3 address",
                    variant: "destructive"
                })
                return;
            }

            dispatch(addAddress({
                ...formData,
                userId: user?.id
            })).then((data) => {
                if (data?.payload?.success) {
                    dispatch(getAddress(user?.id));
                    setFormData(initialState);
                    toast({
                        title: data?.payload?.message,
                    })
                } else {
                    toast({
                        title: data?.payload?.message,
                        variant: "destructive"
                    })
                }
            });
        }
    }

    function isFormValid() {
        return Object.keys(formData).map(key => formData[key] !== "").every(item => item);
    }

    function handleUpdate(currentAddress) {
        setCurrentEditedId(currentAddress?._id);
        setFormData({
            ...formData,
            city: currentAddress?.city,
            address: currentAddress?.address,
            phone: currentAddress?.phone
        })
    }

    function handleDelete(currentAddress) {
        dispatch(deleteAddress({
            userId: user?.id,
            addressId: currentAddress._id
        })).then((data) => {
            if (data?.payload.success) {
                dispatch(getAddress(user?.id))
                toast({
                    title: data?.payload?.message,
                })
            }
        })
    }

    function handleCancelBtn() {
        setFormData(initialState);
        setCurrentEditedId(null);
    }

    useEffect(() => {
        dispatch(getAddress(user?.id));
    }, [dispatch]);

    return <Card>
        <CardHeader>
            <CardTitle>Address List</CardTitle>
        </CardHeader>
        <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {
                addressList && addressList.length > 0 ?
                    addressList.map(item =>
                        <AddressCard
                            key={item._id}
                            addressInfo={item}
                            handleUpdate={handleUpdate}
                            handleDelete={handleDelete}
                        />)
                    : null
            }
        </div>
        <CardHeader>
            <CardTitle>
                {currentEditedId !== null ? <div className="flex items-center justify-between">
                    <div>Edit Address</div>
                    <Button
                        className=""
                        onClick={handleCancelBtn}>Cancel Edit</Button>
                </div> : 'Add new address'}
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            <CommonForm
                formControls={addressFormControls}
                formData={formData}
                setFormData={setFormData}
                buttonText={'Save'}
                onSubmit={onSubmit}
                isBtnDisabled={!isFormValid()}
            />
        </CardContent>
    </Card>
}

export default Address;