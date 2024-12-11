const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "12345",
  database: "likeme",
  allowExitOnIdle: true,
});

const obtenerPosts = async () => {
    try{
        const { rows } = await pool.query("SELECT * FROM posts");
        console.log(rows);
        return rows;}
    catch(error){
        console.error("Error al obtener posts", error.message);
    }

};

const agregarPosts = async (titulo,url,descripcion,like=1) => {
    try{
        const consulta = "INSERT INTO  posts values (DEFAULT, $1,$2,$3,$4)";
        const values = [titulo,url,descripcion,like];
        const result = await pool.query(consulta, values);
        console.log(" agregado el post");}
    catch(error){
        console.error("Error al agregar post", error.message);
    }

};

const like = async (id) => {
    try{
        const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1";
        const values = [id];
        const result = await pool.query(consulta, values);
        console.log("Like agregado");}
    catch(error){
        console.error("Error al agregar like", error.message);
    }
}

const eliminarPosts = async (id) => {
    try{
        const consulta = "DELETE FROM posts WHERE id = $1";
        const values = [id];
        const result = await pool.query(consulta, values);
        console.log(" eliminado el Post");}
    catch(error){
        console.error("Error al eliminar post", error.message);
    }
 
}

module.exports = { obtenerPosts,agregarPosts, like, eliminarPosts };
