window.Apex = {
    chart: {
        foreColor: '#ccc', toolbar: {show: false},
    },
    stroke: {width: 3},
    dataLabels: {enabled: false},
    tooltip: {theme: 'dark'},
    grid: {
        borderColor: "#535A6C", xaxis: {lines: {show: true}}
    }
};

function Constant ( name ) {
  return {'pi': Math.PI, 'e': Math.E}[name];
};
function create_function ( name ) {
  function func ( array_data ) {
      if ( array_data.length != undefined ) {
          return array_data.map( i => Math[name](i) );
      } else if ( typeof(array_data) == 'number' ) {
          return Math[name](array_data);
      };
  };
  return func;
};
var [
      Sqrt, Round, Random, Pow,
      Log, Log10, Exp,
      Cos, Acos, Acosh,
      Sin, Asin, Asinh, 
      Tan, Tanh, Atan, Atanh,
      Min, Max, Floor, Ceil
  ] = [
      'sqrt', 'round', 'random', 'pow',
      'log', 'log10', 'exp',
      'cos', 'acos', 'acosh',
      'sin', 'asin', 'asinh', 
      'tan', 'tanh', 'atan', 'atanh',
      'min', 'max', 'floor', 'ceil'
  ].map( fi => create_function(fi) );

function range (start, stop, step=1) {
  return Array.from(
      {length: (stop - start - 1) / step + 1}, (_, i) => start + (i * step)
  );
};

function Linspace(a, b, n, precission=4) {
  return range(0, n).map( x => a + x * (b - a) / n );
};

var randint = ( a, b ) => ( a + Math.round(Math.random() * (b - a)) );
var is_element = ( e, data ) => ( data.indexOf(e) != -1 );
function random_array ( a, b ) {
  var array_data = [];  	
  while ( array_data.length < b ) {
      ri = randint(a, b);
      if ( is_element(ri, array_data) == false ) {
          array_data.push(ri);
      };
  };
  return array_data;
};
function set_spark ( data_id, dataset, settings={} ) {
    var spark = {
        chart: {
            id: data_id, group: 'sparks', type: 'line', height: 80, sparkline: {enabled: true},
            dropShadow: {enabled: true, top: 1, left: 1, blur: 2, opacity: 0.2}
        },
        series: [{data: dataset}],
        stroke: {curve: 'smooth'},
        markers: {
            size: 0}, grid: {padding: {top: 20, bottom: 10, left: 110}
        },
        colors: ['#fff'],
        tooltip: {
            x: {show: false}, y: {title: {formatter: function formatter(val) {return '';}}}
        }
    };
    var chart = new ApexCharts(document.querySelector("#" + data_id), spark);
    chart.render();
};    

[1, 2, 3 ,4].map( i => set_spark('spark-' + i, random_array(0, 5)) );

