<?php
  $startTime = 1510695000; // Tuesday, November 14, 2017 4:30:00 PM GMT-05:00
  $vis215 = 2454; // t-y-p-o-g-r-a-p-h-y seconds
  $vis216 = 5009; // g-e-s-t-a-l-t seconds
  $vis415 = 2672; // i-n-t-e-r-f-a-c-e seconds

  if (isset($_GET["courseID"])) {
    $courseID = $_GET["courseID"];
    $ts = 1; // default x % 1 = 0

    switch ($courseID) {
      case 'vis215':
        $ts = $vis215;
        break;
      case 'vis216':
        $ts = $vis216;
        break;
      case 'vis415':
        $ts = $vis415;
        break;
    }

    $nowTime = time();
    $time = abs($nowTime - $startTime)%$ts;
    echo json_encode(array(
      "time" => $time));
  }
?>
