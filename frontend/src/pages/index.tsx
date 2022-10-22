import Image from "next/image";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Styles from "../../styles/title.module.scss";
import { BACKEND_ORIGIN } from "./sample_api";

const TitleLogo = () => {
  return <h1 className={Styles.title_logo}>プロリス</h1>;
};

const IntroCarousel = () => {
  const photo_width: number = 600;
  const photo_rate: number = 9 / 16;

  const e1: string = "/images/s1.png";
  const e2: string = "/images/s2.png";
  const e3: string = "/images/s3.png";
  const photo_urls = [e1, e2, e3];
  const showList = photo_urls.map((x) => (
    <Carousel.Item interval={2000} key={x}>
      <Image src={x} width={photo_width} height={photo_width * photo_rate} />
    </Carousel.Item>
  ));
  return <Carousel className={Styles.carousel}>{showList}</Carousel>;
};

const Title = () => {
  const router = useRouter();
  return (
    <main>
      <div className={Styles.text}>
        <TitleLogo></TitleLogo>
        <div className={Styles.description}>
          pronunciation & Lisning
          <br />
          　オリジナル発音帳
        </div>
        <IntroCarousel></IntroCarousel>
        <div className={Styles.login_contents}>
          <div className={Styles.button_title}>ログインする</div>

          <Button
            className={Styles.button_body}
            variant="outline-light"
            onClick={() => {
              router.push(BACKEND_ORIGIN + "/auth/login");
            }}
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
              <path
                d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"
                fill="#4285F4"
              ></path>
              <path
                d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z"
                fill="#34A853"
              ></path>
              <path
                d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z"
                fill="#FBBC05"
              ></path>
              <path
                d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.3z"
                fill="#EA4335"
              ></path>
            </svg>
            <span className={Styles.button_massage}>Googleで続ける</span>
          </Button>
        </div>
        <div className={Styles.copyright}>
          Copyright Since 2022 Iino, Watatani, kaji. All rights reserved.
        </div>
      </div>
    </main>
  );
};

export default Title;
