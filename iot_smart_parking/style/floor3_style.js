'use strict';

import React, { Component, } from 'react';
import {
  Dimensions,
  StyleSheet
} from 'react-native';

//화면 비율
var screen_height = Dimensions.get('window').height;
var screen_width = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  sector1_style : {
    backgroundColor:'#20ff70',
    position:'absolute',
    borderColor:'white',
    borderWidth:1,
    left:screen_width/7.29,
    width:screen_width/19.5,
    height:screen_height/75
  },
  sector2_style : {
    backgroundColor:'#20ff70',
    position:'absolute',
    borderColor:'white',
    borderWidth:1,
    left:screen_width/3.73,
    width:screen_width/19.5,
    height:screen_height/75
  },
  sector3_style : {
    backgroundColor:'#20ff70',
    position:'absolute',
    borderColor:'white',
    borderWidth:1,
    left:screen_width/3.1,
    width:screen_width/19.5,
    height:screen_height/75
  },

  sector4_style : {
    backgroundColor:'#20ff70',
    position:'absolute',
    borderColor:'white',
    borderWidth:1,
    left:screen_width/2.24,
    width:screen_width/19.5,
    height:screen_height/75
  },

  sector5_style : {
    backgroundColor:'#20ff70',
    position:'absolute',
    borderColor:'white',
    borderWidth:1,
    left:screen_width/1.995,
    width:screen_width/19.5,
    height:screen_height/75
  },

  sector6_style : {
    backgroundColor:'#20ff70',
    position:'absolute',
    borderColor:'white',
    borderWidth:1,
    left:screen_width/1.598,
    width:screen_width/19.5,
    height:screen_height/75
  },

  sector7_style : {
    backgroundColor:'#20ff70',
    position:'absolute',
    borderColor:'white',
    borderWidth:1,
    left:screen_width/1.47,
    width:screen_width/19.5,
    height:screen_height/75
  },

  sector8_style : {
    backgroundColor:'#20ff70',
    position:'absolute',
    borderColor:'white',
    borderWidth:1,
    left:screen_width/1.235,
    width:screen_width/19.5,
    height:screen_height/75
  },

  sector_handi_style : {
    backgroundColor:'#20ff70',
    position:'absolute',
    borderColor:'white',
    borderWidth:1,
    top:screen_height/2.005,
    width:screen_height/60,
    height:screen_width/19.5
  },

  sector1_result_style : {
    backgroundColor:'white',
    borderColor:'#15adad',
    borderWidth:1,
    width:screen_width/19.5,
    height:screen_height/75
  },

  circle : {
    position:'absolute',
    width:34,
    height:34,
    borderRadius:17,
    backgroundColor:'rgba(0,255,255,0.5)'
  },

//목적지 결과 컨테이너
  result_container1:{
    left:screen_width/12.5,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0)',
    width:screen_width/6,
    height:screen_height/11
  },
  result_container2:{
    left:screen_width/4.75,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0)',
    width:screen_width/6,
    height:screen_height/11
  },
  result_container3:{
    left:screen_width/3.79,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0)',
    width:screen_width/6,
    height:screen_height/11
  },
  result_container4:{
    left:screen_width/2.57,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0)',
    width:screen_width/6,
    height:screen_height/11
  },
  result_container5:{
    left:screen_width/2.26,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0)',
    width:screen_width/6,
    height:screen_height/11
  },
  result_container6:{
    left:screen_width/1.76,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0)',
    width:screen_width/6,
    height:screen_height/11
  },
  result_container7:{
    left:screen_width/1.61,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0)',
    width:screen_width/6,
    height:screen_height/11
  },
  result_container8:{
    left:screen_width/1.33,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0)',
    width:screen_width/6,
    height:screen_height/11
  },

  //1번째 줄 결과 스타일
  result_sector11: {top:screen_height/1.965},
  result_sector12: {top:screen_height/2.025},
  result_sector13: {top:screen_height/2.09},
  result_sector14: {top:screen_height/2.15},
  result_sector15: {top:screen_height/2.25},
  result_sector16: {top:screen_height/2.33},
  result_sector17: {top:screen_height/2.41},
  result_sector18: {top:screen_height/2.505},
  result_sector19: {top:screen_height/2.63},
  result_sector110: {top:screen_height/2.74},
  result_sector111: {top:screen_height/2.85},
  result_sector112: {top:screen_height/2.98},
  result_sector113: {top:screen_height/3.175},
  result_sector114: {top:screen_height/3.33},
  result_sector115: {top:screen_height/3.5},
  result_sector116: {top:screen_height/3.7},
  result_sector117: {top:screen_height/5.35},
  result_sector118: {top:screen_height/5.8},
  result_sector119: {top:screen_height/6.35},
  result_sector120: {top:screen_height/7.2},
  result_sector121: {top:screen_height/8.1},
  result_sector122: {top:screen_height/9.25},
  result_sector123: {top:screen_height/25},
  result_sector124: {top:screen_height/40},
  result_sector125: {top:screen_height/100},

  //2번째 줄 결과 스타일
  result_sector21: {top:screen_height/2.505},
  result_sector22: {top:screen_height/2.63},
  result_sector23: {top:screen_height/2.74},
  result_sector24: {top:screen_height/2.85},
  result_sector25: {top:screen_height/2.98},
  result_sector26: {top:screen_height/3.175},
  result_sector27: {top:screen_height/3.33},
  result_sector28: {top:screen_height/3.5},
  result_sector29: {top:screen_height/3.7},
  result_sector210: {top:screen_height/3.98},
  result_sector211: {top:screen_height/4.25},
  result_sector212: {top:screen_height/4.5},
  result_sector213: {top:screen_height/4.85},
  result_sector214: {top:screen_height/5.35},
  result_sector215: {top:screen_height/5.8},
  result_sector216: {top:screen_height/6.35},
  result_sector217: {top:screen_height/7.2},
  result_sector218: {top:screen_height/8.1},
  result_sector219: {top:screen_height/9.25},
  result_sector220: {top:screen_height/25},
  result_sector221: {top:screen_height/40},
  result_sector222: {top:screen_height/100},

  //3번째 줄 결과 스타일
  // 2번 + 1칸
  result_sector323: {bottom:screen_height/1.645},

  //4번째 줄 결과 스타일
  // 2번과 동일

  //5번째 줄 결과 스타일
  // 3번과 동일

  //6번째 줄 결과 스타일
  // 2번과 동일

