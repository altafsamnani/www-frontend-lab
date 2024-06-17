import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
export function Templates(editor) {
  console.log('InsertTemplate plugin has been registered')

  class Templates extends Plugin {
    init() {
      const editor = this.editor
      // The button must be registered among the UI components of the editor
      // to be displayed in the toolbar.
      editor.ui.componentFactory.add('templates', () => {
        // The button will be an instance of ButtonView.
        const button = new ButtonView()

        button.set({
          label: 'Templates',
          withText: true
        })

        return button
      })
    }
  }
}
