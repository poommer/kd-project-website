<?php

$db_host = "localhost";
$db_name = "kb-project"; //ชื่อฐานข้อมูล

$db_user = "root"; //ชื่อuser
$db_pass = ""; //ชื่อรหัสผ่าน

header('Content-Type: application/json');

try{
$db = new PDO("mysql:host=$db_host; dbname=$db_name", $db_user, $db_pass);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e){
    echo $e->getMessage();
}




/*

$req = $_POST['val'];
$matID = $_POST['mID'];

if ($req == '1'){
    $sql = "INSERT INTO data (`mat_id`, `msg`)   VALUES ('$matID', 'Detected elephant')";
    $query = mysqli_query($db_con, $sql);
    if($query){
        echo '@'.date('Y-m-d H:M:S'). ' -device id'.$matID.' [msg: Detected elephant]' ;
    } else {
        echo '@'.date('Y-m-d H:M:S'). ' -device id'.$matID.' [msg:error, Detected elephant but not inserted into the database.]' ;
    }
    
} else if ($req == '2'){
    echo '@'.date('Y-m-d H:M:S'). ' -device id'.$matID.' [msg: Not detected elephant]' ;
} else {
    echo '@'.date('Y-m-d H:M:S'). ' -device id'.$matID.' [msg: error, The code you sent was not found.]' ;
}
*/
?>