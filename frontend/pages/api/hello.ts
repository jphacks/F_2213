// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GreeterClient } from "../../grpc_out/GrpcServiceClientPb";
import { HelloRequest } from "../../grpc_out/grpc_pb";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = new GreeterClient("localhost:8080")
  const query = new HelloRequest()
  query.setName("Sato Taro")
  client.sayHello(query,null, (err, response)=>{
    if(err){
      res.status(300).json({name: "error"})
    }else{
      res.status(200).json({name: "ok"})
    }
  });
}
