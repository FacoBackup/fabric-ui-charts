import PropTypes from "prop-types";
import React, {useContext, useEffect, useState} from "react";
import DashboardContext from "./hooks/DataContext";
import shared from "./styles/Charts.module.css";
import useLineChart from "./variants/useLineChart";
import useBarChart from "./variants/useBarChart";
import useCircleChart from "./variants/useCircleChart";
import useRadarChart from "./variants/useRadarChart";
import useData from "./hooks/useData";
import randomColor from "./utils/color/randomColor";
import useChart from "./hooks/useChart";
import {Button} from "@f-ui/core";
import Circle from "./variants/Circle";
import Radar from "./variants/Radar";
import Bar from "./variants/Bar";
import Line from "./variants/Line";


export default function Visual(props) {

  switch (props.variant) {
    case 'line':
      return <Line {...props}/>
    case  'horizontal-bar':
    case  'vertical-bar':
      return <Bar {...props}/>
    case 'donut':
    case  'pie':
      return <Circle {...props}/>
    case 'radar':
      return <Radar {...props}/>
    default:
      return null
  }
}
Visual.propTypes = {
  page: PropTypes.number.isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      field: PropTypes.string,
      hexColor: PropTypes.string
    })
  ).isRequired,
  axis: PropTypes.shape({
    label: PropTypes.string,
    field: PropTypes.string
  }).isRequired,
  title: PropTypes.string,
  styles: PropTypes.shape({
    donutRatio: PropTypes.number
  }),
  variant: PropTypes.oneOf(['radar', 'line', 'vertical-bar', 'horizontal-bar', 'pie', 'donut']).isRequired
}
