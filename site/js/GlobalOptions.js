//default language code, can be overwritten with lang parameter in URL
var lang = "pt_BR"; //for available codes see array availableLanguages in file GlobalOptions.js

//Help file (must be a local file)
var helpfile = "help_pt_BR.html";

//Custom function to populate GetUrlParams variables
var customGetUrlParamsParser = null;

//Servername (optional) and path and name name of QGIS Server FCGI-file
//either with or without server-name - without servername recommended for easier porting to other servers
//do not add a ? or & after the .fcgi extension
var serverAndCGI = "/cgi-bin/qgis_mapserv.fcgi";

//Optional url for print server hosted on a different server. Default: same as above.
// var serverAndCGI = "http://otherserver/cgi-bin/qgis_mapserv.fcgi";
var printServer = serverAndCGI;

//Define whether you want to use the GetProjectSettings extension of QGIS Server
//for more configuration options in the project.
//Set this to false to use GetCapabilities for older QGIS Server versions (<= 1.8).
var useGetProjectSettings = true;

// show the layerOrderTab in the GUI
var showLayerOrderTab = true;

// show layername in layerTree in gray when layer is outside visible scale
var grayLayerNameWhenOutsideScale = true;

// show the tab metadata in legend
var showMetaDataInLegend = true;

// show maptips when mouse is over object, set to false if you just want to click and show results
// if set to true every mouse position over feature of queriable layers is GetFeatureInfo request on server
var enableHoverPopup = true;

var defaultIdentificationMode = "Todas as camadas";

// use geodesic measures, i.e. not planar measures
// this is useful if a projection with high distortion of length/area is used, eg.g. GoogleMercator
var useGeodesicMeasurement = true;

//search box for queries while typing
//enable to use GeoNames search
var useGeoNamesSearchBox = false;
var geoNamesUserName = 'insert your geonames user name';
//URL for custom search scripts
var searchBoxQueryURL = null; // "/wsgi/search.wsgi?query=";
var searchBoxGetGeomURL = null; // "/wsgi/getSearchGeom.wsgi";

// use QGIS WMS highlight for selected search result in search box
var enableSearchBoxWmsHighlight = false;
// search result attribute to show as label if enableSearchBoxWmsHighlight is enabled
var searchBoxWmsHighlightLabel = 'displaytext';

// If set, will make sure that the layer for the search results is
// visible. This feature will work out of the box if PHP scripts are
// used.
var autoActivateSearchGeometryLayer = true;

// Used to dynamically determine the project.
var project_map = Ext.urlDecode(window.location.search.substring(1)).map;

// PHP based search scripts (postgis layers only)
//var searchBoxQueryURL = '../php/search.php?map=' + project_map;
//var searchBoxGetGeomURL = '../php/search_geom.php?map=' + project_map;

//control if DXF export is globally enabled
//note that DXF export needs a recent QGIS server equal or younger to https://github.com/qgis/QGIS/commit/4e7efd669de21f58adcf32be21df4ac510a67c3a (2015-07)
//other settings can/should be set in the file GISProjectListing.js
var enableDXFExport = true;

// show the permalink button
var enablePermalink = true;
//use a URL shortener for your permalink function
var permaLinkURLShortener = null; // "/wsgi/createShortPermalink.wsgi";

// enable to use commercial Google and Bing layers (also add BingApiKey)
var enableBingCommercialMaps = false;

if (enableBingCommercialMaps) {
    var bingApiKey = "add Bing api key here"; // http://msdn.microsoft.com/en-us/library/ff428642.aspx
}

var enableGoogleCommercialMaps = true;

var enableOSMMaps = true;

var enableBGMaps = false;
if (enableBingCommercialMaps || enableOSMMaps || enableGoogleCommercialMaps) {
	enableBGMaps = true;
}
if (enableBGMaps) {
	// enter the index of the backgroundLayer to be visible after loading,
	// set to a value < 0 to not show any backgroundLayer
	// this setting is overridden if a value for url-parameter visibleBackgroundLayer is passed
	var initialBGMap = 0;
}

// enable to use WMTS base layers
var enableWmtsBaseLayers = false;
// NOTE: also set MapOptions according to WMTS

