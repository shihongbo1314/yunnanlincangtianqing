import rbush from 'rbush' //https://www.5axxw.com/wiki/content/7wjc4t
/**
 * @typedef {Object} MarkerData marker的rubsh数据
 * @property {Number} MarkerData.minX  marker的经度
 * @property {Number} MarkerData.minY  marker的纬度
 * @property {Number} MarkerData.maxX  marker的经度
 * @property {Number} MarkerData.maxY  marker的纬度
 * @property {L.Marker} MarkerData.data  marker对象
 * @example
 * let latlng=marker.getLatlng();
 * let markerData={
 *      minX:latlng.lng,
 *      minY:latlng.lat,
 *      maxX:latlng.lng,
 *      maxY:latlng.lat,
 *      data:marker
 * }
 */

/**
 * @typedef {Object} MarkerBoundsData marker的像素边界rubsh数据
 * @property {Number} MarkerBoundsData.minX  marker的左上角x轴像素坐标
 * @property {Number} MarkerBoundsData.minY  marker的左上角y轴像素坐标
 * @property {Number} MarkerBoundsData.maxX  marker的右下角x轴像素坐标
 * @property {Number} MarkerBoundsData.maxY  marker的右下角y轴像素坐标
 * @property {L.Marker} MarkerBoundsData.data  marker对象
 * @example
 * let options = marker.options.icon.options;
 * let minX, minY, maxX, maxY;
 * minX = pointPos.x - options.iconAnchor[0];
 * maxX = minX + options.iconSize[0];
 * minY = pointPos.y - options.iconAnchor[1];
 * maxY = minY + options.iconSize[1];
 *
 * let markerBounds = {
 *     minX,
 *     minY,
 *     maxX,
 *     maxY
 * };
 */

/**
 * 用于在画布而不是DOM上显示标记的leaflet插件。使用单页1.0.0及更高版本。
 */
