export default {
    root: ({ props }) => ({
        class: [
            //Font
            'text-sm font-bold',

            //Alignments
            'inline-flex items-center justify-center',

            //Spacing
            'px-4 py-2',

            //Shape
            {
                'rounded-md': !props.rounded,
                'rounded-full': props.rounded
            },

            //Colors
            'text-primary-contrast',
            {
                'bg-primary dark:bg-primary text-surface-0 dark:text-surface-900': props.severity == null || props.severity === 'primary',
                'text-surface-700 dark:text-surface-300 bg-surface-100 dark:bg-surface-500/20': props.severity === 'secondary',
                'bg-green-500 dark:bg-green-400 text-surface-0 dark:text-surface-900': props.severity === 'success',
                'bg-blue-500 dark:bg-blue-400 text-surface-0 dark:text-surface-900': props.severity === 'info',
                'bg-orange-500 dark:bg-orange-400 text-surface-0 dark:text-surface-900': props.severity === 'warn',
                'bg-red-500 dark:bg-red-400 text-surface-0 dark:text-surface-900': props.severity === 'danger',
                'text-surface-0 dark:text-surface-900 bg-surface-900 dark:bg-surface-0': props.severity === 'contrast'
            }
        ]
    }),
    value: {
        class: 'leading-normal'
    },
    icon: {
        class: 'mr-1 text-sm'
    }
};
