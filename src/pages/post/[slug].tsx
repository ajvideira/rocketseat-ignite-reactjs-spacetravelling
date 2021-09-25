import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { RichText } from 'prismic-dom';
import { Giscus } from '@giscus/react';
import { getPrismicClient } from '../../services/prismic';

import styles from './post.module.scss';
import { ExitPreviewButton } from '../../components/ExitPreviewButton';

interface Post {
  first_publication_date: string | null;
  uid?: string;
  data: {
    title: string;
    subtitle: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();
  if (router.isFallback) {
    return <span>Carregando...</span>;
  }
  const wordsPerMinute = 200;
  const totalWords = Math.round(
    post.data.content.reduce(
      (acc, contentItem) =>
        acc +
        contentItem.heading.split(' ').length +
        contentItem.body.reduce(
          (acc2, bodyItem) => acc2 + bodyItem.text.split(' ').length,
          0
        ),
      0
    )
  );
  const totalMinutes = Math.ceil(totalWords / wordsPerMinute);

  return (
    <>
      <Head>
        <title>{post.data.title} | Ignews</title>
      </Head>
      <main className={styles.container}>
        <img
          className={styles.banner}
          src={post.data.banner.url}
          alt="Post banner"
        />
        <article>
          <h1>{post.data.title}</h1>
          <div className={styles.info}>
            <div>
              <FiCalendar size={20} />
              <span>
                {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
                  locale: ptBR,
                })}
              </span>
            </div>
            <div>
              <FiUser size={20} />
              <span>{post.data.author}</span>
            </div>
            <div>
              <FiClock size={20} />
              <span>{totalMinutes} min</span>
            </div>
          </div>
          <p className={styles.infoUpdate}>
            * editado em 19 mar 2021, às 15:49
          </p>
          <div className={styles.content}>
            {post.data.content.map((contentItem, index) => (
              <div
                key={`${index}-${contentItem.heading}`}
                className={styles.contentItem}
              >
                <h2>{contentItem.heading}</h2>
                <div
                  className={styles.body}
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(contentItem.body),
                  }}
                />
              </div>
            ))}
          </div>
          <div className={styles.footer}>
            <nav className={styles.postNavigation}>
              <Link href="#">
                <a className={styles.postAnterior}>
                  Como utilizar Hooks<span>Post anterior</span>
                </a>
              </Link>
              <Link href="#">
                <a className={styles.postPosterior}>
                  Criando um app CRA do Zero<span>Próximo post</span>
                </a>
              </Link>
            </nav>
            <Giscus
              repo="ajvideira/rocketseat-ignite-reactjs-spacetravelling"
              repoId="MDEwOlJlcG9zaXRvcnk0MDg2MTY2NDI="
              category="General"
              categoryId="DIC_kwDOGFr-ws4B_K98"
              mapping="pathname"
              reactionsEnabled="1"
              emitMetadata="1"
              theme="dark"
            />
            <ExitPreviewButton className={styles.exitPreview} />
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: [],
      pageSize: 100,
    }
  );

  console.log(
    response.results.map(post => ({
      params: { slug: post.uid },
    }))
  );

  return {
    paths: response.results.map(post => ({
      params: { slug: post.uid },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', String(slug), {});

  return {
    props: {
      post: {
        uid: response.uid,
        first_publication_date: response.first_publication_date,
        data: {
          author: response.data.author,
          title: response.data.title,
          subtitle: response.data.subtitle,
          content: response.data.content,
          banner: {
            url: response.data.banner.url,
          },
        },
      },
    },
  };
};
