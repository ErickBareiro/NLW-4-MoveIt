import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal() {
    return (
        <div className={styles.overlay}>
            <div className={styles.container}></div>
        </div>
    )
}