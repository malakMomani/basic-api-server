
'use strict';

const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL)

class Character {
  constructor(name) {
    this.name = name ;
  }

  get(id) {
    const save = [id];
    const sql = 'select * from character where id=$1;';
    client.query(sql,save).then(result=>{
      if(id) {
        return result.rows[0];
      } else {
        return result.rows;
      }
    });
    return [];
  }

  create(obj) {
    const save =[obj.name];
    const sql = `insert into character (name) values($1) RETURNING id;`;

    client.query(sql,save).then(result => {
      console.log(result);
      if(result.rows[0].id > 0){
        return true
      }
    return false
    });
  }

  update(id ,obj) {
    const save =[id ,obj.name];
    const sql = `update character SET name = $2 WHERE id = $1 returning id;`;

    client.query(sql, save).then(result =>{
      if(result.rows[0].id > 0){
        return true
      }
    });
    return false;
  }
  
  delete(id) {
    let save =[id];
    const sql = 'delete from character where id = $1 RETURNING id;';

    client.query(sql, save).then(result =>{
      if(result.rows[0].id > 0){
        return true
      }
    });
    return false;
  }
}

module.exports = Character;