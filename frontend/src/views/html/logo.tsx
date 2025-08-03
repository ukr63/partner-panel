'use client';

const Logo = (props: any) => {
    const {
        classNameImg,
        classNameBlock,
        ...rest
    } = props;

    return (
      <div className={classNameBlock && classNameBlock}>
          <img className={classNameImg && (classNameImg)} src={'blackLogo.png'} {...rest}/>

          <style jsx>{`
                div {
                    height: 100%;
                }
              
                img {
                    height: 100%;
                }
          `}</style>
      </div>
    );
}

export default Logo;