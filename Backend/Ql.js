// import { ApolloServer } from '@apollo/server';
// import { expressMiddleware } from '@apollo/server/express4';
// import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// import express from 'express';
// import http from 'http';
// import cors from 'cors';
// import { startStandaloneServer } from '@apollo/server/standalone';
// import ParkInfo from './Model/natpark.json' assert {type: 'json'}
// import * as fs from 'node:fs/promises';
// import pkg from 'body-parser';

const { ApolloServer } = require('@apollo/server')
const fs = require('fs')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer }= require('@apollo/server/plugin/drainHttpServer')
const express = require('express')
const http = require('http')
const cors = require('cors')
const pkg = require('body-parser')

const {Storage} = require('@google-cloud/storage');
const storage = new Storage({keyFilename: "key.json"});
// const storage = new Storage({
//   projectId: process.env.GOOGLE_STORAGE_PROJECT_ID,
//   scopes: 'https://www.googleapis.com/auth/cloud-platform',
//   credentials: {
//     client_email: process.env.GOOGLE_STORAGE_EMAIL,
//     private_key: process.env.GOOGLE_STORAGE_PRIVATE_KEY
//   }
// })
const { json } = pkg;
const myBucket = storage.bucket('backendnatpark1');
const file = myBucket.file('natpark.json');

const typeDefs = `#graphql
  type Park {
    region: String
    province: String
    parkname: String
    photo10Maximum: String
    description: String
    activity: String
    location: String
    pricethai: String
    priceinternational: String
    time: String
    tel: String
  }
  type AddData{
    status : Int!
    success : Boolean!
    message : String!
  }

  type Query {
    park(park_name: String, province: String, region: String): [Park]
    indexofpark(park_name: String!): Int

  }
  type Mutation{
    delete_park(park_name: String, index: Int): AddData
  }
`;
let ParkInfo = []

function download_file(){
  file.download(function(err, data){
    // console.log(data+err+"line : 2")
    if(err){
      console.log(err)
    }
    if(!data){
      console.log(data)
    }
    else{
      ParkInfo = JSON.parse(data.toString())
      // console.log(ParkInfo.length)
      if(ParkInfo.length > 10000){
        server.stop().then(() => console.log("too much data in server stop server"))
      }
    }
  })
}
download_file()

const resolvers = {
  Query: {
     park(parent, args, contextValue, info){
      if (args.parkname != null){
        if(args.province != null){
          if(args.region != null){
            return ParkInfo.filter((park) => (park.parkname === args.parkname) & (park.province === args.province) & (park.region === args.region))
          }
          return ParkInfo.filter((park) => (park.parkname === args.parkname) & (park.province === args.province))
        }
        return ParkInfo.filter((park) => park.parkname === args.parkname)
      }else if(args.province != null){
        return ParkInfo.filter((park) => park.province === args.province);
      }else if(args.region != null){
        return ParkInfo.filter((park) => park.region === args.region);
      }
      return ParkInfo
    },
    indexofpark(parent, args, contextValue, info){
      return ParkInfo.findIndex((park) => park.parkname === args.parkname)
    }
  },
  Mutation:{
    delete_park(_ ,{park_name, index}){
      let object_to_return = {
        "status" : 100,
        "success" : true,
        "message" : "Nothing to do"
      }
      let find_park = ParkInfo.findIndex((park) => park.parkname === parkname)
      if(find_park !== -1){
        ParkInfo.splice(find_park, 1)
        object_to_return = {
          "status" : 200,
          "success" : true,
          "message" : "deleted park :" + park_name + "index: "+ find_park
        }
      }else if((index !== null) && (park_name === null)){
        ParkInfo.splice(index, 1)
        object_to_return = {
          "status" : 200,
          "success" : true,
          "message" : "deleted park :" + park_name + "index: "+ index
        }
      }else{
        object_to_return = {
          "status" : 101,
          "success" : false,
          "message" : "Invalid index or park_name dosen't exist"
        }
      }
      if(object_to_return.success){
        file.save(JSON.stringify(ParkInfo), function (err){
          if(err){
            console.log(err)
          }else {
            console.log("save done : delete")
            download_file()
          }
        })
      }
      return object_to_return
    }
  }
};
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
async function startserver() {
  await server.start();
  await new Promise((resolve) => httpServer.listen({ port: 448 }, resolve));
}
startserver().then(() => {
  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );
})
console.log(`🚀 Server ready at http://localhost:448/graphql`);

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// const { url } = await server.listen(4000)
// const port = Number.parseInt(process.env.PORT) || 443;
// const { url } = await startStandaloneServer(server, {listen: {port}});
// console.log(`🚀 Server ready at ${url}`);
