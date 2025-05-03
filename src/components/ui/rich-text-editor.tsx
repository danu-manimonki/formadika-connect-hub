
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import React, { useEffect, useState } from 'react';
import { Bold, Italic, Underline as UnderlineIcon, Type, List, ListOrdered, Quote, TextCursor } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
}

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  const colors = ['#000000', '#FF0000', '#008000', '#0000FF', '#FFA500', '#800080'];

  return (
    <div className="border-b p-1 flex flex-wrap gap-1 items-center">
      <Toggle 
        size="sm" 
        pressed={editor.isActive('bold')} 
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Bold"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      
      <Toggle 
        size="sm" 
        pressed={editor.isActive('italic')} 
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Italic"
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      
      <Toggle 
        size="sm" 
        pressed={editor.isActive('underline')} 
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Underline"
      >
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>
      
      <div className="w-px h-6 bg-gray-200 mx-1"></div>
      
      <Toggle 
        size="sm" 
        pressed={editor.isActive('heading', { level: 2 })} 
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        aria-label="Heading"
      >
        <Type className="h-4 w-4" />
      </Toggle>
      
      <Toggle 
        size="sm" 
        pressed={editor.isActive('bulletList')} 
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        aria-label="Bullet List"
      >
        <List className="h-4 w-4" />
      </Toggle>
      
      <Toggle 
        size="sm" 
        pressed={editor.isActive('orderedList')} 
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="Ordered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      
      <Toggle 
        size="sm" 
        pressed={editor.isActive('blockquote')} 
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label="Quote"
      >
        <Quote className="h-4 w-4" />
      </Toggle>
      
      <div className="w-px h-6 bg-gray-200 mx-1"></div>
      
      <div className="flex items-center">
        <TextCursor className="h-4 w-4 mr-1" />
        <select
          className="h-8 px-2 text-xs border rounded"
          onChange={(e) => {
            editor.chain().focus().setColor(e.target.value).run();
          }}
        >
          <option value="">Warna teks</option>
          {colors.map((color) => (
            <option key={color} value={color} style={{ color }}>
              {color}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const RichTextEditor = ({ content, onChange, className }: RichTextEditorProps) => {
  const [isMounted, setIsMounted] = useState(false);
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  // Tangani hydration error dengan memastikan editor hanya dirender di client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={cn("border rounded-md overflow-hidden", className)}>
      <MenuBar editor={editor} />
      {isMounted && (
        <EditorContent
          editor={editor}
          className="p-3 prose prose-sm max-w-none min-h-[150px] focus:outline-none"
        />
      )}
    </div>
  );
};
