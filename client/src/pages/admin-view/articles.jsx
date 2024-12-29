import { Button } from "@/components/ui/button";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { deleteArticle, getAllArticles, getArticleDetails } from "@/store/admin/articles-slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ArticleDetailsView from "@/components/admin-view/article-details-view";

function AdminArticles() {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    const dispatch = useDispatch();
    const { articlesList, articleDetails } = useSelector(state => state.adminArticles);
    const { toast } = useToast();
    const navigate = useNavigate();

    function handleDelete(getCurrentId) {
        dispatch(deleteArticle(getCurrentId)).then((data) => {
            console.log(data);

            if (data?.payload?.success) {
                dispatch(getAllArticles());
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

    function handleGetArticleDetails(getCurrentArticleId) {
        dispatch(getArticleDetails(getCurrentArticleId));
    }

    useEffect(() => {
        dispatch(getAllArticles());
    }, [dispatch]);

    useEffect(() => {
        if (articleDetails !== null) setOpenDetailsDialog(true);
    }, [articleDetails])

    return <Fragment>
        <div className="mb-5 w-full flex justify-end">
            <Button onClick={() => navigate('create')}>
                Add new article</Button>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>All Article</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {articlesList && articlesList.length > 0 ? articlesList.map((item) =>
                            <TableRow key={item?._id}>
                                <TableCell>{item?.title}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button onClick={() => {
                                        handleGetArticleDetails(item?._id);
                                        setOpenDetailsDialog(true);
                                    }}>Details</Button>
                                    <Button onClick={() => navigate(`update/${item._id}`)}>Edit</Button>
                                    <Button onClick={() => handleDelete(item?._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>)
                            : null}
                        <ArticleDetailsView open={openDetailsDialog} setOpen={setOpenDetailsDialog} articleDetails={articleDetails} />
                    </TableBody>
                </Table>
            </CardContent>
        </Card>


    </Fragment>
}

export default AdminArticles;