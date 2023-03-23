/// 创建默认为当前位置 的地图展示
/// centerPoint 中心位置 默认 - 个人位置 
function overriveMap(centerPoint, defaultPoints, newPoints) {
    const map = new maptalks.Map("map", {
        center: centerPoint == null ? [-0.113049, 51.498568] : centerPoint,
        zoom: 15, pitch: 35,
        baseLayer: new maptalks.TileLayer("base", {
            urlTemplate:
                "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
            subdomains: ["a", "b", "c", "d"],
            attribution:
                '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>',
        }),
    });
    var layer = new maptalks.VectorLayer("vector").addTo(map);

    navigator.geolocation.getCurrentPosition(
        function (result) {
            const tempL = (centerPoint == null) ? [result.coords.longitude, result.coords.latitude] : centerPoint;
            const temprectDefualt = [
                [tempL[0] - 0.0049, tempL[1] - 0.0049],
                [tempL[0] + 0.0049, tempL[1] - 0.0049],
                [tempL[0] + 0.0049, tempL[1] + 0.0049],
                [tempL[0] - 0.0049, tempL[1] + 0.0049],
                [tempL[0] - 0.0049, tempL[1] - 0.0049],
            ];
            map.setCenter(tempL);
            getMakerLoction(tempL, layer);
            var polay = addCustomRect(defaultPoints.length == 0 ? temprectDefualt : [], layer);
            setTimeout(function () {
                map.animateTo({
                    center: tempL,
                    zoom: 15,
                    pitch: 0,
                    bearing: 360
                }, {
                    duration: 5000
                });
            }, 1000);
            addToolBar(map, (index) => {
                switch (index) {
                    case 0: {
                        polay.startEdit();
                        break;
                    }
                    case 1: {
                        polay.endEdit();
                        newPoints(polay.getCoordinates())
                        break;
                    }
                    case 2: {
                        polay.setCoordinates(temprectDefualt);
                        break;
                    }
                    default: break;
                }
            });
        },
        function (err) {
            alert(err.message);
        }
    );
    return map;
}



// 设置位置标注
function getMakerLoction(objLoction, layer) {
    new maptalks.Marker(
        objLoction, {
        'properties': {
            'name': '当前位置'
        },
        'symbol': [
            {
                'markerFile': 'dpo_curr_location.png',
                'markerWidth': 30,
                'markerHeight': 30,
                'markerDx': 0,
                'markerDy': 0,
                'markerOpacity': 1
            },
            {
                'textFaceName': 'sans-serif',
                'textName': '{name}',
                'textSize': 11,
                'textDy': 18
            }
        ]
    }).addTo(layer);
}


/// 添加一个默认的地理区域(面)
function addCustomRect(coordinates, layer) {
    return new maptalks.Polygon([
        coordinates,
    ], {
        visible: true,
        editable: true,
        cursor: 'pointer',
        draggable: false,
        dragShadow: false, // display a shadow during dragging
        drawOnAxis: null,  // force dragging stick on a axis, can be: x, y
        symbol: {
            'lineColor': '#34495e',
            'lineWidth': 2,
            'polygonFill': 'rgb(135,196,240)',
            'polygonOpacity': 0.6
        }
    }).addTo(layer);
}

// 设置功能菜单
function addToolBar(map, onTap) {
    new maptalks.control.Toolbar({
        'position': 'top-right',
        'items': [{
            item: '开始标注',
            click: function () { onTap(0); }
        }, {
            item: '结束标注',
            click: function () { onTap(1); }
        }, {
            item: '重置标注',
            click: function () { onTap(2); }
        }]
    }).addTo(map);
}