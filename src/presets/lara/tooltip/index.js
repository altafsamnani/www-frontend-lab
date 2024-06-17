export default {
  root: ({ context, props }) => ({
    class: [
      // Position and Shadows
      'absolute',
      'shadow-md',
      'p-fadein',
      // Spacing
      {
        'py-0 px-1':
          (context == null ? void 0 : context.right) ||
          (context == null ? void 0 : context.left) ||
          (!(context != null && context.right) &&
            !(context != null && context.left) &&
            !(context != null && context.top) &&
            !(context != null && context.bottom)),
        'py-1 px-0':
          (context == null ? void 0 : context.top) || (context == null ? void 0 : context.bottom)
      }
    ]
  }),
  arrow: ({ context, props }) => ({
    class: [
      // Position
      'absolute',
      // Size
      'w-0',
      'h-0',
      // Shape
      'border-transparent',
      'border-solid',
      {
        'border-y-[0.25rem] border-r-[0.25rem] border-l-0 border-r-surface-600':
          (context == null ? void 0 : context.right) ||
          (!(context != null && context.right) &&
            !(context != null && context.left) &&
            !(context != null && context.top) &&
            !(context != null && context.bottom)),
        'border-y-[0.25rem] border-l-[0.25rem] border-r-0 border-l-surface-600':
          context == null ? void 0 : context.left,
        'border-x-[0.25rem] border-t-[0.25rem] border-b-0 border-t-surface-600':
          context == null ? void 0 : context.top,
        'border-x-[0.25rem] border-b-[0.25rem] border-t-0 border-b-surface-600':
          context == null ? void 0 : context.bottom
      },
      // Spacing
      {
        '-mt-1 ':
          (context == null ? void 0 : context.right) ||
          (!(context != null && context.right) &&
            !(context != null && context.left) &&
            !(context != null && context.top) &&
            !(context != null && context.bottom)),
        '-mt-1': context == null ? void 0 : context.left,
        '-ml-1':
          (context == null ? void 0 : context.top) || (context == null ? void 0 : context.bottom)
      }
    ]
  }),
  text: {
    class: [
      'p-3',
      'bg-surface-600 dark:bg-surface-700',
      'text-white',
      'leading-none',
      'rounded-md',
      'whitespace-pre-line',
      'break-words'
    ]
  }
}
