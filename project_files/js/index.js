$(document).ready(() => {

  let calculator = MLI.setUpCalc('calculator', {
    url: 'https://www.desmos.com/calculator/llxzhjmv3p',
    graphpaper: true
  });

  // once calculator config XHR finishes, we can set up our observers
  $(document).ajaxStop(() => {
    init()
  })
})

function init() {
  toggleUIVisible()
  configureUI()
}

function toggleUIVisible() {
  $('.ui').toggleClass('hidden')
}

function configureUI() {
  configurePizzaDiameterUI()
  configureCrustUI()
}

function configurePizzaDiameterUI() {
  const diameterObserver = calculator.HelperExpression({
    latex: 'u'
  });
  diameterObserver.observe('numericValue', function() {
    let diameter = diameterObserver.numericValue * 2
    $('.pDiameterVal').text(diameter)
  });
}

function configureCrustUI() {
  let crustScrubber = new ScrubberView;
  crustScrubber.min(1).max(5).step(1).value(1)
  crustScrubber.thumb.style.background = MLI.COLORS.GREEN
  crustScrubber.thumb.style.borderColor = MLI.COLORS.LIGHTGREEN
  crustScrubber.onValueChanged = function(e) {
    let newLatex = `c=${e}`
    calculator.setExpression({        
      id: "6",
      latex: newLatex
    })
  }
  $('.crustScrubber').append(crustScrubber.elt)
}

