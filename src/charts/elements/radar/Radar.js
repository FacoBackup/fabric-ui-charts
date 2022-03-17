import React from 'react'
import hexToRgba from "../../utils/color/hexToRgba";
import ease from "../../utils/animations/ease";

export default class Radar {
  animated = false
  animationStarted = false
  points = []

  constructor({
                dataLength,
                axisKey,
                axisLabel,
                biggest,
                cx,
                cy,
                radius,
                valuesLength
              }) {

    this.shift = (dataLength % 2 ? -1 : 1) * (dataLength / 2) * Math.PI / dataLength
    this.step = 2 * Math.PI / dataLength

    this.axisKey = axisKey
    this.axisLabel = axisLabel

    this.biggest = biggest

    this.cx = cx
    this.cy = cy
    this.radius = radius
    this.valuesLength = valuesLength
  }

  polygon({data, context, onHover, radius, valueKey, valueColor, valueLabel, points}) {
    let before
    data.forEach((point, index) => {
      context.strokeStyle = valueColor
      const pVariation = (point[valueKey]) / this.biggest
      let currentStep = index * this.step + this.shift;
      const axisAttr = point[this.axisKey]

      const {x, y} = {
        x: this.cx + (radius * pVariation) * Math.cos(currentStep),
        y: this.cy + (radius * pVariation) * Math.sin(currentStep)
      }


      const newPoint = {
        x: x, y: y, width: 20, height: 20,
        axis: axisAttr,
        value: point[valueKey],
        axisLabel: this.axisLabel,
        valueLabel: valueLabel,
        color: valueColor
      }
      points.push(newPoint)
      context.beginPath()
      if (before)
        context.moveTo(before.x, before.y);
      context.lineTo(x, y);
      context.stroke();
      context.closePath()

      const isOnHover = onHover?.axis === point[this.axisKey] && onHover.value === point[valueKey]

      context.beginPath()
      context.arc(x, y, isOnHover ? 10 : 4, 0, Math.PI * 2, false)
      context.fillStyle = valueColor
      context.fill()
      context.closePath()
      before = newPoint
    })
  }

  draw(ctx, data, values, onHover, resetAnimation, setPoints) {
    if (data.length > 0) {
      ctx.clearAll()
      let allPoints = []
      values.forEach((valueObj, vi) => {
        let points = []
        this.polygon({
          data: data,
          radius: this.radius,
          onHover: onHover,
          context: ctx,
          valueKey: valueObj.field,
          valueLabel: valueObj.label,
          valueColor: valueObj.hexColor,
          points: points,
          vi: vi
        })

        // FILL
        ctx.beginPath()
        ctx.fillStyle = hexToRgba(valueObj.hexColor, .5)
        points.forEach(p => {
          ctx.lineTo(p.x, p.y);
        })
        ctx.fill()
        ctx.closePath()
        // FILL

        // CONNECT-LAST-LINE
        ctx.beginPath()
        ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
        ctx.lineTo(points[0].x, points[0].y);
        ctx.stroke();
        ctx.closePath()
        // CONNECT-LAST-LINE

        allPoints.push(...points)
      })

      this.points = allPoints
      setPoints(allPoints)

    }
  }
}