//7번째 줄 결과 스타일
//2번 - 2칸

//8번째 줄 결과 스타일
//2번째줄 -6 + 6칸
result_sector820: {top:screen_height/11.3},
result_sector821: {top:screen_height/13.5},
result_sector822: {top:screen_height/17},
result_sector823: {top:screen_height/25},
result_sector824: {top:screen_height/40},
result_sector825: {top:screen_height/100},


  // 주차면 스타일
  sector11 : {top:screen_height/1.826},
  sector12 : {top:screen_height/1.876},
  sector13 : {top:screen_height/1.929},
  sector14 : {top:screen_height/1.985},
  sector15 : {top:screen_height/2.075},
  sector16 : {top:screen_height/2.137},
  sector17 : {top:screen_height/2.205},
  sector18 : {top:screen_height/2.28},
  sector19 : {top:screen_height/2.387},
  sector110 : {top:screen_height/2.475},
  sector111 : {top:screen_height/2.57},
  sector112 : {top:screen_height/2.67},
  sector113 : {top:screen_height/2.825},
  sector114 : {top:screen_height/2.948},
  sector115 : {top:screen_height/3.08},
  sector116 : {top:screen_height/3.23},
  sector117 : {top:screen_height/4.43},
  sector118 : {top:screen_height/4.74},
  sector119 : {top:screen_height/5.09},
  sector120 : {top:screen_height/5.67},
  sector121 : {top:screen_height/6.17},
  sector122 : {top:screen_height/6.8},
  sector123 : {top:screen_height/12.7},
  sector124 : {top:screen_height/15.7},
  sector125 : {top:screen_height/20.5},

//2번째 라인
  sector21 : {top:screen_height/2.28},
  sector22 : {top:screen_height/2.387},
  sector23 : {top:screen_height/2.475},
  sector24 : {top:screen_height/2.57},
  sector25 : {top:screen_height/2.67},
  sector26 : {top:screen_height/2.825},
  sector27 : {top:screen_height/2.948},
  sector28 : {top:screen_height/3.08},
  sector29 : {top:screen_height/3.23},
  sector210 : {top:screen_height/3.45},
  sector211 : {top:screen_height/3.63},
  sector212 : {top:screen_height/3.84},
  sector213 : {top:screen_height/4.07},
  sector214 : {top:screen_height/4.43},
  sector215 : {top:screen_height/4.74},
  sector216 : {top:screen_height/5.09},
  sector217 : {top:screen_height/5.67},
  sector218 : {top:screen_height/6.17},
  sector219 : {top:screen_height/6.8},
  sector220 : {top:screen_height/12.7},
  sector221 : {top:screen_height/15.7},
  sector222 : {top:screen_height/20.5},

  //3번째 라인
  sector323 : {top:screen_height/34},

  //4번째 라인
  // 2번과 동일

  //5번쨰 라인
  // 2 + 3 번과 동일

  //6번째 라인
  // 2번과 동일

  //7번째 라인
  // 2번에서 2칸을 뺀 형태

  //8번째 라인
  // 2번에서 마지막부분에 6개 변경
  sector820 : {top:screen_height/7.83},
  sector821 : {top:screen_height/8.86},
  sector822 : {top:screen_height/10.2},
  sector823 : {top:screen_height/12.7},
  sector824 : {top:screen_height/15.7},
  sector825 : {top:screen_height/20.5},

  //장애인 구역
  handi1 : {left:screen_width/3.47},
  handi2 : {left:screen_width/3.1},
  handi3 : {left:screen_width/2.65},
  handi4 : {left:screen_width/2.42},
  handi5 : {left:screen_width/2.14},
  handi6 : {left:screen_width/1.995},
  handi7 : {left:screen_width/1.795},
  handi8 : {left:screen_width/1.69},
  handi9 : {left:screen_width/1.547},
  handi10 : {left:screen_width/1.47},
})
