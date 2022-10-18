// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        v3.18.1
// source: grpc.proto

package F_2213

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Empty struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *Empty) Reset() {
	*x = Empty{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpc_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Empty) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Empty) ProtoMessage() {}

func (x *Empty) ProtoReflect() protoreflect.Message {
	mi := &file_grpc_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Empty.ProtoReflect.Descriptor instead.
func (*Empty) Descriptor() ([]byte, []int) {
	return file_grpc_proto_rawDescGZIP(), []int{0}
}

type TagId struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id int64 `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
}

func (x *TagId) Reset() {
	*x = TagId{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpc_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *TagId) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*TagId) ProtoMessage() {}

func (x *TagId) ProtoReflect() protoreflect.Message {
	mi := &file_grpc_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use TagId.ProtoReflect.Descriptor instead.
func (*TagId) Descriptor() ([]byte, []int) {
	return file_grpc_proto_rawDescGZIP(), []int{1}
}

func (x *TagId) GetId() int64 {
	if x != nil {
		return x.Id
	}
	return 0
}

type AudioId struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id int64 `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
}

func (x *AudioId) Reset() {
	*x = AudioId{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpc_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AudioId) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AudioId) ProtoMessage() {}

func (x *AudioId) ProtoReflect() protoreflect.Message {
	mi := &file_grpc_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AudioId.ProtoReflect.Descriptor instead.
func (*AudioId) Descriptor() ([]byte, []int) {
	return file_grpc_proto_rawDescGZIP(), []int{2}
}

func (x *AudioId) GetId() int64 {
	if x != nil {
		return x.Id
	}
	return 0
}

type Status struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Status int64 `protobuf:"varint,1,opt,name=status,proto3" json:"status,omitempty"`
}

func (x *Status) Reset() {
	*x = Status{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpc_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Status) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Status) ProtoMessage() {}

func (x *Status) ProtoReflect() protoreflect.Message {
	mi := &file_grpc_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Status.ProtoReflect.Descriptor instead.
func (*Status) Descriptor() ([]byte, []int) {
	return file_grpc_proto_rawDescGZIP(), []int{3}
}

func (x *Status) GetStatus() int64 {
	if x != nil {
		return x.Status
	}
	return 0
}

type AudioList struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	AudioList []*Audio `protobuf:"bytes,1,rep,name=audioList,proto3" json:"audioList,omitempty"`
}

func (x *AudioList) Reset() {
	*x = AudioList{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpc_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AudioList) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AudioList) ProtoMessage() {}

func (x *AudioList) ProtoReflect() protoreflect.Message {
	mi := &file_grpc_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AudioList.ProtoReflect.Descriptor instead.
func (*AudioList) Descriptor() ([]byte, []int) {
	return file_grpc_proto_rawDescGZIP(), []int{4}
}

func (x *AudioList) GetAudioList() []*Audio {
	if x != nil {
		return x.AudioList
	}
	return nil
}

type Audio struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id          int64  `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	AudioName   string `protobuf:"bytes,2,opt,name=audioName,proto3" json:"audioName,omitempty"`
	Description string `protobuf:"bytes,3,opt,name=description,proto3" json:"description,omitempty"`
	Url         string `protobuf:"bytes,4,opt,name=url,proto3" json:"url,omitempty"`
	TagList     []*Tag `protobuf:"bytes,5,rep,name=tagList,proto3" json:"tagList,omitempty"`
}

func (x *Audio) Reset() {
	*x = Audio{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpc_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Audio) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Audio) ProtoMessage() {}

func (x *Audio) ProtoReflect() protoreflect.Message {
	mi := &file_grpc_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Audio.ProtoReflect.Descriptor instead.
func (*Audio) Descriptor() ([]byte, []int) {
	return file_grpc_proto_rawDescGZIP(), []int{5}
}

func (x *Audio) GetId() int64 {
	if x != nil {
		return x.Id
	}
	return 0
}

func (x *Audio) GetAudioName() string {
	if x != nil {
		return x.AudioName
	}
	return ""
}

func (x *Audio) GetDescription() string {
	if x != nil {
		return x.Description
	}
	return ""
}

func (x *Audio) GetUrl() string {
	if x != nil {
		return x.Url
	}
	return ""
}

func (x *Audio) GetTagList() []*Tag {
	if x != nil {
		return x.TagList
	}
	return nil
}

type Tag struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id      int64  `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	StartMs int64  `protobuf:"varint,2,opt,name=startMs,proto3" json:"startMs,omitempty"`
	EndMs   int64  `protobuf:"varint,3,opt,name=endMs,proto3" json:"endMs,omitempty"`
	TagName string `protobuf:"bytes,4,opt,name=tagName,proto3" json:"tagName,omitempty"`
}

