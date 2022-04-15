<?php

//echo json_encode(readfile('points.txt'));


$filename = "../scores.txt";
$handle = fopen($filename, "rb");
$contents = fread($handle, filesize($filename));
fclose($handle);

echo $contents;


?>