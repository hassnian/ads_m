const makeAdsDb = require ('./ads-db')// al interactions with database
const mongodb = require ('mongodb')
const dotenv = require("dotenv");

dotenv.config();

const MongoClient = mongodb.MongoClient
const url = process.env.DM_ADS_DB_URL
const dbName = process.env.DM_ADS_DB_NAME
const FULL_URL=url+dbName

const client = new MongoClient(FULL_URL, { useNewUrlParser: true })

const makeDb= async function  () {
    if (!client.isConnected()) {
      await client.connect()
    }
    return client.db(dbName)
  }

module.exports= makeDb

const adsDb = makeAdsDb({ makeDb })
module.exports= adsDb