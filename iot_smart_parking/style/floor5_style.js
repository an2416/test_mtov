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
    left:screen_width/6.9,
    width:screen_width/19.5,
    height:screen_height/78
  },
  sector2_style : {
    backgroundColor:'#20ff70',
    position:'absolute',
    borderColor:'white',
    borderWidth:1,
    left:screen_width/3.65,
    width:screen_width/19.5,
    height:screen_height/78
  },
  sector3_style : {
    backgroundColor:'#20ff70',
    position:'absolute',
    borderColor:'white',
    borderWidth:1,
    left:screen_width/3.05,
    width:screen_width/19.5,
    height:screen_height/78
  },

  sector4_style : {
    backgroundColor:'#20ff70',
    position:'absolute',
    borderColor:'white',
    borderWidth:1,
    left:screen_width/2.225,
    width:screen_width/19.5,
    height:screen_height/78
  },

  sector5_style : {
    backgroundColor:'#20ff70',
    position:'absolute',
    borderColor:'white',
    borderWidth:1,
    left:screen_width/1.99,
    width:screen_width/19.5,
    height:screen_height/78
  },
  sector6_style : {
    backgroundColor:'#20ff70',
    position:'absolute',
    borderColor:'white',
    borderWidth:1,
    left:screen_width/1.6,
    width:screen_width/19.5,
    height:screen_height/78
  },
  sector7_style : {
    backgroundColor:'#20ff70',
    position:'absolute',
    borderColor:'white',
    borderWidth:1.3,
    left:screen_width/1.475,
    width:screen_width/19.5,
    height:screen_height/78
  },

  sector8_style : {
    backgroundColor:'#20ff70',
    position:'absolute',
    borderColor:'white',
    borderWidth:1.3,
    left:screen_width/1.24,
    width:screen_width/19.5,
    height:screen_height/78
  },

  sector9_style : {
    backgroundColor:'#20ff70',
    position:'absolute',
    borderColor:'white',
    borderWidth:1.3,
    top:screen_width/18.5,
    width:screen_width/45,
    height:screen_height/35
  },

  handi_style : {
    backgroundColor:'#20ff70',
    position:'absolute',
    borderColor:'white',
    borderWidth:1.3,
    bottom:screen_height/6.2,
    width:screen_width/33,
    height:screen_height/35
  },


  sector1_result_style : {
    backgroundColor:'white',
    borderColor:'#15adad',
    borderWidth:1,
    width:screen_width/19.5,
    height:screen_height/75
  },

  sector8_result_style : {
    backgroundColor:'white',
    borderColor:'#15adad',
    borderWidth:1,
    width:screen_width/45,
    height:screen_height/35
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
    left:screen_width/11.5,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0)',
    width:screen_width/6,
    height:screen_height/11
  },
  result_container2:{
    left:screen_width/4.63,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0)',
    width:screen_width/6,
    height:screen_height/11
  },
  result_container3:{
    left:screen_width/3.74,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0)',
    width:screen_width/6,
    height:screen_height/11
  },
  result_container4:{
    left:screen_width/2.555,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0)',
    width:screen_width/6,
    height:screen_height/11
  },
  result_container5:{
    left:screen_width/2.255,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0)',
    width:screen_width/6,
    height:screen_height/11
  },
  result_container6:{
    left:screen_width/1.765,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0)',
    width:screen_width/6,
    height:screen_height/11
  },
  result_container7:{
    left:screen_width/1.615,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0)',
    width:screen_width/6,
    height:screen_height/11
  },
  result_container8:{
    left:screen_width/1.34,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0)',
    width:screen_width/6,
    height:screen_height/11
  },


  result_container9:{
    bottom:screen_height/1.371,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0)',
    width:screen_width/6,
    height:screen_height/11
  },


  sector11: {top:screen_height/1.817},
  sector12: {top:screen_height/1.865},
  sector13: {top:screen_height/1.918},
  sector14: {top:screen_height/1.975},
  sector15: {top:screen_height/2.055},
  sector16: {top:screen_height/2.115},
  sector17: {top:screen_height/2.182},
  sector18: {top:screen_height/2.254},


  sector19: {top:screen_height/2.358},
  sector110: {top:screen_height/2.44},
  sector111: {top:screen_height/2.53},
  sector112: {top:screen_height/2.625},
  sector113: {top:screen_height/2.775},
  sector114: {top:screen_height/2.89},
  sector115: {top:screen_height/3.015},
  sector116: {top:screen_height/3.15},


  sector117: {top:screen_height/4.25},
  sector118: {top:screen_height/4.53},
  sector119: {top:screen_height/4.86},
  sector120: {top:screen_height/5.35},
  sector121: {top:screen_height/5.79},
  sector122: {top:screen_height/6.32},

  sector123: {top:screen_height/7.21},
  sector124: {top:screen_height/8.05},
  sector125: {top:screen_height/9.15},
  sector126: {top:screen_height/11.15},
  sector127: {top:screen_height/13.2},
  sector128: {top:screen_height/16.45},


