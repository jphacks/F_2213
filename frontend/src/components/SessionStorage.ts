import { Audio, Tag } from "../../grpc_out/grpc_pb"
import { AudioInfo } from "./interface"

const SESSION_AUDIO_URL = "SESSION_AUDIO_URL"
const SESSION_AUDIO_NAME = "SESSION_AUDIO_NAME"
const SESSION_AUDIO_AUDIO = "SESSION_AUDIO_AUDIO"

export const setSessionAudioUrl = (url: string)=>{
  sessionStorage.setItem(SESSION_AUDIO_URL, url)
}

export const getSessionAudioUrl = (): string=>{
  return sessionStorage.getItem(SESSION_AUDIO_URL) || "BLANK AUDIO URL"
}

export const setSessionAudioName = (name: string)=>{
  sessionStorage.setItem(SESSION_AUDIO_NAME, name)
}

export const getSessionAudioName = ()=>{
  return sessionStorage.getItem(SESSION_AUDIO_NAME) || "BLANK AUDIO NAME"
}

export const setSessionAudioInfo = (audio: AudioInfo)=>{
   sessionStorage.setItem( SESSION_AUDIO_AUDIO , JSON.stringify(audio))
}

export const getSessionAudio = ()=>{
  const rawObj = sessionStorage.getItem(SESSION_AUDIO_AUDIO)
  // TODO 例外処理
  const audioInfo = JSON.parse(rawObj) as AudioInfo

  const tagsList = audioInfo.audios.map((v)=>{
    const tag = new Tag()
    // TODO ほんとにms?
    tag.setStartms(v.start * 1000)
    tag.setEndms(v.end * 1000)
    tag.setTagname(v.name)
    return tag
  })
  const audio = new Audio();
  audio.setTagsList(tagsList)
  audio.setAudioname(audioInfo.title)
  audio.setDescription(audioInfo.color)
  audio.setUrl(audioInfo.audioroute)
  return audio
}


/*
  // 下方互換性のための変数定義
  const sectionInfoTmp = myAudioInfos.getTagsList().map((v, idx)=>{
    // TODO ほんとにms?
    return {name: v.getTagname(), start:v.getStartms(), end:v.getEndms()}
  })
  const audioInfoTmp = new AudioInfo(myAudioInfos.getAudioname(), myAudioInfos.getUrl(), myAudioInfos.getDescription(), "メモ：かなり難しいです", sectionInfoTmp) 
}
*/