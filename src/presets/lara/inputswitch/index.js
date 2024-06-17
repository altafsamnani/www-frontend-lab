export default {
  root: ({ props: e }) => ({
    class: [
      'inline-block relative',
      'w-12 h-7',
      'rounded-2xl',
      { 'opacity-60 select-none pointer-events-none cursor-default': e.disabled }
    ]
  }),
  slider: ({ props: e }) => ({
    class: [
      'absolute top-0 left-0 right-0 bottom-0',
      { 'before:transform before:translate-x-5': e.modelValue == e.trueValue },
      'rounded-2xl',
      'before:absolute before:top-1/2 before:left-1',
      'before:-mt-2.5',
      'before:h-5 before:w-5',
      'before:rounded-full',
      'before:duration-200',
      'before:bg-surface-0 before:dark:bg-surface-900',
      'border border-transparent',
      {
        'bg-surface-200 dark:bg-surface-700': e.modelValue != e.trueValue,
        'bg-primary-500 dark:bg-primary-400': e.modelValue == e.trueValue
      },
      {
        'peer-hover:bg-surface-300 dark:peer-hover:bg-surface-600 ':
          e.modelValue != e.trueValue && !e.disabled
      },
      {
        'peer-hover:bg-primary-600 dark:peer-hover:bg-surface-300 ':
          e.modelValue == e.trueValue && !e.disabled
      },
      'peer-focus-visible:ring peer-focus-visible:ring-primary-400/50 dark:peer-focus-visible:ring-primary-300/50',
      'transition-colors duration-200',
      'cursor-pointer'
    ]
  }),
  input: {
    class: [
      'peer',
      'w-full ',
      'h-full',
      'absolute',
      'top-0 left-0',
      'z-10',
      'p-0',
      'm-0',
      'opacity-0',
      'rounded-[2.5rem]',
      'outline-none',
      'appareance-none',
      'cursor-pointer'
    ]
  }
}
