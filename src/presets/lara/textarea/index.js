export default {
  root: ({ context: e }) => ({
    class: [
      'font-sans leading-normal',
      'm-0',
      'p-3',
      'rounded-md',
      'text-surface-600 dark:text-surface-200',
      'placeholder:text-surface-400 dark:placeholder:text-surface-500',
      //'dark:bg-white/5 bg-white',
      'dark:bg-surface-900 bg-surface-0',
      'border border-surface-300 dark:border-surface-600',
      {
        'hover:border-primary-500 dark:hover:border-primary-400': !e.disabled,
        'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-500/50 dark:focus:ring-primary-400/50':
          !e.disabled,
        'opacity-60 select-none pointer-events-none cursor-default': e.disabled
      },
      'appearance-none',
      'transition-colors duration-200'
    ]
  })
}