export var CanvasMarkerLayer = L.CanvasMarkerLayer = L.Layer.extend({
    options: {
        zIndex: null, //图层dom元素的堆叠顺序
        collisionFlg: false //碰撞检测
    },
    //Add event listeners to initialized section.
    initialize: function (options) {
        L.setOptions(this, options);
        this._onClickListeners = [];
        this._onHoverListeners = [];
        this._onMouseDownListeners = [];
        this._onMouseUpListeners = [];

        /**
         * 所有marker的集合
         * @type {rbush<MarkerData>}
         */
        this._markers = new rbush();
        this._markers.dirty = 0; //单个插入/删除
        this._markers.total = 0; //总数

        /**
         * 在地图当前范围内的marker的集合
         * @type {rbush<MarkerData>}
         */
        this._containMarkers = new rbush();

        /**
         * 当前显示在地图上的marker的集合
         * @type {rbush<MarkerData>}
         */
        this._showMarkers = new rbush();

        /**
         * 当前显示在地图上的marker的范围集合
         * @type {rbush<MarkerBoundsData>}
         */
        this._showMarkerBounds = new rbush();
    },

    setOptions: function (options) {
        L.setOptions(this, options);

        return this.redraw();
    },

    /**
     * 重绘
     */
    redraw: function () {
        return this._redraw(true);
    },

    /**
     * 获取事件对象
     * 
     * 表示给map添加的监听器
     * @return {Object} 监听器/函数键值对
     */
    getEvents: function () {
        var events = {
            viewreset: this._reset,
            zoom: this._onZoom,
            moveend: this._reset,
            click: this._executeListeners,
            mousemove: this._executeListeners,
            mousedown: this._executeListeners,
            mouseup: this._executeListeners,
        };
        if (this._zoomAnimated) {
            events.zoomanim = this._onAnimZoom;
        }
        return events;
    },

    /**
     * 添加标注
     * @param {L/Marker} layer 标注
     * @return {Object} this
     */
    addLayer: function (layer, redraw = true) {
        if (!((layer.options.pane == 'markerPane') && layer.options.icon)) {
            console.error('Layer isn\'t a marker');
            return;
        }

        layer._map = this._map;
        var latlng = layer.getLatLng();

        this._markers.insert({
            minX: latlng.lng,
            minY: latlng.lat,
            maxX: latlng.lng,
            maxY: latlng.lat,
            data: layer
        });

        this._markers.dirty++;
        this._markers.total++;

        var isDisplaying = this._map.getBounds().contains(latlng);
        if (redraw == true && isDisplaying) {
            this._redraw(true);
        }
        return this;
    },

    /**
     * 添加标注数组,在一次性添加许多标注时使用此函数会比循环调用marker函数效率更高
     * @param {Array.<L/Marker>} layers 标注数组
     * @return {Object} this
     */
    addLayers: function (layers, redraw = true) {
        layers.forEach((layer) => {
            this.addLayer(layer, false);
        });
        if (redraw) {
            this._redraw(true);
        }
        return this;
    },

    /**
     * 删除标注
     * @param {*} layer 标注
     * @param {boolean=true} redraw 是否重新绘制(默认为true),如果要批量删除可以设置为false,然后手动更新
     * @return {Object} this
     */
    removeLayer: function (layer, redraw = true) {
        var self = this;

        //If we are removed point
        if (layer["minX"]) layer = layer.data;

        var latlng = layer.getLatLng();
        var isDisplaying = self._map.getBounds().contains(latlng);

        var markerData = {
            minX: latlng.lng,
            minY: latlng.lat,
            maxX: latlng.lng,
            maxY: latlng.lat,
            data: layer
        };

        self._markers.remove(markerData, function (a, b) {
            return a.data._leaflet_id === b.data._leaflet_id;
        });

        self._markers.total--;
        self._markers.dirty++;

        if (isDisplaying === true && redraw === true) {
            self._redraw(true);
        }
        return this;
    },

    /**
     * 清除所有
     */
    clearLayers: function () {
        this._markers = new rbush();
        this._markers.dirty = 0; //单个插入/删除
        this._markers.total = 0; //总数
        this._containMarkers = new rbush();
        this._showMarkers = new rbush();
        this._showMarkerBounds = new rbush();

        this._redraw(true);
    },

    /**
     * 继承L.Layer必须实现的方法
     * 
     * 图层Dom节点创建添加到地图容器
     */
    onAdd: function (map) {

        this._map = map;

        if (!this._container) this._initCanvas();

        if (this.options.pane) this.getPane().appendChild(this._container);
        else map._panes.overlayPane.appendChild(this._container);

        this._update();
    },

    /**
     * 继承L.Layer必须实现的方法
     * 
     * 图层Dom节点销毁
     */
    onRemove: function (map) {

        if (this.options.pane) this.getPane().removeChild(this._container);
        else map.getPanes().overlayPane.removeChild(this._container);
    },

    /**
     * 绘制图标
     * @param {L/Marker} marker 图标
     * @param {L/Point} pointPos 图标中心点在屏幕上的像素位置
     */
    _drawMarker: function (marker, pointPos) {
        var self = this;
        //创建图标缓存
        if (!this._imageLookup) this._imageLookup = {};

        //没有传入像素位置,则计算marker自身的位置
        if (!pointPos) {
            pointPos = self._map.latLngToContainerPoint(marker.getLatLng());
        }
    
        let options = marker.options.icon.options;
        let minX, minY, maxX, maxY;
        minX = pointPos.x - options.iconAnchor[0];
        maxX = minX + options.iconSize[0];
        minY = pointPos.y - options.iconAnchor[1];
        maxY = minY + options.iconSize[1];

        let markerBounds = {
            minX,
            minY,
            maxX,
            maxY
        };

        if (this.options.collisionFlg == true && this._showMarkerBounds.collides(markerBounds)) {
            return;
        }
        this._showMarkerBounds.insert(markerBounds);
        let latlng = marker.getLatLng();
        this._showMarkers.insert({
            minX,
            minY,
            maxX,
            maxY,
            lng: latlng.lng,
            lat: latlng.lat,
            data: marker
        });

        //绘制文字
        self._drawText(marker, pointPos);

        //图标图片地址
        var iconUrl = marker.options.icon.options.iconUrl;

        if(iconUrl){
            //已经有canvas_img对象,表示之前已经绘制过,直接使用,提高渲染效率
            if (marker.canvas_img) {
            //    self._drawImage(marker, pointPos);
                self._drawWindImage(marker, pointPos);
            } else {
                //图标已经在缓存中
                if (self._imageLookup[iconUrl]) {
                    marker.canvas_img = self._imageLookup[iconUrl][0];

                    //图片还未加载,把marker添加到预加载列表中
                    if (self._imageLookup[iconUrl][1] === false) {
                        self._imageLookup[iconUrl][2].push([marker, pointPos]);
                    } else { //图片已经加载,则直接绘制
                    //    self._drawImage(marker, pointPos);
                        self._drawWindImage(marker, pointPos);
                    }
                } else { //新的图片
                    //创建图片对象
                    var i = new Image();
                    i.src = iconUrl;
                    marker.canvas_img = i;

                    //Image:图片,isLoaded:是否已经加载,[[marker,pointPos]]:预加载列表
                    self._imageLookup[iconUrl] = [i, false, [
                        [marker, pointPos]
                    ]];

                    //图片加载完毕,循环预加列表,绘制图标
                    i.onload = function () {
                        self._imageLookup[iconUrl][1] = true;
                        self._imageLookup[iconUrl][2].forEach(function (e) {
                        //    self._drawImage(e[0], e[1]);
                            self._drawWindImage(e[0], e[1]);
                        });
                    }
                }
            }
        }
    },

    /**
     * 绘制图标
     * @param {L/Marker} marker 图标
     * @param {L/Point} pointPos 图标中心点在屏幕上的像素位置
     */
    _drawImage: function (marker, pointPos) {
        var options = marker.options.icon.options;
        this._ctx.drawImage(
            marker.canvas_img,
            pointPos.x - options.iconAnchor[0],
            pointPos.y - options.iconAnchor[1],
            options.iconSize[0],
            options.iconSize[1]
        );
    },

    // 绘制旋转的风向图标
    _drawWindImage: function (marker, pointPos){
        // 图片宽：20，高：34
        var options = marker.options.icon.options;
        this._ctx.translate(options.iconAnchor[0] + pointPos.x, options.iconAnchor[1] + pointPos.y);
        this._ctx.rotate(options.windObj.rotate * Math.PI / 180);
        this._ctx.drawImage(marker.canvas_img, -10,-17,options.iconSize[0],options.iconSize[1]);
        this._ctx.rotate(-options.windObj.rotate * Math.PI / 180);
        this._ctx.translate(-(options.iconAnchor[0] + pointPos.x), -(options.iconAnchor[1] + pointPos.y))
    },

    //绘制文字
    _drawText: function(marker, pointPos) {
        var options = marker.options.icon.options;
        this._ctx.font = "14px Arial";
        this._ctx.fillStyle = "black";
        this._ctx.textBaseline = "middle";
        let i = 0
        if(options.name){                
            this._ctx.fillText(options.name,pointPos.x,pointPos.y);
            i++
        }
        if(options.dataArray.length!=0){
            options.dataArray.forEach(item=>{
                this._ctx.fillText(item,pointPos.x,pointPos.y+(i*20));
                i++
            })                
        }
    },

    /**
     * 重置画布(大小,位置,内容)
     */
    _reset: function () {
        var topLeft = this._map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(this._container, topLeft);
        var size = this._map.getSize();
        this._container.width = size.x;
        this._container.height = size.y;
        this._update();
    },

    /**
     * 重绘画布
     * @param {boolean} clear 是否清空
     */
    _redraw: function (clear) {
        this._showMarkerBounds = new rbush();
        this._showMarkers = new rbush();
        var self = this;
        //清空画布
        if (clear) this._ctx.clearRect(0, 0, this._container.width, this._container.height);
        if (!this._map || !this._markers) return;

        var tmp = [];

        //如果单个插入/删除的数量超过总数的10%,则重建查找以提高效率
        if (self._markers.dirty / self._markers.total >= .1) {
            self._markers.all().forEach(function (e) {
                tmp.push(e);
            });

            self._markers.clear();
            self._markers.load(tmp);
            self._markers.dirty = 0;
            tmp = [];
        }

        //地图地理坐标边界
        var mapBounds = self._map.getBounds();

        //适用于runsh的边界对象
        var mapBoxCoords = {
            minX: mapBounds.getWest(),
            minY: mapBounds.getSouth(),
            maxX: mapBounds.getEast(),
            maxY: mapBounds.getNorth(),
        };

        //查询范围内的图标
        self._markers.search(mapBoxCoords).forEach(function (e) {
            //图标屏幕坐标
            var pointPos = self._map.latLngToContainerPoint(e.data.getLatLng());
            var iconSize = e.data.options.icon.options.iconSize;
            var adj_x = iconSize[0] / 2;
            var adj_y = iconSize[1] / 2;

            var newCoords = {
                minX: (pointPos.x - adj_x),
                minY: (pointPos.y - adj_y),
                maxX: (pointPos.x + adj_x),
                maxY: (pointPos.y + adj_y),
                data: e.data
            }

            tmp.push(newCoords);
        });

        //需要做碰撞检测则降序排序,zIndex值大的优先绘制;不需要碰撞检测则升序排序，zIndex值的的后绘制
        tmp.sort((layer1, layer2) => {
            let zIndex1 = layer1.data.options.zIndex ? layer1.data.options.zIndex : 1;
            let zIndex2 = layer2.data.options.zIndex ? layer2.data.options.zIndex : 1;
            return (-zIndex1 + zIndex2) * (this.options.collisionFlg ? 1 : -1);
        }).forEach((layer) => {
            //图标屏幕坐标
            var pointPos = self._map.latLngToContainerPoint(layer.data.getLatLng());
            self._drawMarker(layer.data, pointPos);
        });
        //Clear rBush & Bulk Load for performance
        this._containMarkers.clear();
        this._containMarkers.load(tmp);
        return this;
    },

    /**
     * 初始化容器
     */
    _initCanvas: function () {
        this._container = L.DomUtil.create('canvas', 'leaflet-canvas-icon-layer leaflet-layer');
        if (this.options.zIndex) {
            this._container.style.zIndex = this.options.zIndex;
        }

        var size = this._map.getSize();
        this._container.width = size.x;
        this._container.height = size.y;

        this._ctx = this._container.getContext('2d');

        var animated = this._map.options.zoomAnimation && L.Browser.any3d;
        L.DomUtil.addClass(this._container, 'leaflet-zoom-' + (animated ? 'animated' : 'hide'));
    },

    /**
     * 添加click侦听器
     */
    addOnClickListener: function (listener) {
        this._onClickListeners.push(listener);
    },

    /**
     * 添加hover侦听器
     */
    addOnHoverListener: function (listener) {
        this._onHoverListeners.push(listener);
    },

    /**
     * 添加mousedown侦听器
     */
    addOnMouseDownListener: function (listener) {
        this._onMouseDownListeners.push(listener);
    },

    /**
     * 添加mouseup侦听器
     */
    addOnMouseUpListener: function (listener) {
        this._onMouseUpListeners.push(listener);
    },

    /**
     * 执行侦听器
     */
    _executeListeners: function (event) {
        if (!this._showMarkers) return;
        var me = this;
        var x = event.containerPoint.x;
        var y = event.containerPoint.y;

        if (me._openToolTip) {
            me._openToolTip.closeTooltip();
            delete me._openToolTip;
        }

        var ret = this._showMarkers.search({
            minX: x,
            minY: y,
            maxX: x,
            maxY: y
        });

        if (ret && ret.length > 0) {
            me._map._container.style.cursor = "pointer";
            if (event.type === "click") {
                var hasPopup = ret[0].data.getPopup();
                if (hasPopup) ret[0].data.openPopup();

                me._onClickListeners.forEach(function (listener) {
                    listener(event, ret);
                });
            }
            if (event.type === "mousemove") {
                var hasTooltip = ret[0].data.getTooltip();
                if (hasTooltip) {
                    me._openToolTip = ret[0].data;
                    ret[0].data.openTooltip();
                }

                me._onHoverListeners.forEach(function (listener) {
                    listener(event, ret);
                });
            }
            if (event.type === "mousedown") {
                me._onMouseDownListeners.forEach(function (listener) {
                    listener(event, ret);
                });
            }

            if (event.type === "mouseup") {
                me._onMouseUpListeners.forEach(function (listener) {
                    listener(event, ret);
                });
            }

        } else {
            me._map._container.style.cursor = "";
        }
    },

    /**
     * 地图Zoomanim事件监听器函数
     * @param {Object} env {center:L.LatLng,zoom:number}格式的对象
     */
    _onAnimZoom(ev) {
        this._updateTransform(ev.center, ev.zoom);
    },

    /**
     * 地图修改zoom事件监听器函数
     */
    _onZoom: function () {
        this._updateTransform(this._map.getCenter(), this._map.getZoom());
    },

    /**
     * 修改dom原始的transform或position
     * @param {L/LatLng} center 中心点
     * @param {number} zoom 地图缩放级别
     */
    _updateTransform: function (center, zoom) {
        var scale = this._map.getZoomScale(zoom, this._zoom),
            position = L.DomUtil.getPosition(this._container),
            viewHalf = this._map.getSize().multiplyBy(0.5),
            currentCenterPoint = this._map.project(this._center, zoom),
            destCenterPoint = this._map.project(center, zoom),
            centerOffset = destCenterPoint.subtract(currentCenterPoint),

            topLeftOffset = viewHalf.multiplyBy(-scale).add(position).add(viewHalf).subtract(centerOffset);

        if (L.Browser.any3d) {
            L.DomUtil.setTransform(this._container, topLeftOffset, scale);
        } else {
            L.DomUtil.setPosition(this._container, topLeftOffset);
        }
    },

    /**
     * 更新渲染器容器的像素边界（用于以后的定位/大小/剪裁）子类负责触发“update”事件。
     */
    _update: function () {
        var p = 0,
            size = this._map.getSize(),
            min = this._map.containerPointToLayerPoint(size.multiplyBy(-p)).round();

        this._bounds = new L.Bounds(min, min.add(size.multiplyBy(1 + p * 2)).round());

        this._center = this._map.getCenter();
        this._zoom = this._map.getZoom();

        this._redraw(true);
    }
});

export var canvasMarkerLayer = L.canvasMarkerLayer = function (options) {
    return new L.CanvasMarkerLayer(options);
};