func (x *Tag) Reset() {
	*x = Tag{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpc_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Tag) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Tag) ProtoMessage() {}

func (x *Tag) ProtoReflect() protoreflect.Message {
	mi := &file_grpc_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Tag.ProtoReflect.Descriptor instead.
func (*Tag) Descriptor() ([]byte, []int) {
	return file_grpc_proto_rawDescGZIP(), []int{6}
}

func (x *Tag) GetId() int64 {
	if x != nil {
		return x.Id
	}
	return 0
}

func (x *Tag) GetStartMs() int64 {
	if x != nil {
		return x.StartMs
	}
	return 0
}

func (x *Tag) GetEndMs() int64 {
	if x != nil {
		return x.EndMs
	}
	return 0
}

func (x *Tag) GetTagName() string {
	if x != nil {
		return x.TagName
	}
	return ""
}

type User struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id    string `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Name  string `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	Email string `protobuf:"bytes,3,opt,name=email,proto3" json:"email,omitempty"`
}

func (x *User) Reset() {
	*x = User{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpc_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *User) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*User) ProtoMessage() {}

func (x *User) ProtoReflect() protoreflect.Message {
	mi := &file_grpc_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use User.ProtoReflect.Descriptor instead.
func (*User) Descriptor() ([]byte, []int) {
	return file_grpc_proto_rawDescGZIP(), []int{7}
}

func (x *User) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *User) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *User) GetEmail() string {
	if x != nil {
		return x.Email
	}
	return ""
}

var File_grpc_proto protoreflect.FileDescriptor

