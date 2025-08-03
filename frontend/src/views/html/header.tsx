'use client';

import {useSelector, useDispatch} from "react-redux";

import Link from "next/link";
import Logo from "@/views/html/logo";

const Header = (props: any) => {
    const language = useSelector((state: any) => state.settings.language);

    return (
        <header>
            <div className="container">
                <nav>
                    <div className="header-div">
                        <Link href='/' style={{
                            height: '100%'
                        }}>
                            <div className="header-logo">
                                <Logo classNameImg={'logo-img'} />
                            </div>
                        </Link>
                    </div>
                    <div className="header-right">
                        <div className="header-pc">
                            {/*<span>*/}
                            {/*    <button className="btn select-lang">*/}
                            {/*        {language}*/}
                            {/*    </button>*/}
                            {/*</span>*/}
                            <span>
                                <Link href='/' className="btn">
                                    Магазин
                                </Link>
                            </span>
                            <span>
                                <Link href='/delivery' className="btn">
                                    Доставка
                                </Link>
                            </span>
                            <span>
                                <Link href='/auth/signin' className="btn">
                                    Війти
                                </Link>
                            </span>
                            <span className={'span-account'}>
                                <button className={'btn btn-card'}>
                                    <svg fill="#000000" viewBox="0 0 32 32" version="1.1"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M31.739 8.875c-0.186-0.264-0.489-0.422-0.812-0.422h-21.223l-1.607-5.54c-0.63-2.182-2.127-2.417-2.741-2.417h-4.284c-0.549 0-0.993 0.445-0.993 0.993s0.445 0.993 0.993 0.993h4.283c0.136 0 0.549 0 0.831 0.974l5.527 20.311c0.12 0.428 0.511 0.724 0.956 0.724h13.499c0.419 0 0.793-0.262 0.934-0.657l4.758-14.053c0.11-0.304 0.064-0.643-0.122-0.907zM25.47 22.506h-12.046l-3.161-12.066h19.253zM23.5 26.504c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5c0-1.381-1.119-2.5-2.5-2.5zM14.5 26.504c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5c0-1.381-1.119-2.5-2.5-2.5z"></path>
                                    </svg>
                                </button>
                            </span>
                        </div>
                        <div className="header-burger">
                            <button className="btn btn-account">
                                <span className="span-account">
                                    <svg fill="#000000" viewBox="0 0 32 32" version="1.1"
                                         xmlns="http://www.w3.org/2000/svg">
    <path
        d="M31.739 8.875c-0.186-0.264-0.489-0.422-0.812-0.422h-21.223l-1.607-5.54c-0.63-2.182-2.127-2.417-2.741-2.417h-4.284c-0.549 0-0.993 0.445-0.993 0.993s0.445 0.993 0.993 0.993h4.283c0.136 0 0.549 0 0.831 0.974l5.527 20.311c0.12 0.428 0.511 0.724 0.956 0.724h13.499c0.419 0 0.793-0.262 0.934-0.657l4.758-14.053c0.11-0.304 0.064-0.643-0.122-0.907zM25.47 22.506h-12.046l-3.161-12.066h19.253zM23.5 26.504c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5c0-1.381-1.119-2.5-2.5-2.5zM14.5 26.504c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5c0-1.381-1.119-2.5-2.5-2.5z"></path>
</svg>
                                </span>
                            </button>
                            <button data-testid="header-mobile-menu-button" type="button"
                                    className="btn btn-menu"><span aria-hidden="true" className="span-menu"><svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path
                                d="M2.25 18.753h19.5a.75.75 0 0 0 0-1.5H2.25a.75.75 0 0 0 0 1.5zm0-6h19.5a.75.75 0 0 0 0-1.5H2.25a.75.75 0 0 0 0 1.5zm0-6h19.5a.75.75 0 0 0 0-1.5H2.25a.75.75 0 0 0 0 1.5z"></path></svg></span>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
            <style jsx>{`

                .logo-img {
                    height: 20px;
                }

                nav {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    height: 60px;
                }

                header {
                    margin: auto;
                    text-align: center;
                }

                .btn {
                    height: 48px;
                    color: #000;
                }
                
                .btn-card {
                    padding: 3px !important;
                    width: 50px;
                    height: 32px;
                }

                .btn-card svg {
                    height: 80%;
                }

                nav > div {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                }

                .header-div {
                    max-width: 120px;
                }

                .header-burger {
                    display: none;
                }

                .btn-menu {
                    height: 48px;
                    width: 48px;
                }

                .btn-account svg {
                    font-size: 24px;
                }

                .span-menu, .span-account {
                    list-style-type: none;
                    pointer-events: all;
                    width: 20px;
                    height: 20px;
                    color: currentcolor;
                    text-align: start;
                    cursor: pointer;
                    --bui_button_medium_margin_inline_end: calc(var(--bui_spacing_2x) * -1);
                    --bui_button_large_margin_inline_end: calc(var(--bui_spacing_3x) * -1);
                    display: inline-block;
                    fill: currentcolor;
                    height: calc(4px * 5);
                }
                
                .span-account {
                    margin-right: 20px;
                }

                .span-menu svg {
                    height: 100%;
                }
                
                .header-logo {
                    height: 100%;
                }

                @media (max-width: 1024px) {
                    .header-pc {
                        display: none;
                    }

                    .span-account {
                        margin-right: inherit;
                    }
                    
                    .header-burger {
                        display: flex;
                        flex-direction: row;
                    }
                }
            `}</style>
        </header>
    );
}

export default Header;