// media base URL to match media links in layer attributes
var mediaurl = '';
// do not show fields in ObjectIdentification results that have null values
var suppressEmptyValues = true;
// hide geometry in ObjectIdentification results (should be only false if there is a good reason to do so)
var suppressInfoGeometry = true;
// do show field names in click-popup during object identification
var showFieldNamesInClickPopup = true;
// show or hide the layer title in the feature info popup
// can be overwritten on a per-project basis in GISProjectListing.js
var showFeatureInfoLayerTitle = true;
// max-width and max-height of the feature-info popup can be controlled in site/css/popup.css

// Tolerances for feature info in pixels at 96dpi. These will be scaled to the actual screenDpi value
var featureInfoToleranceDpi = 96; // reference dpi
var featureInfoPointTolerance = 16;
var featureInfoLineTolerance = 8;
var featureInfoPolygonTolerance = 4;

// Formatadores de resultados WMS GetFeatureInfo personalizados: você pode definir personalizado
// filtra funções para aplicar formatação personalizada aos valores provenientes de
// Pedidos GetFeatureInfo quando o usuário usa a ferramenta "identificar".
// As mesmas funções de formatação normalmente podem ser usadas como "renderer"
// função passada para a configuração da coluna na propriedade "gridColumns"
// da configuração de grade dos painéis de pesquisa WMS GetFeatureInfo.

// Formador de exemplo, leva o valor, o nome da coluna e o nome da camada,
// normalmente apenas o primeiro parâmetro é usado.
function customURLFormatter(attValue, attName, layerName){
   return '<a href="http://www.google.com/search?q=' + encodeURI(attValue) + '">' + attValue + '</a>';
}

// Configuração dos formatadores
var getFeatureInfoCustomFormatters = {
    'BaseCadastro': { // Nome da camada
        'MATRICULA': customURLFormatter // Pode ser uma matriz se você precisar de vários formatadores
    }
};

//config para o  QGIS.SearchPanel
//Número de resultados: FEATURE_COUNT no WMS request
var simpleWmsSearchMaxResults = 1000;

var simpleWmsSearch = {
  title: "Matrícula",
  query: 'simpleWmsSearch',
  useWmsRequest: true, 
  queryLayer: "BaseCadastro",
  formItems: [
    {
      xtype: 'textfield',
      name: 'MATRICULA',
      fieldLabel: "Matrícula",
      allowBlank: false,
      blankText: "Digite a Matrícula",
      filterOp: "="
    }
  ],
  gridColumns: [
    {header: 'MATRICULA', dataIndex: 'MATRICULA', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'CONTRATO', dataIndex: 'CONTRATO', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'NOM_CLIENTE', dataIndex: 'NOM_CLIENTE', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'SIT_LIG', dataIndex: 'SIT_LIG', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'CLASSIFICACAO', dataIndex: 'CLASSIFICACAO', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'NOM_LOGRADOURO', dataIndex: 'NOM_LOGRADOURO', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'NOM_BAIRRO', dataIndex: 'NOM_BAIRRO', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'CIDADE', dataIndex: 'CIDADE', menuDisabled: 'true', renderer: customURLFormatter},

  ],
  highlightFeature: true,
  symbolizersHighLightLayer: 'Point',
  highlightLayer: 'BaseCadastro',
  selectionLayer: 'BaseCadastro',
  selectionZoom: 0,
  doZoomToExtent: true
};


var buscaLogradouro = {   //simpleWmsSearch2 =
  title: "Logradouro",
  query: 'buscaLogradouro',
  useWmsRequest: true,
  queryLayer: "BaseCadastro",
  formItems: [
    {
      xtype: 'textfield',
      name: 'NOM_LOGRADOURO',
      fieldLabel: "Logradouro",
      allowBlank: false,
      blankText: "Digite o Logradouro",
      filterOp: "="
    }
  ],
  gridColumns: [
    {header: 'MATRICULA', dataIndex: 'MATRICULA', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'CONTRATO', dataIndex: 'CONTRATO', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'NOM_CLIENTE', dataIndex: 'NOM_CLIENTE', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'SIT_LIG', dataIndex: 'SIT_LIG', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'NUM_MEDIDOR', dataIndex: 'NUM_MEDIDOR', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'CLASSIFICACAO', dataIndex: 'CLASSIFICACAO', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'NOM_LOGRADOURO', dataIndex: 'NOM_LOGRADOURO', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'NOM_BAIRRO', dataIndex: 'NOM_BAIRRO', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'CIDADE', dataIndex: 'CIDADE', menuDisabled: 'true', renderer: customURLFormatter},
  ],
  highlightFeature: true,
  symbolizersHighLightLayer: 'Point',
  highlightLayer: 'BaseCadastro',
  selectionLayer: 'BaseCadastro',
  selectionZoom: 0,
  doZoomToExtent: true
};

