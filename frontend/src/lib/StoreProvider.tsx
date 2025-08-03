'use client';

import React, {useEffect, useRef, useState} from 'react'
import {Provider} from 'react-redux'
import {makeStore, AppStore} from '@/lib/store'

export default function StoreProvider({
                                          children
                                      }: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        storeRef.current = makeStore()
    }

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        let timerId = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
        }
    }, []);

    return (
        <Provider store={storeRef.current}>
            {/*<Preloader show={isLoading}/>*/}
            {children}
        </Provider>
    )
}

const Preloader = (props: {
    show: boolean
}) => {
    const {show} = props;
    return (
        <div className={'preloader'}>
            <div className="dot-elastic"></div>
            <style jsx global>{`
                body {
                    margin: 0;
                    padding: 0;
                }

                .preloader {
                    //background: #1D3557;
                    background: #fff;
                    position: fixed;
                    height: 100%;
                    width: 100%;
                    z-index: 99999;

                    display: ${show ? 'flex' : 'none'};
                    justify-content: center;
                    align-items: center;
                }

                .dot-elastic {
                    position: relative;
                    width: 10px;
                    height: 10px;
                    border-radius: 5px;
                    background-color: #9880ff;
                    color: #9880ff;
                    animation: dot-elastic 1s infinite linear;
                    margin-left: 10px;
                }

                .dot-elastic::before, .dot-elastic::after {
                    content: "";
                    display: inline-block;
                    position: absolute;
                    top: 0;
                }

                .dot-elastic::before {
                    left: -15px;
                    width: 10px;
                    height: 10px;
                    border-radius: 5px;
                    background-color: #9880ff;
                    color: #9880ff;
                    animation: dot-elastic-before 1s infinite linear;
                }

                .dot-elastic::after {
                    left: 15px;
                    width: 10px;
                    height: 10px;
                    border-radius: 5px;
                    background-color: #9880ff;
                    color: #9880ff;
                    animation: dot-elastic-after 1s infinite linear;
                }

                @keyframes dot-elastic-before {
                    0% {
                        transform: scale(1, 1);
                    }
                    25% {
                        transform: scale(1, 1.5);
                    }
                    50% {
                        transform: scale(1, 0.67);
                    }
                    75% {
                        transform: scale(1, 1);
                    }
                    100% {
                        transform: scale(1, 1);
                    }
                }

                @keyframes dot-elastic {
                    0% {
                        transform: scale(1, 1);
                    }
                    25% {
                        transform: scale(1, 1);
                    }
                    50% {
                        transform: scale(1, 1.5);
                    }
                    75% {
                        transform: scale(1, 1);
                    }
                    100% {
                        transform: scale(1, 1);
                    }
                }

                @keyframes dot-elastic-after {
                    0% {
                        transform: scale(1, 1);
                    }
                    25% {
                        transform: scale(1, 1);
                    }
                    50% {
                        transform: scale(1, 0.67);
                    }
                    75% {
                        transform: scale(1, 1.5);
                    }
                    100% {
                        transform: scale(1, 1);
                    }
                }
            `}</style>
        </div>
    )
}