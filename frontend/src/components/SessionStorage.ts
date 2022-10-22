import { Audio, Tag } from "../../grpc_out/grpc_pb";
import { AudioInfo } from "./interface";

const SESSION_AUDIO_URL = "SESSION_AUDIO_URL";
const SESSION_AUDIO_NAME = "SESSION_AUDIO_NAME";
const SESSION_AUDIO_AUDIOINFO = "SESSION_AUDIO_AUDIOINFO";

export const setSessionAudioUrl = (url: string) => {
  sessionStorage.setItem(SESSION_AUDIO_URL, url);
};

export const getSessionAudioUrl = (): string => {
  return sessionStorage.getItem(SESSION_AUDIO_URL) || "BLANK AUDIO URL";
};

export const setSessionAudioName = (name: string) => {
  sessionStorage.setItem(SESSION_AUDIO_NAME, name);
};

export const getSessionAudioName = () => {
  return sessionStorage.getItem(SESSION_AUDIO_NAME) || "BLANK AUDIO NAME";
};

export const setSessionAudioInfo = (audio: AudioInfo) => {
  sessionStorage.setItem(SESSION_AUDIO_AUDIOINFO, JSON.stringify(audio));
};

export const getSessionAudioInfo = () => {
  const rawObj = sessionStorage.getItem(SESSION_AUDIO_AUDIOINFO);
  // TODO 例外処理
  const audioInfo = JSON.parse(rawObj) as AudioInfo;
  return audioInfo;
};

export const getSessionAudio = () => {
  const rawObj = sessionStorage.getItem(SESSION_AUDIO_AUDIOINFO);
  // TODO 例外処理
  const audioInfo = JSON.parse(rawObj) as AudioInfo;

  const tagsList = audioInfo.audios.map((v) => {
    const tag = new Tag();
    // TODO ほんとにms?
    tag.setStartms(v.start * 1000);
    tag.setEndms(v.end * 1000);
    tag.setTagname(v.name);
    return tag;
  });
  const audio = new Audio();
  audio.setTagsList(tagsList);
  audio.setAudioname(audioInfo.title);
  audio.setDescription(audioInfo.color);
  audio.setUrl(audioInfo.audioroute);
  return audio;
};

export const convertAudioToAudioInfo = (audio: Audio) => {
  // 下方互換性のための変数定義
  const sectionInfoTmp = audio.getTagsList().map((v, idx) => {
    // TODO ほんとにms?
    return { name: v.getTagname(), start: v.getStartms(), end: v.getEndms() };
  });
  return new AudioInfo(
    audio.getAudioname(),
    audio.getUrl(),
    audio.getDescription(),
    "メモ：かなり難しいです",
    sectionInfoTmp,
    audio.getId() + ""
  );
};
