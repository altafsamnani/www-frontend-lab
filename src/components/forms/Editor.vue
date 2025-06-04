<template>
  <div>
    <ckeditor
      :editor="ClassicEditor"
      v-model="editorDescription"
      :config="editorConfig"
      @ready="onEditorReady"
    ></ckeditor>
  </div>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue'
import {
  ClassicEditor,
  Essentials,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Subscript,
  Superscript,
  List,
  Link,
  Paragraph,
  Table,
  TableToolbar,
  SourceEditing,
  Autoformat,
  Heading,
  HeadingButtonsUI,
  RemoveFormat,
  Markdown,
  PasteFromMarkdownExperimental,
  SpecialCharacters,
  SpecialCharactersEssentials,
  ButtonView,
  Plugin
} from 'ckeditor5';

const props = defineProps({
  height: {
    type: Number,
    default: 300
  },
  editorId: {
    type: String,
    default: 'ck'
  },
  toolbar: {
    type: String,
    default: 'default'
  },
  txt: {
    type: String,
    default: ''
  },
  visibleTemplates: {
    type: Boolean
  },
  showTemplateButton: {
    type: Boolean,
    default: false
  }
})

class Template extends Plugin {
  init() {
    if (props.showTemplateButton === false) {
      return
    }

    console.log('Template was initialized.')
    const editor = this.editor
    // The button must be registered among the UI components of the editor
    // to be displayed in the toolbar.
    editor.ui.componentFactory.add('template', () => {
      // The button will be an instance of ButtonView.
      const button = new ButtonView()

      button.set({
        label: 'Template',
        //icon: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.187 17H5.773c-.637 0-1.092-.138-1.364-.415-.273-.277-.409-.718-.409-1.323V4.738c0-.617.14-1.062.419-1.332.279-.27.73-.406 1.354-.406h4.68c.69 0 1.288.041 1.793.124.506.083.96.242 1.36.478.341.197.644.447.906.75a3.262 3.262 0 0 1 .808 2.162c0 1.401-.722 2.426-2.167 3.075C15.05 10.175 16 11.315 16 13.01a3.756 3.756 0 0 1-2.296 3.504 6.1 6.1 0 0 1-1.517.377c-.571.073-1.238.11-2 .11zm-.217-6.217H7v4.087h3.069c1.977 0 2.965-.69 2.965-2.072 0-.707-.256-1.22-.768-1.537-.512-.319-1.277-.478-2.296-.478zM7 5.13v3.619h2.606c.729 0 1.292-.067 1.69-.2a1.6 1.6 0 0 0 .91-.765c.165-.267.247-.566.247-.897 0-.707-.26-1.176-.778-1.409-.519-.232-1.31-.348-2.375-.348H7z"/></svg>',
        icon: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3.75c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm5 6c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zM2.75 16.5h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 1 0 0 1.5zM1.632 6.95 5.02 9.358a.4.4 0 0 1-.013.661l-3.39 2.207A.4.4 0 0 1 1 11.892V7.275a.4.4 0 0 1 .632-.326z" /></svg>',
        withText: true
      })

      button.on('execute', () => {
        emit('showTemplates', true)
        // Change the model using the model writer.
        // editor.model.change((writer) => {
        //   // Insert the text at the user's current position.
        //   // editor.model.insertContent(writer.createText('TEMPLATE HERE '))
        //   editor.model.insertContent(
        //     writer.createElement('softBreak'),
        //     editor.model.document.selection
        //   )
        // })
      })

      return button
    })
  }
}

//import '@/assets/ckeditor.css'
import 'ckeditor5/ckeditor5.css';

const theme = computed(() => localStorage.getItem('theme') || 'light')
const emit = defineEmits(['showTemplates'])
console.log('theme', theme.value)

const editorDescription = defineModel({ type: String, default: '' })

const txt = computed(() => {
  return props.txt
})

const toolbarset = {
  default: [
    'undo',
    'redo',
    '|',
    'heading',
    '|',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'code',
    'superscript',
    '|',
    'bulletedList',
    'numberedList',
    '|',
    'link',
    'insertTable',
    'specialCharacters',
    'removeFormat',
    '|',
    'template',
    '|',
    'sourceEditing'
  ],
  minimal: [
    'undo',
    'redo',
    '|',
    'bold',
    'italic',
    'underline',
    '|',
    'bulletedList',
    'numberedList',
    '|',
    'sourceEditing'
  ]
}

const plugins = {
  default: [
    PasteFromMarkdownExperimental,
    Essentials,
    SpecialCharacters,
    SpecialCharactersEssentials,
    Autoformat,
    Markdown,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Code,
    Superscript,
    Link,
    Heading,
    Paragraph,
    Table,
    TableToolbar,
    SourceEditing,
    List,
    RemoveFormat,
    Template
  ],
  minimal: [
    Essentials,
    Autoformat,
    Markdown,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Superscript,
    Link,
    Heading,
    List,
    SourceEditing,
    RemoveFormat
  ]
}

const editorConfig = {
  plugins: props.toolbar === 'minimal' ? plugins.minimal : plugins.default,
  toolbar: {
    items: props.toolbar === 'minimal' ? toolbarset.minimal : toolbarset.default
  },
  table: {
    defaultHeadings: { rows: 1, columns: 1 },
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'TableProperties',
      'TableCellProperties'
    ]
  },
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
      { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
      {
        model: 'headingFancy',
        view: {
          name: 'h2',
          classes: 'fancy'
        },
        title: 'Super Fancy Heading 2',
        class: 'ck-heading_heading2_fancy',

        // It needs to be converted before the standard 'heading2'.
        converterPriority: 'high'
      }
    ] as any[]
  }
}

const onEditorReady = (editor) => {
  editor.editing.view.change((writer) => {
    writer.setStyle('height', props.height + 'px', editor.editing.view.document.getRoot())
  })

  watch(
    () => props.txt,
    () => {
      setText(props.txt)
    }
  )

  const setText = (txt) => {
    editor.model.change((writer) => {
      const insertPosition = editor.model.document.selection.getFirstPosition()
      //For text adds backslashed
      //writer.insertText(txt, insertPosition)

      // This inserts html and markdown
      const viewFragment = editor.data.processor.toView(txt)
      const modelFragment = editor.data.toModel(viewFragment)
      editor.model.insertContent(modelFragment)
    })
  }
}
</script>

<style scoped>
.ck-editor__editable_inline:not(.ck-comment__input *) {
  min-height: v-bind('props.height');
  padding: 0 20px;
}
</style>