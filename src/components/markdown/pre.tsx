import React from 'react';
import { ComponentProps } from "react";
import Copy from "./copy";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Pre = ({
  raw,
  language = "typescript",
}: ComponentProps<"pre"> & {
  raw?: string;
  language?: string;
  line?: string;
}) => {
  const cleanRaw = raw
  ?.split('\n')
  .map(line => line.trimEnd())
  .join('\n');

  return (
    <div className="relative group">
      <div className="absolute top-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:block hidden">
        <Copy content={raw!} />
      </div>
      <div className="relative overflow-hidden rounded-lg">
        <div className="absolute top-0 left-0 right-0 h-9 bg-secondary backdrop-blur" />
        <div className="absolute top-3.5 left-4 flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
        <div className="bg-secondary/50 px-4 pb-4 pt-12">
          <SyntaxHighlighter
            language={language}
            style={{
              ...oneDark,
              'pre[class*="language-"]': {
                background: 'transparent',
                border: 'none',
              },
              'code[class*="language-"]': {
                background: 'transparent',
                border: 'none',
              },
              'span.linenumber': {
                textAlign: 'right', // Pastikan line number rata kanan
                display: 'inline-block', // Hindari perbedaan tinggi elemen
                width: '2rem', // Tentukan lebar tetap untuk nomor baris
                paddingRight: '1rem', // Tambahkan padding kanan
                margin: 0, // Hilangkan margin default
              },
            }}
            customStyle={{
              margin: 0,
              padding: 0,
              background: 'none',
              border: 'none',
            }}
            showLineNumbers={false}
            lineNumberStyle={{
              textAlign: 'right', // Line number rata kanan
              display: 'inline-block', // Hindari perbedaan tinggi elemen
              width: '2rem', // Tetapkan lebar untuk line numbers
              paddingRight: '1rem', // Tambahkan padding kanan
            }}
          >
            {cleanRaw || ''}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default Pre;
