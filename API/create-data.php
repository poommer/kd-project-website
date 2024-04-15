<?php
require_once('DBconfig.php');


if($_SERVER['REQUEST_METHOD'] == "POST"){
    $req = $_POST['val'];
    $matID = $_POST['mID'];
    $dateCurrant = date('Y-m-d');
    $timeCurrant = date('H:M:S');

    $sql = "INSERT INTO data (`mat_id`, `Date`, `time`, `msg`)   VALUES (?,?,?,?)";
    $stmt = $db->prepare($sql);
    if($stmt->execute([$matID, $dateCurrant, $timeCurrant, $req])){
        $obj = new stdClass();
        $objData = new stdClass();
        $objData-> TimeStamp = $dateCurrant.' '.$timeCurrant ;
        $objData-> deviceID = $matID;
        $objData-> msg = $req;

        json_encode($objData);

        $obj->RespCode = 200;
        $obj->Resmessage='inserted';
        $obj->yourData=$objData;

    }
    
    else{
        $obj = new stdClass();
        $obj->RespCode = 400;
        $obj->Resmessage='not inserted';
    }

    echo json_encode($obj);
    http_response_code(200);
}else{
    http_response_code(405);
}

?>