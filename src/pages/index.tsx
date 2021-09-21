import { GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Home | Space Travelling</title>
      </Head>
      <main className={styles.container}>
        <a href="#" className={styles.post} title="Post">
          <strong>Como utilizar Hooks</strong>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div className={styles.info}>
            <span>
              <FiCalendar size={20} /> 15 Mar 2021
            </span>
            <span>
              <FiUser size={20} /> Joseph Oliveira
            </span>
          </div>
        </a>
        <a href="#" className={styles.post} title="Post">
          <strong>Criando um app CRA do zero</strong>
          <p>
            Tudo sobre como criar a sua primeira aplicação utilizando Create
            React App
          </p>
          <div className={styles.info}>
            <span>
              <FiCalendar size={20} /> 19 Abr 2021
            </span>
            <span>
              <FiUser size={20} /> Danilo Vieira
            </span>
          </div>
        </a>
        <a href="#" className={styles.post} title="Post">
          <strong>Como utilizar Hooks</strong>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div className={styles.info}>
            <span>
              <FiCalendar size={20} /> 15 Mar 2021
            </span>
            <span>
              <FiUser size={20} /> Joseph Oliveira
            </span>
          </div>
        </a>
        <a href="#" className={styles.post} title="Post">
          <strong>Criando um app CRA do zero</strong>
          <p>
            Tudo sobre como criar a sua primeira aplicação utilizando Create
            React App
          </p>
          <div className={styles.info}>
            <span>
              <FiCalendar size={20} /> 19 Abr 2021
            </span>
            <span>
              <FiUser size={20} /> Danilo Vieira
            </span>
          </div>
        </a>
        <a href="#" className={styles.post} title="Post">
          <strong>Como utilizar Hooks</strong>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div className={styles.info}>
            <span>
              <FiCalendar size={20} /> 15 Mar 2021
            </span>
            <span>
              <FiUser size={20} /> Joseph Oliveira
            </span>
          </div>
        </a>
        <a href="#" className={styles.post} title="Post">
          <strong>Criando um app CRA do zero</strong>
          <p>
            Tudo sobre como criar a sua primeira aplicação utilizando Create
            React App
          </p>
          <div className={styles.info}>
            <span>
              <FiCalendar size={20} /> 19 Abr 2021
            </span>
            <span>
              <FiUser size={20} /> Danilo Vieira
            </span>
          </div>
        </a>
        <button type="button" className={styles.loadMorePosts}>
          Carregar mais posts
        </button>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // const prismic = getPrismicClient();
  // const postsResponse = await prismic.query(TODO);
  // TODO
  return {
    props: {},
  };
};
