var elt = document.getElementById('calculator');
var $sign = $('#sign');
var $magnitude = $('#magnitude');
var $signButton = $('#no-sign');
var $magnitudeButton = $('#no-magnitude');
var $anythingButton = $('#no-anything');

var calculator = Desmos.GraphingCalculator(elt);
calculator.setExpressions([{
  id: 'xValue',
  latex: 'a=1'
}, {
  id: 'point',
  latex: '(a,-5)'
}]);

var a = calculator.HelperExpression({
  latex: 'a'
});

a.observe('numericValue.sign', function() {
  $sign.text(a.numericValue < 0 ? 'negative' : 'non-negative');
});

a.observe('numericValue.magnitude', function() {
  $magnitude.text(Math.abs(a.numericValue) > 5 ? 'greater than' : 'less than or equal to');
});

$signButton.click(function() {
  a.unobserve('numericValue.sign');
});

$magnitudeButton.click(function() {
  a.unobserve('numericValue.magnitude');
});

$anythingButton.click(function() {
  a.unobserve('numericValue');
});