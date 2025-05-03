
import React, { useState } from 'react'
import { Button } from '../button'

export interface ReferenceData {
  title: string;
  author: string;
  url: string;
  description: string;
}

interface ReferenceFormProps {
  onSubmit: (reference: ReferenceData) => void;
  onCancel: () => void;
}

export const ReferenceForm = ({ onSubmit, onCancel }: ReferenceFormProps) => {
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
