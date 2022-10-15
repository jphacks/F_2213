import * as jspb from 'google-protobuf'



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

export class Data extends jspb.Message {
  getId(): number;
  setId(value: number): Data;

  getUserId(): number;
  setUserId(value: number): Data;

  getValue(): string;
  setValue(value: string): Data;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Data.AsObject;
  static toObject(includeInstance: boolean, msg: Data): Data.AsObject;
  static serializeBinaryToWriter(message: Data, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Data;
  static deserializeBinaryFromReader(message: Data, reader: jspb.BinaryReader): Data;
}

export namespace Data {
  export type AsObject = {
    id: number,
    userId: number,
    value: string,
  }
}

export class DataList extends jspb.Message {
  getDatalistList(): Array<Data>;
  setDatalistList(value: Array<Data>): DataList;
  clearDatalistList(): DataList;
  addDatalist(value?: Data, index?: number): Data;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DataList.AsObject;
  static toObject(includeInstance: boolean, msg: DataList): DataList.AsObject;
  static serializeBinaryToWriter(message: DataList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DataList;
  static deserializeBinaryFromReader(message: DataList, reader: jspb.BinaryReader): DataList;
}

export namespace DataList {
  export type AsObject = {
    datalistList: Array<Data.AsObject>,
  }
}

