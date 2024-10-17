import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImages, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const dispatch = useDispatch();

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
                featureImageList.map(item => <div key={item._id}>
                    <img src={item.image}
                    className="w-full h-[300px] object-cover rounded-sm" />
                </div>) : null
            }
        </div>




    </div>
}

export default AdminDashboard;