import { SchemaFieldTypes } from "redis";
import { client } from "./redis";

const schema = {
  '$.country': {
    type: SchemaFieldTypes.TEXT,
    SORTABLE: true,
    AS: 'country'
  },
  '$.area': {
    type: SchemaFieldTypes.TEXT,
    SORTABLE: true,
    AS: 'area'
  },
  '$.rounds': {
    type: SchemaFieldTypes.NUMERIC,
    SORTABLE: true,
    AS: 'rounds'
  },
  '$.missileAmount': {
    type: SchemaFieldTypes.NUMERIC,
    AS: 'missileAmount'
  },
  '$.creationTime': {
    type: SchemaFieldTypes.NUMERIC,
    AS: 'creationTime'
  },
  '$.lastUpdateTime': {
    type: SchemaFieldTypes.NUMERIC,
    AS: 'lastUpdateTime'
  },
};



export const connectToRedis = async () => {
  client.connect()
  try {
    await client.ft.create('idx:countryes-test3', schema as unknown as any, {
      ON: 'JSON',
      PREFIX: 'countryes-test3:'
    });
  } catch (e) {
    if (e instanceof Error && e.message === 'Index already exists') {
      console.log('Index exists already, skipped creation.');
    } else {
      console.error(e);
    }
  }
  return client
}

  