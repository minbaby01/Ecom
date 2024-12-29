import { setArticletDetails } from "@/store/admin/articles-slice";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"
import { useDispatch } from "react-redux";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

// import Link from '@tiptap/extension-link'
// import TextStyle from '@tiptap/extension-text-style'
// import StarterKit from '@tiptap/starter-kit'
// import Image from '@tiptap/extension-image'
// import TextAlign from "@tiptap/extension-text-align";
// import FontFamily from "@tiptap/extension-font-family";
// import Color from "@tiptap/extension-color";

// import { generateHTML } from '@tiptap/html'

import parse from 'html-react-parser';

// const extension = [
//     TextStyle,
//     StarterKit,
//     Link.configure({
//         openOnClick: true,
//         autolink: true,
//         defaultProtocol: 'https',
//         linkOnPaste: true,
//     }),
//     Image,
//     TextAlign.configure({
//         types: ['heading', 'paragraph'],
//         alignments: ['left', 'center', 'right']
//     }),
//     FontFamily.configure({
//         types: ['textStyle'],
//     }),
//     Color.configure({
//         types: ['textStyle'],
//     })
// ]

function ArticleDetailsView({ open, setOpen, articleDetails }) {
    const dispatch = useDispatch();

    const html = articleDetails?.data ?? "";

    function handleDialogClose() {
        setOpen(false);
        dispatch(setArticletDetails());
    }

    return <Dialog open={open} onOpenChange={() => handleDialogClose()}>
        <DialogContent className="sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] max-h-full overflow-auto">
            <DialogHeader>
                <DialogTitle>{articleDetails?.title}</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                <div className="break-all">{parse(html)}</div>
            </DialogDescription>
        </DialogContent>
    </Dialog>
}

export default ArticleDetailsView