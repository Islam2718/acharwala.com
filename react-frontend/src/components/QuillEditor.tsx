import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface TextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (editorRef.current) {
            const quill = new Quill(editorRef.current, {
                theme: 'snow',
            });

            // Set initial value
            quill.root.innerHTML = value;

            // Listen for changes
            quill.on('text-change', () => {
                const updatedContent = quill.root.innerHTML;
                console.log('Quill content:', updatedContent); // Debugging
                onChange(updatedContent); // Notify parent
            });
        }
    }, []);

    return <div ref={editorRef} style={{ height: '200px' }} />;
};

export default TextEditor;