var buscaBairro = {   //simpleWmsSearch2 =
  title: "Bairro",
  query: 'buscaBairro',
  useWmsRequest: true,
  queryLayer: "BaseCadastro",
  formItems: [
    {
      xtype: 'textfield',
      name: 'NOM_BAIRRO',
      fieldLabel: "Bairro",
      allowBlank: false,
      blankText: "Digite o Bairro",
      filterOp: "="
    }
  ],
  gridColumns: [
    {header: 'MATRICULA', dataIndex: 'MATRICULA', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'CONTRATO', dataIndex: 'CONTRATO', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'NOM_CLIENTE', dataIndex: 'NOM_CLIENTE', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'SIT_LIG', dataIndex: 'SIT_LIG', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'NUM_MEDIDOR', dataIndex: 'NUM_MEDIDOR', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'CLASSIFICACAO', dataIndex: 'CLASSIFICACAO', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'NOM_LOGRADOURO', dataIndex: 'NOM_LOGRADOURO', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'NOM_BAIRRO', dataIndex: 'NOM_BAIRRO', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'CIDADE', dataIndex: 'CIDADE', menuDisabled: 'true', renderer: customURLFormatter},
  ],
  highlightFeature: true,
  symbolizersHighLightLayer: 'Point',
  highlightLayer: 'BaseCadastro',
  selectionLayer: 'BaseCadastro',
  selectionZoom: 0,
  doZoomToExtent: true
};


var urlRewriteSearch = {   //simpleWmsSearch2 =
  title: "Medidor",
  query: 'simpleWmsSearch',
  useWmsRequest: true,
  queryLayer: "BaseCadastro",
  formItems: [
    {
      xtype: 'textfield',
      name: 'NUM_MEDIDOR',
      fieldLabel: "Medidor",
      allowBlank: false,
      blankText: "Digite o Medidor",
      filterOp: "="
    }
  ],
  gridColumns: [
    {header: 'MATRICULA', dataIndex: 'MATRICULA', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'CONTRATO', dataIndex: 'CONTRATO', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'NOM_CLIENTE', dataIndex: 'NOM_CLIENTE', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'SIT_LIG', dataIndex: 'SIT_LIG', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'NUM_MEDIDOR', dataIndex: 'NUM_MEDIDOR', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'CLASSIFICACAO', dataIndex: 'CLASSIFICACAO', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'NOM_LOGRADOURO', dataIndex: 'NOM_LOGRADOURO', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'NOM_BAIRRO', dataIndex: 'NOM_BAIRRO', menuDisabled: 'true', renderer: customURLFormatter},
    {header: 'CIDADE', dataIndex: 'CIDADE', menuDisabled: 'true', renderer: customURLFormatter},
  ],
  highlightFeature: true,
  symbolizersHighLightLayer: 'Point',
  highlightLayer: 'BaseCadastro',
  selectionLayer: 'BaseCadastro',
  selectionZoom: 0,
  doZoomToExtent: true
};

// Outra Busca
/*var urlRewriteSearch = {
  title: "Search letter",
  query: 'samplesearch',
  formItems: [
    {
      xtype: 'hidden',
      name: 'query',
      value: 'samplesearch'
    },
    {
      xtype: 'textfield',
      name: 'colour',
      fieldLabel: "Colour",
      allowBlank: false,
      blankText: "Please enter a colour (e.g. 'orange')"
    }
  ],
  gridColumns: [
    {header: 'PKUID', dataIndex: 'pkuid', menuDisabled: 'true'},
    {header: 'Colour', dataIndex: 'colour', menuDisabled: 'true'}
  ],
//  highlightFeature: true,
//  highlightLabel: 'colour',
  selectionLayer: 'Hello',
  selectionZoom: 1
};
*/
//Lista de Configurações para o QGIS.SearchPanel por nome de mapa temático
var mapSearchPanelConfigs = {
  "MapaBases": [simpleWmsSearch, urlRewriteSearch, buscaLogradouro, buscaBairro]
};

