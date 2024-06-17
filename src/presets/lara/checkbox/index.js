export default {
  root: {
    class: [
      'relative',
      'inline-flex',
      'align-bottom',
      'w-6',
      'h-6',
      'cursor-pointer',
      'select-none'
    ]
  },
  box: ({ props: e, context: r }) => ({
    class: [
      'flex',
      'items-center',
      'justify-center',
      'w-6',
      'h-6',
      'rounded-md',
      'border-2',
      {
        'border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900': !r.checked,
        'border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400': r.checked
      },
      {
        'peer-hover:border-primary-500 dark:peer-hover:border-primary-400':
          !e.disabled && !r.checked,
        'peer-hover:bg-primary-600 dark:peer-hover:bg-primary-300 peer-hover:border-primary-700 dark:peer-hover:border-primary-300':
          !e.disabled && r.checked,
        'peer-focus-visible:border-primary-500 dark:peer-focus-visible:border-primary-400 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400/20 dark:peer-focus-visible:ring-primary-300/20':
          !e.disabled,
        'cursor-default opacity-60': e.disabled
      },
      'transition-colors',
      'duration-200'
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
      'rounded-md',
      'outline-none',
      'border-2 border-surface-200 dark:border-surface-700',
      'appareance-none',
      'cursor-pointer'
    ]
  },
  icon: {
    class: [
      'text-base leading-none',
      'w-4',
      'h-4',
      'text-white dark:text-surface-900',
      'transition-all',
      'duration-200'
    ]
  }
}
