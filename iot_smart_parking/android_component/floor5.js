import React, { Component, } from 'react'
import {
  View,
  Image,
  Dimensions,
  Text,
  TouchableHighlight,
  Animated,
} from 'react-native'

//화면 비율
var screen_height = Dimensions.get('window').height;
var screen_width = Dimensions.get('window').width;

var floor5_style = require('../style/floor5_style');
var floor5_bfs = require('../path_bfs/floor5_bfs');
var floor5_path = require('../style/floor5_path_style');

import Svg,{Path} from 'react-native-svg';
import Spinner from 'react-native-loading-spinner-overlay'; // 로딩 화면

var server_ip = '192.168.1.104'

class Floor5 extends Component {
  constructor(props) {
    super(props);

    this._animateIn = this._animateIn.bind(this);
    this._animateOut = this._animateOut.bind(this);

    this.state = {
      loading_visible:false,
      search_btn:'안내 시작',
      sector1:'',
      sector2:'',
      sector3:'',
      sector4:'',
      sector5:'',
      sector6:'',
      sector7:'',
      sector8:'',
      sector9:'',
      handi:'',
      bounceValue: new Animated.Value(0),
      path:'',
    }
  }


  componentDidMount() {
    // Render함수 실행 후 주차 상태 표시
    this._onRefresh();
    this._animateIn();
  }

