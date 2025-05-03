
import React, { useCallback, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'

import { Reference } from './rich-text-editor/reference-extension'
import { EditorToolbar } from './rich-text-editor/editor-toolbar'
import { ReferenceBubbleMenu } from './rich-text-editor/reference-bubble-menu'
import { ReferenceData } from './rich-text-editor/reference-form'

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const RichTextEditor = ({ value, onChange, placeholder = 'Tulis deskripsi di sini...' }: RichTextEditorProps) => {
  const [isReferencePopoverOpen, setIsReferencePopoverOpen] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Reference,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const setLink = useCallback(() => {
    if (!editor) return
    
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)
    
    if (url === null) return
    
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const addReference = useCallback((reference: ReferenceData) => {
    if (!editor) return
    
    const id = `ref-${Date.now()}`
    const citationText = `[${reference.title}]`
    
    editor.chain().focus().insertContent({
      type: 'text',
      marks: [{
        type: 'reference',
        attrs: {
          id,
          title: reference.title,
          author: reference.author,
          url: reference.url,
          description: reference.description,
        }
      }],
      text: citationText
    }).run()
    
    setIsReferencePopoverOpen(false)
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <EditorToolbar 
        editor={editor}
        onSetLink={setLink}
        onAddReference={addReference}
        isReferencePopoverOpen={isReferencePopoverOpen}
        setIsReferencePopoverOpen={setIsReferencePopoverOpen}
      />
      
      <ReferenceBubbleMenu editor={editor} />
      
      <EditorContent editor={editor} className="tiptap-editor" />
    </div>
  )
}
