import React from 'react'
import hexToRgba from "../../utils/color/hexToRgba";
import ease from "../../utils/animations/ease";

export default class Row{
    endedHover=true
    animationID = null
    constructor(x, y, width, height, color, dataIndex, valueIndex, direction, ctx){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.index = dataIndex + valueIndex
        this.dataIndex = dataIndex
        this.valueIndex = valueIndex
        this.ctx = ctx

        this.initialWidth = direction === 'width' ? 0 : width
        this.initialHeight = direction === 'height' ? 0 : height
    }
    _paint(currentY, currentHeight, currentWidth, color){
        this.ctx.clearRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2)

        this.ctx.fillStyle = color
        this.ctx.lineWidth = 1
        this.ctx.strokeStyle = this.color


        this.ctx.fillRect(this.x, currentY, currentWidth, currentHeight)

        this.ctx.stroke()

    }
    hover(){
        this.endedHover = false
        this._paint(this.y, this.height, this.width, this.color)
    }
    draw( ){
        this.ctx.clearRect(this.x, this.y, this.width, this.height)

        let currentWidth =  this.width,
            currentHeight =  this.height,
            currentY = this.height - currentHeight + this.y

        const draw = () => {
            this._paint(currentY, currentHeight, currentWidth, hexToRgba(this.color, .75))

            currentWidth = this.width
            currentHeight =  this.height

            currentY = this.height - currentHeight + this.y
        }

            draw()
    }
}
