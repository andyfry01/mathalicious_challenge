$(function() {
  function e() {
    for (o.setExpression({
        id: "157",
        latex: "d = 14"
      }), o.setExpression({
        id: "161",
        color: "#996600"
      }), o.setExpression({
        id: "163",
        color: "#FFFFFF"
      }), o.setExpression({
        id: "193",
        hidden: !0
      }), o.setExpression({
        id: "255",
        hidden: !0
      }), o.setExpression({
        id: "innercircle",
        latex: "x^2 + y^2 = (d/2-c)^2",
        color: "#996600"
      }), o.removeExpression({
        id: "173"
      }), i = 194; 253 > i; i++) o.setExpression({
      id: i,
      color: "#595959"
    })
  }

  function s(e) {
    return MLI.toggleVis(o, c, e)
  }

  function d() {
    MLI.setUpEvaluator(l, a), l.setExpressions([{
      id: "134",
      hidden: !0
    }, {
      id: "516",
      hidden: !0
    }, {
      id: "517",
      hidden: !0
    }, {
      id: "518",
      hidden: !0
    }])
  }

  function n(e) {
    return MLI.toggleVis(l, h, e)
  }
  var t = $("#calculator"),
    r = $("#calculator2");
  r.height(t.width()), t.height(t.width()), $(window).resize(function() {
    t.height(t.width()), r.height(t.width())
  }), $("tr").height($("tr:eq(1)").height() + 20);
  var o = MLI.setUpCalc("calculator", {
      expressions: !1,
      menus: !1,
      zoomButtons: !1,
      autoResize: !0,
      url: "https://www.desmos.com/calculator/5rcsloqnsq",
      bounds: [-16, 16, -16, 16],
      onload: e
    }),
    c = {
      193: {
        hidden: !0
      }
    },
    l = MLI.setUpCalc("calculator2", {
      expressions: !1,
      autoResize: !0,
      settingsMenu: !0,
      url: "https://www.desmos.com/calculator/hguahdqk6s",
      bounds: [-2, 38, -14, 110],
      onload: d
    }),
    a = {
      134: {
        segs: ["144", "258"],
        pt: "141"
      },
      517: {
        segs: ["143", "257"],
        pt: "519"
      }
    },
    h = {
      134: {
        hidden: !0
      },
      517: {
        hidden: !0
      },
      516: {
        hidden: !0
      },
      518: {
        hidden: !0
      }
    },
    u = $(".diamVal"),
    x = $(".diamSlider"),
    p = $(".crustVal"),
    E = $(".crustSlider"),
    g = new ScrubberView;
  E.append(g.elt), g.min(0).max(10).step(1).value(1);
  var m = $(".middleterm"),
    w = $(".lastterm"),
    u = $("#diamVal"),
    x = $("#diamSlider"),
    I = new ScrubberView;
  x.append(I.elt), I.min(1).max(30).step(1).value(14), I.thumb.style.background = MLI.COLORS.GREEN, I.thumb.style.borderColor = MLI.COLORS.LIGHTGREEN, I.onValueChanged = function(e) {
    u.text(e + (1 == e ? " inch" : " inches")), o.setExpression({
      id: "157",
      latex: "d=" + e
    }), l.setExpression({
      id: "155",
      latex: "d=" + e
    }), e < 2 * g.value() ? (o.setExpression({
      id: "163",
      hidden: !0
    }), o.setExpression({
      id: "161",
      hidden: !0
    }), o.setExpression({
      id: "253",
      hidden: !0
    }), o.setExpression({
      id: "254",
      hidden: !0
    }), o.setExpression({
      id: "innercircle",
      hidden: !0
    })) : (o.setExpression({
      id: "163",
      hidden: !1
    }), o.setExpression({
      id: "161",
      hidden: !1
    }), o.setExpression({
      id: "253",
      hidden: !1
    }), o.setExpression({
      id: "254",
      hidden: !1
    }), o.setExpression({
      id: "innercircle",
      hidden: !1
    }))
  }, g.onValueChanged = function(e) {
    p.text(e), m.html((4 * e).toFixed(0)), w.html((4 * e * e).toFixed(0)), o.setExpression({
      id: "158",
      latex: "c =" + e
    }), l.setExpression({
      id: "125",
      latex: "c =" + e
    }), I.value() < 2 * e ? (o.setExpression({
      id: "163",
      hidden: !0
    }), o.setExpression({
      id: "161",
      hidden: !0
    }), o.setExpression({
      id: "253",
      hidden: !0
    }), o.setExpression({
      id: "254",
      hidden: !0
    }), o.setExpression({
      id: "innercircle",
      hidden: !0
    })) : (o.setExpression({
      id: "163",
      hidden: !1
    }), o.setExpression({
      id: "161",
      hidden: !1
    }), o.setExpression({
      id: "253",
      hidden: !1
    }), o.setExpression({
      id: "254",
      hidden: !1
    }), o.setExpression({
      id: "innercircle",
      hidden: !1
    }))
  };
  var f = {
    toggleGrid: {
      defaultText: "Show Square Inches",
      altText: "Hide Square Inches"
    },
    insidePercent: {
      defaultText: "Show Percent, Inside",
      altText: "Hide Percent, Inside"
    },
    crustPercent: {
      defaultText: "Show Percent, Crust",
      altText: "Hide Percent, Crust"
    }
  };
  $("#toggleGrid").click(function() {
    s("193")
  }), $(".btn").click(function() {
    MLI.toggleText(f, this)
  });
  var L = $("#insidePercent"),
    S = ($("#insidePercentEval"), $("#crustPercent")),
    v = ($("#crustPercentEval"), $("#insidepercentKey")),
    T = $("#crustpercentKey");
  L.click(function() {
    n("517"), n("518"), v.slideToggle({
      duration: MLI.SLIDERDURATION
    })
  }), S.click(function() {
    n("134"), n("516"), T.slideToggle({
      duration: MLI.SLIDERDURATION
    })
  })
});