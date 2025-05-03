
import React, { useCallback, useState } from 'react'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import { Extension } from '@tiptap/core'
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
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button } from './button'

// Custom extension for references/citations
const Reference = Extension.create({
  name: 'reference',
  
  addAttributes() {
    return {
      id: {
        default: null,
      },
      title: {
        default: null,
      },
      author: {
        default: null,
      },
      url: {
        default: null,
      },
      description: {
        default: null,
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span.citation',
        getAttrs: (node) => {
          if (typeof node === 'string') return {}
          
          const element = node as HTMLElement
          return {
            id: element.getAttribute('data-id'),
            title: element.getAttribute('data-title'),
            author: element.getAttribute('data-author'),
            url: element.getAttribute('data-url'),
            description: element.getAttribute('data-description'),
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', { 
      class: 'citation',
      'data-id': HTMLAttributes.id,
      'data-title': HTMLAttributes.title,
      'data-author': HTMLAttributes.author,
      'data-url': HTMLAttributes.url,
      'data-description': HTMLAttributes.description
    }, 0]
  },
})

interface ReferenceFormProps {
  onSubmit: (reference: {
    title: string;
    author: string;
    url: string;
    description: string;
  }) => void;
  onCancel: () => void;
}

const ReferenceForm = ({ onSubmit, onCancel }: ReferenceFormProps) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ title, author, url, description })
  }

  return (
    <form className="tiptap-reference-form" onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold mb-3">Tambahkan Referensi</h3>
      
      <label className="block text-sm font-medium mb-1">Judul</label>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        required
        placeholder="Judul referensi"
      />
      
      <label className="block text-sm font-medium mb-1">Penulis</label>
      <input 
        type="text" 
        value={author} 
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Nama penulis"
      />
      
      <label className="block text-sm font-medium mb-1">URL</label>
      <input 
        type="url" 
        value={url} 
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
      />
      
      <label className="block text-sm font-medium mb-1">Deskripsi</label>
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        placeholder="Deskripsi singkat (opsional)"
      />
      
      <div className="flex justify-end gap-2 mt-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit">
          Simpan
        </Button>
      </div>
    </form>
  )
}

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

  const addReference = useCallback((reference: any) => {
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
          onClick={setLink}
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
              onSubmit={addReference}
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
      
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ 
            duration: 100,
            placement: 'bottom',
            hideOnClick: true,
          }}
          shouldShow={({ editor, from }) => {
            const node = editor.view.nodeDOM(from) as HTMLElement
            if (node && node.classList.contains('citation')) {
              return true
            }
            return false
          }}
        >
          <div className="reference-tooltip">
            {(() => {
              const selection = editor.state.selection
              const node = editor.view.nodeDOM(selection.from) as HTMLElement
              
              if (!node || !node.classList.contains('citation')) return null
              
              const title = node.getAttribute('data-title')
              const author = node.getAttribute('data-author')
              const url = node.getAttribute('data-url')
              
              return (
                <>
                  <h4>{title}</h4>
                  {author && <p>Oleh: {author}</p>}
                  {url && (
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Lihat sumber
                    </a>
                  )}
                </>
              )
            })()}
          </div>
        </BubbleMenu>
      )}
      
      <EditorContent editor={editor} className="tiptap-editor" />
    </div>
  )
}
