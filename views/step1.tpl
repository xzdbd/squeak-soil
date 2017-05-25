<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>请选择种植作物</title>
    <link href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.10/semantic.css" rel="stylesheet">
    <style>
        #container {
            padding-top: 20px;
        }
    </style>
</head>

<body>
    <div id="container" class="ui grid container">
        <div class="row">
            <h2>请选择种植作物</h2>
        </div>
        <div class="row">
            <div class="blue large ui buttons">
                <button class="ui button">棉花</button>
                <button class="ui button">玉米</button>
                <button class="ui button">小麦</button>
                <button class="ui button">梨</button>
                <button class="ui button">桃</button>
            </div>
        </div>
        <div class="row">
            <div>
                <button id="submitstep1" type="button" class="ui primary basic button">提 交</button>
                <button type="button" onClick="window.location.href='/index'" class="ui basic button">            
                后 退
            </button>
                <button type="button" onClick="window.location.href='/index'" class="ui basic button">返 回</button>
            </div>
        </div>
    </div>

    <script src="//ajax.googleapis.com/ajax/libs/dojo/1.12.1/dojo/dojo.js"></script>
    <script src="/static/js/soil.js"></script>
</body>

</html>