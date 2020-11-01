import React, { useRef, useLayoutEffect } from "react";
import "./map.css";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

am4core.useTheme(am4themes_animated);

const Map = (props) => {
  const chart = useRef(null);
  const series = useRef(null);

  useLayoutEffect(() => {
    let map = am4core.create("posts-map", am4maps.MapChart);
    map.geodata = am4geodata_worldLow;
    map.projection = new am4maps.projections.Miller();

    // Create map polygon series
    var polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    // Remove Antarctica
    polygonSeries.exclude = ["AQ"];

    let imageSeries = map.series.push(new am4maps.MapImageSeries());
    let imageSeriesTemplate = imageSeries.mapImages.template;
    let circle = imageSeriesTemplate.createChild(am4core.Circle);
    circle.radius = 2;
    circle.fill = am4core.color("#4f5d75");
    circle.stroke = am4core.color("#4f5d75");
    circle.strokeWidth = 1;
    circle.nonScaling = true;

    // Set property fields
    imageSeriesTemplate.propertyFields.latitude = "lat";
    imageSeriesTemplate.propertyFields.longitude = "long";

    // Add data for the three cities
    imageSeries.data = [];

    chart.current = map;
    series.current = imageSeries;

    return () => {
      map.dispose();
    };
  }, []);

  useLayoutEffect(() => {
    console.log("Reset locations", props.locations);
    console.log("Reset locations", series);
    if (series && series.current) {
      series.current.data = props.locations;
    }
  }, [props.locations]);

  return <div id="posts-map" className="posts-map"></div>;
};

export default Map;
