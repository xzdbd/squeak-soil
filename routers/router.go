package routers

import (
	"github.com/astaxie/beego"
	"github.com/xzdbd/squeak-soil/controllers"
)

func init() {
	beego.Router("/", &controllers.LoginController{})
	beego.Router("/login", &controllers.LoginController{})
	beego.Router("/index", &controllers.MainController{})
	beego.Router("/suggestion", &controllers.SuggestionController{})
}
