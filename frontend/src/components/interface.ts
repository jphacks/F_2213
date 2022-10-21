import { v4 as uuidv4 } from "uuid";

export type SectionInfo = {
  name: string;
  start: number;
  end: number;
};

export type PlayStatus = "playing" | "paused";

export interface SectionSource{
  source: string;
  startMs: number;
  endMs: number;
  tagNumber:number;
}

export class AudioInfo {
  uuid = uuidv4();
  title: string;
  memo: string;
  audioroute: string;
  color: string;
  audios: SectionInfo[];

  constructor(
    title: string,
    audioroute: string,
    color: string,
    memo: string,
    audios: SectionInfo[]
  ) {
    this.title = title;
    this.audioroute = audioroute;
    this.color = color;
    this.memo = memo;
    this.audios = audios;
    this.audios.sort((a : SectionInfo, b : SectionInfo) => a.start - b.start);
  }
}