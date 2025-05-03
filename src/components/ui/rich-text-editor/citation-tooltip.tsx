
import React from 'react'

interface CitationTooltipProps {
  title: string | null;
  author: string | null;
  url: string | null;
}

export const CitationTooltip = ({ title, author, url }: CitationTooltipProps) => {
  return (
    <div className="reference-tooltip">
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
    </div>
  );
};
