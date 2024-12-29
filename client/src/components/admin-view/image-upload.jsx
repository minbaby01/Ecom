import { UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({ imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl, setImageLoadingState, imageLoadingState, isEditMode }) {

    const inputRef = useRef(null);

    function handleImageFileChange(event) {
        const selectedFile = event.target?.files;
        if (selectedFile) setImageFile(selectedFile);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer?.files;
        if (droppedFile) setImageFile(droppedFile);
    }

    async function handleRemoveImage(imageId) {

        const newData = uploadedImageUrl.filter(image => image.publicId !== imageId)
        setUploadedImageUrl(newData);
        
        if (newData && newData.length == 0) {
            setImageFile(null);
            if (inputRef.current) {
                inputRef.current.value = ""
            }            
        }
        const response = await axios.delete(`http://localhost:5000/api/admin/products/remove/${imageId}`);

    }

    async function uploadImageToCloudinary() {
        setImageLoadingState(true);

        const data = new FormData();
        Array.from(imageFile).forEach((image) => {
            data.append('images', image);
        });

        const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', data);
        console.log(response);

        if (response?.data?.success) {
            setUploadedImageUrl(response.data?.result);
            setImageLoadingState(false);
            // setImageFile(null);
        }
    }

    useEffect(() => {
        if (imageFile !== null) uploadImageToCloudinary()
    }, [imageFile])

    return <div className="w-full max-w-md mx-auto mb-3">
        <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
        <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed rounded-lg p-4">
            <Input
                id="image-upload"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                ref={inputRef}
                className="hidden"
                onChange={handleImageFileChange}
                disabled={isEditMode}
            />
            {
                !imageFile ?
                    (
                        <Label htmlFor="image-upload" className={`${isEditMode ? 'cursor-not-allowed' : 'cursor-pointer'} flex flex-col items-center justify-center h-32 `}>
                            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                            <span>Drag & drop or click to upload image</span>
                        </Label>
                    ) :
                    (
                        imageLoadingState ?
                            <Skeleton className="h-10 bg-gray-100" /> :
                            uploadedImageUrl && uploadedImageUrl.length > 0 ? uploadedImageUrl.map((image) => <>
                                <div className="flex items-center justify-between" key={image.publicId}>
                                    <div className="flex items-center">
                                        <img src={image.url} className="w-8 text-primary mr-2 h-8"></img>
                                    </div>
                                    <p className="text-sm font-medium">{image.publicId}</p>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-muted-foreground hover:text-foreground"
                                        onClick={() => handleRemoveImage(image.publicId)}>
                                        <XIcon className="w-4 h-4" />
                                        <span className="sr-only">Remove File</span>
                                    </Button>
                                </div></>) : null
                    )
            }
        </div>
    </div>
}

export default ProductImageUpload; 