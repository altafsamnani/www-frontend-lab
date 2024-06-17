export default {
    root: ({props:e,state:r})=>({class:["inline-flex","relative","rounded-md","","select select-bordered","transition-all","duration-200","",{"":r.focused},"cursor-pointer","select-none",{"opacity-60":e.disabled,"pointer-events-none":e.disabled,"cursor-default":e.disabled}]}),
    labelContainer: {
        class: ["overflow-hidden flex flex-auto cursor-pointer"]
    },
    label: {
        class: ["block leading-5", "p-3", "", "transition duration-200", "overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis"]
    },
    trigger: {
        class: ["flex items-center justify-center", "shrink-0", "bg-transparent", "text-surface-500", "w-12", "rounded-tr-md", "rounded-br-md"]
    },
    panel: {
        class: ["absolute top-0 left-0", "border-0 dark:border", "rounded-md", "shadow-md", "bg-base-100 dark:bg-base-100", "", "dark:select-bordered"]
    },
    wrapper: {
        class: ["max-h-[200px]", "overflow-auto"]
    },
    tree: {
        root: {
            class: ["p-5"]
        },
        wrapper: {
            class: ["overflow-auto"]
        },
        container: {
            class: ["m-0 p-0", "list-none overflow-auto"]
        },
        node: {
            class: ["p-1", "rounded-md"]
        },
        content: ({context:e,props:r})=>({class:["flex items-center","rounded-md","p-2","",{"bg-primary-content":e.selected},{"hover:bg-primary-content":(r.selectionMode=="single"||r.selectionMode=="multiple")&&!e.selected},"",{"cursor-pointer select-none":r.selectionMode=="single"||r.selectionMode=="multiple"}]}),
        toggler: ({context:e})=>({class:["inline-flex items-center justify-center","border-0 rounded-full","w-8 h-8","mr-2","bg-transparent",{"":!e.selected,"":e.selected,invisible:e.leaf},"hover:bg-surface-200/20 dark:hover:bg-surface-500/20","focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50","transition duration-200","cursor-pointer select-none"]}),
        checkboxcontainer: {
            class: "mr-2"
        },
        checkbox: ({context:e,props:r})=>({class:["relative","flex","items-center","justify-center","w-6","h-6","rounded-lg","border-2","text-surface-600",{"border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900":!e.checked,"border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400":e.checked},"focus:outline-none focus:outline-offset-0",{"hover:border-primary-500 dark:hover:border-primary-400":!r.disabled,"ring ring-primary-400/50 dark:ring-primary-300/50":!r.disabled&&e.focused,"cursor-default opacity-60":r.disabled},"transition-colors","duration-200","cursor-pointer"]}),
        checkboxicon: {
            class: ["text-base leading-none", "w-4", "h-4", "text-white dark:text-surface-900", "transition-all", "duration-200"]
        },
        nodeicon: {
            class: ["mr-2", ""]
        },
        subgroup: {
            class: ["m-0 list-none p-0 pl-2 mt-1"]
        },
        filtercontainer: {
            class: ["relative block", "mb-2", "w-full"]
        },
        input: {
            class: ["relative", "font-sans leading-none", "m-0", "p-3 pr-10", "w-full", "rounded-md", "text-surface-600 dark:text-surface-200", "placeholder:text-surface-400 dark:placeholder:text-surface-500", "bg-surface-0 dark:bg-surface-900", "border border-surface-300 dark:border-surface-600", "hover:border-primary-500 dark:hover:border-primary-400", "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-500/50 dark:focus:ring-primary-400/50", "appearance-none", "transition-colors duration-200"]
        },
        loadingicon: {
            class: ["text-surface-500 dark:text-surface-0/70", "absolute top-[50%] right-[50%] loading loading-ring loading-xs"]
        },
        searchicon: {
            class: ["absolute top-1/2 -mt-2 right-3", "text-surface-600 dark:hover:text-white/70"]
        }
    },
    transition: {
        enterFromClass: "opacity-0 scale-y-[0.8]",
        enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
        leaveActiveClass: "transition-opacity duration-100 ease-linear",
        leaveToClass: "opacity-0"
    }

}