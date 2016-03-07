define(function (require) {


    var axisDefault = require('../axisDefault');
    var valueAxisDefault = axisDefault.valueAxis;
    var Model = require('../../model/Model');
    var zrUtil = require('zrender/core/util');

    var axisModelCommonMixin = require('../axisModelCommonMixin');

    function defaultsShow(opt, show) {
        return zrUtil.defaults({
            show: show
        }, opt);
    }

    var RadarModel = require('../../echarts').extendComponentModel({

        type: 'radar',

        optionUpdated: function () {
            var boundaryGap = this.get('boundaryGap');
            var splitNumber = this.get('splitNumber');
            var scale = this.get('scale');
            var axisLine = this.get('axisLine');
            var axisTick = this.get('axisTick');
            var axisLabel = this.get('axisLabel');
            var nameTextStyle = this.get('name.textStyle');
            var showName = this.get('name.show');
            var indicatorModels = zrUtil.map(this.get('indicator') || [], function (indicatorOpt) {
                // Use same configuration
                indicatorOpt = zrUtil.extend({
                    boundaryGap: boundaryGap,
                    splitNumber: splitNumber,
                    scale: scale,
                    axisLine: axisLine,
                    axisTick: axisTick,
                    axisLabel: axisLabel,
                    // Competitable with 2 and use text
                    name: indicatorOpt.text,
                    nameLocation: 'end',
                    nameGap: 15,
                    nameTextStyle: nameTextStyle,
                    // Default to set min 0
                    min: 0
                }, indicatorOpt);
                if (!showName) {
                    indicatorOpt.name = '';
                }
                return zrUtil.extend(
                    new Model(indicatorOpt),
                    axisModelCommonMixin
                );
            });
            this.getIndicatorModels = function () {
                return indicatorModels;
            };
        },

        defaultOption: {

            zlevel: 0,

            z: 0,

            center: ['50%', '50%'],

            radius: '75%',

            startAngle: 90,

            name: {
                show: true
                // formatter: null
                // textStyle: {}
            },

            boundaryGap: [0, 0],

            splitNumber: 5,

            nameGap: 15,

            scale: false,

            // Polygon or circle
            shape: 'polygon',

            axisLine: valueAxisDefault.axisLine,
            axisLabel: defaultsShow(valueAxisDefault.axisLabel, false),
            axisTick: defaultsShow(valueAxisDefault.axisTick, false),
            splitLine: defaultsShow(valueAxisDefault.splitLine, true),
            splitArea: defaultsShow(valueAxisDefault.splitArea, true),

            // {text, min, max}
            indicator: []
        }
    });

    return RadarModel;
});