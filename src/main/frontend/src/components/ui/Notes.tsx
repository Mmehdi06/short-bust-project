import {EditorContent, useEditor} from '@tiptap/react'
import {StarterKit} from '@tiptap/starter-kit'

import {TNote} from "@/types/Tnode.ts";

export default ({note}: {
    note: TNote
}) => {

    const editor = useEditor({
        content: note.defaultContent,
        editorProps: {
            attributes: {
                class: 'm-2 p-2 border border-black rounded-lg',
            },
        },
        extensions: [
            StarterKit.configure({
                history: false, // important because history will now be handled by Y.js
            }),

        ],
    })

    return (
        // @ts-ignore
        <EditorContent editor={editor}/>
    )
}