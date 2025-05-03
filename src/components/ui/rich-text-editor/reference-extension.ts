
import { Extension } from '@tiptap/core'

// Custom extension for references/citations
export const Reference = Extension.create({
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
