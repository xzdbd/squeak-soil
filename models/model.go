package models

import (
	"crypto/tls"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/httplib"
)

type Userinfo struct {
	Id       int64  `form:"-"`
	Username string `form:"username"`
	Password string `form:"password"`
	role     int64
}

type SoilSuggestionAttribute struct {
	ID      int
	Name    string
	Outcome float32
	N1      float32
	N2      float32
	N3      float32
	P1      float32
	P2      float32
	P3      float32
	K1      float32
	K2      float32
	K3      float32
	Rec11   float32
	Rec12   float32
	Rec2N   float32
	Rec2K   float32
	Rec2P   float32
	Rec22   float32
}

type SoilSuggestionFeature struct {
	SoilSuggestionAttribute `json:"attributes"`
}

type SoilSuggestion struct {
	Features []SoilSuggestionFeature
}

type SoilAttribute struct {
	SoilID  int     `json:"soil_id"`
	Organic float32 `json:"organic_"`
	N       float32
	P       float32
	K       float32
	X       float64 `json:"long_x_"`
	Y       float64 `json:"lat_y_"`
}

type SoilFeature struct {
	SoilAttribute `json:"attributes"`
}

type Soil struct {
	Features []SoilFeature
}

func QuerySoilSuggestion(plant string, product string) SoilSuggestion {
	var soilSuggestion SoilSuggestion
	var plantChinese string
	switch plant {
	case "mianhua":
		plantChinese = "棉花"
	case "yumi":
		plantChinese = "玉米"
	case "xiaomai":
		plantChinese = "小麦"
	case "li":
		plantChinese = "梨"
	case "tao":
		plantChinese = "桃"
	}
	url := beego.AppConfig.String("soilSuggestionLayer")
	req := httplib.Get(url)
	req.SetTLSClientConfig(&tls.Config{InsecureSkipVerify: true})
	req.Param("where", "name='"+plantChinese+"' AND outcome="+product)
	req.Param("f", "json")
	req.Param("outFields", "*")
	err := req.ToJSON(&soilSuggestion)
	if err != nil {
		beego.Error(err)
	}
	beego.Trace(soilSuggestion)
	return soilSuggestion
}

func QuerySoil(id string) Soil {
	var soil Soil
	beego.Trace(id)
	url := beego.AppConfig.String("soilLayer")
	req := httplib.Get(url)
	req.SetTLSClientConfig(&tls.Config{InsecureSkipVerify: true})
	req.Param("where", "soil_id="+id)
	req.Param("f", "json")
	req.Param("outFields", "*")
	req.Param("returnGeometry", "false")
	err := req.ToJSON(&soil)
	if err != nil {
		beego.Error(err)
	}
	beego.Trace(soil)
	return soil
}
