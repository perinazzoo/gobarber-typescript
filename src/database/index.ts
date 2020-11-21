import { createConnection } from 'typeorm';

createConnection()
  .then(() => {
    console.log('DB connected!');
  })
  .catch(err => {
    console.error('Error while connecting to DB: ', err);
  });
