import Styles from "../../styles/components/sound-tag.module.scss";

export default (props: any) => {
  const style_color :string = 'Styles.' + props.color;
  return (
    <div className={`${Styles.memox} ${style_color}`}>
      <div className={Styles.title}>{props.title}</div>
      <audio controls controlsList="nodownload" src={props.sound}></audio>
    </div>
  );
};
