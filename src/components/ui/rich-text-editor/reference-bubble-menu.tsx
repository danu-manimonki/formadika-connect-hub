
import React from 'react'
import { Editor, BubbleMenu } from '@tiptap/react'
import { CitationTooltip } from './citation-tooltip'

interface ReferenceBubbleMenuProps {
  editor: Editor;
}

export const ReferenceBubbleMenu = ({ editor }: ReferenceBubbleMenuProps) => {
  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ 
        duration: 100,
        placement: 'bottom',
        hideOnClick: true,
      }}
      shouldShow={({ editor, from }) => {
        // Add null check and ensure the node exists before accessing classList
        try {
          const node = editor.view.nodeDOM(from) as HTMLElement
          return node && node.classList && node.classList.contains('citation')
        } catch (error) {
          console.error('Error in BubbleMenu shouldShow:', error)
          return false
        }
      }}
    >
      {(() => {
        try {
          const selection = editor.state.selection
          // Add null check and similar safety measures
          if (!selection) return null
          
          const node = editor.view.nodeDOM(selection.from) as HTMLElement
          
          if (!node || !node.classList || !node.classList.contains('citation')) return null
          
          const title = node.getAttribute('data-title')
          const author = node.getAttribute('data-author')
          const url = node.getAttribute('data-url')
          
          return <CitationTooltip title={title} author={author} url={url} />
        } catch (error) {
          console.error('Error rendering citation tooltip:', error)
          return null
        }
      })()}
    </BubbleMenu>
  )
}