// Necessário para o projeto MapaBase se a reescrita não estiver ativa
mapSearchPanelConfigs[project_map] = [simpleWmsSearch, urlRewriteSearch, buscaLogradouro, buscaBairro];

// templates para definir dicas de ferramentas para uma camada, a serem mostrados na identificação de hover. Os campos de camada devem ser inseridos dentro de <%%> tags especiais.
// se um campo de camadas for encontrado com o nome "dica de ferramenta", seu conteúdo terá precedência sobre esta configuração 
var tooltipTemplates = {
	'NUM_LIGACAO':{
		template: "Look for the country on Google Search: <a href='http://www.google.it/#output=search&q=<%NUM_LIGACAO%>' target='_blank'><%NUM_LIGACAO%></a>"
	}
};


// Configuração de saída do Painel de pesquisa SearchPanel
// por padrão, os resultados da pesquisa serão mostrados no painel esquerdo, sob o
// formulário de pesquisa. Às vezes isso não é desejado, aqui você pode escolher
// mostra os resultados em um dos outros painéis, como BottomPanel e
// RightPanel. Esses painéis adicionais estão ocultos por padrão porque
// sua expansão e colapso desencadeiam um redimensionamento do mapa-> recarrega o ciclo que
// pode diminuir a veloCIDADE do aplicativo.
var mapSearchPanelOutputRegion = 'popup' ; //Valores possíveis: default,right,bottom,popup

// Interactive legend. This is based on PHP get_legend.php script.
// You can define here an alternate URL for this service
//var interactiveLegendGetLegendURL = '../php/get_legend.php?map=' + project_map + '&';


//define whether you want to display a map theme switcher
//note that you have to also link a GISProjectListing.js file containing a valid
//project listing structure - the root object is called 'gis_projects'
//have a look at the template file and documentation for the correct json structure
var mapThemeSwitcherActive = false;
//you can provide an alternative template for the theme-switcher - see also file ThemeSwitcher.js (ThemeSwitcher.prototype.initialize)
var themeSwitcherTemplate = null;

//Primeira parte do texto da barra de Título
var titleBarText = "GIS-Prolagos - "; // Será completado com o nome do mapa temático

// header logo image and link
var headerLogoImg = null; // path to image, set null for no logo
var headerLogoHeight = 60; // logo image height in pixels
var headerLogoLink = ""; // logo links to this URL
var headerTermsOfUseText = null; // set null for no link
var headerTermsOfUseLink = ""; // URL to terms of use

//language switcher in qgiswebclient.html
var enableLangSwitcher = false;

// optional project title per map name
var projectTitles = {
  "MapaBases": "Mapa Bases"
};

// Optional list of layers that should be displayed in a different image format,
// if the default image format is 8bit.
// The formats are applied in the order of the list, from highest to lowest priority.
/*
var layerImageFormats = [
  {
    format: "image/png",
    layers: ["Country"]
  },
  {
    format: "image/jpeg",
    layers: ["Shaded Relief"]
  }
];
*/

//EPSG projection code of your QGIS project
var authid = "EPSG:"+3857;

//background transparency for the QGIS Server generated layer (commercial background layers not effected)
//set to true if you want the background to be transparent, layer image will be bigger (32 vs 24bit)
var qgisLayerTransparency = true;

//number of zoomlevels, uses main map layer and all base layers
var ZOOM_LEVELS = 20;

// OpenLayers global options
// see http://dev.openlayers.org/releases/OpenLayers-2.10/doc/apidocs/files/OpenLayers/Map-js.html
var MapOptions = {
  projection: new OpenLayers.Projection(authid),
  units: "m",
//  maxScale:50,
//  minScale:40000000,
  numZoomLevels:ZOOM_LEVELS,
  fractionalZoom: !enableWmtsBaseLayers && !enableBGMaps,
  transitionEffect:"resize",
  controls: []
};

// Options for the main map layer (OpenLayers.layer)
//see http://dev.openlayers.org/releases/OpenLayers-2.12/doc/apidocs/files/OpenLayers/Layer-js.html
var LayerOptions = {
  buffer:0,
  singleTile:true,
  ratio:1,
  transitionEffect:"resize",
  isBaseLayer: false,
  projection:authid,
  yx: {"EPSG:900913": false},
  // If your projection is known to have an inverse axis order in WMS 1.3 compared to WMS 1.1 enter true for yx.
  // For EPSG:900913 OpenLayers should know it by default but because of a bug in OL 2.12 we enter it here.
  tileOptions: {
    // use POST for long URLs
    maxGetUrlLength: 2048
  }
};