var file_grpc_proto_rawDesc = []byte{
	0x0a, 0x0a, 0x67, 0x72, 0x70, 0x63, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x06, 0x70, 0x72,
	0x6f, 0x6c, 0x69, 0x73, 0x22, 0x07, 0x0a, 0x05, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x22, 0x17, 0x0a,
	0x05, 0x54, 0x61, 0x67, 0x49, 0x64, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x03, 0x52, 0x02, 0x69, 0x64, 0x22, 0x19, 0x0a, 0x07, 0x41, 0x75, 0x64, 0x69, 0x6f, 0x49,
	0x64, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x02, 0x69,
	0x64, 0x22, 0x20, 0x0a, 0x06, 0x53, 0x74, 0x61, 0x74, 0x75, 0x73, 0x12, 0x16, 0x0a, 0x06, 0x73,
	0x74, 0x61, 0x74, 0x75, 0x73, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x06, 0x73, 0x74, 0x61,
	0x74, 0x75, 0x73, 0x22, 0x38, 0x0a, 0x09, 0x41, 0x75, 0x64, 0x69, 0x6f, 0x4c, 0x69, 0x73, 0x74,
	0x12, 0x2b, 0x0a, 0x09, 0x61, 0x75, 0x64, 0x69, 0x6f, 0x4c, 0x69, 0x73, 0x74, 0x18, 0x01, 0x20,
	0x03, 0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x70, 0x72, 0x6f, 0x6c, 0x69, 0x73, 0x2e, 0x41, 0x75, 0x64,
	0x69, 0x6f, 0x52, 0x09, 0x61, 0x75, 0x64, 0x69, 0x6f, 0x4c, 0x69, 0x73, 0x74, 0x22, 0x90, 0x01,
	0x0a, 0x05, 0x41, 0x75, 0x64, 0x69, 0x6f, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x03, 0x52, 0x02, 0x69, 0x64, 0x12, 0x1c, 0x0a, 0x09, 0x61, 0x75, 0x64, 0x69, 0x6f,
	0x4e, 0x61, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x61, 0x75, 0x64, 0x69,
	0x6f, 0x4e, 0x61, 0x6d, 0x65, 0x12, 0x20, 0x0a, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70,
	0x74, 0x69, 0x6f, 0x6e, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x64, 0x65, 0x73, 0x63,
	0x72, 0x69, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x10, 0x0a, 0x03, 0x75, 0x72, 0x6c, 0x18, 0x04,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x75, 0x72, 0x6c, 0x12, 0x25, 0x0a, 0x07, 0x74, 0x61, 0x67,
	0x4c, 0x69, 0x73, 0x74, 0x18, 0x05, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x0b, 0x2e, 0x70, 0x72, 0x6f,
	0x6c, 0x69, 0x73, 0x2e, 0x54, 0x61, 0x67, 0x52, 0x07, 0x74, 0x61, 0x67, 0x4c, 0x69, 0x73, 0x74,
	0x22, 0x5f, 0x0a, 0x03, 0x54, 0x61, 0x67, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x03, 0x52, 0x02, 0x69, 0x64, 0x12, 0x18, 0x0a, 0x07, 0x73, 0x74, 0x61, 0x72, 0x74,
	0x4d, 0x73, 0x18, 0x02, 0x20, 0x01, 0x28, 0x03, 0x52, 0x07, 0x73, 0x74, 0x61, 0x72, 0x74, 0x4d,
	0x73, 0x12, 0x14, 0x0a, 0x05, 0x65, 0x6e, 0x64, 0x4d, 0x73, 0x18, 0x03, 0x20, 0x01, 0x28, 0x03,
	0x52, 0x05, 0x65, 0x6e, 0x64, 0x4d, 0x73, 0x12, 0x18, 0x0a, 0x07, 0x74, 0x61, 0x67, 0x4e, 0x61,
	0x6d, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x74, 0x61, 0x67, 0x4e, 0x61, 0x6d,
	0x65, 0x22, 0x40, 0x0a, 0x04, 0x55, 0x73, 0x65, 0x72, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d,
	0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x14, 0x0a,
	0x05, 0x65, 0x6d, 0x61, 0x69, 0x6c, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x65, 0x6d,
	0x61, 0x69, 0x6c, 0x32, 0xd5, 0x01, 0x0a, 0x0d, 0x54, 0x6f, 0x70, 0x50, 0x61, 0x67, 0x65, 0x43,
	0x6c, 0x69, 0x65, 0x6e, 0x74, 0x12, 0x34, 0x0a, 0x0e, 0x66, 0x65, 0x74, 0x63, 0x68, 0x41, 0x75,
	0x64, 0x69, 0x6f, 0x4c, 0x69, 0x73, 0x74, 0x12, 0x0d, 0x2e, 0x70, 0x72, 0x6f, 0x6c, 0x69, 0x73,
	0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x1a, 0x11, 0x2e, 0x70, 0x72, 0x6f, 0x6c, 0x69, 0x73, 0x2e,
	0x41, 0x75, 0x64, 0x69, 0x6f, 0x4c, 0x69, 0x73, 0x74, 0x22, 0x00, 0x12, 0x2e, 0x0a, 0x0b, 0x75,
	0x70, 0x6c, 0x6f, 0x61, 0x64, 0x41, 0x75, 0x64, 0x69, 0x6f, 0x12, 0x0d, 0x2e, 0x70, 0x72, 0x6f,
	0x6c, 0x69, 0x73, 0x2e, 0x41, 0x75, 0x64, 0x69, 0x6f, 0x1a, 0x0e, 0x2e, 0x70, 0x72, 0x6f, 0x6c,
	0x69, 0x73, 0x2e, 0x53, 0x74, 0x61, 0x74, 0x75, 0x73, 0x22, 0x00, 0x12, 0x2c, 0x0a, 0x09, 0x64,
	0x65, 0x6c, 0x65, 0x74, 0x65, 0x54, 0x61, 0x67, 0x12, 0x0d, 0x2e, 0x70, 0x72, 0x6f, 0x6c, 0x69,
	0x73, 0x2e, 0x54, 0x61, 0x67, 0x49, 0x64, 0x1a, 0x0e, 0x2e, 0x70, 0x72, 0x6f, 0x6c, 0x69, 0x73,
	0x2e, 0x53, 0x74, 0x61, 0x74, 0x75, 0x73, 0x22, 0x00, 0x12, 0x30, 0x0a, 0x0b, 0x64, 0x65, 0x6c,
	0x65, 0x74, 0x65, 0x41, 0x75, 0x64, 0x69, 0x6f, 0x12, 0x0f, 0x2e, 0x70, 0x72, 0x6f, 0x6c, 0x69,
	0x73, 0x2e, 0x41, 0x75, 0x64, 0x69, 0x6f, 0x49, 0x64, 0x1a, 0x0e, 0x2e, 0x70, 0x72, 0x6f, 0x6c,
	0x69, 0x73, 0x2e, 0x53, 0x74, 0x61, 0x74, 0x75, 0x73, 0x22, 0x00, 0x42, 0x1b, 0x5a, 0x19, 0x67,
	0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x6a, 0x70, 0x68, 0x61, 0x63, 0x6b,
	0x73, 0x2f, 0x46, 0x5f, 0x32, 0x32, 0x31, 0x33, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_grpc_proto_rawDescOnce sync.Once
	file_grpc_proto_rawDescData = file_grpc_proto_rawDesc
)

