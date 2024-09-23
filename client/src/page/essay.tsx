import { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Balancer from 'react-wrap-balancer';
import { Container } from '../components/ui/Container.tsx';

const posts = [
  {
    date: '2024-09-15',
    label: '前端开发',
    content: '最近在研究 React 18 的新特性，发现其中的 Concurrent Mode 非常有趣。你们有什么看法？',
    image: 'https://img02.anheyu.com/adminuploads/1/2022/11/17/637580acb12b3.webp',
  },
  {
    date: '2024-09-14',
    label: 'UI/UX 设计',
    content: '重新设计了一个用户界面，使用了新的颜色方案和排版风格。看起来效果不错！',
    image: 'https://img02.anheyu.com/adminuploads/1/2022/11/17/637580acb12b3.webp',
  },
  {
    date: '2024-09-13',
    label: '创业经验',
    content: '最近我们公司完成了一个重要的项目，感觉很有成就感。创业路上充满挑战，但也很有意义。',
    image: 'https://img02.anheyu.com/adminuploads/1/2022/11/17/637580acb12b3.webp',
  },
];

export const EssayPage = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 优化函数引用
  const handleImageClick = useCallback((image: string) => {
    setSelectedImage(image);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // 增加通过键盘 ESC 键关闭图片模态框的功能
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

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
