import React, {useContext, useEffect, useState} from "react";
import DashboardContext from "../hooks/DataContext";
import useData from "../hooks/useData";
import randomColor from "../utils/color/randomColor";
import useChart from "../hooks/useChart";
import useLineChart from "./useLineChart";
import shared from "../styles/Charts.module.css";
import {Button} from "@f-ui/core";
import useCircleChart from "./useCircleChart";

export default function Circle(props){
  const datasets = useContext(DashboardContext)
  const data = useData(datasets, props.axis.field)
  const [values, setValues] = useState(props.values)

  useEffect(() => {
    let res = []
    props.values.forEach(v => {
      if (v.hexColor !== undefined)
        res.push(v)
      else
        res.push({...v, hexColor: randomColor()})
    })

    setValues(res)

  }, [props.values])

  const hook = useChart({
    axisKey: props.axis.field,
    data: data,
    values: values,
    layers: 3
  })

  useCircleChart(  {
    ...props.styles,
    ...hook,
    data: data,
    variant: props.variant,
    axis: props.axis,
    values: values
  })

  return (
    <div data-page={props.page ? `${props.page}` : '0'}
         className={[shared.wrapper, props.className].join(' ')} style={props.styles}>
      <h1 className={shared.title}>
        {props.title}
        {values.length > 0 ?
          <div className={shared.datasets}>
            {values.map((e, i) => (
              <Button
                disabled={!e.hidden && values.filter(v => !v.hidden).length === 1}
                styles={{opacity: e.hidden ? '.5' : '1'}}
                className={shared.datasetWrapper}
                onClick={() => setValues(prevState => {
                  let v = [...prevState]
                  v[i] = {...v[i], hidden: !v[i].hidden}

                  return v
                })}>
                <div className={shared.datasetLabel}>
                  {e.label}
                </div>
                <div className={shared.datasetIndicator} style={{background: e.hexColor}}/>
              </Button>
            ))}
          </div>
          : null}
      </h1>
      <div className={shared.canvasMountingPoint} ref={hook.wrapperRef}/>
    </div>
  )
}