var optionsLine = {
  chart: {
    height: 328,
    type: 'line',
    zoom: {
      enabled: false
    },
    dropShadow: {
      enabled: true,
      top: 3,
      left: 2,
      blur: 4,
      opacity: 1,
    }
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  //colors: ["#3F51B5", '#2196F3'],
  series: [{
      name: "Music",
      data: Sqrt(Linspace(0, 4, 10))
    },
    {
      name: "Photos",
      data: Sin(Linspace(0, 2 * Constant('pi'), 10))
    },
    {
      name: "Files",
      data: Cos(Linspace(0, 2 * Constant('pi'), 10))
    }
  ],
  title: {
    text: 'Media',
    align: 'left',
    offsetY: 25,
    offsetX: 20
  },
  subtitle: {
    text: 'Statistics',
    offsetY: 55,
    offsetX: 20
  },
  markers: {
    size: 6,
    strokeWidth: 0,
    hover: {
      size: 9
    }
  },
  grid: {
    show: false,
    padding: {
      bottom: 0
    }
  },
  labels: ['01/15/2002', '01/16/2002', '01/17/2002', '01/18/2002', '01/19/2002', '01/20/2002'],
  xaxis: {
    tooltip: {
      enabled: false
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    offsetY: -20
  }
}

var chartLine = new ApexCharts(document.querySelector('#line-adwords'), optionsLine);
chartLine.render();

var optionsCircle4 = {
  chart: {
    type: 'radialBar',
    height: 350,
    width: 380,
  },
  plotOptions: {
    radialBar: {
      size: undefined,
      inverseOrder: true,
      hollow: {
        margin: 5,
        size: '48%',
        background: 'transparent',

      },
      track: {
        show: false,
      },
      startAngle: -180,
      endAngle: 180

    },
  },
  stroke: {
    lineCap: 'round'
  },
  series: [71, 63, 77],
  labels: ['June', 'May', 'April'],
  legend: {
    show: true,
    floating: true,
    position: 'right',
    offsetX: 70,
    offsetY: 240
  },
}

var chartCircle4 = new ApexCharts(document.querySelector('#radialBarBottom'), optionsCircle4);
chartCircle4.render();


var optionsBar = {
  chart: {
    height: 380,
    type: 'bar',
    stacked: true,
  },
  plotOptions: {
    bar: {
      columnWidth: '30%',
      horizontal: false,
    },
  },
  series: [{
    name: 'PRODUCT A',
    data: Cos(Linspace(0, 2 * Constant('pi'), 10))
  }, {
    name: 'PRODUCT B',
    data: Sin(Linspace(0, 2 * Constant('pi'), 10))
  }, {
    name: 'PRODUCT C',
    data: Pow(Linspace(0, 5, 10))
  }],
  xaxis: {
    categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4'],
  },
  fill: {
    opacity: 1
  },

}

var chartBar = new ApexCharts(
  document.querySelector("#barchart"),
  optionsBar
);

chartBar.render();

var optionsArea = {
  chart: {
    height: 380,
    type: 'area',
    stacked: false,
  },
  stroke: {
    curve: 'straight'
  },
  series: [{
      name: "Music",
      data: Cos(Linspace(0, 2 * Constant('pi'), 10))
    },
    {
      name: "Photos",
      data: Sin(Linspace(0, 2 * Constant('pi'), 10))
    },
    {
      name: "Files",
      data: Sqrt(Linspace(0, 4, 10))
    }
  ],
  xaxis: {
    categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2'],
  },
  tooltip: {
    followCursor: true
  },
  fill: {
    opacity: 1,
  },

}

var chartArea = new ApexCharts(
  document.querySelector("#areachart"),
  optionsArea
);

chartArea.render();

window.Apex = {
  dataLabels: {
    enabled: false
  }
};

var optionsBar = {
  chart: {
    type: 'bar',
    height: 250,
    width: '100%',
    stacked: true,
    foreColor: '#999',
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: false
      },
      columnWidth: '75%',
      endingShape: 'rounded'
    }
  },
  colors: ["#00C5A4", '#F3F2FC'],
  series: [{
    name: "Sessions",
    data: [20, 16, 24, 28, 26, 22, 15, 5, 14, 16, 22, 29, 24, 19, 15, 10, 11, 15, 19, 23],
  }, {
    name: "Views",
    data: [20, 16, 24, 28, 26, 22, 15, 5, 14, 16, 22, 29, 24, 19, 15, 10, 11, 15, 19, 23],
  }],
  labels: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4],
  xaxis: {
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    crosshairs: {
      show: false
    },
    labels: {
      show: false,
      style: {
        fontSize: '14px'
      }
    },
  },
  grid: {
    xaxis: {
      lines: {
        show: false
      },
    },
    yaxis: {
      lines: {
        show: false
      },
    }
  },
  yaxis: {
    axisBorder: {
      show: false
    },
    labels: {
      show: false
    },
  },
  legend: {
    floating: true,
    position: 'top',
    horizontalAlign: 'right',
    offsetY: -36
  },
  title: {
    text: 'Web Statistics',
    align: 'left',
  },
  subtitle: {
    text: 'Sessions and Views'
  },
  tooltip: {
    shared: true,
    intersect: false
  }

}

var chartBar = new ApexCharts(document.querySelector('#bar'), optionsBar);
chartBar.render();

var optionsCircle1 = {
  chart: {
    type: 'radialBar',
    height: 266,
    zoom: {
      enabled: false
    },
    offsetY: 20
  },
  colors: ['#E91E63'],
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          show: false
        },
        value: {
          offsetY: 0
        }
      }
    }
  },
  series: [65],
  theme: {
    monochrome: {
      enabled: false
    }
  },
  legend: {
    show: false
  },
  title: {
    text: 'Bounce Rate',
    align: 'left'
  }
}

var chartCircle1 = new ApexCharts(document.querySelector('#radialBar1'), optionsCircle1);
chartCircle1.render();


