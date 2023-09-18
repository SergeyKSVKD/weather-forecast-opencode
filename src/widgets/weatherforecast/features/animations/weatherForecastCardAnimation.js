export const variants = {
    hidden: { opacity: 0.5, translateX: -1500 },
    show: {
        opacity: 1,
        translateX: 0,
        transition: {
            delay: 0.2,
            duration: 0.5
        }
    }
}

export const initial = 'hidden'
export const animate = 'show'