/* ========================================================================
 * pollution main.js
 * ========================================================================
 *
   ======================================================================== */

var app;

require([
  // ArcGIS
  "esri/Map",
  "esri/Basemap",
  "esri/layers/VectorTileLayer",
  "esri/views/MapView",
  "esri/views/SceneView",
  "esri/widgets/Search",
  "esri/widgets/Popup",
  "esri/widgets/Home",
  "esri/widgets/Legend",
  "esri/widgets/ColorPicker",
  "esri/core/watchUtils",
  "esri/layers/FeatureLayer",
  "esri/layers/MapImageLayer",
  "esri/layers/TileLayer",
  "esri/symbols/PictureMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/tasks/QueryTask",
  "esri/tasks/support/Query",
  "esri/layers/GraphicsLayer",
  "esri/tasks/Geoprocessor",
  "esri/tasks/support/FeatureSet",
  "esri/layers/support/Field",
  "esri/PopupTemplate",

  "dojo/query",
  "dojo/dom-class",
  "dojo/dom",
  "dojo/on",
  "dojo/dom-construct",
  "dojo/date",
  "dojo/date/locale",
  "dojo/request",
  "dojo/_base/declare",
  "dojo/dom-style",
  "dojo/_base/fx",
  "dojo/keys",
  "dojo/html",

  //cedar chart
  "cedar",

  // Calcite Maps
  "calcite-maps/calcitemaps-v0.3",

  // Boostrap
  "bootstrap/Collapse",
  "bootstrap/Dropdown",
  "bootstrap/Tab",
  "bootstrap/Carousel",
  "bootstrap/Tooltip",
  "bootstrap/Modal",

  // Dojo
  "dojo/domReady!"
], function (Map, Basemap, VectorTileLayer, MapView, SceneView, Search, Popup, Home, Legend, ColorPicker,
  watchUtils, FeatureLayer, MapImageLayer, TileLayer, PictureMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, QueryTask, Query, GraphicsLayer, Geoprocessor, FeatureSet, Field, PopupTemplate, query, domClass, dom, on, domConstruct, date, locale, request, declare, domStyle, fx, keys, html, Cedar, CalciteMapsSettings) {

    app = {
      scale: null,
      zoom: 13,
      lonlat: [108.08771871717607, 34.2506873726101],
      mapView: null,
      mapDiv: "mapViewDiv",
      mapFL: null,
      vectorLayer: null,
      sceneView: null,
      sceneDiv: "sceneViewDiv",
      sceneFL: null,
      activeView: null,
      searchWidgetNav: null,
      searchWidgetPanel: null,
      searchWidgetSettings: null,
      basemapSelected: "topo",
      basemapSelectedAlt: "topo",
      legendLayer: null,
      graphicsLayer: null,
      highlightGraphicsLayer: null,
      legend: null,
      padding: {
        top: 85,
        right: 0,
        bottom: 0,
        left: 0
      },
      uiPadding: {
        components: ["zoom", "attribution", "home", "compass"],
        padding: {
          top: 15,
          right: 15,
          bottom: 30,
          left: 15
        }
      },
      popupOptions: {
        autoPanEnabled: true,
        messageEnabled: false,
        spinnerEnabled: false,
        dockEnabled: true,
        dockOptions: {
          buttonEnabled: true,
          breakpoint: 544 // default
        }
      },
      loading: null,
    }

    //----------------------------------
    // App
    //----------------------------------
    initializeLoadingOverlay();
    initializeMapViews();
    initializeSoilLayer();
    initializeAppUI();


    //----------------------------------
    // Loading Overlay
    //----------------------------------

    function initializeLoadingOverlay() {
      var Loading = declare(null, {
        overlayNode: null,
        indicatorNode: null,
        fadedout: null,
        constructor: function () {
          // save a reference to the overlay
          this.overlayNode = dom.byId("loadingOverlay");
          this.indicatorNode = dom.byId("loadingIndicator");
          this.fadedout = true;
        },
        // called to hide the loading overlay
        endLoading: function () {
          domStyle.set(this.overlayNode, 'display', 'none');
          fx.fadeOut({
            node: this.indicatorNode,
            onEnd: function (node) {
              domStyle.set(node, 'display', 'none');
            }
          }).play();
          this.fadedout = false;
        }
      });
      app.loading = new Loading();

      setTimeout(function () {
        if (app.loading.fadedout == true) {
          app.loading.endLoading();
        }
      }, 10000);
    }

    //----------------------------------
    // Map and Scene View
    //----------------------------------

    function initializeMapViews() {
      // define basemap
      var chinaBasemap = new TileLayer({
        url: "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer"
      });

      app.mapView = new MapView({
        container: app.mapDiv,
        map: new Map({ layers: [chinaBasemap] }),
        zoom: app.zoom,
        center: app.lonlat,
        padding: app.padding,
        ui: app.uiPadding,
        popup: new Popup(app.popupOptions),
        visible: true
      })

      var homeWidget = new Home({
        view: app.mapView
      });

      // adds the home widget to the top left corner of the MapView
      app.mapView.ui.add(homeWidget, "top-left");

      var highlightGraphicsLayer = new GraphicsLayer();
      app.highlightGraphicsLayer = highlightGraphicsLayer;

      app.activeView = app.mapView;

      app.mapView.then(function () {
        app.loading.endLoading();
        // popup detail content
        app.mapView.popup.on("trigger-action", function (e) {
          if (e.action.id == "detail") {
            showDeatils(e);
          }
        });

        // update detail info
        app.mapView.on("click", function (e) {
          console.log("view click")
          var screenPoint = {
            x: e.x,
            y: e.y
          };

        });
      });
    }

    //----------------------------------
    // Soil GraphicsLayer
    //----------------------------------

    function initializeSoilLayer() {
      // define graphics layer to display soil layer
      var graphicsLayer = new GraphicsLayer();
      app.graphicsLayer = graphicsLayer;
      // define symbol
      var symbol = new SimpleFillSymbol({
        color: [51, 204, 51, 0.3],
        style: "solid",
        outline: {
          color: "black",
          width: 1.5
        }
      });
      // define popup template
      var template = {
        title: "<font color='#008000'>地块：{soil_type}",

        content: [{
          type: "fields",
          fieldInfos: [{
            fieldName: "soil_id",
            visible: true,
            label: "编号",
          }, {
            fieldName: "soiladd_",
            visible: true,
            label: "位置",
          }, {
            fieldName: "soilpeople_",
            visible: true,
            label: "户主",
          }],
        }],
        actions: [{
          title: "测土配方",
          id: "detail",
          className: "esri-icon-dashboard",
        }]
      };

      // define query layer, mofify it on demand
      var layer = "https://gis.xzdbd.com/arcgis/rest/services/dev/soil/MapServer/0";
      var queryTask = new QueryTask({
        url: layer
      });
      var query1 = new Query();
      query1.returnGeometry = true;
      query1.outFields = ["*"];
      query1.where = "1=1";

      // perform query task, to query all the soil information from ArcGIS Server
      queryTask.execute(query1, { cacheBust: false }).then(function (result) {
        if (result.features.length > 0) {
          result.features.forEach(function (graphic) {
            graphic.symbol = symbol;
            graphic.popupTemplate = template;
            graphicsLayer.add(graphic);
          });
          app.mapView.map.add(graphicsLayer);
          // remove loading
          app.loading.endLoading();
        }
      });
    }


    //----------------------------------
    // Details Handler
    //----------------------------------

    function showDeatils(e) {
      // 获取编号
      var code = query(".esri-popup-renderer__field-data")[0].innerHTML;
      window.location.href = '/suggestion?code=' + code + '&step=1';
    }

    //----------------------------------
    // App UI Handlers
    //----------------------------------

    function initializeAppUI() {
      // App UI
      setBasemapEvents();
      setSearchWidgets();
      setPopupPanelEvents();
      setPopupEvents();
      setResultContentEvents();
      setQueryEvents();
      setAnalysisEvents();
    }

    //----------------------------------
    // Basemaps
    //----------------------------------

    function setBasemapEvents() {

      // Sync basemaps for map and scene
      query("#selectBasemapPanel").on("change", function (e) {
        app.basemapSelected = e.target.options[e.target.selectedIndex].dataset.vector;
        setBasemaps();
      });

      function setBasemaps() {
        app.mapView.map.basemap = app.basemapSelected;
      }
    }

    //----------------------------------
    // Search Widgets
    //----------------------------------

    function setSearchWidgets() {

      //TODO - Search Nav + Panel (detach/attach)
      app.searchWidgetNav = createSearchWidget("searchNavDiv", true);
      app.searchWidgetPanel = createSearchWidget("searchPanelDiv", true);
      app.searchWidgetSettings = createSearchWidget("settingsSearchDiv", false);

      // Create widget
      function createSearchWidget(parentId, showPopup) {
        var search = new Search({
          viewModel: {
            view: app.activeView,
            popupOpenOnSelect: showPopup,
            highlightEnabled: false,
            maxSuggestions: 4
          },
        }, parentId);
        search.startup();
        return search;
      }
    }

    //----------------------------------
    // Popups and Panels
    //----------------------------------

    function setPopupPanelEvents() {

      // Views - Listen to view size changes to show/hide panels
      app.mapView.watch("size", viewSizeChange);

      function viewSizeChange(screenSize) {
        if (app.screenWidth !== screenSize[0]) {
          app.screenWidth = screenSize[0];
          setPanelVisibility();
        }
      }

      // Popups - Listen to popup changes to show/hide panels
      app.mapView.popup.watch(["visible", "currentDockPosition"], setPanelVisibility);

      // Panels - Show/hide the panel when popup is docked
      function setPanelVisibility() {
        var isMobileScreen = app.activeView.widthBreakpoint === "xsmall" || app.activeView.widthBreakpoint === "small",
          isDockedVisible = app.activeView.popup.visible && app.activeView.popup.currentDockPosition,
          isDockedBottom = app.activeView.popup.currentDockPosition && app.activeView.popup.currentDockPosition.indexOf("bottom") > -1;
        // Mobile (xsmall/small)
        if (isMobileScreen) {
          if (isDockedVisible && isDockedBottom) {
            query(".calcite-panels").addClass("invisible");
          } else {
            query(".calcite-panels").removeClass("invisible");
          }
        } else { // Desktop (medium+)
          if (isDockedVisible) {
            query(".calcite-panels").addClass("invisible");
          } else {
            query(".calcite-panels").removeClass("invisible");
          }
        }
      }

      // Panels - Dock popup when panels show (desktop or mobile)
      query(".calcite-panels .panel").on("show.bs.collapse", function (e) {
        if (app.activeView.popup.currentDockPosition || app.activeView.widthBreakpoint === "xsmall") {
          app.activeView.popup.dockEnabled = false;
        }
      });

      // Panels - Undock popup when panels hide (mobile only)
      query(".calcite-panels .panel").on("hide.bs.collapse", function (e) {
        if (app.activeView.widthBreakpoint === "xsmall") {
          app.activeView.popup.dockEnabled = true;
        }
      });
    }

    //----------------------------------
    // Popup collapse (optional)
    //----------------------------------

    function setPopupEvents() {
      query(".esri-popup__header-title").on("click", function (e) {
        query(".esri-popup__main-container").toggleClass("esri-popup-collapsed");
        app.activeView.popup.reposition();
      }.bind(this));
    }  


  });