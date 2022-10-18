import * as jspb from 'google-protobuf'



export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class TagUuid extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): TagUuid;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TagUuid.AsObject;
  static toObject(includeInstance: boolean, msg: TagUuid): TagUuid.AsObject;
  static serializeBinaryToWriter(message: TagUuid, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TagUuid;
  static deserializeBinaryFromReader(message: TagUuid, reader: jspb.BinaryReader): TagUuid;
}

export namespace TagUuid {
  export type AsObject = {
    uuid: string,
  }
}

export class AudioUuid extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): AudioUuid;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AudioUuid.AsObject;
  static toObject(includeInstance: boolean, msg: AudioUuid): AudioUuid.AsObject;
  static serializeBinaryToWriter(message: AudioUuid, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AudioUuid;
  static deserializeBinaryFromReader(message: AudioUuid, reader: jspb.BinaryReader): AudioUuid;
}

export namespace AudioUuid {
  export type AsObject = {
    uuid: string,
  }
}

export class Status extends jspb.Message {
  getStatus(): number;
  setStatus(value: number): Status;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Status.AsObject;
  static toObject(includeInstance: boolean, msg: Status): Status.AsObject;
  static serializeBinaryToWriter(message: Status, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Status;
  static deserializeBinaryFromReader(message: Status, reader: jspb.BinaryReader): Status;
}

export namespace Status {
  export type AsObject = {
    status: number,
  }
}

export class AudioList extends jspb.Message {
  getAudiolistList(): Array<Audio>;
  setAudiolistList(value: Array<Audio>): AudioList;
  clearAudiolistList(): AudioList;
  addAudiolist(value?: Audio, index?: number): Audio;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AudioList.AsObject;
  static toObject(includeInstance: boolean, msg: AudioList): AudioList.AsObject;
  static serializeBinaryToWriter(message: AudioList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AudioList;
  static deserializeBinaryFromReader(message: AudioList, reader: jspb.BinaryReader): AudioList;
}

export namespace AudioList {
  export type AsObject = {
    audiolistList: Array<Audio.AsObject>,
  }
}

export class Audio extends jspb.Message {
  getUuid(): AudioUuid | undefined;
  setUuid(value?: AudioUuid): Audio;
  hasUuid(): boolean;
  clearUuid(): Audio;

  getAudioname(): string;
  setAudioname(value: string): Audio;

  getDescription(): string;
  setDescription(value: string): Audio;

  getUrl(): string;
  setUrl(value: string): Audio;

  getTaglistList(): Array<Tag>;
  setTaglistList(value: Array<Tag>): Audio;
  clearTaglistList(): Audio;
  addTaglist(value?: Tag, index?: number): Tag;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Audio.AsObject;
  static toObject(includeInstance: boolean, msg: Audio): Audio.AsObject;
  static serializeBinaryToWriter(message: Audio, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Audio;
  static deserializeBinaryFromReader(message: Audio, reader: jspb.BinaryReader): Audio;
}

export namespace Audio {
  export type AsObject = {
    uuid?: AudioUuid.AsObject,
    audioname: string,
    description: string,
    url: string,
    taglistList: Array<Tag.AsObject>,
  }
}

export class Tag extends jspb.Message {
  getUuid(): TagUuid | undefined;
  setUuid(value?: TagUuid): Tag;
  hasUuid(): boolean;
  clearUuid(): Tag;

  getStartms(): number;
  setStartms(value: number): Tag;

  getEndms(): number;
  setEndms(value: number): Tag;

  getTagname(): string;
  setTagname(value: string): Tag;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Tag.AsObject;
  static toObject(includeInstance: boolean, msg: Tag): Tag.AsObject;
  static serializeBinaryToWriter(message: Tag, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Tag;
  static deserializeBinaryFromReader(message: Tag, reader: jspb.BinaryReader): Tag;
}

export namespace Tag {
  export type AsObject = {
    uuid?: TagUuid.AsObject,
    startms: number,
    endms: number,
    tagname: string,
  }
}

export class User extends jspb.Message {
  getId(): number;
  setId(value: number): User;

  getName(): string;
  setName(value: string): User;

  getEmail(): string;
  setEmail(value: string): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id: number,
    name: string,
    email: string,
  }
}

