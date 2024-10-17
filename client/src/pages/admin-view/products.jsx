import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { addNewProduct, getAllProducts, updateProduct, deleteProduct } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin-view/product-tile";

const initalFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    quantity: ""
}

function AdminProducts() {

    const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
    const [formData, setFormData] = useState(initalFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentUpdateId, setCurrentUpdateId] = useState(null);

    const dispatch = useDispatch();
    const { productLists } = useSelector(state => state.adminProducts);
    const { toast } = useToast();

    async function onSubmit(e) {
        e.preventDefault();

        try {
            if (currentUpdateId !== null) {
                dispatch(updateProduct({
                    id: currentUpdateId,
                    formData
                })).then((data) => {
                    console.log(data);
                    if (data?.payload?.success) {
                        dispatch(getAllProducts());
                        setOpenCreateProductDialog(false);
                        setCurrentUpdateId(null);
                        setFormData(initalFormData);
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
                dispatch(addNewProduct({
                    ...formData,
                    image: uploadedImageUrl
                })).then((data) => {
                    if (data?.payload?.success) {
                        dispatch(getAllProducts());
                        setOpenCreateProductDialog(false);
                        setImageFile(null);
                        setFormData(initalFormData);
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


        } catch (error) {
            console.log(error)
        }
    }

    function handleDelete(getCurrentProductId) {
        dispatch(deleteProduct(getCurrentProductId)).then((data) => {
            if (data?.payload?.success) {
                dispatch(getAllProducts());
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
    }

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    return <Fragment>
        <div className="mb-5 w-full flex justify-end">
            <Button onClick={() => setOpenCreateProductDialog(true)}>
                Add new product</Button>
        </div>
        <Sheet
            open={openCreateProductDialog}
            onOpenChange={() => {
                setOpenCreateProductDialog(false);
                setCurrentUpdateId(null);
                setFormData(initalFormData);
            }}>
            <SheetContent side="right" className="overflow-auto">
                <SheetHeader>
                    <SheetTitle>
                        {currentUpdateId !== null ? 'Update Product' : 'Add New Product'}
                    </SheetTitle>
                </SheetHeader>
                <div className="py-6">
                    <ProductImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        imageLoadingState={imageLoadingState}
                        setImageLoadingState={setImageLoadingState}
                        isEditMode={currentUpdateId !== null}
                    />
                    <CommonForm
                        formControls={addProductFormElements}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={currentUpdateId !== null ? 'Update' : 'Add '}
                        onSubmit={onSubmit}
                    />
                </div>
            </SheetContent>
        </Sheet>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {
                productLists && productLists.length > 0 ? productLists.map((product) => (
                    <AdminProductTile key={product._id}
                        product={product}
                        setCurrentUpdateId={setCurrentUpdateId}
                        setOpenCreateProductDialog={setOpenCreateProductDialog}
                        setFormData={setFormData}
                        handleDelete={handleDelete}
                    />
                ))
                    : null}
        </div>

    </Fragment>
}

export default AdminProducts;