//overview map settings - do not change variable names!
var OverviewMapOptions = {
  projection: new OpenLayers.Projection(authid),
  units: "m",
  maxScale:50,
  minScale:300000000,
  transitionEffect:"resize"
};
var OverviewMapSize = new OpenLayers.Size(200,200);
var OverviewMapMaximized = false; // is the overview map opend or closed by default
var overviewLayer = null;
if (enableOSMMaps) {
  overviewLayer = new OpenLayers.Layer.OSM();
}
else {
  overviewLayer = new OpenLayers.Layer.WMS("Overview-Map",
  serverAndCGI+"?map=/home/web/qgis-web-client/projects/naturalearth_110million.qgs",
  {layers:"Land",format:"image/png"},
  {buffer:0,singleTile:true,transitionEffect:"resize"});
}

// prevent the user from choosing a print resolution
// if fixedPrintResolution = null, the user is allowed to choose the print resolution. 
var fixedPrintResolution = null; // for a fixed resolution of 200dpi fill 200

//print options - scales and dpi
var printCapabilities={
  "scales":[
    {"name":"1:100","value":"100"},
    {"name":"1:200","value":"200"},
    {"name":"1:250","value":"250"},
    {"name":"1:500","value":"500"},
    {"name":"1:750","value":"750"},
    {"name":"1:1'000","value":"1000"},
    {"name":"1:1'500","value":"1500"},
    {"name":"1:2'000","value":"2000"},
    {"name":"1:2'500","value":"2500"},
    {"name":"1:3'000","value":"3000"},
    {"name":"1:4'000","value":"4000"},
    {"name":"1:5'000","value":"5000"},
    {"name":"1:7'500","value":"7500"},
    {"name":"1:10'000","value":"10000"},
    {"name":"1:12'000","value":"12000"},
    {"name":"1:15'000","value":"15000"},
    {"name":"1:20'000","value":"20000"},
    {"name":"1:25'000","value":"25000"},
    {"name":"1:30'000","value":"30000"},
    {"name":"1:35'000","value":"35000"},
    {"name":"1:40'000","value":"40000"},
    {"name":"1:45'000","value":"45000"},
    {"name":"1:50'000","value":"50000"},
    {"name":"1:75'000","value":"75000"},
    {"name":"1:100'000","value":"100000"},
    {"name":"1:250'000","value":"250000"},
    {"name":"1:500'000","value":"500000"},
    {"name":"1:750'000","value":"750000"},
    {"name":"1:1'000'000","value":"1000000"},
    {"name":"1:2'500'000","value":"2500000"},
    {"name":"1:5'000'000","value":"5000000"},
    {"name":"1:7'500'000","value":"7500000"},
    {"name":"1:10'000'000","value":"10000000"},
    {"name":"1:15'000'000","value":"15000000"},
    {"name":"1:20'000'000","value":"20000000"},
    {"name":"1:25'000'000","value":"25000000"},
    {"name":"1:30'000'000","value":"30000000"},
    {"name":"1:35'000'000","value":"35000000"},
    {"name":"1:50'000'000","value":"50000000"},
    {"name":"1:60'000'000","value":"60000000"},
    {"name":"1:75'000'000","value":"75000000"},
    {"name":"1:100'000'000","value":"100000000"},
    {"name":"1:125'000'000","value":"125000000"},
    {"name":"1:150'000'000","value":"150000000"}
  ],
  "dpis":[
    {"name":"150 dpi","value":"150"},
    {"name":"300 dpi","value":"300"},
    {"name":"600 dpi","value":"600"},
    {"name":"1200 dpi","value":"1200"}
  ],
  "layouts":[]
};

