<?php

class Conexion{ 
    static public function Conectar(){ // Corrected typo: "public" instead of "publc"

        // Corrected variable names to be lowercase
        $servidor = "localhost:3307";
        $nombre_bd = "roastchicken";
        $usuario = "root";
        $password = "1234"; // Empty for local development; change for production

        try{ // Fixed typo: $opciones instead of Sopciones
            $opciones = [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"];
            $conexion = new PDO("mysql:host=$servidor;dbname=$nombre_bd",$usuario,$password,$opciones);
            return $conexion;
        }catch (Exception $e){
            // Improved error message with details for debugging
            die("Error en la conexión: " . $e->getMessage() . " (Código: " . $e->getCode() . ")");
        }
    }
}
