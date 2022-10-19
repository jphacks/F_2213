// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.18.1
// source: grpc.proto

package F_2213

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// TopPageClientClient is the client API for TopPageClient service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type TopPageClientClient interface {
	FetchAudioList(ctx context.Context, in *Empty, opts ...grpc.CallOption) (*AudioList, error)
	FetchUserInfo(ctx context.Context, in *Empty, opts ...grpc.CallOption) (*User, error)
	UploadAudio(ctx context.Context, in *Audio, opts ...grpc.CallOption) (*AudioId, error)
	DeleteTag(ctx context.Context, in *TagId, opts ...grpc.CallOption) (*Status, error)
	DeleteAudio(ctx context.Context, in *AudioId, opts ...grpc.CallOption) (*Status, error)
}

type topPageClientClient struct {
	cc grpc.ClientConnInterface
}

func NewTopPageClientClient(cc grpc.ClientConnInterface) TopPageClientClient {
	return &topPageClientClient{cc}
}

func (c *topPageClientClient) FetchAudioList(ctx context.Context, in *Empty, opts ...grpc.CallOption) (*AudioList, error) {
	out := new(AudioList)
	err := c.cc.Invoke(ctx, "/prolis.TopPageClient/FetchAudioList", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *topPageClientClient) FetchUserInfo(ctx context.Context, in *Empty, opts ...grpc.CallOption) (*User, error) {
	out := new(User)
	err := c.cc.Invoke(ctx, "/prolis.TopPageClient/FetchUserInfo", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *topPageClientClient) UploadAudio(ctx context.Context, in *Audio, opts ...grpc.CallOption) (*AudioId, error) {
	out := new(AudioId)
	err := c.cc.Invoke(ctx, "/prolis.TopPageClient/UploadAudio", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *topPageClientClient) DeleteTag(ctx context.Context, in *TagId, opts ...grpc.CallOption) (*Status, error) {
	out := new(Status)
	err := c.cc.Invoke(ctx, "/prolis.TopPageClient/DeleteTag", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *topPageClientClient) DeleteAudio(ctx context.Context, in *AudioId, opts ...grpc.CallOption) (*Status, error) {
	out := new(Status)
	err := c.cc.Invoke(ctx, "/prolis.TopPageClient/DeleteAudio", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// TopPageClientServer is the server API for TopPageClient service.
// All implementations must embed UnimplementedTopPageClientServer
// for forward compatibility
type TopPageClientServer interface {
	FetchAudioList(context.Context, *Empty) (*AudioList, error)
	FetchUserInfo(context.Context, *Empty) (*User, error)
	UploadAudio(context.Context, *Audio) (*AudioId, error)
	DeleteTag(context.Context, *TagId) (*Status, error)
	DeleteAudio(context.Context, *AudioId) (*Status, error)
	mustEmbedUnimplementedTopPageClientServer()
}

// UnimplementedTopPageClientServer must be embedded to have forward compatible implementations.
type UnimplementedTopPageClientServer struct {
}

func (UnimplementedTopPageClientServer) FetchAudioList(context.Context, *Empty) (*AudioList, error) {
	return nil, status.Errorf(codes.Unimplemented, "method FetchAudioList not implemented")
}
func (UnimplementedTopPageClientServer) FetchUserInfo(context.Context, *Empty) (*User, error) {
	return nil, status.Errorf(codes.Unimplemented, "method FetchUserInfo not implemented")
}
func (UnimplementedTopPageClientServer) UploadAudio(context.Context, *Audio) (*AudioId, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UploadAudio not implemented")
}
func (UnimplementedTopPageClientServer) DeleteTag(context.Context, *TagId) (*Status, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DeleteTag not implemented")
}
func (UnimplementedTopPageClientServer) DeleteAudio(context.Context, *AudioId) (*Status, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DeleteAudio not implemented")
}
func (UnimplementedTopPageClientServer) mustEmbedUnimplementedTopPageClientServer() {}

// UnsafeTopPageClientServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to TopPageClientServer will
// result in compilation errors.
type UnsafeTopPageClientServer interface {
	mustEmbedUnimplementedTopPageClientServer()
}

func RegisterTopPageClientServer(s grpc.ServiceRegistrar, srv TopPageClientServer) {
	s.RegisterService(&TopPageClient_ServiceDesc, srv)
}

func _TopPageClient_FetchAudioList_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TopPageClientServer).FetchAudioList(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/prolis.TopPageClient/FetchAudioList",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TopPageClientServer).FetchAudioList(ctx, req.(*Empty))
	}
	return interceptor(ctx, in, info, handler)
}

func _TopPageClient_FetchUserInfo_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TopPageClientServer).FetchUserInfo(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/prolis.TopPageClient/FetchUserInfo",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TopPageClientServer).FetchUserInfo(ctx, req.(*Empty))
	}
	return interceptor(ctx, in, info, handler)
}

func _TopPageClient_UploadAudio_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Audio)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TopPageClientServer).UploadAudio(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/prolis.TopPageClient/UploadAudio",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TopPageClientServer).UploadAudio(ctx, req.(*Audio))
	}
	return interceptor(ctx, in, info, handler)
}

func _TopPageClient_DeleteTag_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(TagId)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TopPageClientServer).DeleteTag(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/prolis.TopPageClient/DeleteTag",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TopPageClientServer).DeleteTag(ctx, req.(*TagId))
	}
	return interceptor(ctx, in, info, handler)
}

func _TopPageClient_DeleteAudio_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(AudioId)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TopPageClientServer).DeleteAudio(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/prolis.TopPageClient/DeleteAudio",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TopPageClientServer).DeleteAudio(ctx, req.(*AudioId))
	}
	return interceptor(ctx, in, info, handler)
}

// TopPageClient_ServiceDesc is the grpc.ServiceDesc for TopPageClient service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var TopPageClient_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "prolis.TopPageClient",
	HandlerType: (*TopPageClientServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "FetchAudioList",
			Handler:    _TopPageClient_FetchAudioList_Handler,
		},
		{
			MethodName: "FetchUserInfo",
			Handler:    _TopPageClient_FetchUserInfo_Handler,
		},
		{
			MethodName: "UploadAudio",
			Handler:    _TopPageClient_UploadAudio_Handler,
		},
		{
			MethodName: "DeleteTag",
			Handler:    _TopPageClient_DeleteTag_Handler,
		},
		{
			MethodName: "DeleteAudio",
			Handler:    _TopPageClient_DeleteAudio_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "grpc.proto",
}
