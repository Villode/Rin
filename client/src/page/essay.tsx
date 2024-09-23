import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Balancer from 'react-wrap-balancer';
import { Container } from '../components/ui/Container.tsx';



export const EssayPage = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 获取 JSON 数据
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('../components/essay/essay.json'); // 替换为你的 JSON 文件路径
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  // 其他事件处理函数...

  return (
    <>
      <Helmet>
        <title>{t('essay')}</title>
      </Helmet>
      <Container className="mt-16 sm:mt-24">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {t('essay')}
          </h1>
          <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
            <Balancer>欢迎来到我的动态页面。在这里，我会分享一些关于前端开发、UI/UX设计和创业经验的最新动态。</Balancer>
          </p>
        </header>

        <div className="flex flex-wrap gap-4">
          {posts.map((post, index) => (
            <div
              key={index}
              className="w-80 p-4 bg-white dark:bg-zinc-800 shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:bg-zinc-200 dark:hover:bg-zinc-700"
            >
              <div className="flex items-center mb-4">
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{post.date}</span>
                <span className="ml-4 px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">{post.label}</span>
              </div>
              <p className="mb-4 text-base text-zinc-700 dark:text-zinc-300">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post Image"
                  className="w-full h-auto rounded-lg cursor-pointer"
                  style={{ objectFit: 'cover' }}
                  onClick={() => handleImageClick(post.image)}
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>

        {/* Modal for displaying large image */}
        {selectedImage && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
            onClick={handleClose}
          >
            <div className="relative bg-white p-4 rounded-lg">
              <button
                className="absolute top-2 right-2 text-white bg-black rounded-full p-2"
                onClick={handleClose}
              >
                ✕
              </button>
              <img
                src={selectedImage}
                alt="Large View"
                className="max-w-full max-h-screen rounded-lg"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
