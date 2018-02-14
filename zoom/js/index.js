let pizzaDiagram = undefined
let percentageGraph = undefined

$(document).ready(() => {
  setUpCalculators()
  setUpButtons()
})

function setUpCalculators() {
  pizzaDiagram = MLI.setUpCalc('pizzaDiagram', {
    url: 'https://www.desmos.com/calculator/6bqf638yxd',
    expressions: false,
    lockViewport: false,
    onload: onloadPizzaDiagram
  });
  percentageGraph = MLI.setUpCalc("percentageGraph", {
    expressions: false,
    url: "https://www.desmos.com/calculator/pwa1tgvuvv",
    bounds: [-2, 38, -14, 110],
    onload: onloadPercentageGraph
  })
}

function onloadPizzaDiagram() {
  configurePizzaDiameterUI()
  configureCrustUI()
}

function onloadPercentageGraph() {

  MLI.setUpEvaluator(percentageGraph), percentageGraph.setExpressions([{
    // crust percentage graph line
    id: "134",
    hidden: true
  }, {
    // crust evaluator
    id: "516",
    hidden: true
  }, {
    // inside percentage graph line
    id: "517",
    hidden: true
  }, {
    // inside percentage evaluator
    id: "518",
    hidden: true
  }])
}

function configurePizzaDiameterUI() {
  const radiusObserver = pizzaDiagram.HelperExpression({
    latex: 'u'
  });
  radiusObserver.observe('numericValue', function() {
    let diameter = radiusObserver.numericValue * 2
    // first, set text on UI display for diameter
    $('.pizzaDiameterVal').text(diameter)
    // next, send the new diameter value to the graph
    let newLatex = `d=${diameter}`
    percentageGraph.setExpression({
      id: "155",
      latex: newLatex
    })
  });
}

function configureCrustUI() {
  let crustScrubber = new ScrubberView;
  crustScrubber.min(1).max(5).step(1).value(1)
  crustScrubber.thumb.style.background = MLI.COLORS.ORANGE
  crustScrubber.thumb.style.borderColor = MLI.COLORS.EVALORANGE
  crustScrubber.track.style.backgroundColor = MLI.COLORS.RED
  crustScrubber.onValueChanged = function(e) {
    updateCrustViews(e)
  }
  $('.crustScrubber').append(crustScrubber.elt)
}

function updateCrustViews(crustThickness) {

  // first, set text on UI display for thickness
  $('.crustThicknessVal').text(crustThickness)
  // next, send the new thickness value to the graph
  let newLatex = `c=${crustThickness}`
  pizzaDiagram.setExpression({        
    id: "6",
    latex: newLatex
  })
  percentageGraph.setExpression({
    id: "125",
    latex: newLatex
  })
}

function setUpButtons() {

  $('.insidePercentUI .toggleGraphLine').click((e) => {
    e.preventDefault()
    toggleGraphDisplay('percentageGraph', '517')
    toggleButtonDisplay('.insidePercentUI', '.toggleGraphLine')
  })

  $('.insidePercentUI .toggleEvaluator').click((e) => {
    e.preventDefault()
    toggleGraphDisplay('percentageGraph', '518')
    toggleButtonDisplay('.insidePercentUI', '.toggleEvaluator')
  })

  $('.crustPercentUI .toggleGraphLine').click((e) => {
    e.preventDefault()
    toggleGraphDisplay('percentageGraph', '134')
    toggleButtonDisplay('.crustPercentUI', '.toggleGraphLine')
  })

  $('.crustPercentUI .toggleEvaluator').click((e) => {
    e.preventDefault()
    toggleGraphDisplay('percentageGraph', '516')
    toggleButtonDisplay('.crustPercentUI', '.toggleEvaluator')
  })

  function toggleGraphDisplay(graphName, expressionId) {
    // get current graph state
    let graphState = percentageGraph.getExpressions()
    // find the expression ID being updated
    let graphLineExpression = graphState.filter(expression => expression.id === expressionId)[0]
    // set to hidden if currently displayed
    if (graphLineExpression.hidden !== true) {
      percentageGraph.setExpression({
        id: expressionId,
        hidden: true
      })
      return
    }
    // set to display if currently hidden
    percentageGraph.setExpression({
      id: expressionId,
      hidden: false
    })
    return
  }

  // Toggles button classes to activated/deactivated 
  function toggleButtonDisplay(uiSection, buttonType) {
    let activatedClass = undefined
    let deactivatedClass = undefined

    if (uiSection === '.insidePercentUI') {
      activatedClass = 'insidePercentActivated'
      deactivatedClass = 'insidePercentDeactivated'
    }

    if (uiSection === '.crustPercentUI') {
      activatedClass = 'crustActivated'
      deactivatedClass = 'crustDeactivated'
    }

    $(`${uiSection} ${buttonType}`).toggleClass(activatedClass)
    $(`${uiSection} ${buttonType}`).toggleClass(deactivatedClass)
  }
}