//export options - scales and dpi
var exportCapabilities={
  "scales":[
    {"name":"1:100","value":"100"},
    {"name":"1:200","value":"200"},
    {"name":"1:250","value":"250"},
    {"name":"1:500","value":"500"},
    {"name":"1:750","value":"750"},
    {"name":"1:1'000","value":"1000"},
    {"name":"1:1'500","value":"1500"},
    {"name":"1:2'000","value":"2000"},
    {"name":"1:2'500","value":"2500"},
    {"name":"1:3'000","value":"3000"},
    {"name":"1:4'000","value":"4000"},
    {"name":"1:5'000","value":"5000"},
    {"name":"1:7'500","value":"7500"},
    {"name":"1:10'000","value":"10000"},
    {"name":"1:12'000","value":"12000"},
    {"name":"1:15'000","value":"15000"},
    {"name":"1:20'000","value":"20000"},
    {"name":"1:25'000","value":"25000"},
    {"name":"1:30'000","value":"30000"},
    {"name":"1:35'000","value":"35000"},
    {"name":"1:40'000","value":"40000"},
    {"name":"1:45'000","value":"45000"},
    {"name":"1:50'000","value":"50000"},
    {"name":"1:75'000","value":"75000"},
    {"name":"1:100'000","value":"100000"},
    {"name":"1:250'000","value":"250000"},
    {"name":"1:500'000","value":"500000"},
    {"name":"1:750'000","value":"750000"},
    {"name":"1:1'000'000","value":"1000000"},
    {"name":"1:2'500'000","value":"2500000"},
    {"name":"1:5'000'000","value":"5000000"},
    {"name":"1:7'500'000","value":"7500000"},
    {"name":"1:10'000'000","value":"10000000"},
    {"name":"1:15'000'000","value":"15000000"},
    {"name":"1:20'000'000","value":"20000000"},
    {"name":"1:25'000'000","value":"25000000"},
    {"name":"1:30'000'000","value":"30000000"},
    {"name":"1:35'000'000","value":"35000000"},
    {"name":"1:50'000'000","value":"50000000"},
    {"name":"1:60'000'000","value":"60000000"},
    {"name":"1:75'000'000","value":"75000000"},
    {"name":"1:100'000'000","value":"100000000"},
    {"name":"1:125'000'000","value":"125000000"},
    {"name":"1:150'000'000","value":"150000000"}
  ],
  "dpis":[
    {"name":"96 dpi","value":"96"},
    {"name":"150 dpi","value":"150"},
    {"name":"300 dpi","value":"300"},
    {"name":"600 dpi","value":"600"}
  ],
  "layouts":[],
  "formats":[
    {"name":"JPEG","value":"jpg"},
    {"name":"PNG","value":"png"}
  ]
};

// <------------ Nenhuma mudança deve ser necessária daqui para baixo ------------------>

//new namespace for QGIS extensions
//do not modify those three lines
if (!window.QGIS) {
  window.QGIS = {};
}
//search
// definindo estilo para highlightLayer
// é usado para recursos hightlighting (GetFeatureInfo e visualização de resultados de pesquisa)
// veja http://http://dev.openlayers.org/releases/OpenLayers-2.13.1/apidocs/files/OpenLayers/Style-js.html
// Simbolizador do realçador de camada
var symbolizersHighLightLayer = {
  "Point": {
    pointRadius: 8,
    graphicName: "circle",
    fillColor: "#FF8C00",
    fillOpacity: 0.3,
    strokeWidth: 1,
    strokeColor: "#FF8C00"
  },
  "Line": {
    strokeWidth: 3,
    strokeOpacity: 1,
    strokeColor: "#FF8C00",
    strokeDashstyle: "dash"
  },
  "Polygon": {
    strokeWidth: 2,
    strokeColor: "#FF8C00",
    fillColor: "none",
    fillOpacity: 0
  }
};

// estilo para destacar os rótulos dos resultados da pesquisa
// tamanho da fonte de 0 a 99 (Light: 25, Normal: 50, DemiBold: 63, Bold: 75, Black: 87)
var highlightLabelStyle = {
//  font: "Serif",
  size: 12,
//  weight: 75,
  color: "#000000",
  buffercolor: "#FFFFFF",
  buffersize: 1
};

//Estilo para controles de medida (distância e área)
var sketchSymbolizersMeasureControls = {
  "Point": {
    pointRadius: 4,
    graphicName: "square",
    fillColor: "#FFFFFF",
    fillOpacity: 1,
    strokeWidth: 1,
    strokeOpacity: 1,
    strokeColor: "#FF0000"
  },
  "Line": {
    strokeWidth: 3,
    strokeOpacity: 1,
    strokeColor: "#FF0000",
    strokeDashstyle: "dash"
  },
  "Polygon": {
    strokeWidth: 2,
    strokeOpacity: 1,
    strokeColor: "#FF0000",
    fillColor: "#FFFFFF",
    fillOpacity: 0.3
  }
};
