import { useContext, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { ClientConfigContext } from '../state/config';
import { Helmet } from "react-helmet";
import { siteName } from '../utils/constants';
import { useTranslation } from "react-i18next";


function Footer() {
    const { t } = useTranslation();
    const config = useContext(ClientConfigContext);
    const footerHtml = config.get<string>('footer');

    useEffect(() => {
        setDarkMode();
    }, []);

    const setDarkMode = () => {
        document.documentElement.setAttribute('data-color-mode', 'dark');
        window.dispatchEvent(new Event("colorSchemeChange"));
    };

    return (
        <footer>
            <Helmet>
                <link rel="alternate" type="application/rss+xml" title={siteName} href="/sub/rss.xml" />
                <link rel="alternate" type="application/atom+xml" title={siteName} href="/sub/atom.xml" />
                <link rel="alternate" type="application/json" title={siteName} href="/sub/rss.json" />
            </Helmet>
            <div className="flex flex-col mb-8 space-y-2 justify-center items-center t-primary ani-show">
                {footerHtml && <div dangerouslySetInnerHTML={{ __html: footerHtml }} />}
                <p className='text-sm text-neutral-500 font-normal link-line'>
                    <span>
                        © 2024 Powered by <a className='hover:underline' href="https://github.com/Villode" target="_blank">Villode</a>
                    </span>
                    {config.get<boolean>('rss') && <>
                        <Spliter />
                        <Popup trigger={
                            <button className="hover:underline" type="button">
                                RSS
                            </button>
                        }
                            position="top center"
                            arrow={false}
                            closeOnDocumentClick>
                            <div className="border-card">
                                <p className='font-bold t-primary'>
                                    {t('footer.rss')}
                                </p>
                                <p>
                                    <a href='/sub/rss.xml'>
                                        RSS
                                    </a> <Spliter />
                                    <a href='/sub/atom.xml'>
                                        Atom
                                    </a> <Spliter />
                                    <a href='/sub/rss.json'>
                                        JSON
                                    </a>
                                </p>

                            </div>
                        </Popup>
                    </>}
                </p>
            </div>
        </footer>
    );
}

function Spliter() {
    return (<span className='px-1'>
        |
    </span>
    );
}

export default Footer;
