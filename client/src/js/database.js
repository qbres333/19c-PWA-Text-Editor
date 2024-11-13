import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// mod 19 act 26
export const putDb = async (content) => {
  console.log("PUT request to database");
  // open the jate DB, version 1
  const jateDb = await openDB('jate', 1);
  // create transaction object to manage DB operations within this scope
  const tx = jateDb.transaction('jate', 'readwrite');
  // access the jate object store (container for data within idb DB)
  const store = tx.objectStore('jate');
  // add or update a record in the jate object store (PUT returns an object)
  const request = store.put({ value: content });
  // wait for the PUT operation to complete and store in result
  const result = await request;
  // log the result
  console.log('Note saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET all request to database");
  // open the jate DB, version 1
  const jateDb = await openDB("jate", 1);
  // create transaction object to manage DB operations within this scope (read only)
  const tx = jateDb.transaction("jate", "readonly");
  // access the jate object store (container for data within idb DB)
  const store = tx.objectStore("jate");
  // get all records in the jate object store
  const request = store.getAll();
  // wait for the GET operation to complete and store in result
  const result = await request;
  // log the result
  console.log("result.value", result);
  // return the retrieved data
  return result;
};

initdb();
