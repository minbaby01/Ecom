import '@/styles.scss'
import { useEditor, EditorContent } from '@tiptap/react'

import { Color } from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import FontFamily from '@tiptap/extension-font-family'
import FontSize from './font-size';

import { Button } from '../ui/button'
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, Bold, Code2Icon, CodeIcon, ImageIcon, ItalicIcon, ListIcon, ListOrderedIcon, QuoteIcon, RedoIcon, StrikethroughIcon, UndoIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Dialog, DialogContent, DialogFooter } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import ProductImageUpload from '../admin-view/image-upload'

const extensions = [
  TextStyle,
  StarterKit,
  Link.configure({
    openOnClick: true,
    autolink: true,
    defaultProtocol: 'https',
    linkOnPaste: true,
  }),
  Image,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    alignments: ['left', 'center', 'right']
  }),
  FontFamily.configure({
    types: ['textStyle'],
  }),
  Color.configure({
    types: ['textStyle'],
  }),
  FontSize
]

function TipTap({ handleSave, content }) {
  const [open, setOpen] = useState(false);
  const [openImg, setOpenImg] = useState(false);

  const [actionType, setActionType] = useState('');
  const [url, setUrl] = useState('');

  const handleAdd = () => {
    if (actionType === 'link') {
      // cancelled
      if (url === null) {
        setOpen(false);
        return
      }

      // empty
      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink()
          .run()
        setOpen(false);
        return
      }

      // update link
      editor.chain().focus().extendMarkRange('link').setLink({ href: url })
        .run()

      setOpen(false);
      setUrl('');

    } else if (actionType === 'image') {
      if (url) {
        editor.chain().focus().setImage({ src: url }).run()

        setOpen(false);
        setUrl('');
      }
    }
  };

  const editor = useEditor({
    extensions,
    content: content || ""
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) null

  function onSave() {
    const json = editor.getJSON();
    // console.log(json);

    handleSave(json);

  }

  return (
    <div className='my-2'>
      <div className='flex flex-wrap gap-1 p-2 bg-gray-200 rounded-md'>
        <Button
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          variant={editor.isActive('bold') ? '' : 'outline'}
        ><Bold />
        </Button >
        <Button
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          variant={editor.isActive('italic') ? '' : 'outline'}
        ><ItalicIcon />
        </Button >
        <Button
          size="icon"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          variant={editor.isActive('strike') ? '' : 'outline'}
        ><StrikethroughIcon />
        </Button >
        <Button
          size="icon"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          variant={editor.isActive('code') ? '' : 'outline'}
        ><Code2Icon />
        </Button >

        <Select
          value={editor.getAttributes('heading').level ?? "p"}
          onValueChange={(value) => {
            isNaN(value) ? editor.chain().focus().setParagraph().run() : editor.chain().focus().toggleHeading({ level: value }).run()
          }}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="p">Parapraph</SelectItem>
              <SelectItem value={1}>H1</SelectItem>
              <SelectItem value={2}>H2</SelectItem>
              <SelectItem value={3}>H3</SelectItem>
              <SelectItem value={4}>H4</SelectItem>
              <SelectItem value={5}>H5</SelectItem>
              <SelectItem value={6}>H6</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={editor.getAttributes('textStyle').color ?? '#000000'}
          onValueChange={(value) => {
            editor.chain().focus().setColor(value).run()
          }}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="#000000">Black</SelectItem>
              <SelectItem value="#958DF1">Purle</SelectItem>
              <SelectItem value="#F98181">Red</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={editor.getAttributes('textStyle').fontFamily ?? "Default"}
          onValueChange={(fontValue) => {
            !fontValue ? editor.chain().focus().unsetFontFamily().run() : editor.chain().focus().setFontFamily(fontValue).run()
          }
          }>
          <SelectTrigger className="w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Default">Default font</SelectItem>
              <SelectItem value="Inter">Inter</SelectItem>
              <SelectItem value="Comic Sans MS, Comic Sans">Comic Sans</SelectItem>
              <SelectItem value="serif">serif</SelectItem>
              <SelectItem value="monospace">monospace</SelectItem>
              <SelectItem value="cursive">Cursive</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(size) => {
            console.log(size);
            size === 'Default'
              ? editor.chain().focus().unsetFontSize().run()
              : editor.chain().focus().setFontSize(size).run();
          }}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Font size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="12px">12px</SelectItem>
            <SelectItem value="14px">14px</SelectItem>
            <SelectItem value="16px">16px</SelectItem>
            <SelectItem value="18px">18px</SelectItem>
            <SelectItem value="20px">20px</SelectItem>
            <SelectItem value="24px">24px</SelectItem>
            <SelectItem value="32px">32px</SelectItem>
            <SelectItem value="48px">48px</SelectItem>
          </SelectContent>
        </Select>

        <Button
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive('bulletList') ? '' : 'outline'}
        ><ListIcon />
        </Button >
        <Button
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant={editor.isActive('orderedList') ? '' : 'outline'}
        ><ListOrderedIcon />
        </Button >
        <Button
          size="icon"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          variant={editor.isActive('codeBlock') ? '' : 'outline'}
        ><CodeIcon />
        </Button >
        <Button
          size="icon"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          variant={editor.isActive('blockquote') ? '' : 'outline'}
        ><QuoteIcon />
        </Button >
        <Button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          variant={'outline'}
        >Horizontal rule
        </Button >
        <Button
          size='icon'
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          variant={'outline'}
        ><UndoIcon />
        </Button >
        <Button
          size='icon'
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          variant={'outline'}
        ><RedoIcon />
        </Button >

        <Button
          onClick={() => setOpen(true)}
          variant={editor.isActive('link') ? '' : 'outline'}
          className="w-[100px]"
        >{editor.getAttributes('link').href ?? "Link"}
        </Button >

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <div className="py-4">
              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  defaultValue={editor.getAttributes('link').href ?? ""}
                  className="mt-2"
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => handleAdd()}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button
          size={'icon'}
          onClick={() => handleOpenDialog('image')}
          variant={'outline'}
        ><ImageIcon />
        </Button >

        <Dialog open={openImg} onOpenChange={setOpenImg}>
          <DialogContent className="sm:max-w-[425px]">
            <div className="py-4">
              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  defaultValue={editor.getAttributes('link').href ?? ""}
                  className="mt-2"
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div>Or Upload IMG</div>
              <ProductImageUpload />
            </div>
            <DialogFooter>
              <Button onClick={() => handleAdd()}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button
          size={'icon'}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          variant={editor.isActive({ textAlign: 'left' }) ? '' : 'outline'}
        >
          <AlignLeftIcon />
        </Button>
        <Button
          size={'icon'}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          variant={editor.isActive({ textAlign: 'center' }) ? '' : 'outline'}
        >
          <AlignCenterIcon />
        </Button>
        <Button
          size={'icon'}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          variant={editor.isActive({ textAlign: 'right' }) ? '' : 'outline'}
        >
          <AlignRightIcon />
        </Button>

        <Button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          variant={'outline'}
        >Clear style
        </Button >
        <Button

          onClick={() => editor.chain().focus().clearNodes().run()}
          variant={'outline'}
        >Set to default
        </Button >

      </div>
      <div className='border border-black p-3 my-2 rounded-lg text-wrap overflow-auto'>
        <EditorContent editor={editor} className='tiptap-editor' />
      </div>
      <Button onClick={onSave}>Save</Button>
    </div>

  )
}

export default TipTap