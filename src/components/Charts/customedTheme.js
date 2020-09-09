import echarts from 'echarts';

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        // factory({}, root.echarts);
        factory({}, echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    echarts.registerTheme('customedTheme', {
        "color": [
            "#333fff",
            "#23b899",
            "#d52648",
            "#f4df58",
            "#00e5ed",
            "#7a79ff",
            "#ff6383",
            "#ffb0e3",
            "#ff7a45",
            "#66c6ff"
        ],
        "backgroundColor": "rgba(18,22,38,0)",
        "textStyle": {},
        "title": {
            "textStyle": {
                "color": "#ffffff"
            },
            "subtextStyle": {
                "color": "#aaaaaa"
            }
        },
        "line": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 1
                }
            },
            "lineStyle": {
                "normal": {
                    "width": 2
                }
            },
            "symbolSize": "5",
            "symbol": "circle",
            "smooth": false,
            "markPoint": {
                "symbol": 'pin',
                "symbolSize": 35, //标记(气泡)的大小
            }
        },
        "radar": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 1
                }
            },
            "lineStyle": {
                "normal": {
                    "width": 2
                }
            },
            "symbolSize": "5",
            "symbol": "circle",
            "smooth": false
        },
        "bar": {
            "itemStyle": {
                "normal": {
                    "barBorderWidth": "0",
                    "barBorderColor": "#ccc"
                },
                "emphasis": {
                    "barBorderWidth": "0",
                    "barBorderColor": "#ccc"
                }
            }
        },
        "pie": {
            "hoverOffset":3,
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#ccc"
                }
            }
        },
        "scatter": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#ccc"
                }
            }
        },
        "boxplot": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#ccc"
                }
            }
        },
        "parallel": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#ccc"
                }
            }
        },
        "sankey": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#ccc"
                }
            }
        },
        "funnel": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#ccc"
                }
            }
        },
        "gauge": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#ccc"
                }
            }
        },
        "candlestick": {
            "itemStyle": {
                "normal": {
                    "color": "#c23531",
                    "color0": "#314656",
                    "borderColor": "#c23531",
                    "borderColor0": "#314656",
                    "borderWidth": 1
                }
            }
        },
        "graph": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#ccc"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": 1,
                    "color": "#aaaaaa"
                }
            },
            "symbolSize": "5",
            "symbol": "circle",
            "smooth": false,
            "color": [
                "#333fff",
                "#23b899",
                "#d52648",
                "#f4df58",
                "#00e5ed",
                "#7a79ff",
                "#ff6383",
                "#ffb0e3",
                "#ff7a45",
                "#66c6ff"
            ],
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#ffffff"
                    }
                }
            }
        },
        "map": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#eeeeee",
                    "borderColor": "#444444",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "areaColor": "rgba(255,215,0,0.9)",
                    "borderColor": "#444444",
                    "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#000000"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(100,0,0)"
                    }
                }
            }
        },
        "geo": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#eeeeee",
                    "borderColor": "#444444",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "areaColor": "rgba(255,215,0,0.9)",
                    "borderColor": "#444444",
                    "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#000000"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(100,0,0)"
                    }
                }
            }
        },
        "categoryAxis": {
            "nameTextStyle":{
                "color":"rgba(255,255,255,0.9)", 
                "fontSize":12, 
            },
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#242b4a"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#242b4a"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "rgba(255,255,255,0.9)",
                    "fontSize": 12,
                }
            },
            "splitLine": {
                "show": false,
                "lineStyle": {
                    "color": [
                        "#242b4a"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.3)",
                        "rgba(200,200,200,0.3)"
                    ]
                }
            }
        },
        "valueAxis": {
            "nameTextStyle":{
                "color":"rgba(255,255,255,0.9)", 
                "fontSize":12, 
            },
            "axisLine": {
                "show": false,
                "lineStyle": {
                    "color": "#242b4a"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#242b4a"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "rgba(255,255,255,0.9)",
                    "fontSize": 12,
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#242b4a"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.3)",
                        "rgba(200,200,200,0.3)"
                    ]
                }
            }
        },
        "logAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                    "color": "#242b4a"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#ffffff"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#ffffff"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.3)",
                        "rgba(200,200,200,0.3)"
                    ]
                }
            }
        },
        "timeAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#242b4a"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                    "color": "#242b4a"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#ffffff"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#242b4a"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.3)",
                        "rgba(200,200,200,0.3)"
                    ]
                }
            }
        },
        "toolbox": {
            "iconStyle": {
                "normal": {
                    "borderColor": "#ffffff"
                },
                "emphasis": {
                    "borderColor": "#ffffff"
                }
            }
        },
        "legend": {
            "textStyle": {
                "color": "rgba(255,255,255,0.9)"
            }
        },
        "tooltip": {
            "axisPointer": {
                "lineStyle": {
                    "color": "#4ECFDC",
                    "width": "1"
                },
                "crossStyle": {
                    "color": "#cccccc",
                    "width": "1"
                }
            }
        },
        "timeline": {
            "lineStyle": {
                "color": "#ffffff",
                "width": 1
            },
            "itemStyle": {
                "normal": {
                    "color": "#293c55",
                    "borderWidth": "1"
                },
                "emphasis": {
                    "color": "#d52648"
                }
            },
            "controlStyle": {
                "normal": {
                    "color": "#ffffff",
                    "borderColor": "#ffffff",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "color": "#ffffff",
                    "borderColor": "#ffffff",
                    "borderWidth": 0.5
                }
            },
            "checkpointStyle": {
                "color": "#333fff",
                "borderColor": "rgba(13,49,229,0.5)"
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#aaaaaa"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#aaaaaa"
                    }
                }
            }
        },
        "visualMap": {
            "color": [
                "#bf444c",
                "#d88273",
                "#f6efa6"
            ]
        },
        "dataZoom": {
            "backgroundColor": "rgba(47,69,84,0)",
            "dataBackgroundColor": "rgba(47,69,84,0.3)",
            "fillerColor": "rgba(167,183,204,0.4)",
            "handleColor": "#a7b7cc",
            "handleSize": "100%",
            "textStyle": {
                "color": "#333333"
            }
        },
        "markPoint": {
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#ffffff"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#ffffff"
                    }
                }
            }
        }
    });
}));


