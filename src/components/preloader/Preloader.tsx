import styles from './Preloader.module.scss'

const Preloader: React.FC = () => {
    const dot: {}[] = []
    for (let i = 1; i < 21; i++) {
        dot.push({})
    }

    return (<>
        <div className={styles.wrapper}>
            <div className={styles.title}>Загрузка...</div>
            <div className={styles.loader}>
                {dot.map((_, index) => {
                    let style = `dot${index}`
                    return <span className={styles[style]} key={index}></span>
                })}
            </div>
        </div>
    </>)
}

export { Preloader }