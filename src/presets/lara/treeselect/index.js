export default {
  root: ({ props, state }) => ({
    class: [
      // Display and Position
      'inline-flex',
      'relative',
      // Shape
      'rounded-md',
      // Color and Background
      //'bg-surface-0 dark:bg-surface-900',
      'dark:bg-white/5 bg-white',
      'border border-surface-300 dark:border-surface-700',
      // Transitions
      'transition-all',
      'duration-200',
      // States
      'hover:border-primary-500 dark:hover:border-primary-400',
      {
        'outline-none outline-offset-0 ring ring-primary-400/50 dark:ring-primary-300/50':
          state.focused
      },
      // Misc
      'cursor-pointer',
      'select-none',
      {
        'opacity-60': props.disabled,
        'pointer-events-none': props.disabled,
        'cursor-default': props.disabled
      }
    ]
  }),
  labelContainer: {
    class: ['overflow-hidden flex flex-auto cursor-pointer']
  },
  label: {
    class: [
      'block leading-5',
      'p-3',
      'text-surface-800 dark:text-white/80',
      'transition duration-200',
      'overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis'
    ]
  },
  trigger: {
    class: [
      'flex items-center justify-center',
      'shrink-0',
      'bg-transparent',
      'text-surface-500',
      'w-12',
      'rounded-tr-md',
      'rounded-br-md'
    ]
  },
  panel: {
    class: [
      'absolute top-0 left-0',
      'border-0 dark:border',
      'rounded-md',
      'shadow-md',
      'bg-surface-0 dark:bg-surface-800',
      'text-surface-800 dark:text-white/80',
      'dark:border-surface-700'
    ]
  },
  wrapper: {
    class: ['max-h-[200px]', 'overflow-auto']
  },
  tree: {
    root: {
      class: ['p-5']
    },
    wrapper: {
      class: ['overflow-auto']
    },
    container: {
      class: ['m-0 p-0', 'list-none overflow-auto']
    },
    node: {
      class: [
        'p-1',
        'rounded-md',
        'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-inset focus:ring-primary-400/50 dark:focus:ring-primary-300/50'
      ]
    },
    content: ({ context, props }) => ({
      class: [
        // Flex and Alignment
        'flex items-center',
        // Shape
        'rounded-md',
        // Spacing
        'p-1',
        // Colors
        'text-surface-600 dark:text-white/70',
        {
          'bg-primary-50 dark:bg-primary-400/30 text-primary-600 dark:text-surface-0':
            context.selected
        },
        // States
        {
          'hover:bg-surface-50 dark:hover:bg-surface-700/40':
            (props.selectionMode == 'single' || props.selectionMode == 'multiple') &&
            !context.selected
        },
        // Transition
        'transition-shadow duration-200',
        {
          'cursor-pointer select-none':
            props.selectionMode == 'single' || props.selectionMode == 'multiple'
        }
      ]
    }),
    toggler: ({ context }) => ({
      class: [
        // Flex and Alignment
        'inline-flex items-center justify-center',
        // Shape
        'border-0 rounded-full',
        // Size
        'w-8 h-8',
        // Spacing
        'mr-2',
        // Colors
        'bg-transparent',
        {
          'text-surface-500 dark:text-white': !context.selected,
          'text-primary-600 dark:text-white': context.selected,
          invisible: context.leaf
        },
        // States
        'hover:bg-surface-200/20 dark:hover:bg-surface-500/20',
        'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50',
        // Transition
        'transition duration-200',
        // Misc
        'cursor-pointer select-none'
      ]
    }),
    nodeCheckbox: {
      root: {
        class: [
          'relative',
          'inline-flex',
          'align-bottom',
          'w-6',
          'h-6',
          'mr-2',
          'cursor-pointer',
          'select-none'
        ]
      },
      box: ({ props, context }) => ({
        class: [
          // Alignment
          'flex',
          'items-center',
          'justify-center',
          // Size
          'w-6',
          'h-6',
          // Shape
          'rounded-md',
          'border-2',
          // Colors
          {
            'border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900':
              !context.checked,
            'border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400':
              context.checked
          },
          // States
          {
            'peer-hover:border-primary-500 dark:peer-hover:border-primary-400':
              !props.disabled && !context.checked,
            'peer-hover:bg-primary-600 dark:peer-hover:bg-primary-300 peer-hover:border-primary-700 dark:peer-hover:border-primary-300':
              !props.disabled && context.checked,
            'peer-focus-visible:border-primary-500 dark:peer-focus-visible:border-primary-400 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400/20 dark:peer-focus-visible:ring-primary-300/20':
              !props.disabled,
            'cursor-default opacity-60': props.disabled
          },
          // Transitions
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
    },
    nodeicon: {
      class: ['mr-2', 'text-surface-600 dark:text-white/70']
    },
    subgroup: {
      class: ['m-0 list-none p-0 pl-2 mt-1']
    },
    filtercontainer: {
      class: ['relative block', 'mb-2', 'w-full']
    },
    input: {
      class: [
        'relative',
        'font-sans leading-none',
        'm-0',
        'p-3 pr-10',
        'w-full',
        'rounded-md',
        'text-surface-600 dark:text-surface-200',
        'placeholder:text-surface-400 dark:placeholder:text-surface-500',
        'bg-surface-0 dark:bg-surface-900',
        'border border-surface-300 dark:border-surface-600',
        'hover:border-primary-500 dark:hover:border-primary-400',
        'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-500/50 dark:focus:ring-primary-400/50',
        'appearance-none',
        'transition-colors duration-200'
      ]
    },
    loadingicon: {
      class: [
        'text-surface-500 dark:text-surface-0/70',
        'absolute top-[50%] right-[50%] -mt-2 -mr-2 animate-spin'
      ]
    },
    searchicon: {
      class: ['absolute top-1/2 -mt-2 right-3', 'text-surface-600 dark:hover:text-white/70']
    }
  },
  transition: {
    enterFromClass: 'opacity-0 scale-y-[0.8]',
    enterActiveClass:
      'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
    leaveActiveClass: 'transition-opacity duration-100 ease-linear',
    leaveToClass: 'opacity-0'
  }
}
