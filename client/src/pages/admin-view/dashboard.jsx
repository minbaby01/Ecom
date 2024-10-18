import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { addFeatureImages, deleteFeatureImages, getFeatureImages } from "@/store/common-slice";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const dispatch = useDispatch();
    const { toast } = useToast();

    const { featureImageList } = useSelector(state => state.commonFeature)

    function handleUploadFeatureImage() {
        dispatch(addFeatureImages(uploadedImageUrl)).then((data) => {
            if (data?.payload?.success) {
                dispatch(getFeatureImages());
                setImageFile(null);
                setUploadedImageUrl("");
            }
        })
    }

    function handleDelete(getCurrentFeatureImageId) {
        dispatch(deleteFeatureImages(getCurrentFeatureImageId)).then((data) => {
            if (data?.payload?.success) {
                dispatch(getFeatureImages());
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
        dispatch(getFeatureImages());
    }, [dispatch]);

    return <div>
        <h1>Upload Feature Image</h1>
        <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
        // isEditMode={currentUpdateId !== null}
        />

        <Button onClick={() => handleUploadFeatureImage()} className="mt-5 w-full">Upload</Button>

        <div className="flex flex-col gap-2 mt-5">
            {featureImageList && featureImageList.length > 0 ?
                featureImageList.map(item => <div key={item._id} className="relative">
                    <img src={item.image}
                        className="w-full h-[300px] object-cover rounded-sm" />
                    <div className="absolute top-0 right-0">
                        <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleDelete(item._id)}>
                            <X />
                        </Button>
                    </div>

                </div>) : null
            }
        </div>




    </div>
}

export default AdminDashboard;