func file_grpc_proto_rawDescGZIP() []byte {
	file_grpc_proto_rawDescOnce.Do(func() {
		file_grpc_proto_rawDescData = protoimpl.X.CompressGZIP(file_grpc_proto_rawDescData)
	})
	return file_grpc_proto_rawDescData
}

var file_grpc_proto_msgTypes = make([]protoimpl.MessageInfo, 8)
var file_grpc_proto_goTypes = []interface{}{
	(*Empty)(nil),     // 0: prolis.Empty
	(*TagId)(nil),     // 1: prolis.TagId
	(*AudioId)(nil),   // 2: prolis.AudioId
	(*Status)(nil),    // 3: prolis.Status
	(*AudioList)(nil), // 4: prolis.AudioList
	(*Audio)(nil),     // 5: prolis.Audio
	(*Tag)(nil),       // 6: prolis.Tag
	(*User)(nil),      // 7: prolis.User
}
var file_grpc_proto_depIdxs = []int32{
	5, // 0: prolis.AudioList.audioList:type_name -> prolis.Audio
	6, // 1: prolis.Audio.tagList:type_name -> prolis.Tag
	0, // 2: prolis.TopPageClient.fetchAudioList:input_type -> prolis.Empty
	5, // 3: prolis.TopPageClient.uploadAudio:input_type -> prolis.Audio
	1, // 4: prolis.TopPageClient.deleteTag:input_type -> prolis.TagId
	2, // 5: prolis.TopPageClient.deleteAudio:input_type -> prolis.AudioId
	4, // 6: prolis.TopPageClient.fetchAudioList:output_type -> prolis.AudioList
	3, // 7: prolis.TopPageClient.uploadAudio:output_type -> prolis.Status
	3, // 8: prolis.TopPageClient.deleteTag:output_type -> prolis.Status
	3, // 9: prolis.TopPageClient.deleteAudio:output_type -> prolis.Status
	6, // [6:10] is the sub-list for method output_type
	2, // [2:6] is the sub-list for method input_type
	2, // [2:2] is the sub-list for extension type_name
	2, // [2:2] is the sub-list for extension extendee
	0, // [0:2] is the sub-list for field type_name
}

func init() { file_grpc_proto_init() }
func file_grpc_proto_init() {
	if File_grpc_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_grpc_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Empty); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_grpc_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*TagId); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_grpc_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AudioId); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_grpc_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Status); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_grpc_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AudioList); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_grpc_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Audio); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_grpc_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Tag); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_grpc_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*User); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_grpc_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   8,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_grpc_proto_goTypes,
		DependencyIndexes: file_grpc_proto_depIdxs,
		MessageInfos:      file_grpc_proto_msgTypes,
	}.Build()
	File_grpc_proto = out.File
	file_grpc_proto_rawDesc = nil
	file_grpc_proto_goTypes = nil
	file_grpc_proto_depIdxs = nil
}
