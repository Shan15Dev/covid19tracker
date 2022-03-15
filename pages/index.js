import Head from 'next/head'
import CasesCHLine from '../components/CasesCHLine'
import styles from '../styles/index.module.css'

export default function Home() {
  return (
    <div className={styles.grid}>
      <Head>
        <title>Covid 19 Tracker</title>
      </Head>
      <CasesCHLine />
    </div>
  )
}
