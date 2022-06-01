import React from "react";
import MainCourse from "./MainCourse";
import SlideShow from "./SlideShow";
import Categories from "./Categories";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#ededed", position: "relative" }}>
      
      <SlideShow />
      <MainCourse />
      <Categories />
     
    </div>
  );
}
