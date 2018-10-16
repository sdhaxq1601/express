;+(function(w) {
  function Sim(am, $obj) {
    //am是时间间隔的倍数，如果大于这个倍数，这个点就是节点
    this.am = typeof am === 'number' && am > 2 ? am : 3
    var startTime = 0,
      lastTime = 0,
      thisDuration = 0,
      steps = 0,
      avDuration = 0,
      _line = [],
      _lines = [],
      px = 0,
      py = 0,
      startX = 0,
      startY = 0
    var xl, dAng //斜率,变化角度
    var tempPoints = [],
      badAngCount = 0,
      ANG_DIS = Math.PI / 30
    this.show = function() {
      console.log(this.am)
    }
    this.dodo = function() {
      if (ai) {
        $obj.cx.clearRect(0, 0, $obj.can.offsetWidth, $obj.can.offsetHeight)
        var lastAct = $obj.acts.pop()
        console.log(_lines)
        lastAct.lines = lastAct.lines.map((l, i) =>
          Object.assign(l, { points: _lines[i] })
        )
        $obj.acts.push(lastAct)

        $obj.acts
          .slice(lastClearAct(Obj.acts, $obj.step) + 1, $obj.step)
          .forEach(i => {
            i.lines.forEach(l => draw(l))
          })
      }
      _line = []
      _lines = []
      ;(px = 0), (py = 0)
    }
    this.apply = function(x, y, p) {
      var now = Date.now()
      if (p == 'start') {
        startTime = lastTime = now
        steps = 0
        _line = [{ sx: x, sy: y }]
        startX = x
        startY = y
        tempPoints = [{ sx: x, sy: y }]
        badAngCount = 0
      }
      if (p == 'move') {
        xl = (x - px) / Math.sqrt((y - py) * (y - py) + (x - px) * (x - px))
        console.log('xy: %f %f %f %f', x, px, y, py)
        console.log('xl is: %f', xl)
        console.log('ag is: %f', Math.asin(xl))
        if (Math.abs(x - px) > 2 || Math.abs(y - py) > 2) {
          //过滤噪点
          tempPoints.push({ sx: x, sy: y })
          steps++
          avDuration = (now - startTime) / steps
          thisDuration = now - lastTime
          if (thisDuration > avDuration * this.am) {
            var tempAng = Math.asin(
              (px - startX) /
                Math.sqrt(
                  (py - startY) * (py - startY) + (px - startX) * (px - startX)
                )
            )
            var tx, ty, tx1, ty1, ang1
            tx = tempPoints[0].sx
            ty = tempPoints[0].sy
            for (var i = 0; i < tempPoints.length - 2; i++) {
              tx1 = tempPoints[i + 1].sx
              ty1 = tempPoints[i + 1].sy
              ang1 = Math.asin(
                (tx1 - tx) /
                  Math.sqrt((ty1 - ty) * (ty1 - ty) + (tx1 - tx) * (tx1 - tx))
              )
              if (Math.abs(ang1 - tempAng) > ANG_DIS) {
                badAngCount++
              }
              tx = tx1
              ty = ty1
            }
            console.log('badA:%d', badAngCount)
            if (badAngCount > steps / 2) {
              console.log('AA', _line.map(i => i), tempPoints.map(i => i))
              _line.splice(10000, 0, ...tempPoints)
              console.log('AAb', _line.map(i => i))
            } else {
              _line.push({ sx: px, sy: py })
            }
            startTime = now
            steps = 0
            startX = x
            startY = y
            tempPoints = []
            badAngCount = 0
          }
          lastTime = now
        }
      }
      if (p == 'end') {
        var tempAng = Math.asin(
          (px - startX) /
            Math.sqrt(
              (py - startY) * (py - startY) + (px - startX) * (px - startX)
            )
        )
        var tx, ty, tx1, ty1, ang1
        tx = tempPoints[0].sx
        ty = tempPoints[0].sy
        for (var i = 0; i < tempPoints.length - 2; i++) {
          tx1 = tempPoints[i + 1].sx
          ty1 = tempPoints[i + 1].sy
          ang1 = Math.asin(
            (tx1 - tx) /
              Math.sqrt((ty1 - ty) * (ty1 - ty) + (tx1 - tx) * (tx1 - tx))
          )
          if (Math.abs(ang1 - tempAng) > ANG_DIS) {
            badAngCount++
          }
          tx = tx1
          ty = ty1
        }
        console.log('badA:%d', badAngCount)
        if (badAngCount > steps / 2) {
          console.log('AA', _line.map(i => i), tempPoints.map(i => i))
          _line.splice(10000, 0, ...tempPoints)
          console.log('AAb', _line.map(i => i))
        } else if (
          Math.sqrt(
            Math.pow(px - _line[0].sx, 2) + Math.pow(py - _line[0].sy, 2)
          ) >
            Obj.curWidth * 3 ||
          _line.length < 3
        ) {
          _line.push({ sx: px, sy: py })
        } else {
          _line.push({ sx: _line[0].sx, sy: _line[0].sy })
        }

        _lines.push(_line)
        _line = []
      }
      ;(px = x), (py = y)
    }
  }
  w.Sim = Sim
})(typeof window === 'undefined' ? {} : window)
