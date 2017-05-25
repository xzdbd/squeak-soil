<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>请选择目标产量</title>
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
            <h2 class="ui header">请选择目标产量</h2>
        </div>
        <div class="row">
        <div class="blue large ui buttons">
            <button id="maxProduct" class="ui button">{{.maxProduct}}公斤</button>

            <button id="minProduct" class="ui button">{{.minProduct}}公斤</button>
        </div>
        </div>
        <div class="row">
        <div>
            <button id="submitstep2" type="button" class="ui primary basic button">提交</button>
            <button id="backstep2" type="button" class="ui basic button">
                后退
            </button>
            <button type="button" onClick="window.location.href='/index'" class="ui basic button">返回</button>
        </div>
        </div>
    </div>

    <script src="//ajax.googleapis.com/ajax/libs/dojo/1.12.1/dojo/dojo.js"></script>
    <script src="/static/js/soil.js"></script>
</body>

</html>