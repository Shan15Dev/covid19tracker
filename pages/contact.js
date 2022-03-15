import styles from '../styles/contact.module.css'

export default function Contact() {
  return (
    <div>
      <h1>Contact us</h1>
      <form className={styles.form}>
        <input placeholder="Subject"></input>
        <input placeholder="E-Mail"></input>
        <textarea placeholder="Message"></textarea>
        <button>Submit</button>
      </form>
    </div>
  );
}
