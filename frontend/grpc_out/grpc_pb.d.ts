import * as jspb from 'google-protobuf'



export class User extends jspb.Message {
  getId(): string;
  setId(value: string): User;

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
    id: string,
    name: string,
    email: string,
  }
}

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

export class TagId extends jspb.Message {
  getId(): number;
  setId(value: number): TagId;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TagId.AsObject;
  static toObject(includeInstance: boolean, msg: TagId): TagId.AsObject;
  static serializeBinaryToWriter(message: TagId, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TagId;
  static deserializeBinaryFromReader(message: TagId, reader: jspb.BinaryReader): TagId;
}

export namespace TagId {
  export type AsObject = {
    id: number,
  }
}

export class AudioId extends jspb.Message {
  getId(): number;
  setId(value: number): AudioId;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AudioId.AsObject;
  static toObject(includeInstance: boolean, msg: AudioId): AudioId.AsObject;
  static serializeBinaryToWriter(message: AudioId, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AudioId;
  static deserializeBinaryFromReader(message: AudioId, reader: jspb.BinaryReader): AudioId;
}

export namespace AudioId {
  export type AsObject = {
    id: number,
  }
}

export class Status extends jspb.Message {
  getAffectedrowcnt(): number;
  setAffectedrowcnt(value: number): Status;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Status.AsObject;
  static toObject(includeInstance: boolean, msg: Status): Status.AsObject;
  static serializeBinaryToWriter(message: Status, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Status;
  static deserializeBinaryFromReader(message: Status, reader: jspb.BinaryReader): Status;
}

export namespace Status {
  export type AsObject = {
    affectedrowcnt: number,
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
  getId(): AudioId | undefined;
  setId(value?: AudioId): Audio;
  hasId(): boolean;
  clearId(): Audio;

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
    id?: AudioId.AsObject,
    audioname: string,
    description: string,
    url: string,
    taglistList: Array<Tag.AsObject>,
  }
}

export class Tag extends jspb.Message {
  getId(): number;
  setId(value: number): Tag;

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
    id: number,
    startms: number,
    endms: number,
    tagname: string,
  }
}

