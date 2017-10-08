<?php

    $absolute_path ="M301.4,51.5L301.4,51.5c4.4,0,8.8,0.1,13.3,0.3c96.301,4,201.7,93.8,235.2,177.7C599.199,133.8,690,55.7,786.3,51.7c4.5-0.2,8.899-0.3,13.3-0.3c74.3,0,137.1,26.6,181.5,77.1c41.3,46.9,64.1,112.1,64.1,183.3c0,85.8-57.899,174.9-154.8,238.2l-280.7,177.9c-0.199,0.1-0.399,0.3-0.6,0.399c-0.3,0.2-30.6,20.9-59.3,20.9c-26.9,0-57.7-19.8-58.2-20.1L210.8,550.2c-97-63.4-155-152.5-155-238.3c0-71.3,22.8-136.4,64.1-183.4C164.3,78.1,227,51.5,301.4,51.5";

    function regex_callback($matches) {
        static $count = -1;
        $count++;
        $width = 1045; //svg 实际宽度
        $height = 749; // svg 实际高度
        if ($count % 2) {
            return $matches[0] / $height;
        } else {
            return $matches[0] / $width;
        }
    }

    $relative_path = preg_replace_callback('(\d+(\.\d+)?)', 'regex_callback', $absolute_path);

    echo $relative_path;

?>

<!-- svg设置 -->
<svg>
    <clipPath id="clip-heart" clipPathUnits="objectBoundingBox">
        <path d="...$relative_path..." />
    </clipPath>
</svg>
