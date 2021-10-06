var series =
{
  "monthDataSeries1": {
    "prices": [
      8107.85,
      8128.0,
      8122.9
    ],
    "dates": [
      "13 Nov 2017",
      "14 Nov 2017",
      "15 Nov 2017"
    ]
  }
}
var _seed = 42;
Math.random = function() {
    _seed = _seed * 16807 % 2147483647;
    return (_seed - 1) / 2147483646;
};
