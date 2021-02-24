import styles from '../styles/components/Profile.module.css'

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/ErickBareiro.png" alt="Erick Bareiro" />
            <div>
                <strong>Erick Bareiro</strong>
                <p>Level 1</p>
            </div>
        </div>
    );
}