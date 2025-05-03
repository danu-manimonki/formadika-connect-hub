
import React from 'react'
import { Editor } from '@tiptap/react'
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Link as LinkIcon, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Quote, 
  List, 
  ListOrdered, 
  FileText,
  Undo,
  Redo
} from 'lucide-react'
import { Button } from '../button'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { ReferenceForm, ReferenceData } from './reference-form'

interface EditorToolbarProps {
  editor: Editor;
  onSetLink: () => void;
  onAddReference: (reference: ReferenceData) => void;
  isReferencePopoverOpen: boolean;
  setIsReferencePopoverOpen: (isOpen: boolean) => void;
}

export const EditorToolbar = ({ 
  editor, 
  onSetLink, 
  onAddReference, 
  isReferencePopoverOpen, 
  setIsReferencePopoverOpen 
}: EditorToolbarProps) => {
  if (!editor) return null;

  return (
    <div className="tiptap-toolbar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
        title="Bold"
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
        title="Italic"
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
        title="Underline"
      >
        <UnderlineIcon size={16} />
      </button>
      <button
        onClick={onSetLink}
        className={editor.isActive('link') ? 'is-active' : ''}
        title="Link"
      >
        <LinkIcon size={16} />
      </button>
      
      <span className="mx-1 text-gray-300">|</span>
      
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
        title="Align left"
      >
        <AlignLeft size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
        title="Align center"
      >
        <AlignCenter size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
        title="Align right"
      >
        <AlignRight size={16} />
      </button>
      
      <span className="mx-1 text-gray-300">|</span>
      
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
        title="Bullet list"
      >
        <List size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
        title="Ordered list"
      >
        <ListOrdered size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
        title="Quote"
      >
        <Quote size={16} />
      </button>
      
      <span className="mx-1 text-gray-300">|</span>
      
      <Popover open={isReferencePopoverOpen} onOpenChange={setIsReferencePopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="px-2.5 h-8">
            <FileText size={16} className="mr-1" /> Referensi
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <ReferenceForm 
            onSubmit={onAddReference}
            onCancel={() => setIsReferencePopoverOpen(false)}
          />
        </PopoverContent>
      </Popover>

      <div className="flex-1"></div>
      
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
        className="opacity-50 hover:opacity-100"
      >
        <Undo size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
        className="opacity-50 hover:opacity-100"
      >
        <Redo size={16} />
      </button>
    </div>
  );
};