  _onRefresh() {
     this.setState({loading_visible: true},function() {
       fetch("http://" + server_ip + ":3000/mobile/floor5_state",{
           method:'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({

           })
         })
         .then((response)=>response.json())
         .then((responseData)=> {
           this.setState({
             sector1 : responseData.sector1,
             sector2 : responseData.sector2,
             sector3 : responseData.sector3,
             sector4 : responseData.sector4,
             sector5 : responseData.sector5,
             sector6 : responseData.sector6,
             sector7 : responseData.sector7,
             sector8 : responseData.sector8,
             sector9 : responseData.sector9,
             handi : responseData.handi
           }, function() {
             this.setState({loading_visible:false})
           })
         })
         .catch((error) => {
           this.setState({loading_visible: false}, function() {
             alert(error);
             throw(error);
           });
         });

     });
  }

  req_park() {
    if(this.state.search_btn=='안내 시작') {
      this.setState({loading_visible:true},function() {
        fetch("http://" + server_ip + ":3000/mobile/select_gate",{
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              floor:'5',
              gate:'2'
            })
          })
          .then((response)=>response.json())
          .then((responseData)=> {
            this.setState({loading_visible:false,search_btn:'안내 취소', result_line:responseData.result_line, result_sector:responseData.result_sector}, function() {
              floor5_bfs.floor5(0,21,parseInt(this.state.result_line),parseInt(this.state.result_sector), function(result) {
                var path_char = '';
                var result_line_temp = parseInt(this.state.result_line);
                console.log(this.state.result_line);
                for(var i=0;i<result.length;i++) {
                  floor5_path.floor5(result[i].x, result[i].y, screen_height, screen_width, parseInt(this.state.result_line), function(x,y,last_path,last_path_y) {
                    if(i==0) {
                      path_char = 'M' + x + ' ' + y;
                    }
                    else {
                      path_char += ' L' + x + ' ' + y;
                      if(i==result.length-1 && result_line_temp!='8') {
                        path_char += ' L' + last_path + ' ' + y;
                      }
                      else if(i==result.length-1 && result_line_temp=='8') {
                        console.log('last path : ' + last_path +'   ' + y);
                        path_char += ' L' + last_path + ' ' + last_path_y;
                      }
                    }
                  })
                }
                console.log(path_char);
                this.setState({
                  path : path_char
                })
                //alert(JSON.stringify(result) + '\n path : ' + path_char + '\n result length : ' + result.length + '\n result : ');
              }.bind(this))
            })
          })
          .catch((error) => {
            this.setState({loading_visible: false}, function() {
              alert(error);
              throw(error);
          });
        });
      })
    }
    else if(this.state.search_btn=='안내 취소') {
      this.setState({search_btn:'안내 시작', result_line:'',result_sector:'',path:''},function() {
      });
    }
  }

  // 애니메이션
  _animateIn() {
      Animated.spring(                          // Base: spring, decay, timing
        this.state.bounceValue,                 // Animate `bounceValue`
        {
          toValue: 1,                         // Animate to smaller size
          friction: 2,
          tension: 4
        }
      ).start(this._animateOut);                // Start the animation
  }

  _animateOut() {
   Animated.spring(                          // Base: spring, decay, timing
     this.state.bounceValue,                 // Animate `bounceValue`
     {
       toValue: 1.5,                         // Animate back
       friction: 2,
       tension:4
     }
   ).start(this._animateIn);                 // Start the animation
  }


  render() {

      //정의
      const animated_style = <Animated.View style={[floor5_style.circle,{left:screen_width/27,top:screen_height/55},{transform: [{scale: this.state.bounceValue}]}]}></Animated.View>
      const result_view_style = <View style={[floor5_style.sector1_result_style]}></View>

      const animated_style8 = <Animated.View style={[floor5_style.circle,{left:screen_width/27,top:screen_height/55},{transform: [{scale: this.state.bounceValue}]}]}></Animated.View>
      const result_view_style8 = <View style={[floor5_style.sector8_result_style]}></View>



      if((this.state.sector1).substr(0,1)=='N')
          var floor_5_sector11 = <View style={[floor5_style.sector1_style, floor5_style.sector11]}/>;
      if((this.state.sector1).substr(1,1)=='N')
          var floor_5_sector12 = <View style={[floor5_style.sector1_style, floor5_style.sector12]}/>;
      if((this.state.sector1).substr(2,1)=='N')
          var floor_5_sector13 = <View style={[floor5_style.sector1_style, floor5_style.sector13]}/>;
      if((this.state.sector1).substr(3,1)=='N')
          var floor_5_sector14 = <View style={[floor5_style.sector1_style, floor5_style.sector14]}/>;
      if((this.state.sector1).substr(4,1)=='N')
          var floor_5_sector15 = <View style={[floor5_style.sector1_style, floor5_style.sector15]}/>;
      if((this.state.sector1).substr(5,1)=='N')
          var floor_5_sector16 = <View style={[floor5_style.sector1_style, floor5_style.sector16]}/>;
      if((this.state.sector1).substr(6,1)=='N')
          var floor_5_sector17 = <View style={[floor5_style.sector1_style, floor5_style.sector17]}/>;
      if((this.state.sector1).substr(7,1)=='N')
          var floor_5_sector18 = <View style={[floor5_style.sector1_style, floor5_style.sector18]}/>;
      if((this.state.sector1).substr(8,1)=='N')
          var floor_5_sector19 = <View style={[floor5_style.sector1_style, floor5_style.sector19]}/>;
      if((this.state.sector1).substr(9,1)=='N')
          var floor_5_sector110 = <View style={[floor5_style.sector1_style, floor5_style.sector110]}/>;
      if((this.state.sector1).substr(10,1)=='N')
          var floor_5_sector111 = <View style={[floor5_style.sector1_style, floor5_style.sector111]}/>;
      if((this.state.sector1).substr(11,1)=='N')
          var floor_5_sector112 = <View style={[floor5_style.sector1_style, floor5_style.sector112]}/>;
      if((this.state.sector1).substr(12,1)=='N')
          var floor_5_sector113 = <View style={[floor5_style.sector1_style, floor5_style.sector113]}/>;
      if((this.state.sector1).substr(13,1)=='N')
          var floor_5_sector114 = <View style={[floor5_style.sector1_style, floor5_style.sector114]}/>;
      if((this.state.sector1).substr(14,1)=='N')
          var floor_5_sector115 = <View style={[floor5_style.sector1_style, floor5_style.sector115]}/>;
      if((this.state.sector1).substr(15,1)=='N')
          var floor_5_sector116 = <View style={[floor5_style.sector1_style, floor5_style.sector116]}/>;
      if((this.state.sector1).substr(16,1)=='N')
          var floor_5_sector117 = <View style={[floor5_style.sector1_style, floor5_style.sector117]}/>;
      if((this.state.sector1).substr(17,1)=='N')
          var floor_5_sector118 = <View style={[floor5_style.sector1_style, floor5_style.sector118]}/>;
      if((this.state.sector1).substr(18,1)=='N')
          var floor_5_sector119 = <View style={[floor5_style.sector1_style, floor5_style.sector119]}/>;
      if((this.state.sector1).substr(19,1)=='N')
          var floor_5_sector120 = <View style={[floor5_style.sector1_style, floor5_style.sector120]}/>;
      if((this.state.sector1).substr(20,1)=='N')
          var floor_5_sector121 = <View style={[floor5_style.sector1_style, floor5_style.sector121]}/>;
      if((this.state.sector1).substr(21,1)=='N')
          var floor_5_sector122 = <View style={[floor5_style.sector1_style, floor5_style.sector122]}/>;
      if((this.state.sector1).substr(22,1)=='N')
          var floor_5_sector123 = <View style={[floor5_style.sector1_style, floor5_style.sector123]}/>;
      if((this.state.sector1).substr(23,1)=='N')
          var floor_5_sector124 = <View style={[floor5_style.sector1_style, floor5_style.sector124]}/>;
      if((this.state.sector1).substr(24,1)=='N')
          var floor_5_sector125 = <View style={[floor5_style.sector1_style, floor5_style.sector125]}/>;
      if((this.state.sector1).substr(25,1)=='N')
          var floor_5_sector126 = <View style={[floor5_style.sector1_style, floor5_style.sector126]}/>;
      if((this.state.sector1).substr(26,1)=='N')
          var floor_5_sector127 = <View style={[floor5_style.sector1_style, floor5_style.sector127]}/>;
      if((this.state.sector1).substr(27,1)=='N')
          var floor_5_sector128 = <View style={[floor5_style.sector1_style, floor5_style.sector128]}/>;

      // 2번째 라인
      if((this.state.sector2).substr(0,1)=='N')
          var floor_5_sector21 = <View style={[floor5_style.sector2_style, floor5_style.sector21]}/>;
      if((this.state.sector2).substr(1,1)=='N')
          var floor_5_sector22 = <View style={[floor5_style.sector2_style, floor5_style.sector22]}/>;
      if((this.state.sector2).substr(2,1)=='N')
          var floor_5_sector23 = <View style={[floor5_style.sector2_style, floor5_style.sector23]}/>;
      if((this.state.sector2).substr(3,1)=='N')
          var floor_5_sector24 = <View style={[floor5_style.sector2_style, floor5_style.sector24]}/>;
      if((this.state.sector2).substr(4,1)=='N')
          var floor_5_sector25 = <View style={[floor5_style.sector2_style, floor5_style.sector25]}/>;
      if((this.state.sector2).substr(5,1)=='N')
          var floor_5_sector26 = <View style={[floor5_style.sector2_style, floor5_style.sector26]}/>;
      if((this.state.sector2).substr(6,1)=='N')
          var floor_5_sector27 = <View style={[floor5_style.sector2_style, floor5_style.sector27]}/>;
      if((this.state.sector2).substr(7,1)=='N')
          var floor_5_sector28 = <View style={[floor5_style.sector2_style, floor5_style.sector28]}/>;
      if((this.state.sector2).substr(8,1)=='N')
          var floor_5_sector29 = <View style={[floor5_style.sector2_style, floor5_style.sector29]}/>;
      if((this.state.sector2).substr(9,1)=='N')
          var floor_5_sector210 = <View style={[floor5_style.sector2_style, floor5_style.sector210]}/>;
      if((this.state.sector2).substr(10,1)=='N')
          var floor_5_sector211 = <View style={[floor5_style.sector2_style, floor5_style.sector211]}/>;
      if((this.state.sector2).substr(11,1)=='N')
          var floor_5_sector212 = <View style={[floor5_style.sector2_style, floor5_style.sector212]}/>;
      if((this.state.sector2).substr(12,1)=='N')
          var floor_5_sector213 = <View style={[floor5_style.sector2_style, floor5_style.sector213]}/>;
      if((this.state.sector2).substr(13,1)=='N')
          var floor_5_sector214 = <View style={[floor5_style.sector2_style, floor5_style.sector214]}/>;
      if((this.state.sector2).substr(14,1)=='N')
          var floor_5_sector215 = <View style={[floor5_style.sector2_style, floor5_style.sector215]}/>;
      if((this.state.sector2).substr(15,1)=='N')
          var floor_5_sector216 = <View style={[floor5_style.sector2_style, floor5_style.sector216]}/>;
      if((this.state.sector2).substr(16,1)=='N')
          var floor_5_sector217 = <View style={[floor5_style.sector2_style, floor5_style.sector217]}/>;
      if((this.state.sector2).substr(17,1)=='N')
          var floor_5_sector218 = <View style={[floor5_style.sector2_style, floor5_style.sector218]}/>;
      if((this.state.sector2).substr(18,1)=='N')
          var floor_5_sector219 = <View style={[floor5_style.sector2_style, floor5_style.sector219]}/>;
      if((this.state.sector2).substr(19,1)=='N')
          var floor_5_sector220 = <View style={[floor5_style.sector2_style, floor5_style.sector220]}/>;
      if((this.state.sector2).substr(20,1)=='N')
          var floor_5_sector221 = <View style={[floor5_style.sector2_style, floor5_style.sector221]}/>;
      if((this.state.sector2).substr(21,1)=='N')
          var floor_5_sector222 = <View style={[floor5_style.sector2_style, floor5_style.sector222]}/>;
      if((this.state.sector2).substr(22,1)=='N')
          var floor_5_sector223 = <View style={[floor5_style.sector2_style, floor5_style.sector223]}/>;
      if((this.state.sector2).substr(23,1)=='N')
          var floor_5_sector224 = <View style={[floor5_style.sector2_style, floor5_style.sector224]}/>;
      if((this.state.sector2).substr(24,1)=='N')
          var floor_5_sector225 = <View style={[floor5_style.sector2_style, floor5_style.sector225]}/>;
      if((this.state.sector2).substr(25,1)=='N')
          var floor_5_sector226 = <View style={[floor5_style.sector2_style, floor5_style.sector226]}/>;
      if((this.state.sector2).substr(26,1)=='N')
          var floor_5_sector227 = <View style={[floor5_style.sector2_style, floor5_style.sector227]}/>;
      if((this.state.sector2).substr(27,1)=='N')
          var floor_5_sector228 = <View style={[floor5_style.sector2_style, floor5_style.sector228]}/>;
      if((this.state.sector2).substr(28,1)=='N')
          var floor_5_sector229 = <View style={[floor5_style.sector2_style, floor5_style.sector229]}/>;
      if((this.state.sector2).substr(29,1)=='N')
          var floor_5_sector230 = <View style={[floor5_style.sector2_style, floor5_style.sector230]}/>;

      // 3번째 라인
      if((this.state.sector3).substr(0,1)=='N')
          var floor_5_sector31 = <View style={[floor5_style.sector3_style, floor5_style.sector21]}/>;
      if((this.state.sector3).substr(1,1)=='N')
          var floor_5_sector32 = <View style={[floor5_style.sector3_style, floor5_style.sector22]}/>;
      if((this.state.sector3).substr(2,1)=='N')
          var floor_5_sector33 = <View style={[floor5_style.sector3_style, floor5_style.sector23]}/>;
      if((this.state.sector3).substr(3,1)=='N')
          var floor_5_sector34 = <View style={[floor5_style.sector3_style, floor5_style.sector24]}/>;
      if((this.state.sector3).substr(4,1)=='N')
          var floor_5_sector35 = <View style={[floor5_style.sector3_style, floor5_style.sector25]}/>;
      if((this.state.sector3).substr(5,1)=='N')
          var floor_5_sector36 = <View style={[floor5_style.sector3_style, floor5_style.sector26]}/>;
      if((this.state.sector3).substr(6,1)=='N')
          var floor_5_sector37 = <View style={[floor5_style.sector3_style, floor5_style.sector27]}/>;
      if((this.state.sector3).substr(7,1)=='N')
          var floor_5_sector38 = <View style={[floor5_style.sector3_style, floor5_style.sector28]}/>;
      if((this.state.sector3).substr(8,1)=='N')
          var floor_5_sector39 = <View style={[floor5_style.sector3_style, floor5_style.sector29]}/>;
      if((this.state.sector3).substr(9,1)=='N')
          var floor_5_sector310 = <View style={[floor5_style.sector3_style, floor5_style.sector210]}/>;
      if((this.state.sector3).substr(10,1)=='N')
          var floor_5_sector311 = <View style={[floor5_style.sector3_style, floor5_style.sector211]}/>;
      if((this.state.sector3).substr(11,1)=='N')
          var floor_5_sector312 = <View style={[floor5_style.sector3_style, floor5_style.sector212]}/>;
      if((this.state.sector3).substr(12,1)=='N')
          var floor_5_sector313 = <View style={[floor5_style.sector3_style, floor5_style.sector213]}/>;
      if((this.state.sector3).substr(13,1)=='N')
          var floor_5_sector314 = <View style={[floor5_style.sector3_style, floor5_style.sector214]}/>;
      if((this.state.sector3).substr(14,1)=='N')
          var floor_5_sector315 = <View style={[floor5_style.sector3_style, floor5_style.sector215]}/>;
      if((this.state.sector3).substr(15,1)=='N')
          var floor_5_sector316 = <View style={[floor5_style.sector3_style, floor5_style.sector216]}/>;
      if((this.state.sector3).substr(16,1)=='N')
          var floor_5_sector317 = <View style={[floor5_style.sector3_style, floor5_style.sector217]}/>;
      if((this.state.sector3).substr(17,1)=='N')
          var floor_5_sector318 = <View style={[floor5_style.sector3_style, floor5_style.sector218]}/>;
      if((this.state.sector3).substr(18,1)=='N')
          var floor_5_sector319 = <View style={[floor5_style.sector3_style, floor5_style.sector219]}/>;
      if((this.state.sector3).substr(19,1)=='N')
          var floor_5_sector320 = <View style={[floor5_style.sector3_style, floor5_style.sector220]}/>;
      if((this.state.sector3).substr(20,1)=='N')
          var floor_5_sector321 = <View style={[floor5_style.sector3_style, floor5_style.sector221]}/>;
      if((this.state.sector3).substr(21,1)=='N')
          var floor_5_sector322 = <View style={[floor5_style.sector3_style, floor5_style.sector222]}/>;
      if((this.state.sector3).substr(22,1)=='N')
          var floor_5_sector323 = <View style={[floor5_style.sector3_style, floor5_style.sector223]}/>;
      if((this.state.sector3).substr(23,1)=='N')
          var floor_5_sector324 = <View style={[floor5_style.sector3_style, floor5_style.sector224]}/>;
      if((this.state.sector3).substr(24,1)=='N')
          var floor_5_sector325 = <View style={[floor5_style.sector3_style, floor5_style.sector225]}/>;
      if((this.state.sector3).substr(25,1)=='N')
          var floor_5_sector326 = <View style={[floor5_style.sector3_style, floor5_style.sector226]}/>;
      if((this.state.sector3).substr(26,1)=='N')
          var floor_5_sector327 = <View style={[floor5_style.sector3_style, floor5_style.sector227]}/>;
      if((this.state.sector3).substr(27,1)=='N')
          var floor_5_sector328 = <View style={[floor5_style.sector3_style, floor5_style.sector228]}/>;
      if((this.state.sector3).substr(28,1)=='N')
          var floor_5_sector329 = <View style={[floor5_style.sector3_style, floor5_style.sector229]}/>;
      if((this.state.sector3).substr(29,1)=='N')
          var floor_5_sector330 = <View style={[floor5_style.sector3_style, floor5_style.sector230]}/>;


      // 4번째 라인
      if((this.state.sector4).substr(0,1)=='N')
          var floor_5_sector41 = <View style={[floor5_style.sector4_style, floor5_style.sector21]}/>;
      if((this.state.sector4).substr(1,1)=='N')
          var floor_5_sector42 = <View style={[floor5_style.sector4_style, floor5_style.sector22]}/>;
      if((this.state.sector4).substr(2,1)=='N')
          var floor_5_sector43 = <View style={[floor5_style.sector4_style, floor5_style.sector23]}/>;
      if((this.state.sector4).substr(3,1)=='N')
          var floor_5_sector44 = <View style={[floor5_style.sector4_style, floor5_style.sector24]}/>;
      if((this.state.sector4).substr(4,1)=='N')
          var floor_5_sector45 = <View style={[floor5_style.sector4_style, floor5_style.sector25]}/>;
      if((this.state.sector4).substr(5,1)=='N')
          var floor_5_sector46 = <View style={[floor5_style.sector4_style, floor5_style.sector26]}/>;
      if((this.state.sector4).substr(6,1)=='N')
          var floor_5_sector47 = <View style={[floor5_style.sector4_style, floor5_style.sector27]}/>;
      if((this.state.sector4).substr(7,1)=='N')
          var floor_5_sector48 = <View style={[floor5_style.sector4_style, floor5_style.sector28]}/>;
      if((this.state.sector4).substr(8,1)=='N')
          var floor_5_sector49 = <View style={[floor5_style.sector4_style, floor5_style.sector29]}/>;
      if((this.state.sector4).substr(9,1)=='N')
          var floor_5_sector410 = <View style={[floor5_style.sector4_style, floor5_style.sector210]}/>;
      if((this.state.sector4).substr(10,1)=='N')
          var floor_5_sector411 = <View style={[floor5_style.sector4_style, floor5_style.sector211]}/>;
      if((this.state.sector4).substr(11,1)=='N')
          var floor_5_sector412 = <View style={[floor5_style.sector4_style, floor5_style.sector212]}/>;
      if((this.state.sector4).substr(12,1)=='N')
          var floor_5_sector413 = <View style={[floor5_style.sector4_style, floor5_style.sector213]}/>;
      if((this.state.sector4).substr(13,1)=='N')
          var floor_5_sector414 = <View style={[floor5_style.sector4_style, floor5_style.sector214]}/>;
      if((this.state.sector4).substr(14,1)=='N')
          var floor_5_sector415 = <View style={[floor5_style.sector4_style, floor5_style.sector215]}/>;
      if((this.state.sector4).substr(15,1)=='N')
          var floor_5_sector416 = <View style={[floor5_style.sector4_style, floor5_style.sector216]}/>;
      if((this.state.sector4).substr(16,1)=='N')
          var floor_5_sector417 = <View style={[floor5_style.sector4_style, floor5_style.sector217]}/>;
      if((this.state.sector4).substr(17,1)=='N')
          var floor_5_sector418 = <View style={[floor5_style.sector4_style, floor5_style.sector218]}/>;
      if((this.state.sector4).substr(18,1)=='N')
          var floor_5_sector419 = <View style={[floor5_style.sector4_style, floor5_style.sector219]}/>;
      if((this.state.sector4).substr(19,1)=='N')
          var floor_5_sector420 = <View style={[floor5_style.sector4_style, floor5_style.sector220]}/>;
      if((this.state.sector4).substr(20,1)=='N')
          var floor_5_sector421 = <View style={[floor5_style.sector4_style, floor5_style.sector221]}/>;
      if((this.state.sector4).substr(21,1)=='N')
          var floor_5_sector422 = <View style={[floor5_style.sector4_style, floor5_style.sector222]}/>;
      if((this.state.sector4).substr(22,1)=='N')
          var floor_5_sector423 = <View style={[floor5_style.sector4_style, floor5_style.sector223]}/>;
      if((this.state.sector4).substr(23,1)=='N')
          var floor_5_sector424 = <View style={[floor5_style.sector4_style, floor5_style.sector224]}/>;
      if((this.state.sector4).substr(24,1)=='N')
          var floor_5_sector425 = <View style={[floor5_style.sector4_style, floor5_style.sector225]}/>;
      if((this.state.sector4).substr(25,1)=='N')
          var floor_5_sector426 = <View style={[floor5_style.sector4_style, floor5_style.sector226]}/>;
      if((this.state.sector4).substr(26,1)=='N')
          var floor_5_sector427 = <View style={[floor5_style.sector4_style, floor5_style.sector227]}/>;
      if((this.state.sector4).substr(27,1)=='N')
          var floor_5_sector428 = <View style={[floor5_style.sector4_style, floor5_style.sector228]}/>;
      if((this.state.sector4).substr(28,1)=='N')
          var floor_5_sector429 = <View style={[floor5_style.sector4_style, floor5_style.sector229]}/>;
      if((this.state.sector4).substr(29,1)=='N')
          var floor_5_sector430 = <View style={[floor5_style.sector4_style, floor5_style.sector230]}/>;

      // 5번째 라인
      if((this.state.sector5).substr(0,1)=='N')
          var floor_5_sector51 = <View style={[floor5_style.sector5_style, floor5_style.sector21]}/>;
      if((this.state.sector5).substr(1,1)=='N')
          var floor_5_sector52 = <View style={[floor5_style.sector5_style, floor5_style.sector22]}/>;
      if((this.state.sector5).substr(2,1)=='N')
          var floor_5_sector53 = <View style={[floor5_style.sector5_style, floor5_style.sector23]}/>;
      if((this.state.sector5).substr(3,1)=='N')
          var floor_5_sector54 = <View style={[floor5_style.sector5_style, floor5_style.sector24]}/>;
      if((this.state.sector5).substr(4,1)=='N')
          var floor_5_sector55 = <View style={[floor5_style.sector5_style, floor5_style.sector25]}/>;
      if((this.state.sector5).substr(5,1)=='N')
          var floor_5_sector56 = <View style={[floor5_style.sector5_style, floor5_style.sector26]}/>;
      if((this.state.sector5).substr(6,1)=='N')
          var floor_5_sector57 = <View style={[floor5_style.sector5_style, floor5_style.sector27]}/>;
      if((this.state.sector5).substr(7,1)=='N')
          var floor_5_sector58 = <View style={[floor5_style.sector5_style, floor5_style.sector28]}/>;
      if((this.state.sector5).substr(8,1)=='N')
          var floor_5_sector59 = <View style={[floor5_style.sector5_style, floor5_style.sector29]}/>;
      if((this.state.sector5).substr(9,1)=='N')
          var floor_5_sector510 = <View style={[floor5_style.sector5_style, floor5_style.sector210]}/>;
      if((this.state.sector5).substr(10,1)=='N')
          var floor_5_sector511 = <View style={[floor5_style.sector5_style, floor5_style.sector211]}/>;
      if((this.state.sector5).substr(11,1)=='N')
          var floor_5_sector512 = <View style={[floor5_style.sector5_style, floor5_style.sector212]}/>;
      if((this.state.sector5).substr(12,1)=='N')
          var floor_5_sector513 = <View style={[floor5_style.sector5_style, floor5_style.sector213]}/>;
      if((this.state.sector5).substr(13,1)=='N')
          var floor_5_sector514 = <View style={[floor5_style.sector5_style, floor5_style.sector214]}/>;
      if((this.state.sector5).substr(14,1)=='N')
          var floor_5_sector515 = <View style={[floor5_style.sector5_style, floor5_style.sector215]}/>;
      if((this.state.sector5).substr(15,1)=='N')
          var floor_5_sector516 = <View style={[floor5_style.sector5_style, floor5_style.sector216]}/>;
      if((this.state.sector5).substr(16,1)=='N')
          var floor_5_sector517 = <View style={[floor5_style.sector5_style, floor5_style.sector217]}/>;
      if((this.state.sector5).substr(17,1)=='N')
          var floor_5_sector518 = <View style={[floor5_style.sector5_style, floor5_style.sector218]}/>;
      if((this.state.sector5).substr(18,1)=='N')
          var floor_5_sector519 = <View style={[floor5_style.sector5_style, floor5_style.sector219]}/>;
      if((this.state.sector5).substr(19,1)=='N')
          var floor_5_sector520 = <View style={[floor5_style.sector5_style, floor5_style.sector220]}/>;
      if((this.state.sector5).substr(20,1)=='N')
          var floor_5_sector521 = <View style={[floor5_style.sector5_style, floor5_style.sector221]}/>;
      if((this.state.sector5).substr(21,1)=='N')
          var floor_5_sector522 = <View style={[floor5_style.sector5_style, floor5_style.sector222]}/>;
      if((this.state.sector5).substr(22,1)=='N')
          var floor_5_sector523 = <View style={[floor5_style.sector5_style, floor5_style.sector223]}/>;
      if((this.state.sector5).substr(23,1)=='N')
          var floor_5_sector524 = <View style={[floor5_style.sector5_style, floor5_style.sector224]}/>;
      if((this.state.sector5).substr(24,1)=='N')
          var floor_5_sector525 = <View style={[floor5_style.sector5_style, floor5_style.sector225]}/>;
      if((this.state.sector5).substr(25,1)=='N')
          var floor_5_sector526 = <View style={[floor5_style.sector5_style, floor5_style.sector226]}/>;
      if((this.state.sector5).substr(26,1)=='N')
          var floor_5_sector527 = <View style={[floor5_style.sector5_style, floor5_style.sector227]}/>;
      if((this.state.sector5).substr(27,1)=='N')
          var floor_5_sector528 = <View style={[floor5_style.sector5_style, floor5_style.sector228]}/>;
      if((this.state.sector5).substr(28,1)=='N')
          var floor_5_sector529 = <View style={[floor5_style.sector5_style, floor5_style.sector229]}/>;
      if((this.state.sector5).substr(29,1)=='N')
          var floor_5_sector530 = <View style={[floor5_style.sector5_style, floor5_style.sector230]}/>;


      // 6번째 라인
      if((this.state.sector6).substr(0,1)=='N')
          var floor_5_sector61 = <View style={[floor5_style.sector6_style, floor5_style.sector21]}/>;
      if((this.state.sector6).substr(1,1)=='N')
          var floor_5_sector62 = <View style={[floor5_style.sector6_style, floor5_style.sector22]}/>;
      if((this.state.sector6).substr(2,1)=='N')
          var floor_5_sector63 = <View style={[floor5_style.sector6_style, floor5_style.sector23]}/>;
      if((this.state.sector6).substr(3,1)=='N')
          var floor_5_sector64 = <View style={[floor5_style.sector6_style, floor5_style.sector24]}/>;
      if((this.state.sector6).substr(4,1)=='N')
          var floor_5_sector65 = <View style={[floor5_style.sector6_style, floor5_style.sector25]}/>;
      if((this.state.sector6).substr(5,1)=='N')
          var floor_5_sector66 = <View style={[floor5_style.sector6_style, floor5_style.sector26]}/>;
      if((this.state.sector6).substr(6,1)=='N')
          var floor_5_sector67 = <View style={[floor5_style.sector6_style, floor5_style.sector27]}/>;
      if((this.state.sector6).substr(7,1)=='N')
          var floor_5_sector68 = <View style={[floor5_style.sector6_style, floor5_style.sector28]}/>;
      if((this.state.sector6).substr(8,1)=='N')
          var floor_5_sector69 = <View style={[floor5_style.sector6_style, floor5_style.sector29]}/>;
      if((this.state.sector6).substr(9,1)=='N')
          var floor_5_sector610 = <View style={[floor5_style.sector6_style, floor5_style.sector210]}/>;
      if((this.state.sector6).substr(10,1)=='N')
          var floor_5_sector611 = <View style={[floor5_style.sector6_style, floor5_style.sector211]}/>;
      if((this.state.sector6).substr(11,1)=='N')
          var floor_5_sector612 = <View style={[floor5_style.sector6_style, floor5_style.sector212]}/>;
      if((this.state.sector6).substr(12,1)=='N')
          var floor_5_sector613 = <View style={[floor5_style.sector6_style, floor5_style.sector213]}/>;
      if((this.state.sector6).substr(13,1)=='N')
          var floor_5_sector614 = <View style={[floor5_style.sector6_style, floor5_style.sector214]}/>;
      if((this.state.sector6).substr(14,1)=='N')
          var floor_5_sector615 = <View style={[floor5_style.sector6_style, floor5_style.sector215]}/>;
      if((this.state.sector6).substr(15,1)=='N')
          var floor_5_sector616 = <View style={[floor5_style.sector6_style, floor5_style.sector216]}/>;
      if((this.state.sector6).substr(16,1)=='N')
          var floor_5_sector617 = <View style={[floor5_style.sector6_style, floor5_style.sector217]}/>;
      if((this.state.sector6).substr(17,1)=='N')
          var floor_5_sector618 = <View style={[floor5_style.sector6_style, floor5_style.sector218]}/>;
      if((this.state.sector6).substr(18,1)=='N')
          var floor_5_sector619 = <View style={[floor5_style.sector6_style, floor5_style.sector219]}/>;
      if((this.state.sector6).substr(19,1)=='N')
          var floor_5_sector620 = <View style={[floor5_style.sector6_style, floor5_style.sector220]}/>;
      if((this.state.sector6).substr(20,1)=='N')
          var floor_5_sector621 = <View style={[floor5_style.sector6_style, floor5_style.sector221]}/>;
      if((this.state.sector6).substr(21,1)=='N')
          var floor_5_sector622 = <View style={[floor5_style.sector6_style, floor5_style.sector222]}/>;
      if((this.state.sector6).substr(22,1)=='N')
          var floor_5_sector623 = <View style={[floor5_style.sector6_style, floor5_style.sector223]}/>;
      if((this.state.sector6).substr(23,1)=='N')
          var floor_5_sector624 = <View style={[floor5_style.sector6_style, floor5_style.sector224]}/>;
      if((this.state.sector6).substr(24,1)=='N')
          var floor_5_sector625 = <View style={[floor5_style.sector6_style, floor5_style.sector225]}/>;
      if((this.state.sector6).substr(25,1)=='N')
          var floor_5_sector626 = <View style={[floor5_style.sector6_style, floor5_style.sector226]}/>;
      if((this.state.sector6).substr(26,1)=='N')
          var floor_5_sector627 = <View style={[floor5_style.sector6_style, floor5_style.sector227]}/>;
      if((this.state.sector6).substr(27,1)=='N')
          var floor_5_sector628 = <View style={[floor5_style.sector6_style, floor5_style.sector228]}/>;
      if((this.state.sector6).substr(28,1)=='N')
          var floor_5_sector629 = <View style={[floor5_style.sector6_style, floor5_style.sector229]}/>;
      if((this.state.sector6).substr(29,1)=='N')
          var floor_5_sector630 = <View style={[floor5_style.sector6_style, floor5_style.sector230]}/>;

      // 7번째 라인
      if((this.state.sector7).substr(0,1)=='N')
          var floor_5_sector71 = <View style={[floor5_style.sector7_style, floor5_style.sector21]}/>;
      if((this.state.sector7).substr(1,1)=='N')
          var floor_5_sector72 = <View style={[floor5_style.sector7_style, floor5_style.sector22]}/>;
      if((this.state.sector7).substr(2,1)=='N')
          var floor_5_sector73 = <View style={[floor5_style.sector7_style, floor5_style.sector23]}/>;
      if((this.state.sector7).substr(3,1)=='N')
          var floor_5_sector74 = <View style={[floor5_style.sector7_style, floor5_style.sector24]}/>;
      if((this.state.sector7).substr(4,1)=='N')
          var floor_5_sector75 = <View style={[floor5_style.sector7_style, floor5_style.sector25]}/>;
      if((this.state.sector7).substr(5,1)=='N')
          var floor_5_sector76 = <View style={[floor5_style.sector7_style, floor5_style.sector26]}/>;
      if((this.state.sector7).substr(6,1)=='N')
          var floor_5_sector77 = <View style={[floor5_style.sector7_style, floor5_style.sector27]}/>;
      if((this.state.sector7).substr(7,1)=='N')
          var floor_5_sector78 = <View style={[floor5_style.sector7_style, floor5_style.sector28]}/>;
      if((this.state.sector7).substr(8,1)=='N')
          var floor_5_sector79 = <View style={[floor5_style.sector7_style, floor5_style.sector29]}/>;
      if((this.state.sector7).substr(9,1)=='N')
          var floor_5_sector710 = <View style={[floor5_style.sector7_style, floor5_style.sector210]}/>;
      if((this.state.sector7).substr(10,1)=='N')
          var floor_5_sector711 = <View style={[floor5_style.sector7_style, floor5_style.sector211]}/>;
      if((this.state.sector7).substr(11,1)=='N')
          var floor_5_sector712 = <View style={[floor5_style.sector7_style, floor5_style.sector212]}/>;
      if((this.state.sector7).substr(12,1)=='N')
          var floor_5_sector713 = <View style={[floor5_style.sector7_style, floor5_style.sector213]}/>;
      if((this.state.sector7).substr(13,1)=='N')
          var floor_5_sector714 = <View style={[floor5_style.sector7_style, floor5_style.sector214]}/>;
      if((this.state.sector7).substr(14,1)=='N')
          var floor_5_sector715 = <View style={[floor5_style.sector7_style, floor5_style.sector215]}/>;
      if((this.state.sector7).substr(15,1)=='N')
          var floor_5_sector716 = <View style={[floor5_style.sector7_style, floor5_style.sector216]}/>;
      if((this.state.sector7).substr(16,1)=='N')
          var floor_5_sector717 = <View style={[floor5_style.sector7_style, floor5_style.sector217]}/>;
      if((this.state.sector7).substr(17,1)=='N')
          var floor_5_sector718 = <View style={[floor5_style.sector7_style, floor5_style.sector218]}/>;
      if((this.state.sector7).substr(18,1)=='N')
          var floor_5_sector719 = <View style={[floor5_style.sector7_style, floor5_style.sector219]}/>;
      if((this.state.sector7).substr(19,1)=='N')
          var floor_5_sector720 = <View style={[floor5_style.sector7_style, floor5_style.sector220]}/>;
      if((this.state.sector7).substr(20,1)=='N')
          var floor_5_sector721 = <View style={[floor5_style.sector7_style, floor5_style.sector221]}/>;
      if((this.state.sector7).substr(21,1)=='N')
          var floor_5_sector722 = <View style={[floor5_style.sector7_style, floor5_style.sector222]}/>;
      if((this.state.sector7).substr(22,1)=='N')
          var floor_5_sector723 = <View style={[floor5_style.sector7_style, floor5_style.sector223]}/>;
      if((this.state.sector7).substr(23,1)=='N')
          var floor_5_sector724 = <View style={[floor5_style.sector7_style, floor5_style.sector224]}/>;
      if((this.state.sector7).substr(24,1)=='N')
          var floor_5_sector725 = <View style={[floor5_style.sector7_style, floor5_style.sector225]}/>;
      if((this.state.sector7).substr(25,1)=='N')
          var floor_5_sector726 = <View style={[floor5_style.sector7_style, floor5_style.sector226]}/>;
      if((this.state.sector7).substr(26,1)=='N')
          var floor_5_sector727 = <View style={[floor5_style.sector7_style, floor5_style.sector227]}/>;
      if((this.state.sector7).substr(27,1)=='N')
          var floor_5_sector728 = <View style={[floor5_style.sector7_style, floor5_style.sector228]}/>;
      if((this.state.sector7).substr(28,1)=='N')
          var floor_5_sector729 = <View style={[floor5_style.sector7_style, floor5_style.sector229]}/>;
      if((this.state.sector7).substr(29,1)=='N')
          var floor_5_sector730 = <View style={[floor5_style.sector7_style, floor5_style.sector230]}/>;


      // 8번째 라인
      if((this.state.sector8).substr(0,1)=='N')
          var floor_5_sector81 = <View style={[floor5_style.sector8_style, floor5_style.sector81]}/>;
      if((this.state.sector8).substr(1,1)=='N')
          var floor_5_sector82 = <View style={[floor5_style.sector8_style, floor5_style.sector82]}/>;
      if((this.state.sector8).substr(2,1)=='N')
          var floor_5_sector83 = <View style={[floor5_style.sector8_style, floor5_style.sector83]}/>;
      if((this.state.sector8).substr(3,1)=='N')
          var floor_5_sector84 = <View style={[floor5_style.sector8_style, floor5_style.sector21]}/>;
      if((this.state.sector8).substr(4,1)=='N')
          var floor_5_sector85 = <View style={[floor5_style.sector8_style, floor5_style.sector22]}/>;
      if((this.state.sector8).substr(5,1)=='N')
          var floor_5_sector86 = <View style={[floor5_style.sector8_style, floor5_style.sector23]}/>;
      if((this.state.sector8).substr(6,1)=='N')
          var floor_5_sector87 = <View style={[floor5_style.sector8_style, floor5_style.sector24]}/>;
      if((this.state.sector8).substr(7,1)=='N')
          var floor_5_sector88 = <View style={[floor5_style.sector8_style, floor5_style.sector25]}/>;
      if((this.state.sector8).substr(8,1)=='N')
          var floor_5_sector89 = <View style={[floor5_style.sector8_style, floor5_style.sector26]}/>;
      if((this.state.sector8).substr(9,1)=='N')
          var floor_5_sector810 = <View style={[floor5_style.sector8_style, floor5_style.sector27]}/>;
      if((this.state.sector8).substr(10,1)=='N')
          var floor_5_sector811 = <View style={[floor5_style.sector8_style, floor5_style.sector28]}/>;
      if((this.state.sector8).substr(11,1)=='N')
          var floor_5_sector812 = <View style={[floor5_style.sector8_style, floor5_style.sector29]}/>;
      if((this.state.sector8).substr(12,1)=='N')
          var floor_5_sector813 = <View style={[floor5_style.sector8_style, floor5_style.sector210]}/>;
      if((this.state.sector8).substr(13,1)=='N')
          var floor_5_sector814 = <View style={[floor5_style.sector8_style, floor5_style.sector211]}/>;
      if((this.state.sector8).substr(14,1)=='N')
          var floor_5_sector815 = <View style={[floor5_style.sector8_style, floor5_style.sector212]}/>;
      if((this.state.sector8).substr(15,1)=='N')
          var floor_5_sector816 = <View style={[floor5_style.sector8_style, floor5_style.sector213]}/>;
      if((this.state.sector8).substr(16,1)=='N')
          var floor_5_sector817 = <View style={[floor5_style.sector8_style, floor5_style.sector214]}/>;
      if((this.state.sector8).substr(17,1)=='N')
          var floor_5_sector818 = <View style={[floor5_style.sector8_style, floor5_style.sector215]}/>;
      if((this.state.sector8).substr(18,1)=='N')
          var floor_5_sector819 = <View style={[floor5_style.sector8_style, floor5_style.sector216]}/>;
      if((this.state.sector8).substr(19,1)=='N')
          var floor_5_sector820 = <View style={[floor5_style.sector8_style, floor5_style.sector217]}/>;
      if((this.state.sector8).substr(20,1)=='N')
          var floor_5_sector821 = <View style={[floor5_style.sector8_style, floor5_style.sector218]}/>;
      if((this.state.sector8).substr(21,1)=='N')
          var floor_5_sector822 = <View style={[floor5_style.sector8_style, floor5_style.sector219]}/>;
      if((this.state.sector8).substr(22,1)=='N')
          var floor_5_sector823 = <View style={[floor5_style.sector8_style, floor5_style.sector220]}/>;
      if((this.state.sector8).substr(23,1)=='N')
          var floor_5_sector824 = <View style={[floor5_style.sector8_style, floor5_style.sector221]}/>;
      if((this.state.sector8).substr(24,1)=='N')
          var floor_5_sector825 = <View style={[floor5_style.sector8_style, floor5_style.sector222]}/>;
      if((this.state.sector8).substr(25,1)=='N')
          var floor_5_sector826 = <View style={[floor5_style.sector8_style, floor5_style.sector223]}/>;
      if((this.state.sector8).substr(26,1)=='N')
          var floor_5_sector827 = <View style={[floor5_style.sector8_style, floor5_style.sector224]}/>;
      if((this.state.sector8).substr(27,1)=='N')
          var floor_5_sector828 = <View style={[floor5_style.sector8_style, floor5_style.sector225]}/>;
      if((this.state.sector8).substr(28,1)=='N')
          var floor_5_sector829 = <View style={[floor5_style.sector8_style, floor5_style.sector226]}/>;
      if((this.state.sector8).substr(29,1)=='N')
          var floor_5_sector830 = <View style={[floor5_style.sector8_style, floor5_style.sector227]}/>;
      if((this.state.sector8).substr(30,1)=='N')
          var floor_5_sector831 = <View style={[floor5_style.sector8_style, floor5_style.sector228]}/>;
      if((this.state.sector8).substr(31,1)=='N')
          var floor_5_sector832 = <View style={[floor5_style.sector8_style, floor5_style.sector229]}/>;
      if((this.state.sector8).substr(32,1)=='N')
          var floor_5_sector833 = <View style={[floor5_style.sector8_style, floor5_style.sector230]}/>;
      if((this.state.sector8).substr(33,1)=='N')
          var floor_5_sector834 = <View style={[floor5_style.sector8_style, floor5_style.sector831]}/>;
      if((this.state.sector8).substr(34,1)=='N')
          var floor_5_sector835 = <View style={[floor5_style.sector8_style, floor5_style.sector832]}/>;
      if((this.state.sector8).substr(35,1)=='N')
          var floor_5_sector836 = <View style={[floor5_style.sector8_style, floor5_style.sector833]}/>;


      // 9번째 라인
      if((this.state.sector9).substr(0,1)=='N')
          var floor_5_sector91 = <View style={[floor5_style.sector9_style, floor5_style.sector91]}/>;
      if((this.state.sector9).substr(1,1)=='N')
          var floor_5_sector92 = <View style={[floor5_style.sector9_style, floor5_style.sector92]}/>;
      if((this.state.sector9).substr(2,1)=='N')
          var floor_5_sector93 = <View style={[floor5_style.sector9_style, floor5_style.sector93]}/>;
      if((this.state.sector9).substr(3,1)=='N')
          var floor_5_sector94 = <View style={[floor5_style.sector9_style, floor5_style.sector94]}/>;
      if((this.state.sector9).substr(4,1)=='N')
          var floor_5_sector95 = <View style={[floor5_style.sector9_style, floor5_style.sector95]}/>;
      if((this.state.sector9).substr(5,1)=='N')
          var floor_5_sector96 = <View style={[floor5_style.sector9_style, floor5_style.sector96]}/>;
      if((this.state.sector9).substr(6,1)=='N')
          var floor_5_sector97 = <View style={[floor5_style.sector9_style, floor5_style.sector97]}/>;
      if((this.state.sector9).substr(7,1)=='N')
          var floor_5_sector98 = <View style={[floor5_style.sector9_style, floor5_style.sector98]}/>;
      if((this.state.sector9).substr(8,1)=='N')
          var floor_5_sector99 = <View style={[floor5_style.sector9_style, floor5_style.sector99]}/>;
      if((this.state.sector9).substr(9,1)=='N')
          var floor_5_sector910 = <View style={[floor5_style.sector9_style, floor5_style.sector910]}/>;
      if((this.state.sector9).substr(10,1)=='N')
          var floor_5_sector911 = <View style={[floor5_style.sector9_style, floor5_style.sector911]}/>;
      if((this.state.sector9).substr(11,1)=='N')
          var floor_5_sector912 = <View style={[floor5_style.sector9_style, floor5_style.sector912]}/>;
      if((this.state.sector9).substr(12,1)=='N')
          var floor_5_sector913 = <View style={[floor5_style.sector9_style, floor5_style.sector913]}/>;
      if((this.state.sector9).substr(13,1)=='N')
          var floor_5_sector914 = <View style={[floor5_style.sector9_style, floor5_style.sector914]}/>;
      if((this.state.sector9).substr(14,1)=='N')
          var floor_5_sector915 = <View style={[floor5_style.sector9_style, floor5_style.sector915]}/>;
      if((this.state.sector9).substr(15,1)=='N')
          var floor_5_sector916 = <View style={[floor5_style.sector9_style, floor5_style.sector916]}/>;
      if((this.state.sector9).substr(16,1)=='N')
          var floor_5_sector917 = <View style={[floor5_style.sector9_style, floor5_style.sector917]}/>;
      if((this.state.sector9).substr(17,1)=='N')
          var floor_5_sector918 = <View style={[floor5_style.sector9_style, floor5_style.sector918]}/>;
      if((this.state.sector9).substr(18,1)=='N')
          var floor_5_sector919 = <View style={[floor5_style.sector9_style, floor5_style.sector919]}/>;
      if((this.state.sector9).substr(19,1)=='N')
          var floor_5_sector920 = <View style={[floor5_style.sector9_style, floor5_style.sector920]}/>;
      if((this.state.sector9).substr(20,1)=='N')
          var floor_5_sector921 = <View style={[floor5_style.sector9_style, floor5_style.sector921]}/>;

          // 장애인석
      if((this.state.handi).substr(0,1)=='N')
          var handi1 = <View style={[floor5_style.handi_style, floor5_style.handi1]}/>;
      if((this.state.handi).substr(1,1)=='N')
          var handi2 = <View style={[floor5_style.handi_style, floor5_style.handi2]}/>;
      if((this.state.handi).substr(2,1)=='N')
          var handi3 = <View style={[floor5_style.handi_style, floor5_style.handi3]}/>;
      if((this.state.handi).substr(3,1)=='N')
          var handi4 = <View style={[floor5_style.handi_style, floor5_style.handi4]}/>;
      if((this.state.handi).substr(4,1)=='N')
          var handi5 = <View style={[floor5_style.handi_style, floor5_style.handi5]}/>;
      if((this.state.handi).substr(5,1)=='N')
          var handi6 = <View style={[floor5_style.handi_style, floor5_style.handi6]}/>;
      if((this.state.handi).substr(6,1)=='N')
          var handi7 = <View style={[floor5_style.handi_style, floor5_style.handi7]}/>;
      if((this.state.handi).substr(7,1)=='N')
          var handi8 = <View style={[floor5_style.handi_style, floor5_style.handi8]}/>;
      if((this.state.handi).substr(8,1)=='N')
          var handi9 = <View style={[floor5_style.handi_style, floor5_style.handi9]}/>;
      if((this.state.handi).substr(9,1)=='N')
          var handi10 = <View style={[floor5_style.handi_style, floor5_style.handi10]}/>;
      if((this.state.handi).substr(10,1)=='N')
          var handi11 = <View style={[floor5_style.handi_style, floor5_style.handi11]}/>;
      if((this.state.handi).substr(11,1)=='N')
          var handi12 = <View style={[floor5_style.handi_style, floor5_style.handi12]}/>;

      if(this.state.result_line=='0') {
        if(this.state.result_sector=='0')
          var floor_5_sector11 = <View style={[floor5_style.result_sector11,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='1')
          var floor_5_sector12 = <View style={[floor5_style.result_sector12,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='2')
          var floor_5_sector13 = <View style={[floor5_style.result_sector13,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='3')
          var floor_5_sector14 = <View style={[floor5_style.result_sector14,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='4')
          var floor_5_sector15 = <View style={[floor5_style.result_sector15,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='5')
          var floor_5_sector16 = <View style={[floor5_style.result_sector16,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='6')
          var floor_5_sector17 = <View style={[floor5_style.result_sector17,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='7')
          var floor_5_sector18 = <View style={[floor5_style.result_sector18,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='8')
          var floor_5_sector19 = <View style={[floor5_style.result_sector19,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='9')
          var floor_5_sector110 = <View style={[floor5_style.result_sector110,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='10')
          var floor_5_sector111 = <View style={[floor5_style.result_sector111,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='11')
          var floor_5_sector112 = <View style={[floor5_style.result_sector112,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='12')
          var floor_5_sector113 = <View style={[floor5_style.result_sector113,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='13')
          var floor_5_sector114 = <View style={[floor5_style.result_sector114,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='14')
          var floor_5_sector115 = <View style={[floor5_style.result_sector115,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='15')
          var floor_5_sector116 = <View style={[floor5_style.result_sector116,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='16')
          var floor_5_sector117 = <View style={[floor5_style.result_sector117,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='17')
          var floor_5_sector118 = <View style={[floor5_style.result_sector118,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='18')
          var floor_5_sector119 = <View style={[floor5_style.result_sector119,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='19')
          var floor_5_sector120 = <View style={[floor5_style.result_sector120,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='20')
          var floor_5_sector121 = <View style={[floor5_style.result_sector121,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='21')
          var floor_5_sector122 = <View style={[floor5_style.result_sector122,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='22')
          var floor_5_sector123 = <View style={[floor5_style.result_sector123,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='23')
          var floor_5_sector124 = <View style={[floor5_style.result_sector124,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='24')
          var floor_5_sector125 = <View style={[floor5_style.result_sector125,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='25')
          var floor_5_sector126 = <View style={[floor5_style.result_sector126,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='26')
          var floor_5_sector127 = <View style={[floor5_style.result_sector127,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
        else if(this.state.result_sector=='27')
          var floor_5_sector128 = <View style={[floor5_style.result_sector128,floor5_style.result_container1]}>{animated_style}{result_view_style}</View>
    }
    else if(this.state.result_line=='1') {
      if(this.state.result_sector=='0')
        var floor_5_sector21 = <View style={[floor5_style.result_sector21,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='1')
        var floor_5_sector22 = <View style={[floor5_style.result_sector22,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='2')
        var floor_5_sector23 = <View style={[floor5_style.result_sector23,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='3')
        var floor_5_sector24 = <View style={[floor5_style.result_sector24,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='4')
        var floor_5_sector25 = <View style={[floor5_style.result_sector25,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='5')
        var floor_5_sector26 = <View style={[floor5_style.result_sector26,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='6')
        var floor_5_sector27 = <View style={[floor5_style.result_sector27,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='7')
        var floor_5_sector28 = <View style={[floor5_style.result_sector28,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='8')
        var floor_5_sector29 = <View style={[floor5_style.result_sector29,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='9')
        var floor_5_sector210 = <View style={[floor5_style.result_sector210,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='10')
        var floor_5_sector211 = <View style={[floor5_style.result_sector211,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='11')
        var floor_5_sector212 = <View style={[floor5_style.result_sector212,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='12')
        var floor_5_sector213 = <View style={[floor5_style.result_sector213,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='13')
        var floor_5_sector214 = <View style={[floor5_style.result_sector214,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='14')
        var floor_5_sector215 = <View style={[floor5_style.result_sector215,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='15')
        var floor_5_sector216 = <View style={[floor5_style.result_sector216,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='16')
        var floor_5_sector217 = <View style={[floor5_style.result_sector217,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='17')
        var floor_5_sector218 = <View style={[floor5_style.result_sector218,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='18')
        var floor_5_sector219 = <View style={[floor5_style.result_sector219,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='19')
        var floor_5_sector220 = <View style={[floor5_style.result_sector220,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='20')
        var floor_5_sector221 = <View style={[floor5_style.result_sector221,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='21')
        var floor_5_sector222 = <View style={[floor5_style.result_sector222,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='22')
        var floor_5_sector223 = <View style={[floor5_style.result_sector223,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='23')
        var floor_5_sector224 = <View style={[floor5_style.result_sector224,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='24')
        var floor_5_sector225 = <View style={[floor5_style.result_sector225,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='25')
        var floor_5_sector226 = <View style={[floor5_style.result_sector226,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='26')
        var floor_5_sector227 = <View style={[floor5_style.result_sector227,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='27')
        var floor_5_sector228 = <View style={[floor5_style.result_sector228,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='28')
        var floor_5_sector229 = <View style={[floor5_style.result_sector229,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='29')
        var floor_5_sector230 = <View style={[floor5_style.result_sector230,floor5_style.result_container2]}>{animated_style}{result_view_style}</View>
  }
  else if(this.state.result_line=='2') {
    if(this.state.result_sector=='0')
      var floor_5_sector31 = <View style={[floor5_style.result_sector21,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='1')
      var floor_5_sector32 = <View style={[floor5_style.result_sector22,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='2')
      var floor_5_sector33 = <View style={[floor5_style.result_sector23,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='3')
      var floor_5_sector34 = <View style={[floor5_style.result_sector24,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='4')
      var floor_5_sector35 = <View style={[floor5_style.result_sector25,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='5')
      var floor_5_sector36 = <View style={[floor5_style.result_sector26,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='6')
      var floor_5_sector37 = <View style={[floor5_style.result_sector27,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='7')
      var floor_5_sector38 = <View style={[floor5_style.result_sector28,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='8')
      var floor_5_sector39 = <View style={[floor5_style.result_sector29,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='9')
      var floor_5_sector310 = <View style={[floor5_style.result_sector210,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='10')
      var floor_5_sector311 = <View style={[floor5_style.result_sector211,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='11')
      var floor_5_sector312 = <View style={[floor5_style.result_sector212,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='12')
      var floor_5_sector313 = <View style={[floor5_style.result_sector213,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='13')
      var floor_5_sector314 = <View style={[floor5_style.result_sector214,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='14')
      var floor_5_sector315 = <View style={[floor5_style.result_sector215,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='15')
      var floor_5_sector316 = <View style={[floor5_style.result_sector216,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='16')
      var floor_5_sector317 = <View style={[floor5_style.result_sector217,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='17')
      var floor_5_sector318 = <View style={[floor5_style.result_sector218,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='18')
      var floor_5_sector319 = <View style={[floor5_style.result_sector219,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='19')
      var floor_5_sector320 = <View style={[floor5_style.result_sector220,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='20')
      var floor_5_sector321 = <View style={[floor5_style.result_sector221,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='21')
      var floor_5_sector322 = <View style={[floor5_style.result_sector222,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='22')
      var floor_5_sector323 = <View style={[floor5_style.result_sector223,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='23')
      var floor_5_sector324 = <View style={[floor5_style.result_sector224,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='24')
      var floor_5_sector325 = <View style={[floor5_style.result_sector225,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='25')
      var floor_5_sector326 = <View style={[floor5_style.result_sector226,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='26')
      var floor_5_sector327 = <View style={[floor5_style.result_sector227,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='27')
      var floor_5_sector328 = <View style={[floor5_style.result_sector228,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='28')
      var floor_5_sector329 = <View style={[floor5_style.result_sector229,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='29')
      var floor_5_sector330 = <View style={[floor5_style.result_sector230,floor5_style.result_container3]}>{animated_style}{result_view_style}</View>
  }
  else if(this.state.result_line=='3') {
    if(this.state.result_sector=='0')
      var floor_5_sector41 = <View style={[floor5_style.result_sector21,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='1')
      var floor_5_sector42 = <View style={[floor5_style.result_sector22,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='2')
      var floor_5_sector43 = <View style={[floor5_style.result_sector23,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='3')
      var floor_5_sector44 = <View style={[floor5_style.result_sector24,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='4')
      var floor_5_sector45 = <View style={[floor5_style.result_sector25,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='5')
      var floor_5_sector46 = <View style={[floor5_style.result_sector26,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='6')
      var floor_5_sector47 = <View style={[floor5_style.result_sector27,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='7')
      var floor_5_sector48 = <View style={[floor5_style.result_sector28,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='8')
      var floor_5_sector49 = <View style={[floor5_style.result_sector29,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='9')
      var floor_5_sector410 = <View style={[floor5_style.result_sector210,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='10')
      var floor_5_sector411 = <View style={[floor5_style.result_sector211,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='11')
      var floor_5_sector412 = <View style={[floor5_style.result_sector212,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='12')
      var floor_5_sector413 = <View style={[floor5_style.result_sector213,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='13')
      var floor_5_sector414 = <View style={[floor5_style.result_sector214,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='14')
      var floor_5_sector415 = <View style={[floor5_style.result_sector215,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='15')
      var floor_5_sector416 = <View style={[floor5_style.result_sector216,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='16')
      var floor_5_sector417 = <View style={[floor5_style.result_sector217,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='17')
      var floor_5_sector418 = <View style={[floor5_style.result_sector218,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='18')
      var floor_5_sector419 = <View style={[floor5_style.result_sector219,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='19')
      var floor_5_sector420 = <View style={[floor5_style.result_sector220,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='20')
      var floor_5_sector421 = <View style={[floor5_style.result_sector221,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='21')
      var floor_5_sector422 = <View style={[floor5_style.result_sector222,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='22')
      var floor_5_sector423 = <View style={[floor5_style.result_sector223,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='23')
      var floor_5_sector424 = <View style={[floor5_style.result_sector224,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='24')
      var floor_5_sector425 = <View style={[floor5_style.result_sector225,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='25')
      var floor_5_sector426 = <View style={[floor5_style.result_sector226,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='26')
      var floor_5_sector427 = <View style={[floor5_style.result_sector227,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='27')
      var floor_5_sector428 = <View style={[floor5_style.result_sector228,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='28')
      var floor_5_sector429 = <View style={[floor5_style.result_sector229,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='29')
      var floor_5_sector430 = <View style={[floor5_style.result_sector230,floor5_style.result_container4]}>{animated_style}{result_view_style}</View>
  }
  else if(this.state.result_line=='4') {
    if(this.state.result_sector=='0')
      var floor_5_sector51 = <View style={[floor5_style.result_sector21,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='1')
      var floor_5_sector52 = <View style={[floor5_style.result_sector22,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='2')
      var floor_5_sector53 = <View style={[floor5_style.result_sector23,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='3')
      var floor_5_sector54 = <View style={[floor5_style.result_sector24,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='4')
      var floor_5_sector55 = <View style={[floor5_style.result_sector25,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='5')
      var floor_5_sector56 = <View style={[floor5_style.result_sector26,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='6')
      var floor_5_sector57 = <View style={[floor5_style.result_sector27,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='7')
      var floor_5_sector58 = <View style={[floor5_style.result_sector28,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='8')
      var floor_5_sector59 = <View style={[floor5_style.result_sector29,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='9')
      var floor_5_sector510 = <View style={[floor5_style.result_sector210,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='10')
      var floor_5_sector511 = <View style={[floor5_style.result_sector211,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='11')
      var floor_5_sector512 = <View style={[floor5_style.result_sector212,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='12')
      var floor_5_sector513 = <View style={[floor5_style.result_sector213,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='13')
      var floor_5_sector514 = <View style={[floor5_style.result_sector214,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='14')
      var floor_5_sector515 = <View style={[floor5_style.result_sector215,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='15')
      var floor_5_sector516 = <View style={[floor5_style.result_sector216,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='16')
      var floor_5_sector517 = <View style={[floor5_style.result_sector217,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='17')
      var floor_5_sector518 = <View style={[floor5_style.result_sector218,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='18')
      var floor_5_sector519 = <View style={[floor5_style.result_sector219,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='19')
      var floor_5_sector520 = <View style={[floor5_style.result_sector220,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='20')
      var floor_5_sector521 = <View style={[floor5_style.result_sector221,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='21')
      var floor_5_sector522 = <View style={[floor5_style.result_sector222,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='22')
      var floor_5_sector523 = <View style={[floor5_style.result_sector223,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='23')
      var floor_5_sector524 = <View style={[floor5_style.result_sector224,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='24')
      var floor_5_sector525 = <View style={[floor5_style.result_sector225,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='25')
      var floor_5_sector526 = <View style={[floor5_style.result_sector226,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='26')
      var floor_5_sector527 = <View style={[floor5_style.result_sector227,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='27')
      var floor_5_sector528 = <View style={[floor5_style.result_sector228,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='28')
      var floor_5_sector529 = <View style={[floor5_style.result_sector229,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='29')
      var floor_5_sector530 = <View style={[floor5_style.result_sector230,floor5_style.result_container5]}>{animated_style}{result_view_style}</View>
  }
  else if(this.state.result_line=='5') {
    if(this.state.result_sector=='0')
      var floor_5_sector61 = <View style={[floor5_style.result_sector21,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='1')
      var floor_5_sector62 = <View style={[floor5_style.result_sector22,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='2')
      var floor_5_sector63 = <View style={[floor5_style.result_sector23,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='3')
      var floor_5_sector64 = <View style={[floor5_style.result_sector24,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='4')
      var floor_5_sector65 = <View style={[floor5_style.result_sector25,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='5')
      var floor_5_sector66 = <View style={[floor5_style.result_sector26,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='6')
      var floor_5_sector67 = <View style={[floor5_style.result_sector27,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='7')
      var floor_5_sector68 = <View style={[floor5_style.result_sector28,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='8')
      var floor_5_sector69 = <View style={[floor5_style.result_sector29,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='9')
      var floor_5_sector610 = <View style={[floor5_style.result_sector210,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='10')
      var floor_5_sector611 = <View style={[floor5_style.result_sector211,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='11')
      var floor_5_sector612 = <View style={[floor5_style.result_sector212,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='12')
      var floor_5_sector613 = <View style={[floor5_style.result_sector213,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='13')
      var floor_5_sector614 = <View style={[floor5_style.result_sector214,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='14')
      var floor_5_sector615 = <View style={[floor5_style.result_sector215,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='15')
      var floor_5_sector616 = <View style={[floor5_style.result_sector216,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='16')
      var floor_5_sector617 = <View style={[floor5_style.result_sector217,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='17')
      var floor_5_sector618 = <View style={[floor5_style.result_sector218,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='18')
      var floor_5_sector619 = <View style={[floor5_style.result_sector219,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='19')
      var floor_5_sector620 = <View style={[floor5_style.result_sector220,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='20')
      var floor_5_sector621 = <View style={[floor5_style.result_sector221,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='21')
      var floor_5_sector622 = <View style={[floor5_style.result_sector222,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='22')
      var floor_5_sector623 = <View style={[floor5_style.result_sector223,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='23')
      var floor_5_sector624 = <View style={[floor5_style.result_sector224,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='24')
      var floor_5_sector625 = <View style={[floor5_style.result_sector225,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='25')
      var floor_5_sector626 = <View style={[floor5_style.result_sector226,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='26')
      var floor_5_sector627 = <View style={[floor5_style.result_sector227,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='27')
      var floor_5_sector628 = <View style={[floor5_style.result_sector228,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='28')
      var floor_5_sector629 = <View style={[floor5_style.result_sector229,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='29')
      var floor_5_sector630 = <View style={[floor5_style.result_sector230,floor5_style.result_container6]}>{animated_style}{result_view_style}</View>
  }

  else if(this.state.result_line=='6') {
    if(this.state.result_sector=='0')
      var floor_5_sector71 = <View style={[floor5_style.result_sector21,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='1')
      var floor_5_sector72 = <View style={[floor5_style.result_sector22,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='2')
      var floor_5_sector73 = <View style={[floor5_style.result_sector23,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='3')
      var floor_5_sector74 = <View style={[floor5_style.result_sector24,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='4')
      var floor_5_sector75 = <View style={[floor5_style.result_sector25,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='5')
      var floor_5_sector76 = <View style={[floor5_style.result_sector26,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='6')
      var floor_5_sector77 = <View style={[floor5_style.result_sector27,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='7')
      var floor_5_sector78 = <View style={[floor5_style.result_sector28,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='8')
      var floor_5_sector79 = <View style={[floor5_style.result_sector29,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='9')
      var floor_5_sector710 = <View style={[floor5_style.result_sector210,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='10')
      var floor_5_sector711 = <View style={[floor5_style.result_sector211,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='11')
      var floor_5_sector712 = <View style={[floor5_style.result_sector212,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='12')
      var floor_5_sector713 = <View style={[floor5_style.result_sector213,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='13')
      var floor_5_sector714 = <View style={[floor5_style.result_sector214,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='14')
      var floor_5_sector715 = <View style={[floor5_style.result_sector215,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='15')
      var floor_5_sector716 = <View style={[floor5_style.result_sector216,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='16')
      var floor_5_sector717 = <View style={[floor5_style.result_sector217,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='17')
      var floor_5_sector718 = <View style={[floor5_style.result_sector218,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='18')
      var floor_5_sector719 = <View style={[floor5_style.result_sector219,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='19')
      var floor_5_sector720 = <View style={[floor5_style.result_sector220,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='20')
      var floor_5_sector721 = <View style={[floor5_style.result_sector221,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='21')
      var floor_5_sector722 = <View style={[floor5_style.result_sector222,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='22')
      var floor_5_sector723 = <View style={[floor5_style.result_sector223,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='23')
      var floor_5_sector724 = <View style={[floor5_style.result_sector224,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='24')
      var floor_5_sector725 = <View style={[floor5_style.result_sector225,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='25')
      var floor_5_sector726 = <View style={[floor5_style.result_sector226,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='26')
      var floor_5_sector727 = <View style={[floor5_style.result_sector227,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='27')
      var floor_5_sector728 = <View style={[floor5_style.result_sector228,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='28')
      var floor_5_sector729 = <View style={[floor5_style.result_sector229,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='29')
      var floor_5_sector730 = <View style={[floor5_style.result_sector230,floor5_style.result_container7]}>{animated_style}{result_view_style}</View>
  }
  else if(this.state.result_line=='7') {
    if(this.state.result_sector=='0')
      var floor_5_sector81 = <View style={[floor5_style.result_sector81,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='1')
      var floor_5_sector82 = <View style={[floor5_style.result_sector82,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='2')
      var floor_5_sector83 = <View style={[floor5_style.result_sector83,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='3')
      var floor_5_sector84 = <View style={[floor5_style.result_sector21,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='4')
      var floor_5_sector85 = <View style={[floor5_style.result_sector22,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='5')
      var floor_5_sector86 = <View style={[floor5_style.result_sector23,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='6')
      var floor_5_sector87 = <View style={[floor5_style.result_sector24,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='7')
      var floor_5_sector88 = <View style={[floor5_style.result_sector25,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='8')
      var floor_5_sector89 = <View style={[floor5_style.result_sector26,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='9')
      var floor_5_sector810 = <View style={[floor5_style.result_sector27,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='10')
      var floor_5_sector811 = <View style={[floor5_style.result_sector28,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='11')
      var floor_5_sector812 = <View style={[floor5_style.result_sector29,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='12')
      var floor_5_sector813 = <View style={[floor5_style.result_sector210,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='13')
      var floor_5_sector814 = <View style={[floor5_style.result_sector211,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='14')
      var floor_5_sector815 = <View style={[floor5_style.result_sector212,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='15')
      var floor_5_sector816 = <View style={[floor5_style.result_sector213,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='16')
      var floor_5_sector817 = <View style={[floor5_style.result_sector214,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='17')
      var floor_5_sector818 = <View style={[floor5_style.result_sector215,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='18')
      var floor_5_sector819 = <View style={[floor5_style.result_sector216,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='19')
      var floor_5_sector820 = <View style={[floor5_style.result_sector217,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='20')
      var floor_5_sector821 = <View style={[floor5_style.result_sector218,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='21')
      var floor_5_sector822 = <View style={[floor5_style.result_sector219,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='22')
      var floor_5_sector823 = <View style={[floor5_style.result_sector220,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='23')
      var floor_5_sector824 = <View style={[floor5_style.result_sector221,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='24')
      var floor_5_sector825 = <View style={[floor5_style.result_sector222,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='25')
      var floor_5_sector826 = <View style={[floor5_style.result_sector223,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='26')
      var floor_5_sector827 = <View style={[floor5_style.result_sector224,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='27')
      var floor_5_sector828 = <View style={[floor5_style.result_sector225,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='28')
      var floor_5_sector829 = <View style={[floor5_style.result_sector226,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='29')
      var floor_5_sector830 = <View style={[floor5_style.result_sector227,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='30')
      var floor_5_sector831 = <View style={[floor5_style.result_sector228,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='31')
      var floor_5_sector832 = <View style={[floor5_style.result_sector229,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='32')
      var floor_5_sector833 = <View style={[floor5_style.result_sector230,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='33')
      var floor_5_sector834 = <View style={[floor5_style.result_sector834,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='34')
      var floor_5_sector835 = <View style={[floor5_style.result_sector835,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
    else if(this.state.result_sector=='35')
      var floor_5_sector836 = <View style={[floor5_style.result_sector836,floor5_style.result_container8]}>{animated_style}{result_view_style}</View>
  }


  else if(this.state.result_line=='8') {
    if(this.state.result_sector=='0')
      var floor_5_sector91 = <View style={[floor5_style.result_sector91,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    else if(this.state.result_sector=='1')
      var floor_5_sector92 = <View style={[floor5_style.result_sector92,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    else if(this.state.result_sector=='2')
      var floor_5_sector93 = <View style={[floor5_style.result_sector93,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    else if(this.state.result_sector=='3')
      var floor_5_sector94 = <View style={[floor5_style.result_sector94,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    else if(this.state.result_sector=='4')
      var floor_5_sector95 = <View style={[floor5_style.result_sector95,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    else if(this.state.result_sector=='5')
      var floor_5_sector96 = <View style={[floor5_style.result_sector96,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    else if(this.state.result_sector=='6')
      var floor_5_sector97 = <View style={[floor5_style.result_sector97,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    else if(this.state.result_sector=='7')
      var floor_5_sector98 = <View style={[floor5_style.result_sector98,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    else if(this.state.result_sector=='8')
      var floor_5_sector99 = <View style={[floor5_style.result_sector99,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    else if(this.state.result_sector=='9')
      var floor_5_sector910 = <View style={[floor5_style.result_sector910,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    else if(this.state.result_sector=='10')
      var floor_5_sector911 = <View style={[floor5_style.result_sector911,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    else if(this.state.result_sector=='11')
      var floor_5_sector912 = <View style={[floor5_style.result_sector912,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    else if(this.state.result_sector=='12')
      var floor_5_sector913 = <View style={[floor5_style.result_sector913,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    else if(this.state.result_sector=='13')
      var floor_5_sector914 = <View style={[floor5_style.result_sector914,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    else if(this.state.result_sector=='14')
      var floor_5_sector915 = <View style={[floor5_style.result_sector915,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    else if(this.state.result_sector=='15')
      var floor_5_sector916 = <View style={[floor5_style.result_sector916,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    else if(this.state.result_sector=='16')
      var floor_5_sector917 = <View style={[floor5_style.result_sector917,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    else if(this.state.result_sector=='17')
      var floor_5_sector918 = <View style={[floor5_style.result_sector918,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    else if(this.state.result_sector=='18')
      var floor_5_sector919 = <View style={[floor5_style.result_sector919,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    else if(this.state.result_sector=='19')
      var floor_5_sector920 = <View style={[floor5_style.result_sector920,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    else if(this.state.result_sector=='20')
      var floor_5_sector921 = <View style={[floor5_style.result_sector921,floor5_style.result_container9]}>{animated_style8}{result_view_style8}</View>
    }

      return (
        <View style={{flex:1, backgroundColor:'#2a2a2a'}}>
          <Spinner visible={this.state.loading_visible}/>

          <Image source={require('../image/05F.png')}
                style={{width:screen_width, height:screen_height/1.45,position:'absolute',top:0}}
                resizeMode= { 'stretch' }></Image>


              {floor_5_sector11}
              {floor_5_sector12}
              {floor_5_sector13}
              {floor_5_sector14}
              {floor_5_sector15}
              {floor_5_sector16}
              {floor_5_sector17}
              {floor_5_sector18}
              {floor_5_sector19}
              {floor_5_sector110}
              {floor_5_sector111}
              {floor_5_sector112}
              {floor_5_sector113}
              {floor_5_sector114}
              {floor_5_sector115}
              {floor_5_sector116}
              {floor_5_sector117}
              {floor_5_sector118}
              {floor_5_sector119}
              {floor_5_sector120}
              {floor_5_sector121}
              {floor_5_sector122}
              {floor_5_sector123}
              {floor_5_sector124}
              {floor_5_sector125}
              {floor_5_sector126}
              {floor_5_sector127}
              {floor_5_sector128}

              {/*2번째 라인*/}
              {floor_5_sector21}
              {floor_5_sector22}
              {floor_5_sector23}
              {floor_5_sector24}
              {floor_5_sector25}
              {floor_5_sector26}
              {floor_5_sector27}
              {floor_5_sector28}
              {floor_5_sector29}
              {floor_5_sector210}
              {floor_5_sector211}
              {floor_5_sector212}
              {floor_5_sector213}
              {floor_5_sector214}
              {floor_5_sector215}
              {floor_5_sector216}
              {floor_5_sector217}
              {floor_5_sector218}
              {floor_5_sector219}
              {floor_5_sector220}
              {floor_5_sector221}
              {floor_5_sector222}
              {floor_5_sector223}
              {floor_5_sector224}
              {floor_5_sector225}
              {floor_5_sector226}
              {floor_5_sector227}
              {floor_5_sector228}
              {floor_5_sector229}
              {floor_5_sector230}

              {/*3번째 라인*/}
              {floor_5_sector31}
              {floor_5_sector32}
              {floor_5_sector33}
              {floor_5_sector34}
              {floor_5_sector35}
              {floor_5_sector36}
              {floor_5_sector37}
              {floor_5_sector38}
              {floor_5_sector39}
              {floor_5_sector310}
              {floor_5_sector311}
              {floor_5_sector312}
              {floor_5_sector313}
              {floor_5_sector314}
              {floor_5_sector315}
              {floor_5_sector316}
              {floor_5_sector317}
              {floor_5_sector318}
              {floor_5_sector319}
              {floor_5_sector320}
              {floor_5_sector321}
              {floor_5_sector322}
              {floor_5_sector323}
              {floor_5_sector324}
              {floor_5_sector325}
              {floor_5_sector326}
              {floor_5_sector327}
              {floor_5_sector328}
              {floor_5_sector329}
              {floor_5_sector330}

              {/*4번째 라인*/}
              {floor_5_sector41}
              {floor_5_sector42}
              {floor_5_sector43}
              {floor_5_sector44}
              {floor_5_sector45}
              {floor_5_sector46}
              {floor_5_sector47}
              {floor_5_sector48}
              {floor_5_sector49}
              {floor_5_sector410}
              {floor_5_sector411}
              {floor_5_sector412}
              {floor_5_sector413}
              {floor_5_sector414}
              {floor_5_sector415}
              {floor_5_sector416}
              {floor_5_sector417}
              {floor_5_sector418}
              {floor_5_sector419}
              {floor_5_sector420}
              {floor_5_sector421}
              {floor_5_sector422}
              {floor_5_sector423}
              {floor_5_sector424}
              {floor_5_sector425}
              {floor_5_sector426}
              {floor_5_sector427}
              {floor_5_sector428}
              {floor_5_sector429}
              {floor_5_sector430}

              {/*5번째 라인*/}
              {floor_5_sector51}
              {floor_5_sector52}
              {floor_5_sector53}
              {floor_5_sector54}
              {floor_5_sector55}
              {floor_5_sector56}
              {floor_5_sector57}
              {floor_5_sector58}
              {floor_5_sector59}
              {floor_5_sector510}
              {floor_5_sector511}
              {floor_5_sector512}
              {floor_5_sector513}
              {floor_5_sector514}
              {floor_5_sector515}
              {floor_5_sector516}
              {floor_5_sector517}
              {floor_5_sector518}
              {floor_5_sector519}
              {floor_5_sector520}
              {floor_5_sector521}
              {floor_5_sector522}
              {floor_5_sector523}
              {floor_5_sector524}
              {floor_5_sector525}
              {floor_5_sector526}
              {floor_5_sector527}
              {floor_5_sector528}
              {floor_5_sector529}
              {floor_5_sector530}

              {/*6번째 라인*/}
              {floor_5_sector61}
              {floor_5_sector62}
              {floor_5_sector63}
              {floor_5_sector64}
              {floor_5_sector65}
              {floor_5_sector66}
              {floor_5_sector67}
              {floor_5_sector68}
              {floor_5_sector69}
              {floor_5_sector610}
              {floor_5_sector611}
              {floor_5_sector612}
              {floor_5_sector613}
              {floor_5_sector614}
              {floor_5_sector615}
              {floor_5_sector616}
              {floor_5_sector617}
              {floor_5_sector618}
              {floor_5_sector619}
              {floor_5_sector620}
              {floor_5_sector621}
              {floor_5_sector622}
              {floor_5_sector623}
              {floor_5_sector624}
              {floor_5_sector625}
              {floor_5_sector626}
              {floor_5_sector627}
              {floor_5_sector628}
              {floor_5_sector629}
              {floor_5_sector630}


              {/*7번째 라인*/}
              {floor_5_sector71}
              {floor_5_sector72}
              {floor_5_sector73}
              {floor_5_sector74}
              {floor_5_sector75}
              {floor_5_sector76}
              {floor_5_sector77}
              {floor_5_sector78}
              {floor_5_sector79}
              {floor_5_sector710}
              {floor_5_sector711}
              {floor_5_sector712}
              {floor_5_sector713}
              {floor_5_sector714}
              {floor_5_sector715}
              {floor_5_sector716}
              {floor_5_sector717}
              {floor_5_sector718}
              {floor_5_sector719}
              {floor_5_sector720}
              {floor_5_sector721}
              {floor_5_sector722}
              {floor_5_sector723}
              {floor_5_sector724}
              {floor_5_sector725}
              {floor_5_sector726}
              {floor_5_sector727}
              {floor_5_sector728}
              {floor_5_sector729}
              {floor_5_sector730}

              {/*8번째 라인*/}
              {floor_5_sector81}
              {floor_5_sector82}
              {floor_5_sector83}
              {floor_5_sector84}
              {floor_5_sector85}
              {floor_5_sector86}
              {floor_5_sector87}
              {floor_5_sector88}
              {floor_5_sector89}
              {floor_5_sector810}
              {floor_5_sector811}
              {floor_5_sector812}
              {floor_5_sector813}
              {floor_5_sector814}
              {floor_5_sector815}
              {floor_5_sector816}
              {floor_5_sector817}
              {floor_5_sector818}
              {floor_5_sector819}
              {floor_5_sector820}
              {floor_5_sector821}
              {floor_5_sector822}
              {floor_5_sector823}
              {floor_5_sector824}
              {floor_5_sector825}
              {floor_5_sector826}
              {floor_5_sector827}
              {floor_5_sector828}
              {floor_5_sector829}
              {floor_5_sector830}
              {floor_5_sector831}
              {floor_5_sector832}
              {floor_5_sector833}
              {floor_5_sector834}
              {floor_5_sector835}
              {floor_5_sector836}

              {floor_5_sector91}
              {floor_5_sector92}
              {floor_5_sector93}
              {floor_5_sector94}
              {floor_5_sector95}
              {floor_5_sector96}
              {floor_5_sector97}
              {floor_5_sector98}
              {floor_5_sector99}
              {floor_5_sector910}
              {floor_5_sector911}
              {floor_5_sector912}
              {floor_5_sector913}
              {floor_5_sector914}
              {floor_5_sector915}
              {floor_5_sector916}
              {floor_5_sector917}
              {floor_5_sector918}
              {floor_5_sector919}
              {floor_5_sector920}
              {floor_5_sector921}

              {handi1}
              {handi2}
              {handi3}
              {handi4}
              {handi5}
              {handi6}
              {handi7}
              {handi8}
              {handi9}
              {handi10}
              {handi11}
              {handi12}

              {/* 길 안내 애니메이션  */}
              <View style={{position:'absolute',left:0, top:0, width:screen_width, height: screen_height}}>
                <Svg height={screen_height} width={screen_width}>
                  <Path d={this.state.path} fill="none" stroke="rgb(0,255,255)" strokeWidth="5"/>
               </Svg>
              </View>

          <View style={{position:'absolute',flexDirection: 'row', bottom:0,backgroundColor:'red', width:screen_width, height:screen_height/12}}>
            <TouchableHighlight onPress={this._onRefresh.bind(this)} style={{flex:1, backgroundColor:'#2f2f2f', alignItems:'center',justifyContent: 'center'}}>
              <Text style={{color:'white', fontSize:screen_height/1000*30}}>새로고침</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.req_park.bind(this)} style={{flex:1, backgroundColor:'#01FDFE', alignItems:'center',justifyContent: 'center'}}>
              <Text style={{color:'black', fontSize:screen_height/1000*30}}>{this.state.search_btn}</Text>
            </TouchableHighlight>
          </View>
        </View>
      )
  }
}

export default Floor5
