import styles from './Input.module.css';

const Input = ({type}) => {
    return <input type={type} className={styles.input}/>
}

export default Input;