var optionsDonutTop = {
  chart: {
    height: 265,
    type: 'donut',
    offsetY: 20
  },
  plotOptions: {
    pie: {
      customScale: 0.86,
      donut: {
        size: '72%',
      },
      dataLabels: {
        enabled: false
      }
    }
  },
  colors: ['#775DD0', '#00C8E1', '#FFB900'],
  title: {
    text: 'Visitors Source'
  },
  series: [2, 7, 5],
  labels: ['Social Media', 'Blog', 'External'],
  legend: {
    show: false
  }
}

var chartDonut2 = new ApexCharts(document.querySelector('#donutTop'), optionsDonutTop);
chartDonut2.render().then(function () {
    window.setInterval(function () {
        chartDonut2.updateSeries([getRandom(), getRandom(), getRandom()])
    }, 1000)
});

var optionsArea = {
  chart: {
    height: 421,
    type: 'area',
    background: '#fff',
    stacked: true,
    offsetY: 39,
    zoom: {
      enabled: false
    }
  },
  plotOptions: {
    line: {
      dataLabels: {
        enabled: false
      }
    }
  },
  stroke: {
    curve: 'straight'
  },
  colors: ["#3F51B5", '#2196F3'],
  series: [{
      name: "Adwords Views",
      data: [15, 26, 20, 33, 27, 43, 17, 26, 19]
    },
    {
      name: "Adwords Clicks",
      data: [33, 21, 42, 19, 32, 25, 36, 29, 49]
    }
  ],
  fill: {
    type: 'gradient',
    gradient: {
      inverseColors: false,
      shade: 'light',
      type: "vertical",
      opacityFrom: 0.9,
      opacityTo: 0.6,
      stops: [0, 100, 100, 100]
    }
  },
  title: {
    text: 'Visitor Insights',
    align: 'left',
    offsetY: -5,
    offsetX: 20
  },
  subtitle: {
    text: 'Adwords Statistics',
    offsetY: 30,
    offsetX: 20
  },
  markers: {
    size: 0,
    style: 'hollow',
    strokeWidth: 8,
    strokeColor: "#fff",
    strokeOpacity: 0.25,
  },
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0
    }
  },
  yaxis: {
    show: false
  },
  labels: ['01/15/2002', '01/16/2002', '01/17/2002', '01/18/2002', '01/19/2002', '01/20/2002', '01/21/2002', '01/22/2002', '01/23/2002'],
  xaxis: {
    type: 'datetime',
    tooltip: {
      enabled: false
    }
  },
  legend: {
    offsetY: -50,
    position: 'top',
    horizontalAlign: 'right'
  }
}

var optionsCircle4 = {
  chart: {
    height: 314,
    type: 'radialBar',
  },
  colors: ['#775DD0', '#00C8E1', '#FFB900'],
  labels: ['q4'],
  series: [71, 63, 77],
  labels: ['June', 'May', 'April'],
  theme: {
    monochrome: {
      enabled: false
    }
  },
  plotOptions: {
    radialBar: {
      offsetY: -30
    }
  },
  legend: {
    show: true,
    position: 'left',
    containerMargin: {
      right: 0
    }
  },
  title: {
    text: 'Growth'
  }
}

var chartCircle4 = new ApexCharts(document.querySelector('#radialBarBottom2'), optionsCircle4);
chartCircle4.render();

function generateData(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

    series.push([x, y, z]);
    baseval += 86400000;
    i++;
  }
  return series;
}

function getRandom() {
  return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
}


var options = {
  chart: {
    height: 294,
    type: 'bubble',
    sparkline: {
      enabled: true
    },
  },
  plotOptions: {
    bubble: {
      dataLabels: {
        enabled: false
      }
    }
  },
  colors: ["#734CEA", "#34bfa3", "#f4516c", "#00c5dc"],
  series: [{
      name: 'Facebook',
      data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60
      })
    },
    {
      name: 'Twitter',
      data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60
      })
    },
    {
      name: 'Youtube',
      data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60
      })
    },
    {
      name: 'LinkedIn',
      data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60
      })
    }
  ],
  fill: {
    opacity: 0.8,
    gradient: {
      enabled: false
    }
  },
  title: {
    text: 'Social Media Reach'
  },
  xaxis: {
    tickAmount: 12,
    type: 'category',
    min: -50,
    max: 850
  },
  yaxis: {
    max: 70
  }
}

var chart = new ApexCharts(
  document.querySelector("#bubbleChart"),
  options
);

chart.render().then(function () {
  var ifr = document.querySelector("#wrapper");
  if (ifr.contentDocument) {
    ifr.style.height = ifr.contentDocument.body.scrollHeight + 20 +'px';
  }
});
