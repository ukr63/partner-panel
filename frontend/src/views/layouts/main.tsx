import Header from "@/views/html/header";
import TopHeader from "@/views/html/topHeader";
import Head from 'next/head'

import '@/app/globals.css';

const Layout = (props: any) => {
    const {
        children,
        ...rest
    } = props;

    return (
        <div className="wrapper">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
                      rel="stylesheet"/>
            </Head>
            <div className={'top-header'}>
                <div className="container">
                    <TopHeader/>
                </div>
            </div>
            <div className="header">
                <div className="container">
                    <Header />
                </div>
            </div>
            <div className="content">
                <div className="container">
                    {children}
                </div>
            </div>
            <div className="footer"></div>
        </div>
    )
}

export default Layout;