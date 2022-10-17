import styles from "../../styles/title.module.scss";

const TitleLogo = () => {
  // hoverlogo();

  return <h1 className={styles.logo}>aa</h1>;
};

export default () => {
  return (
    <main>
        <TitleLogo></TitleLogo>
        <p> [テキストを入力] </p>
        <div className={styles#text}>Copyright Since 2022 Iino, Watatani, kaji. All rights reserved.</div>
    </main>
  );
};
