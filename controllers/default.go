package controllers

import (
	"crypto/tls"

	"strconv"

	"github.com/astaxie/bat/httplib"
	"github.com/astaxie/beego"
	"github.com/xzdbd/squeak-soil/models"
)

type MainController struct {
	beego.Controller
}

type LoginController struct {
	beego.Controller
}

type SuggestionController struct {
	beego.Controller
}

func (c *MainController) Get() {
	c.TplName = "index.html"
}

func (c *LoginController) Get() {
	c.TplName = "login.tpl"
}

func (c *LoginController) Post() {
	var loginStatus bool
	user := models.Userinfo{}
	if err := c.ParseForm(&user); err != nil {
		beego.Error(err.Error())
	}

	if user.Username == "admin" && user.Password == "admin" {
		loginStatus = true
	}

	if loginStatus {
		c.Redirect("/index", 302)
	} else {
		c.Data["isLoginFail"] = true
	}
	c.TplName = "login.tpl"
}

func (c *SuggestionController) Get() {
	step := c.GetString("step")
	if step == "1" {
		c.TplName = "step1.tpl"
	} else if step == "2" {
		plant := c.GetString("plant")
		switch plant {
		case "mianhua":
			c.Data["maxProduct"] = "350"
			c.Data["minProduct"] = "200"
		case "yumi":
			c.Data["maxProduct"] = "650"
			c.Data["minProduct"] = "500"
		case "xiaomai":
			c.Data["maxProduct"] = "600"
			c.Data["minProduct"] = "450"
		case "li":
			c.Data["maxProduct"] = "5000"
			c.Data["minProduct"] = "4000"
		case "tao":
			c.Data["maxProduct"] = "3500"
			c.Data["minProduct"] = "2500"
		}

		c.TplName = "step2.tpl"
	} else if step == "3" {
		soilId := c.GetString("code")
		product := c.GetString("product")
		plant := c.GetString("plant")
		soilSuggestion := models.QuerySoilSuggestion(plant, product)
		c.Data["Product"] = product
		if len(soilSuggestion.Features) > 0 {
			c.Data["Name"] = soilSuggestion.Features[0].Name
			c.Data["N1"] = soilSuggestion.Features[0].N1
			c.Data["N2"] = soilSuggestion.Features[0].N2
			c.Data["N3"] = soilSuggestion.Features[0].N3
			c.Data["P1"] = soilSuggestion.Features[0].P1
			c.Data["P2"] = soilSuggestion.Features[0].P2
			c.Data["P3"] = soilSuggestion.Features[0].P3
			c.Data["K1"] = soilSuggestion.Features[0].K1
			c.Data["K2"] = soilSuggestion.Features[0].K2
			c.Data["K3"] = soilSuggestion.Features[0].K3
			c.Data["Rec11"] = soilSuggestion.Features[0].Rec11
			c.Data["Rec12"] = soilSuggestion.Features[0].Rec12
			c.Data["Rec2N"] = soilSuggestion.Features[0].Rec2N
			c.Data["Rec2K"] = soilSuggestion.Features[0].Rec2K
			c.Data["Rec2P"] = soilSuggestion.Features[0].Rec2P
			c.Data["Rec22"] = soilSuggestion.Features[0].Rec22
		}

		soil := models.QuerySoil(soilId)
		if len(soil.Features) > 0 {
			c.Data["Organic"] = soil.Features[0].Organic
			c.Data["N"] = soil.Features[0].N
			c.Data["P"] = soil.Features[0].P
			c.Data["K"] = soil.Features[0].K
			c.Data["X"] = soil.Features[0].X
			c.Data["Y"] = soil.Features[0].Y
		}

		c.TplName = "suggestion.tpl"
	} else {
		c.TplName = "step1.tpl"
	}
}

func (c *SuggestionController) Post() {
	beego.Trace(c.Ctx.Input.Site() + ":" + strconv.Itoa(c.Ctx.Input.Port()) + c.Ctx.Input.URI())
	url := c.Ctx.Input.Site() + ":" + strconv.Itoa(c.Ctx.Input.Port()) + c.Ctx.Input.URI()
	req := httplib.Get(url)
	req.SetTLSClientConfig(&tls.Config{InsecureSkipVerify: true})
	req.ToFile("suggestion.html")
	c.Ctx.Output.Download("suggestion.html")
	//c.Redirect(c.Ctx.Request.URL.String(), 302)
}
