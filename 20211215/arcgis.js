
(function () {
    "use strict";
    // API キー
    const api_key = 'AAPKa9ce1bd39e8e48a3a074e743980a223feJgvCSS9FxNLCnooswxULQuor56rBeQRUEaNZlWjDLOBeyi6u9nvvPABmXZttT2m';

    // 一覧画面を開いた時に実行します
    kintone.events.on('app.record.index.show', function(event) {

         // 一覧の上部部分にあるスペース部分を定義します       
        let elAction = kintone.app.getHeaderSpaceElement();

        // すでに地図要素が存在する場合は、削除します
        // ※ ページ切り替えや一覧のソート順を変更した時などが該当します
        let mapCheck = document.getElementsByName('viewDiv');
        if (mapCheck.length !== 0) {
            elAction.removeChild(mapCheck[0]);
        }

        // 地図を表示する div 要素を作成します
        let viewDiv = document.createElement('div');
        viewDiv.setAttribute('id', 'viewDiv');
        viewDiv.setAttribute('name', 'viewDiv');
        viewDiv.setAttribute('style', 'width: auto; height: 350px; margin-right: 30px; border: solid 2px #c4b097');
        elAction.appendChild(viewDiv);

        // レコード情報を取得します
        let records = event['records'];
        //console.log(records);

        require([
            "esri/config",
            "esri/Map",
            "esri/views/MapView",
            "esri/Basemap",
            "esri/layers/VectorTileLayer",
            "esri/layers/TileLayer",
            "esri/layers/FeatureLayer",
            "esri/Graphic",
            "esri/layers/GraphicsLayer",
            "esri/widgets/Legend",
            "esri/widgets/LayerList",
            ], function (esriConfig, Map, MapView, Basemap, VectorTileLayer, TileLayer, FeatureLayer, Graphic, GraphicsLayer, Legend, LayerList) {

            esriConfig.apiKey = api_key;

            const vectorTileLayer = new VectorTileLayer({
                portalItem: {
                    id: "97b0ea1cc8ca41028420dd4067873c53" // 地形図 (Japanese)
                    //  0f52cd2d17ea4773944a1d0e0fb99ea4
                },
                opacity: .75
            });

            const imageTileLayer = new TileLayer({
                portalItem: {
                    id: "1b243539f4514b6ba35e7d995890db1d" // World Hillshade
                }
            });

            const basemap = new Basemap({
                baseLayers: [
                    imageTileLayer,
                    vectorTileLayer
                ]
            });

            const map = new Map({
                basemap: basemap,
            });

            const view = new MapView({
                map: map,
                center: [139.69167, 35.68944],
                zoom: 10, // scale: 72223.819286
                container: "viewDiv",
                constraints: {
                    snapToZoom: false
                }
            });

            view.when(() => {
                const layerList = new LayerList({
                    view: view
                });
                // Add widget to the top right corner of the view
                view.ui.add(layerList, "top-right");
            });

            const featureLayer = new FeatureLayer({
                title: "全国市区町村界データ",
                url: "https://services5.arcgis.com/HzGpeRqGvs5TMkVr/arcgis/rest/services/japan_ver83/FeatureServer"
            });
            map.add(featureLayer);

            const legend = new Legend({
                view: view,
                layerInfos: [
                    {
                        layer: featureLayer
                    }
                ]
            });
            // Add widget to the bottom right corner of the view
            view.ui.add(legend, "bottom-left");

            let graphicsLayer = new GraphicsLayer({
                title: "顧客一覧"
            });

            let simpleMarkerSymbol = {
                type: "simple-marker",
                color: [226, 119, 40],  // Orange
                outline: {
                    color: [255, 255, 255], // White
                    width: 1
                }
            };

            for (const record of records) {
                
                let lat = record['緯度']['value'];
                let lon = record['経度']['value'];

                let name = record['氏名']['value'];
                let postcode = record['郵便番号']['value'];
                let address = record['住所']['value'];
                let tel = record['電話番号']['value'];
                let age = record['年齢']['value'];

                let customerAtt = {
                    Name: name,
                    Address: "〒" + postcode + "：" + address,
                    Tel: tel,
                    Age: age
                };

                //Create a point
                let point = { 
                    type: "point",
                    longitude: lon,
                    latitude: lat
                };

                let pointGraphic = new Graphic({
                    geometry: point,
                    symbol: simpleMarkerSymbol,
                    attributes: customerAtt,
                    popupTemplate : {
                        title: "顧客情報",
                        content: [
                            {
                                type: "fields",
                                fieldInfos: [
                                    {
                                        fieldName: "Name",
                                        label: "名前"
                                    },
                                    {
                                        fieldName: "Address",
                                        label: "住所"
                                    },
                                    {
                                        fieldName: "Tel",
                                        label: "電話番号"
                                    },
                                    {
                                        fieldName: "Age",
                                        label: "年齢"
                                    }
                                ]
                            }
                        ]
                    }
                });

                graphicsLayer.graphics.add(pointGraphic);
                //console.log(record['緯度']['value']);
                //console.log(record['経度']['value']);
            }

            map.add(graphicsLayer);
        });

    });
    
    kintone.events.on('app.record.detail.show', function(event) {
        window.alert('レコード表示イベント');
    });
    
})();