//2번째 라인
  sector21: {top:screen_height/1.755},
  sector22: {top:screen_height/1.817},
  sector23: {top:screen_height/1.865},
  sector24: {top:screen_height/1.918},
  sector25: {top:screen_height/1.975},
  sector26: {top:screen_height/2.055},
  sector27: {top:screen_height/2.115},
  sector28: {top:screen_height/2.182},
  sector29: {top:screen_height/2.254},

  sector210: {top:screen_height/2.358},
  sector211: {top:screen_height/2.44},
  sector212: {top:screen_height/2.53},
  sector213: {top:screen_height/2.625},
  sector214: {top:screen_height/2.775},
  sector215: {top:screen_height/2.89},
  sector216: {top:screen_height/3.015},
  sector217: {top:screen_height/3.15},
  sector218: {top:screen_height/3.36},
  sector219: {top:screen_height/3.53},
  sector220: {top:screen_height/3.72},
  sector221: {top:screen_height/3.94},

  sector222: {top:screen_height/4.25},
  sector223: {top:screen_height/4.53},
  sector224: {top:screen_height/4.86},
  sector225: {top:screen_height/5.35},
  sector226: {top:screen_height/5.79},
  sector227: {top:screen_height/6.32},
  sector228: {top:screen_height/7.21},
  sector229: {top:screen_height/8.05},
  sector230: {top:screen_height/9.15},

  //3번째 라인
  // 2번과 동일

  //4번째 라인
  //2번과 동일

  //5번째 라인
  //2번과 동일

  //6번째 라인
  //2번과 동일

  //7번째 라인
  //2번과 동일

  //8번째 라인
  sector81: {top:screen_height/1.63},
  sector82: {top:screen_height/1.67},
  sector83: {top:screen_height/1.712},
  sector831: {top:screen_height/11.15},
  sector832: {top:screen_height/13.25},
  sector833: {top:screen_height/16.4},

  //9번째 라인
  sector91 : {left:screen_width/4.98},
  sector92 : {left:screen_width/4.45},
  sector93 : {left:screen_width/3.99},
  sector94 : {left:screen_width/3.47},
  sector95 : {left:screen_width/3.205},
  sector96 : {left:screen_width/2.97},
  sector97 : {left:screen_width/2.66},
  sector98 : {left:screen_width/2.5},
  sector99 : {left:screen_width/2.355},
  sector910 : {left:screen_width/2.15},
  sector911 : {left:screen_width/2.04},
  sector912 : {left:screen_width/1.94},
  sector913 : {left:screen_width/1.81},
  sector914 : {left:screen_width/1.73},
  sector915 : {left:screen_width/1.66},
  sector916 : {left:screen_width/1.56},
  sector917 : {left:screen_width/1.505},
  sector918 : {left:screen_width/1.45},
  sector919 : {left:screen_width/1.374},
  sector920 : {left:screen_width/1.33},
  sector921 : {left:screen_width/1.286},

  //장애인석
  handi1 : {left:screen_width/4.88},
  handi2 : {left:screen_width/4.2},
  handi3 : {left:screen_width/3},
  handi4 : {left:screen_width/2.63},
  handi5 : {left:screen_width/2.415},
  handi6 : {left:screen_width/2.135},
  handi7 : {left:screen_width/1.99},
  handi8 : {left:screen_width/1.8},
  handi9 : {left:screen_width/1.695},
  handi10 : {left:screen_width/1.57},
  handi11 : {left:screen_width/1.365},
  handi12 : {left:screen_width/1.305},


  //결과 스타일
  result_sector11: {top:screen_height/1.955},
  result_sector12: {top:screen_height/2.01},
  result_sector13: {top:screen_height/2.075},
  result_sector14: {top:screen_height/2.135},
  result_sector15: {top:screen_height/2.235},
  result_sector16: {top:screen_height/2.305},
  result_sector17: {top:screen_height/2.385},
  result_sector18: {top:screen_height/2.47},
  result_sector19: {top:screen_height/2.597},
  result_sector110: {top:screen_height/2.699},
  result_sector111: {top:screen_height/2.809},
  result_sector112: {top:screen_height/2.923},
  result_sector113: {top:screen_height/3.109},
  result_sector114: {top:screen_height/3.255},
  result_sector115: {top:screen_height/3.415},
  result_sector116: {top:screen_height/3.595},
  result_sector117: {top:screen_height/5.095},
  result_sector118: {top:screen_height/5.495},
  result_sector119: {top:screen_height/5.99},
  result_sector120: {top:screen_height/6.77},
  result_sector121: {top:screen_height/7.5},
  result_sector122: {top:screen_height/8.43},
  result_sector123: {top:screen_height/10.03},
  result_sector124: {top:screen_height/11.81},
  result_sector125: {top:screen_height/14.06},
  result_sector126: {top:screen_height/19.8},
  result_sector127: {top:screen_height/28},
  result_sector128: {top:screen_height/45},

  result_sector21: {top:screen_height/1.88},
  result_sector22: {top:screen_height/1.955},
  result_sector23: {top:screen_height/2.01},
  result_sector24: {top:screen_height/2.075},
  result_sector25: {top:screen_height/2.135},
  result_sector26: {top:screen_height/2.235},
  result_sector27: {top:screen_height/2.305},
  result_sector28: {top:screen_height/2.385},
  result_sector29: {top:screen_height/2.47},
  result_sector210: {top:screen_height/2.597},
  result_sector211: {top:screen_height/2.699},
  result_sector212: {top:screen_height/2.809},
  result_sector213: {top:screen_height/2.923},
  result_sector214: {top:screen_height/3.109},
  result_sector215: {top:screen_height/3.255},
  result_sector216: {top:screen_height/3.415},
  result_sector217: {top:screen_height/3.595},
  result_sector218: {top:screen_height/3.86},
  result_sector219: {top:screen_height/4.1},
  result_sector220: {top:screen_height/4.35},
  result_sector221: {top:screen_height/4.66},
  result_sector222: {top:screen_height/5.095},
  result_sector223: {top:screen_height/5.495},
  result_sector224: {top:screen_height/5.99},
  result_sector225: {top:screen_height/6.77},
  result_sector226: {top:screen_height/7.5},
  result_sector227: {top:screen_height/8.43},
  result_sector228: {top:screen_height/10.03},
  result_sector229: {top:screen_height/11.81},
  result_sector230: {top:screen_height/14.06},

  result_sector81: {top:screen_height/1.74},
  result_sector82: {top:screen_height/1.786},
  result_sector83: {top:screen_height/1.834},
  result_sector834: {top:screen_height/19.8},
  result_sector835: {top:screen_height/28},
  result_sector836: {top:screen_height/45},

  result_sector91 : {left:screen_width/7.75},
  result_sector92 : {left:screen_width/6.55},
  result_sector93 : {left:screen_width/5.6},
  result_sector94 : {left:screen_width/4.6},
  result_sector95 : {left:screen_width/4.15},
  result_sector96 : {left:screen_width/3.75},
  result_sector97 : {left:screen_width/3.275},
  result_sector98 : {left:screen_width/3.05},
  result_sector99 : {left:screen_width/2.81},
  result_sector910 : {left:screen_width/2.55},
  result_sector911 : {left:screen_width/2.4},
  result_sector912 : {left:screen_width/2.26},
  result_sector913 : {left:screen_width/2.08},
  result_sector914 : {left:screen_width/1.977},
  result_sector915 : {left:screen_width/1.885},
  result_sector916 : {left:screen_width/1.758},
  result_sector917 : {left:screen_width/1.685},
  result_sector918 : {left:screen_width/1.62},
  result_sector919 : {left:screen_width/1.525},
  result_sector920 : {left:screen_width/1.465},
  result_sector921 : {left:screen_width/1.42},


});
