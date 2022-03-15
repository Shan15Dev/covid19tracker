import Head from 'next/head'
import Image from 'next/image'
import CasesCHLine from '../components/CasesCHLine'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <CasesCHLine />
    </div>
  )
}
