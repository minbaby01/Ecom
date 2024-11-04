import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '@/store/admin/products-slice';
import { Select } from '@radix-ui/react-select';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TipTap from '@/components/common/tiptap';
import { addNewArticle, getArticleDetails, setArticletDetails, updateArticle } from '@/store/admin/articles-slice';
import { useParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const initState = {
    productId: "",
    title: "New Aricle",
    data: null
}

function AdminArticleEditor() {
    const { id } = useParams();

    const [formData, setFormData] = useState(initState);

    const { productLists } = useSelector(state => state.adminProducts);
    const { articleDetails } = useSelector(state => state.adminArticles);

    const dispatch = useDispatch();

    function handleSave(json) {
        if (id) {
            dispatch(updateArticle({
                id,
                formData: {
                    ...formData,
                    data: json
                }
            })).then((data) => {
                if (data.payload.success) {
                    toast({
                        title: data.payload.message
                    })
                }
            })
        } else {
            dispatch(addNewArticle({
                ...formData,
                data: json,
            })).then((data) => {
                if (data.payload.success) {
                    toast({
                        title: data.payload.message
                    })
                }
            })
        }
    }

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            dispatch(getArticleDetails(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (articleDetails) {
            setFormData({
                productId: articleDetails.productId,
                title: articleDetails.title,
                data: articleDetails.data
            });
            dispatch(setArticletDetails());
        }
    }, [dispatch, articleDetails]);

    return <div>
        <div>
            <h1 className='my-3'>Select Product</h1>
            <Select
                onValueChange={(value) => {
                    setFormData({
                        ...formData,
                        productId: value
                    })
                }}
                className="flex"
                value={formData?.productId}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                    {
                        productLists && productLists.length > 0 ? productLists.map((product) => (
                            <SelectItem key={product._id} value={product._id}> {product.title}</SelectItem>
                        ))
                            : null
                    }
                </SelectContent>
            </Select>
        </div>

        <div>
            <TipTap handleSave={handleSave} content={formData?.data} />
        </div>
    </div>
}

export default AdminArticleEditor