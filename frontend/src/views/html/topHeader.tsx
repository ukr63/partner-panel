'use client';

import {useSelector, useDispatch} from "react-redux";

import Link from "next/link";

const Header = (props: any) => {

    return (
        <div className={'top-header-content'}>
            <span className={'centerText'}>Знижка на годинники 20%!</span>
            <style jsx>{`
                .top-header-content {
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .centerText {
                    font-family: "Oswald", sans-serif;
                    font-optical-sizing: auto;
                    color: #fff;
                    text-transform: uppercase;
                    font-weight: bold;
                    font-size: 14px;
                }
                
            `}</style>
        </div>
    );
}

export default Header;