import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export const EssayPage = () => {
  const { t } = useTranslation(); // 使用国际化支持

  return (
    <>
      <Helmet>
        <title>{t('essay')}</title> {/* 使用翻译字符串作为标题 */}
      </Helmet>
      <div>
        <h1>{t('essay')}</h1> {/* 使用翻译字符串 */}
        <p>{t('这里是说说')}</p> {/* 也可以将这里的文本放入翻译文件中 */}
      </div>
    </>
  );
};
