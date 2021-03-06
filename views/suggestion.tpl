<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>施肥建议卡</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.10/semantic.css" rel="stylesheet">
    <style type="text/css">
        .xb {
            font-size: 9px;
        }

        table td {
            padding-left: 3px;
            padding-right: 3px;
        }
    </style>
</head>

<body style="color:#000;">
    <form name="form1" method="post">
        <div id="nr" style="width:100%">
            <table width="740px" cellpadding="0" cellspacing="0" border="0">
                <tr align="center">
                    <td align="center">
                        <div id="printPage" style="padding-top:20px;">
                            <div style="font-size:32px; font-weight:bold; line-height:50px; height:50px; text-align:center;">
                                <p>杨凌区李台街道测土配方施肥建议卡</p>
                                <p>&nbsp;</p>
                            </div>
                            <div style="font-size:22px; font-weight:bold; line-height:40px; height:40px; text-align:center;">土壤养分测试数据</div>
                            <table border="1" align="center" cellpadding="0" cellspacing="0" bordercolor="#000000" style="font-size:12px;" width="600px">

                                <tr style="background-color:#F0F0F0; text-align:center;">
                                    <td height="22">有机质g/kg</td>
                                    <td>碱解氮mg/kg</td>
                                    <td>有效磷mg/kg</td>
                                    <td>速效钾mg/kg</td>
                                    <td>纬度</td>
                                    <td>经度</td>
                                </tr>
                                <tr align="center">
                                    <td height="22">{{.Organic}}</td>
                                    <td>{{.N}}&nbsp;</td>
                                    <td>{{.P}}&nbsp;</td>
                                    <td>{{.K}}&nbsp;</td>
                                    <td>{{.X}}</td>
                                    <td>{{.Y}}</td>
                                </tr>

                            </table>

                            <div style="font-size:22px; font-weight:bold; line-height:40px; height:40px; text-align:center;">棉花推荐施肥方案</div>


                            <table border="1" align="center" cellpadding="0" cellspacing="0" bordercolor="#000000" style="font-size:12px;" width="600px">
                                <tr style="background-color:#F0F0F0; text-align:center;">
                                    <td height="22">作物名称</td>
                                    <td>

                                        目标产量（{{.Name}} 公斤/亩）

                                    </td>
                                </tr>
                                <tr align="center">
                                    <td height="22">棉花</td>
                                    <td>{{.Product}}&nbsp;</td>
                                </tr>
                            </table>

                            <div style="font-size:13px; line-height:22px; height:22px; text-align:center;">养分用量指标（公斤/亩）</div>
                            <table border="1" align="center" cellpadding="0" cellspacing="0" bordercolor="#000000" style="font-size:12px;" width="600px">
                                <tr style="background-color:#F0F0F0; text-align:center;">
                                    <td height="22">养分种类</td>
                                    <td>全生育期总用量</td>
                                    <td>基（底）肥</td>
                                    <td>追肥</td>
                                </tr>
                                <tr align="center">
                                    <td height="22">纯氮(N)</td>
                                    <td>{{.N1}}&nbsp;</td>
                                    <td>{{.N2}}&nbsp;</td>
                                    <td>{{.N3}}&nbsp;</td>
                                </tr>
                                <tr align="center">
                                    <td height="22">五氧化二磷(P<span class="xb">2</span>O<span class="xb">5</span>)</td>
                                    <td>{{.P1}}&nbsp;</td>
                                    <td>{{.P2}}&nbsp;</td>
                                    <td>{{.P3}}&nbsp;</td>
                                </tr>
                                <tr align="center">
                                    <td height="22">氧化钾(K<span class="xb">2</span>O)</td>
                                    <td>{{.K1}}&nbsp;</td>
                                    <td>{{.K2}}&nbsp;</td>
                                    <td>{{.K3}}&nbsp;</td>
                                </tr>
                            </table>


                            <div style="font-size:13px; line-height:22px; height:22px; text-align:center;">施肥方案与用量</div>
                            <table border="1" align="center" cellpadding="0" cellspacing="0" bordercolor="#000000" style="font-size:12px;" width="600px">
                                <tr style="background-color:#F0F0F0; text-align:center;">
                                    <td height="22" width="60px">&nbsp;</td>
                                    <td>施肥时期和方法</td>
                                    <td width="200px">推荐方案（1）</td>
                                    <td width="160px">推荐方案（2）</td>
                                </tr>
                                <tr>
                                    <td height="42" style="text-align:center">底肥<br/> (公斤/亩)
                                    </td>
                                    <td align="left">增施有机肥，整地前地表撒施及时耕翻。&nbsp;</td>
                                    <td valign="top">

                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" height="100%">

                                            <tr>
                                                <td height="22" align="left">配方肥45%(15-20-10)&nbsp;</td>
                                                <td>{{.Rec11}}&nbsp;</td>
                                            </tr>

                                            <tr>
                                                <td height="22" colspan="2" align="left">按接近配方采购配方肥，可用单质肥料做小的调整。&nbsp;</td>
                                            </tr>


                                        </table>
                                    </td>
                                    <td valign="top">

                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" height="100%">

                                            <tr>
                                                <td height="22" align="left">尿素&nbsp;</td>
                                                <td>{{.Rec2N}}&nbsp;</td>
                                            </tr>

                                            <tr>
                                                <td height="22" align="left">硫酸钾&nbsp;</td>
                                                <td>{{.Rec2K}}&nbsp;</td>
                                            </tr>

                                            <tr>
                                                <td height="22" align="left">磷酸二铵&nbsp;</td>
                                                <td>{{.Rec2P}}&nbsp;</td>
                                            </tr>

                                        </table>
                                    </td>
                                </tr>
                                <!--
	</table>
    -->



                                <!--<div style="font-size:13px; line-height:22px; height:22px; text-align:center;">追肥（公斤/亩）</div>-->
                                <!--
	<table border="1" align="center" cellpadding="0" cellspacing="0" bordercolor="#000000" style="font-size:12px;" width="600px">
    	<tr style="background-color:#F0F0F0; text-align:center;">
        	<td height="22" width="60px" >&nbsp;</td>
        	<td>施肥时期和方法</td>
            <td width="180px">推荐方案（1）</td>
            <td width="180px">推荐方案（2）</td>
		</tr>
        -->
                                <tr>
                                    <td height="42" style="text-align:center">追肥<br/> (公斤/亩)
                                    </td>
                                    <td align="left">花铃期追施尿素，适当深施。&nbsp;</td>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">

                                            <tr>
                                                <td height="22" align="left">尿素&nbsp;</td>
                                                <td>{{.Rec12}}&nbsp;</td>
                                            </tr>


                                        </table>
                                    </td>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">

                                            <tr>
                                                <td height="22" align="left">尿素&nbsp;</td>
                                                <td>{{.Rec22}}&nbsp;</td>
                                            </tr>

                                        </table>
                                    </td>
                                </tr>
                            </table>





                            <div id="prtbun" style="text-align:center; line-height:45px; padding:15px;">
                                <input type="hidden" name="sid" id="sid" value="sid850" />
                                <input type="hidden" name="cid" id="cid" value="I1H2G3F4E5D6C20150130AB053800XZY" />
                                <input type="hidden" name="st" id="st" value="2" />
                                <input type="hidden" name="op" id="op" value="" />
                                <!-- 必须提交操作方式 默认为空，后退为1,返回为2 -->
                                <input type="hidden" name="sn" id="sn" value="9" />
                                <!-- 必须提交当前操作步骤，根据操作步骤决定要去哪里 -->

                                <input type="button" value="打 印" onclick="javascript:window.print();" class="ui primary basic button" />

                                <input type="submit" value="导 出" class="ui secondary basic button" />

                                <input id="backsuggestion" type="button" value="后 退" class="ui basic button" />
                                <button type="button" onClick="window.location.href='/index'" class="ui basic button">返 回</button>
                            </div>



                            <!--
<object type="application/x-shockwave-flash" data="./images/dewplayer_mini.swf" width="160" height="0" id="dewplayer" name="dewplayer">
<param name="wmode" value="transparent" />
<param name="movie" value="./images/dewplayer_mini.swf" />
<param name="flashvars" value="mp3=./images/welinfo.mp3&autostart=1&autoreplay=0&volume=100" />
</object>
-->

                    </td>
                </tr>
            </table>
            </div>

    </form>
    <script src="//ajax.googleapis.com/ajax/libs/dojo/1.12.1/dojo/dojo.js"></script>
    <script src="/static/js/soil.js"></script>
</body>

</html>