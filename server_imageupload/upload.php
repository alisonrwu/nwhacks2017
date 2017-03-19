<?php
$response = array();
$valid_file = false;

//if they DID upload a file...
if($_FILES['image']['name'])
{
	//if no errors...
	if(!$_FILES['image']['error'])
	{
		//now is the time to modify the future file name and validate the file
        $typeData = explode("/", $_FILES['image']['type']);
        $fileType = $typeData[1];
        
		$new_file_name = "img_" . md5_file($_FILES['image']['tmp_name']) . "_" . time() . "." . $fileType; //rename file
		if($_FILES['image']['size'] > (10 * 1024000)) //can't be larger than 10 MB
		{
			$valid_file = false;
			$response["status"] = "TOO_LARGE";
		} else $valid_file = true;
		
		//if the file has passed the test
		if($valid_file)
		{
			//move it to where we want it to be
            move_uploaded_file($_FILES['image']['tmp_name'], 'uploads/'.$new_file_name);
            $response["status"] = "SUCCESS";
            $response["url"] = $new_file_name;
            $response["type"] = $_FILES['image']['type'];
		}
	}
	//if there is an error...
	else
	{
		//set that to be the returned message
        $response["status"] = "ERROR";
        $response["error"] = $_FILES['image']["error"];
	}
} else
{
    $response["status"] = "ERROR";
    $response["error"] = "NO_IMAGE";
}

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
echo json_encode($response);

/*//you get the following information for each file:
$_FILES['field_name']['name']
$_FILES['field_name']['size']
$_FILES['field_name']['type']
$_FILES['field_name']['tmp_name']*/
?>