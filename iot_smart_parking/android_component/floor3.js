'use strict';
import React, { Component, } from 'react'
import {
  View,
  Dimensions,
  Image,
  ListView,
  RefreshControl,
  TouchableHighlight,
  Text,
  Animated,
  Easing
} from 'react-native'

//화면 비율
var screen_height = Dimensions.get('window').height;
var screen_width = Dimensions.get('window').width;

import Spinner from 'react-native-loading-spinner-overlay'; // 로딩 화면
import Svg,{Path} from 'react-native-svg';

var server_ip = '192.168.1.104'

var floor3_style = require('../style/floor3_style');
var floor3_bfs = require('../path_bfs/floor3_bfs');
var floor3_path = require('../style/floor3_path_style');

class Floor3 extends React.Component {
  constructor(props) {
    super(props);
    this._animateIn = this._animateIn.bind(this);
    this._animateOut = this._animateOut.bind(this);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([{'image':require('../image/03F.png')}]),
      refreshing: false,
      sector1 : '',
      sector2 : '',
      sector3 : '',
      sector4 : '',
      sector5 : '',
      sector6 : '',
      sector7 : '',
      sector8 : '',
      handi : '',
      result_line:'',
      result_sector:'',
      loading_visible:false,
      search_btn:'안내 시작',
      bounceValue: new Animated.Value(0),
      path:'',
    };
  }


  // 스크롤 탭 컴포넌트 클릭했을때 주차장 전체 상태 데이터 받아오는 부분
  componentDidMount() {
    this.setState({loading_visible:true}, function() {
      this._animateIn();
      fetch("http://" + server_ip + ":3000/mobile/floor3_state",{
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
            loading_visible:false,
            floor3_state: '3층(' + responseData.floor3+'/192)',
            sector1 : responseData.sector1,
            sector2 : responseData.sector2,
            sector3 : responseData.sector3,
            sector4 : responseData.sector4,
            sector5 : responseData.sector5,
            sector6 : responseData.sector6,
            sector7 : responseData.sector7,
            sector8 : responseData.sector8,
            handi : responseData.handi
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

// 가장 가까운 위치 요청 POST
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
              floor:'3',
              gate:'2'
            })
          })
          .then((response)=>response.json())
          .then((responseData)=> {
            this.setState({loading_visible:false,search_btn:'안내 취소', result_line:responseData.result_line, result_sector:responseData.result_sector}, function() {
              // 최단거리 찾기 (BFS)
              // 출발지점은 0,17
              floor3_bfs.floor3(0,17,parseInt(this.state.result_line),parseInt(this.state.result_sector), function(result) {
                //결과값은 배열에 JSON format 객체가 들어있음.
                //시작점은 항상 M50 175(시작 좌표)  L80 175 (선을 그을 좌표) + 문자열
                var path_char = '';
                console.log(this.state.result_line);
                for(var i=0;i<result.length;i++) {
                  floor3_path.floor3(result[i].x, result[i].y, screen_height, screen_width, parseInt(this.state.result_line), function(x,y,last_path) {
                    if(i==0) {
                      path_char = 'M' + x + ' ' + y;
                    }
                    else {
                      path_char += ' L' + x + ' ' + y;
                      if(i==result.length-1) {
                        path_char += ' L' + last_path + ' ' + y;
                      }
                    }
                  })
                }
                console.log(path_char);
                this.setState({
                  path : path_char
                })
                //alert(JSON.stringify(result) + '\n path : ' + path_char + '\n result length : ' + result.length + '\n result : ' + result[result.length-1].y);
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

 _onRefresh() {
    this.setState({refreshing: true});
    fetch("http://" + server_ip + ":3000/mobile/floor3_state",{
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
          refreshing:false,
          floor3_state: '3층(' + responseData.floor3+'/192)',
          sector1 : responseData.sector1,
          sector2 : responseData.sector2,
          sector3 : responseData.sector3,
          sector4 : responseData.sector4,
          sector5 : responseData.sector5,
          sector6 : responseData.sector6,
          sector7 : responseData.sector7,
          sector8 : responseData.sector8,
          handi : responseData.handi
        })
      })
      .catch((error) => {
        this.setState({loading_visible: false}, function() {
          alert(error);
          throw(error);
        });
      });
  }

  render() {
    //정의
    const animated_style = <Animated.View style={[floor3_style.circle,{left:screen_width/27,top:screen_height/55},{transform: [{scale: this.state.bounceValue}]}]}></Animated.View>
    const result_view_style = <View style={[floor3_style.sector1_result_style]}></View>


    // 1번째 라인
    if((this.state.sector1).substr(0,1)=='N')
        var floor_3_sector11 = <View style={[floor3_style.sector1_style, floor3_style.sector11]}/>;
    if((this.state.sector1).substr(1,1)=='N')
        var floor_3_sector12 = <View style={[floor3_style.sector1_style, floor3_style.sector12]}/>;
    if((this.state.sector1).substr(2,1)=='N')
        var floor_3_sector13 = <View style={[floor3_style.sector1_style, floor3_style.sector13]}/>;
    if((this.state.sector1).substr(3,1)=='N')
        var floor_3_sector14 = <View style={[floor3_style.sector1_style, floor3_style.sector14]}/>;
    if((this.state.sector1).substr(4,1)=='N')
        var floor_3_sector15 = <View style={[floor3_style.sector1_style, floor3_style.sector15]}/>;
    if((this.state.sector1).substr(5,1)=='N')
        var floor_3_sector16 = <View style={[floor3_style.sector1_style, floor3_style.sector16]}/>;
    if((this.state.sector1).substr(6,1)=='N')
        var floor_3_sector17 = <View style={[floor3_style.sector1_style, floor3_style.sector17]}/>;
    if((this.state.sector1).substr(7,1)=='N')
        var floor_3_sector18 = <View style={[floor3_style.sector1_style, floor3_style.sector18]}/>;
    if((this.state.sector1).substr(8,1)=='N')
        var floor_3_sector19 = <View style={[floor3_style.sector1_style, floor3_style.sector19]}/>;
    if((this.state.sector1).substr(9,1)=='N')
        var floor_3_sector110 = <View style={[floor3_style.sector1_style,floor3_style.sector110]}/>;
    if((this.state.sector1).substr(10,1)=='N')
        var floor_3_sector111 = <View style={[floor3_style.sector1_style,floor3_style.sector111]}/>;
    if((this.state.sector1).substr(11,1)=='N')
        var floor_3_sector112 = <View style={[floor3_style.sector1_style,floor3_style.sector112]}/>;
    if((this.state.sector1).substr(12,1)=='N')
        var floor_3_sector113 = <View style={[floor3_style.sector1_style,floor3_style.sector113]}/>;
    if((this.state.sector1).substr(13,1)=='N')
        var floor_3_sector114 = <View style={[floor3_style.sector1_style,floor3_style.sector114]}/>;
    if((this.state.sector1).substr(14,1)=='N')
        var floor_3_sector115 = <View style={[floor3_style.sector1_style,floor3_style.sector115]}/>;
    if((this.state.sector1).substr(15,1)=='N')
        var floor_3_sector116 = <View style={[floor3_style.sector1_style,floor3_style.sector116]}/>;
    if((this.state.sector1).substr(16,1)=='N')
        var floor_3_sector117 = <View style={[floor3_style.sector1_style,floor3_style.sector117]}/>;
    if((this.state.sector1).substr(17,1)=='N')
        var floor_3_sector118 = <View style={[floor3_style.sector1_style,floor3_style.sector118]}/>;
    if((this.state.sector1).substr(18,1)=='N')
        var floor_3_sector119 = <View style={[floor3_style.sector1_style,floor3_style.sector119]}/>;
    if((this.state.sector1).substr(19,1)=='N')
        var floor_3_sector120 = <View style={[floor3_style.sector1_style,floor3_style.sector120]}/>;
    if((this.state.sector1).substr(20,1)=='N')
        var floor_3_sector121 = <View style={[floor3_style.sector1_style,floor3_style.sector121]}/>;
    if((this.state.sector1).substr(21,1)=='N')
        var floor_3_sector122 = <View style={[floor3_style.sector1_style,floor3_style.sector122]}/>;
    if((this.state.sector1).substr(22,1)=='N')
        var floor_3_sector123 = <View style={[floor3_style.sector1_style,floor3_style.sector123]}/>;
    if((this.state.sector1).substr(23,1)=='N')
        var floor_3_sector124 = <View style={[floor3_style.sector1_style,floor3_style.sector124]}/>;
    if((this.state.sector1).substr(24,1)=='N')
        var floor_3_sector125 = <View style={[floor3_style.sector1_style,floor3_style.sector125]}/>;

    //2번째 라인
    if((this.state.sector2).substr(0,1)=='N')
        var floor_3_sector21 = <View style={[floor3_style.sector2_style, floor3_style.sector21]}/>;
    if((this.state.sector2).substr(1,1)=='N')
        var floor_3_sector22 = <View style={[floor3_style.sector2_style, floor3_style.sector22]}/>;
    if((this.state.sector2).substr(2,1)=='N')
        var floor_3_sector23 = <View style={[floor3_style.sector2_style, floor3_style.sector23]}/>;
    if((this.state.sector2).substr(3,1)=='N')
        var floor_3_sector24 = <View style={[floor3_style.sector2_style, floor3_style.sector24]}/>;
    if((this.state.sector2).substr(4,1)=='N')
        var floor_3_sector25 = <View style={[floor3_style.sector2_style, floor3_style.sector25]}/>;
    if((this.state.sector2).substr(5,1)=='N')
        var floor_3_sector26 = <View style={[floor3_style.sector2_style, floor3_style.sector26]}/>;
    if((this.state.sector2).substr(6,1)=='N')
        var floor_3_sector27 = <View style={[floor3_style.sector2_style, floor3_style.sector27]}/>;
    if((this.state.sector2).substr(7,1)=='N')
        var floor_3_sector28 = <View style={[floor3_style.sector2_style, floor3_style.sector28]}/>;
    if((this.state.sector2).substr(8,1)=='N')
        var floor_3_sector29 = <View style={[floor3_style.sector2_style, floor3_style.sector29]}/>;
    if((this.state.sector2).substr(9,1)=='N')
        var floor_3_sector210 = <View style={[floor3_style.sector2_style, floor3_style.sector210]}/>;
    if((this.state.sector2).substr(10,1)=='N')
        var floor_3_sector211 = <View style={[floor3_style.sector2_style, floor3_style.sector211]}/>;
    if((this.state.sector2).substr(11,1)=='N')
        var floor_3_sector212 = <View style={[floor3_style.sector2_style, floor3_style.sector212]}/>;
    if((this.state.sector2).substr(12,1)=='N')
        var floor_3_sector213 = <View style={[floor3_style.sector2_style, floor3_style.sector213]}/>;
    if((this.state.sector2).substr(13,1)=='N')
        var floor_3_sector214 = <View style={[floor3_style.sector2_style, floor3_style.sector214]}/>;
    if((this.state.sector2).substr(14,1)=='N')
        var floor_3_sector215 = <View style={[floor3_style.sector2_style, floor3_style.sector215]}/>;
    if((this.state.sector2).substr(15,1)=='N')
        var floor_3_sector216 = <View style={[floor3_style.sector2_style, floor3_style.sector216]}/>;
    if((this.state.sector2).substr(16,1)=='N')
        var floor_3_sector217 = <View style={[floor3_style.sector2_style, floor3_style.sector217]}/>;
    if((this.state.sector2).substr(17,1)=='N')
        var floor_3_sector218 = <View style={[floor3_style.sector2_style, floor3_style.sector218]}/>;
    if((this.state.sector2).substr(18,1)=='N')
        var floor_3_sector219 = <View style={[floor3_style.sector2_style, floor3_style.sector219]}/>;
    if((this.state.sector2).substr(19,1)=='N')
        var floor_3_sector220 = <View style={[floor3_style.sector2_style, floor3_style.sector220]}/>;
    if((this.state.sector2).substr(20,1)=='N')
        var floor_3_sector221 = <View style={[floor3_style.sector2_style, floor3_style.sector221]}/>;
    if((this.state.sector2).substr(21,1)=='N')
        var floor_3_sector222 = <View style={[floor3_style.sector2_style, floor3_style.sector222]}/>;

    //3번째 라인
    if((this.state.sector3).substr(0,1)=='N')
        var floor_3_sector31 = <View style={[floor3_style.sector3_style, floor3_style.sector21]}/>;
    if((this.state.sector3).substr(1,1)=='N')
        var floor_3_sector32 = <View style={[floor3_style.sector3_style, floor3_style.sector22]}/>;
    if((this.state.sector3).substr(2,1)=='N')
        var floor_3_sector33 = <View style={[floor3_style.sector3_style, floor3_style.sector23]}/>;
    if((this.state.sector3).substr(3,1)=='N')
        var floor_3_sector34 = <View style={[floor3_style.sector3_style, floor3_style.sector24]}/>;
    if((this.state.sector3).substr(4,1)=='N')
        var floor_3_sector35 = <View style={[floor3_style.sector3_style, floor3_style.sector25]}/>;
    if((this.state.sector3).substr(5,1)=='N')
        var floor_3_sector36 = <View style={[floor3_style.sector3_style, floor3_style.sector26]}/>;
    if((this.state.sector3).substr(6,1)=='N')
        var floor_3_sector37 = <View style={[floor3_style.sector3_style, floor3_style.sector27]}/>;
    if((this.state.sector3).substr(7,1)=='N')
        var floor_3_sector38 = <View style={[floor3_style.sector3_style, floor3_style.sector28]}/>;
    if((this.state.sector3).substr(8,1)=='N')
        var floor_3_sector39 = <View style={[floor3_style.sector3_style, floor3_style.sector29]}/>;
    if((this.state.sector3).substr(9,1)=='N')
        var floor_3_sector310 = <View style={[floor3_style.sector3_style, floor3_style.sector210]}/>;
    if((this.state.sector3).substr(10,1)=='N')
        var floor_3_sector311 = <View style={[floor3_style.sector3_style, floor3_style.sector211]}/>;
    if((this.state.sector3).substr(11,1)=='N')
        var floor_3_sector312 = <View style={[floor3_style.sector3_style, floor3_style.sector212]}/>;
    if((this.state.sector3).substr(12,1)=='N')
        var floor_3_sector313 = <View style={[floor3_style.sector3_style, floor3_style.sector213]}/>;
    if((this.state.sector3).substr(13,1)=='N')
        var floor_3_sector314 = <View style={[floor3_style.sector3_style, floor3_style.sector214]}/>;
    if((this.state.sector3).substr(14,1)=='N')
        var floor_3_sector315 = <View style={[floor3_style.sector3_style, floor3_style.sector215]}/>;
    if((this.state.sector3).substr(15,1)=='N')
        var floor_3_sector316 = <View style={[floor3_style.sector3_style, floor3_style.sector216]}/>;
    if((this.state.sector3).substr(16,1)=='N')
        var floor_3_sector317 = <View style={[floor3_style.sector3_style, floor3_style.sector217]}/>;
    if((this.state.sector3).substr(17,1)=='N')
        var floor_3_sector318 = <View style={[floor3_style.sector3_style, floor3_style.sector218]}/>;
    if((this.state.sector3).substr(18,1)=='N')
        var floor_3_sector319 = <View style={[floor3_style.sector3_style, floor3_style.sector219]}/>;
    if((this.state.sector3).substr(19,1)=='N')
        var floor_3_sector320 = <View style={[floor3_style.sector3_style, floor3_style.sector220]}/>;
    if((this.state.sector3).substr(20,1)=='N')
        var floor_3_sector321 = <View style={[floor3_style.sector3_style, floor3_style.sector221]}/>;
    if((this.state.sector3).substr(21,1)=='N')
        var floor_3_sector322 = <View style={[floor3_style.sector3_style, floor3_style.sector222]}/>;
    if((this.state.sector3).substr(22,1)=='N')
        var floor_3_sector323 = <View style={[floor3_style.sector3_style, floor3_style.sector323]}/>;

          //4번째 라인
    if((this.state.sector4).substr(0,1)=='N')
        var floor_3_sector41 = <View style={[floor3_style.sector4_style, floor3_style.sector21]}/>;
    if((this.state.sector4).substr(1,1)=='N')
        var floor_3_sector42 = <View style={[floor3_style.sector4_style, floor3_style.sector22]}/>;
    if((this.state.sector4).substr(2,1)=='N')
        var floor_3_sector43 = <View style={[floor3_style.sector4_style, floor3_style.sector23]}/>;
    if((this.state.sector4).substr(3,1)=='N')
        var floor_3_sector44 = <View style={[floor3_style.sector4_style, floor3_style.sector24]}/>;
    if((this.state.sector4).substr(4,1)=='N')
        var floor_3_sector45 = <View style={[floor3_style.sector4_style, floor3_style.sector25]}/>;
    if((this.state.sector4).substr(5,1)=='N')
        var floor_3_sector46 = <View style={[floor3_style.sector4_style, floor3_style.sector26]}/>;
    if((this.state.sector4).substr(6,1)=='N')
        var floor_3_sector47 = <View style={[floor3_style.sector4_style, floor3_style.sector27]}/>;
    if((this.state.sector4).substr(7,1)=='N')
        var floor_3_sector48 = <View style={[floor3_style.sector4_style, floor3_style.sector28]}/>;
    if((this.state.sector4).substr(8,1)=='N')
        var floor_3_sector49 = <View style={[floor3_style.sector4_style, floor3_style.sector29]}/>;
    if((this.state.sector4).substr(9,1)=='N')
        var floor_3_sector410 = <View style={[floor3_style.sector4_style, floor3_style.sector210]}/>;
    if((this.state.sector4).substr(10,1)=='N')
        var floor_3_sector411 = <View style={[floor3_style.sector4_style, floor3_style.sector211]}/>;
    if((this.state.sector4).substr(11,1)=='N')
        var floor_3_sector412 = <View style={[floor3_style.sector4_style, floor3_style.sector212]}/>;
    if((this.state.sector4).substr(12,1)=='N')
        var floor_3_sector413 = <View style={[floor3_style.sector4_style, floor3_style.sector213]}/>;
    if((this.state.sector4).substr(13,1)=='N')
        var floor_3_sector414 = <View style={[floor3_style.sector4_style, floor3_style.sector214]}/>;
    if((this.state.sector4).substr(14,1)=='N')
        var floor_3_sector415 = <View style={[floor3_style.sector4_style, floor3_style.sector215]}/>;
    if((this.state.sector4).substr(15,1)=='N')
        var floor_3_sector416 = <View style={[floor3_style.sector4_style, floor3_style.sector216]}/>;
    if((this.state.sector4).substr(16,1)=='N')
        var floor_3_sector417 = <View style={[floor3_style.sector4_style, floor3_style.sector217]}/>;
    if((this.state.sector4).substr(17,1)=='N')
        var floor_3_sector418 = <View style={[floor3_style.sector4_style, floor3_style.sector218]}/>;
    if((this.state.sector4).substr(18,1)=='N')
        var floor_3_sector419 = <View style={[floor3_style.sector4_style, floor3_style.sector219]}/>;
    if((this.state.sector4).substr(19,1)=='N')
        var floor_3_sector420 = <View style={[floor3_style.sector4_style, floor3_style.sector220]}/>;
    if((this.state.sector4).substr(20,1)=='N')
        var floor_3_sector421 = <View style={[floor3_style.sector4_style, floor3_style.sector221]}/>;
    if((this.state.sector4).substr(21,1)=='N')
        var floor_3_sector422 = <View style={[floor3_style.sector4_style, floor3_style.sector222]}/>;

    //5번째 라인
    if((this.state.sector5).substr(0,1)=='N')
        var floor_3_sector51 = <View style={[floor3_style.sector5_style, floor3_style.sector21]}/>;
    if((this.state.sector5).substr(1,1)=='N')
        var floor_3_sector52 = <View style={[floor3_style.sector5_style, floor3_style.sector22]}/>;
    if((this.state.sector5).substr(2,1)=='N')
        var floor_3_sector53 = <View style={[floor3_style.sector5_style, floor3_style.sector23]}/>;
    if((this.state.sector5).substr(3,1)=='N')
        var floor_3_sector54 = <View style={[floor3_style.sector5_style, floor3_style.sector24]}/>;
    if((this.state.sector5).substr(4,1)=='N')
        var floor_3_sector55 = <View style={[floor3_style.sector5_style, floor3_style.sector25]}/>;
    if((this.state.sector5).substr(5,1)=='N')
        var floor_3_sector56 = <View style={[floor3_style.sector5_style, floor3_style.sector26]}/>;
    if((this.state.sector5).substr(6,1)=='N')
        var floor_3_sector57 = <View style={[floor3_style.sector5_style, floor3_style.sector27]}/>;
    if((this.state.sector5).substr(7,1)=='N')
        var floor_3_sector58 = <View style={[floor3_style.sector5_style, floor3_style.sector28]}/>;
    if((this.state.sector5).substr(8,1)=='N')
        var floor_3_sector59 = <View style={[floor3_style.sector5_style, floor3_style.sector29]}/>;
    if((this.state.sector5).substr(9,1)=='N')
        var floor_3_sector510 = <View style={[floor3_style.sector5_style, floor3_style.sector210]}/>;
    if((this.state.sector5).substr(10,1)=='N')
        var floor_3_sector511 = <View style={[floor3_style.sector5_style, floor3_style.sector211]}/>;
    if((this.state.sector5).substr(11,1)=='N')
        var floor_3_sector512 = <View style={[floor3_style.sector5_style, floor3_style.sector212]}/>;
    if((this.state.sector5).substr(12,1)=='N')
        var floor_3_sector513 = <View style={[floor3_style.sector5_style, floor3_style.sector213]}/>;
    if((this.state.sector5).substr(13,1)=='N')
        var floor_3_sector514 = <View style={[floor3_style.sector5_style, floor3_style.sector214]}/>;
    if((this.state.sector5).substr(14,1)=='N')
        var floor_3_sector515 = <View style={[floor3_style.sector5_style, floor3_style.sector215]}/>;
    if((this.state.sector5).substr(15,1)=='N')
        var floor_3_sector516 = <View style={[floor3_style.sector5_style, floor3_style.sector216]}/>;
    if((this.state.sector5).substr(16,1)=='N')
        var floor_3_sector517 = <View style={[floor3_style.sector5_style, floor3_style.sector217]}/>;
    if((this.state.sector5).substr(17,1)=='N')
        var floor_3_sector518 = <View style={[floor3_style.sector5_style, floor3_style.sector218]}/>;
    if((this.state.sector5).substr(18,1)=='N')
        var floor_3_sector519 = <View style={[floor3_style.sector5_style, floor3_style.sector219]}/>;
    if((this.state.sector5).substr(19,1)=='N')
        var floor_3_sector520 = <View style={[floor3_style.sector5_style, floor3_style.sector220]}/>;
    if((this.state.sector5).substr(20,1)=='N')
        var floor_3_sector521 = <View style={[floor3_style.sector5_style, floor3_style.sector221]}/>;
    if((this.state.sector5).substr(21,1)=='N')
        var floor_3_sector522 = <View style={[floor3_style.sector5_style, floor3_style.sector222]}/>;
    if((this.state.sector5).substr(22,1)=='N')
        var floor_3_sector523 = <View style={[floor3_style.sector5_style, floor3_style.sector323]}/>;

          //6번째 라인
    if((this.state.sector6).substr(0,1)=='N')
        var floor_3_sector61 = <View style={[floor3_style.sector6_style, floor3_style.sector21]}/>;
    if((this.state.sector6).substr(1,1)=='N')
        var floor_3_sector62 = <View style={[floor3_style.sector6_style, floor3_style.sector22]}/>;
    if((this.state.sector6).substr(2,1)=='N')
        var floor_3_sector63 = <View style={[floor3_style.sector6_style, floor3_style.sector23]}/>;
    if((this.state.sector6).substr(3,1)=='N')
        var floor_3_sector64 = <View style={[floor3_style.sector6_style, floor3_style.sector24]}/>;
    if((this.state.sector6).substr(4,1)=='N')
        var floor_3_sector65 = <View style={[floor3_style.sector6_style, floor3_style.sector25]}/>;
    if((this.state.sector6).substr(5,1)=='N')
        var floor_3_sector66 = <View style={[floor3_style.sector6_style, floor3_style.sector26]}/>;
    if((this.state.sector6).substr(6,1)=='N')
        var floor_3_sector67 = <View style={[floor3_style.sector6_style, floor3_style.sector27]}/>;
    if((this.state.sector6).substr(7,1)=='N')
        var floor_3_sector68 = <View style={[floor3_style.sector6_style, floor3_style.sector28]}/>;
    if((this.state.sector6).substr(8,1)=='N')
        var floor_3_sector69 = <View style={[floor3_style.sector6_style, floor3_style.sector29]}/>;
    if((this.state.sector6).substr(9,1)=='N')
        var floor_3_sector610 = <View style={[floor3_style.sector6_style, floor3_style.sector210]}/>;
    if((this.state.sector6).substr(10,1)=='N')
        var floor_3_sector611 = <View style={[floor3_style.sector6_style, floor3_style.sector211]}/>;
    if((this.state.sector6).substr(11,1)=='N')
        var floor_3_sector612 = <View style={[floor3_style.sector6_style, floor3_style.sector212]}/>;
    if((this.state.sector6).substr(12,1)=='N')
        var floor_3_sector613 = <View style={[floor3_style.sector6_style, floor3_style.sector213]}/>;
    if((this.state.sector6).substr(13,1)=='N')
        var floor_3_sector614 = <View style={[floor3_style.sector6_style, floor3_style.sector214]}/>;
    if((this.state.sector6).substr(14,1)=='N')
        var floor_3_sector615 = <View style={[floor3_style.sector6_style, floor3_style.sector215]}/>;
    if((this.state.sector6).substr(15,1)=='N')
        var floor_3_sector616 = <View style={[floor3_style.sector6_style, floor3_style.sector216]}/>;
    if((this.state.sector6).substr(16,1)=='N')
        var floor_3_sector617 = <View style={[floor3_style.sector6_style, floor3_style.sector217]}/>;
    if((this.state.sector6).substr(17,1)=='N')
        var floor_3_sector618 = <View style={[floor3_style.sector6_style, floor3_style.sector218]}/>;
    if((this.state.sector6).substr(18,1)=='N')
        var floor_3_sector619 = <View style={[floor3_style.sector6_style, floor3_style.sector219]}/>;
    if((this.state.sector6).substr(19,1)=='N')
        var floor_3_sector620 = <View style={[floor3_style.sector6_style, floor3_style.sector220]}/>;
    if((this.state.sector6).substr(20,1)=='N')
        var floor_3_sector621 = <View style={[floor3_style.sector6_style, floor3_style.sector221]}/>;
    if((this.state.sector6).substr(21,1)=='N')
        var floor_3_sector622 = <View style={[floor3_style.sector6_style, floor3_style.sector222]}/>;

  //7번째 라인
    if((this.state.sector7).substr(0,1)=='N')
        var floor_3_sector71 = <View style={[floor3_style.sector7_style, floor3_style.sector21]}/>;
    if((this.state.sector7).substr(1,1)=='N')
        var floor_3_sector72 = <View style={[floor3_style.sector7_style, floor3_style.sector22]}/>;
    if((this.state.sector7).substr(2,1)=='N')
        var floor_3_sector73 = <View style={[floor3_style.sector7_style, floor3_style.sector23]}/>;
    if((this.state.sector7).substr(3,1)=='N')
        var floor_3_sector74 = <View style={[floor3_style.sector7_style, floor3_style.sector24]}/>;
    if((this.state.sector7).substr(4,1)=='N')
        var floor_3_sector75 = <View style={[floor3_style.sector7_style, floor3_style.sector25]}/>;
    if((this.state.sector7).substr(5,1)=='N')
        var floor_3_sector76 = <View style={[floor3_style.sector7_style, floor3_style.sector26]}/>;
    if((this.state.sector7).substr(6,1)=='N')
        var floor_3_sector77 = <View style={[floor3_style.sector7_style, floor3_style.sector27]}/>;
    if((this.state.sector7).substr(7,1)=='N')
        var floor_3_sector78 = <View style={[floor3_style.sector7_style, floor3_style.sector28]}/>;
    if((this.state.sector7).substr(8,1)=='N')
        var floor_3_sector79 = <View style={[floor3_style.sector7_style, floor3_style.sector29]}/>;
    if((this.state.sector7).substr(9,1)=='N')
        var floor_3_sector710 = <View style={[floor3_style.sector7_style, floor3_style.sector210]}/>;
    if((this.state.sector7).substr(10,1)=='N')
        var floor_3_sector711 = <View style={[floor3_style.sector7_style, floor3_style.sector211]}/>;
    if((this.state.sector7).substr(11,1)=='N')
        var floor_3_sector712 = <View style={[floor3_style.sector7_style, floor3_style.sector212]}/>;
    if((this.state.sector7).substr(12,1)=='N')
        var floor_3_sector713 = <View style={[floor3_style.sector7_style, floor3_style.sector213]}/>;
    if((this.state.sector7).substr(13,1)=='N')
        var floor_3_sector714 = <View style={[floor3_style.sector7_style, floor3_style.sector214]}/>;
    if((this.state.sector7).substr(14,1)=='N')
        var floor_3_sector715 = <View style={[floor3_style.sector7_style, floor3_style.sector215]}/>;
    if((this.state.sector7).substr(15,1)=='N')
        var floor_3_sector716 = <View style={[floor3_style.sector7_style, floor3_style.sector216]}/>;
    if((this.state.sector7).substr(16,1)=='N')
        var floor_3_sector717 = <View style={[floor3_style.sector7_style, floor3_style.sector217]}/>;
    if((this.state.sector7).substr(17,1)=='N')
        var floor_3_sector718 = <View style={[floor3_style.sector7_style, floor3_style.sector218]}/>;
    if((this.state.sector7).substr(18,1)=='N')
        var floor_3_sector719 = <View style={[floor3_style.sector7_style, floor3_style.sector219]}/>;
    if((this.state.sector7).substr(19,1)=='N')
        var floor_3_sector720 = <View style={[floor3_style.sector7_style, floor3_style.sector220]}/>;

    //8번째 라인
    if((this.state.sector8).substr(0,1)=='N')
        var floor_3_sector81 = <View style={[floor3_style.sector8_style, floor3_style.sector21]}/>;
    if((this.state.sector8).substr(1,1)=='N')
        var floor_3_sector82 = <View style={[floor3_style.sector8_style, floor3_style.sector22]}/>;
    if((this.state.sector8).substr(2,1)=='N')
        var floor_3_sector83 = <View style={[floor3_style.sector8_style, floor3_style.sector23]}/>;
    if((this.state.sector8).substr(3,1)=='N')
        var floor_3_sector84 = <View style={[floor3_style.sector8_style, floor3_style.sector24]}/>;
    if((this.state.sector8).substr(4,1)=='N')
        var floor_3_sector85 = <View style={[floor3_style.sector8_style, floor3_style.sector25]}/>;
    if((this.state.sector8).substr(5,1)=='N')
        var floor_3_sector86 = <View style={[floor3_style.sector8_style, floor3_style.sector26]}/>;
    if((this.state.sector8).substr(6,1)=='N')
        var floor_3_sector87 = <View style={[floor3_style.sector8_style, floor3_style.sector27]}/>;
    if((this.state.sector8).substr(7,1)=='N')
        var floor_3_sector88 = <View style={[floor3_style.sector8_style, floor3_style.sector28]}/>;
    if((this.state.sector8).substr(8,1)=='N')
        var floor_3_sector89 = <View style={[floor3_style.sector8_style, floor3_style.sector29]}/>;
    if((this.state.sector8).substr(9,1)=='N')
        var floor_3_sector810 = <View style={[floor3_style.sector8_style, floor3_style.sector210]}/>;
    if((this.state.sector8).substr(10,1)=='N')
        var floor_3_sector811 = <View style={[floor3_style.sector8_style, floor3_style.sector211]}/>;
    if((this.state.sector8).substr(11,1)=='N')
        var floor_3_sector812 = <View style={[floor3_style.sector8_style, floor3_style.sector212]}/>;
    if((this.state.sector8).substr(12,1)=='N')
        var floor_3_sector813 = <View style={[floor3_style.sector8_style, floor3_style.sector213]}/>;
    if((this.state.sector8).substr(13,1)=='N')
        var floor_3_sector814 = <View style={[floor3_style.sector8_style, floor3_style.sector214]}/>;
    if((this.state.sector8).substr(14,1)=='N')
        var floor_3_sector815 = <View style={[floor3_style.sector8_style, floor3_style.sector215]}/>;
    if((this.state.sector8).substr(15,1)=='N')
        var floor_3_sector816 = <View style={[floor3_style.sector8_style, floor3_style.sector216]}/>;
    if((this.state.sector8).substr(16,1)=='N')
        var floor_3_sector817 = <View style={[floor3_style.sector8_style, floor3_style.sector217]}/>;
    if((this.state.sector8).substr(17,1)=='N')
        var floor_3_sector818 = <View style={[floor3_style.sector8_style, floor3_style.sector218]}/>;
    if((this.state.sector8).substr(18,1)=='N')
        var floor_3_sector819 = <View style={[floor3_style.sector8_style, floor3_style.sector219]}/>;
    if((this.state.sector8).substr(19,1)=='N')
        var floor_3_sector820 = <View style={[floor3_style.sector8_style, floor3_style.sector820]}/>;
    if((this.state.sector8).substr(20,1)=='N')
        var floor_3_sector821 = <View style={[floor3_style.sector8_style, floor3_style.sector821]}/>;
    if((this.state.sector8).substr(21,1)=='N')
        var floor_3_sector822 = <View style={[floor3_style.sector8_style, floor3_style.sector822]}/>;
    if((this.state.sector8).substr(22,1)=='N')
        var floor_3_sector823 = <View style={[floor3_style.sector8_style, floor3_style.sector823]}/>;
    if((this.state.sector8).substr(23,1)=='N')
        var floor_3_sector824 = <View style={[floor3_style.sector8_style, floor3_style.sector824]}/>;
    if((this.state.sector8).substr(24,1)=='N')
        var floor_3_sector825 = <View style={[floor3_style.sector8_style, floor3_style.sector825]}/>;

    //장애인 구역
    if((this.state.handi).substr(0,1)=='N')
        var floor_3_handi1 = <View style={[floor3_style.sector_handi_style, floor3_style.handi1]}/>;
    if((this.state.handi).substr(1,1)=='N')
        var floor_3_handi2 = <View style={[floor3_style.sector_handi_style, floor3_style.handi2]}/>;
    if((this.state.handi).substr(2,1)=='N')
        var floor_3_handi3 = <View style={[floor3_style.sector_handi_style, floor3_style.handi3]}/>;
    if((this.state.handi).substr(3,1)=='N')
        var floor_3_handi4 = <View style={[floor3_style.sector_handi_style, floor3_style.handi4]}/>;
    if((this.state.handi).substr(4,1)=='N')
        var floor_3_handi5 = <View style={[floor3_style.sector_handi_style, floor3_style.handi5]}/>;
    if((this.state.handi).substr(5,1)=='N')
        var floor_3_handi6 = <View style={[floor3_style.sector_handi_style, floor3_style.handi6]}/>;
    if((this.state.handi).substr(6,1)=='N')
        var floor_3_handi7 = <View style={[floor3_style.sector_handi_style, floor3_style.handi7]}/>;
    if((this.state.handi).substr(7,1)=='N')
        var floor_3_handi8 = <View style={[floor3_style.sector_handi_style, floor3_style.handi8]}/>;
    if((this.state.handi).substr(8,1)=='N')
        var floor_3_handi9 = <View style={[floor3_style.sector_handi_style, floor3_style.handi9]}/>;
    if((this.state.handi).substr(9,1)=='N')
        var floor_3_handi10 = <View style={[floor3_style.sector_handi_style, floor3_style.handi10]}/>;


    // 길안내 목적지 애니메이션 효과
    if(this.state.result_line=='0') {
      if(this.state.result_sector=='0')
        var floor_3_sector11 = <View style={[floor3_style.result_sector11,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='1')
        var floor_3_sector12 = <View style={[floor3_style.result_sector12,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='2')
        var floor_3_sector13 = <View style={[floor3_style.result_sector13,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='3')
        var floor_3_sector14 = <View style={[floor3_style.result_sector14,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='4')
        var floor_3_sector15 = <View style={[floor3_style.result_sector15,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='5')
        var floor_3_sector16 = <View style={[floor3_style.result_sector16,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='6')
        var floor_3_sector17 = <View style={[floor3_style.result_sector17,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='7')
        var floor_3_sector18 = <View style={[floor3_style.result_sector18,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='8')
        var floor_3_sector19 = <View style={[floor3_style.result_sector19,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='9')
        var floor_3_sector110 = <View style={[floor3_style.result_sector110,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='10')
        var floor_3_sector111 = <View style={[floor3_style.result_sector111,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='11')
        var floor_3_sector112 = <View style={[floor3_style.result_sector112,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='12')
        var floor_3_sector113 = <View style={[floor3_style.result_sector113,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='13')
        var floor_3_sector114 = <View style={[floor3_style.result_sector114,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='14')
        var floor_3_sector115 = <View style={[floor3_style.result_sector115,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='15')
        var floor_3_sector116 = <View style={[floor3_style.result_sector116,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='16')
        var floor_3_sector117 = <View style={[floor3_style.result_sector117,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='17')
        var floor_3_sector118 = <View style={[floor3_style.result_sector118,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='18')
        var floor_3_sector119 = <View style={[floor3_style.result_sector119,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='19')
        var floor_3_sector120 = <View style={[floor3_style.result_sector120,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='20')
        var floor_3_sector121 = <View style={[floor3_style.result_sector121,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='21')
        var floor_3_sector122 = <View style={[floor3_style.result_sector122,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='22')
        var floor_3_sector123 = <View style={[floor3_style.result_sector123,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='23')
        var floor_3_sector124 = <View style={[floor3_style.result_sector124,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='24')
        var floor_3_sector125 = <View style={[floor3_style.result_sector125,floor3_style.result_container1]}>{animated_style}{result_view_style}</View>
    }
    else if(this.state.result_line=='1') {
      if(this.state.result_sector=='0')
        var floor_3_sector21 = <View style={[floor3_style.result_sector21,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='1')
        var floor_3_sector22 = <View style={[floor3_style.result_sector22,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='2')
        var floor_3_sector23 = <View style={[floor3_style.result_sector23,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='3')
        var floor_3_sector24 = <View style={[floor3_style.result_sector24,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='4')
        var floor_3_sector25 = <View style={[floor3_style.result_sector25,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='5')
        var floor_3_sector26 = <View style={[floor3_style.result_sector26,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='6')
        var floor_3_sector27 = <View style={[floor3_style.result_sector27,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='7')
        var floor_3_sector28 = <View style={[floor3_style.result_sector28,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='8')
        var floor_3_sector29 = <View style={[floor3_style.result_sector29,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='9')
        var floor_3_sector210 = <View style={[floor3_style.result_sector210,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='10')
        var floor_3_sector211 = <View style={[floor3_style.result_sector211,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='11')
        var floor_3_sector212 = <View style={[floor3_style.result_sector212,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='12')
        var floor_3_sector213 = <View style={[floor3_style.result_sector213,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='13')
        var floor_3_sector214 = <View style={[floor3_style.result_sector214,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='14')
        var floor_3_sector215 = <View style={[floor3_style.result_sector215,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='15')
        var floor_3_sector216 = <View style={[floor3_style.result_sector216,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='16')
        var floor_3_sector217 = <View style={[floor3_style.result_sector217,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='17')
        var floor_3_sector218 = <View style={[floor3_style.result_sector218,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='18')
        var floor_3_sector219 = <View style={[floor3_style.result_sector219,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='19')
        var floor_3_sector220 = <View style={[floor3_style.result_sector220,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='20')
        var floor_3_sector221 = <View style={[floor3_style.result_sector221,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='21')
        var floor_3_sector222 = <View style={[floor3_style.result_sector222,floor3_style.result_container2]}>{animated_style}{result_view_style}</View>
    }
    else if(this.state.result_line=='2') {
      if(this.state.result_sector=='0')
        var floor_3_sector31 = <View style={[floor3_style.result_sector21,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='1')
        var floor_3_sector32 = <View style={[floor3_style.result_sector22,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='2')
        var floor_3_sector33 = <View style={[floor3_style.result_sector23,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='3')
        var floor_3_sector34 = <View style={[floor3_style.result_sector24,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='4')
        var floor_3_sector35 = <View style={[floor3_style.result_sector25,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='5')
        var floor_3_sector36 = <View style={[floor3_style.result_sector26,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='6')
        var floor_3_sector37 = <View style={[floor3_style.result_sector27,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='7')
        var floor_3_sector38 = <View style={[floor3_style.result_sector28,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='8')
        var floor_3_sector39 = <View style={[floor3_style.result_sector29,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='9')
        var floor_3_sector310 = <View style={[floor3_style.result_sector210,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='10')
        var floor_3_sector311 = <View style={[floor3_style.result_sector211,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='11')
        var floor_3_sector312 = <View style={[floor3_style.result_sector212,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='12')
        var floor_3_sector313 = <View style={[floor3_style.result_sector213,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='13')
        var floor_3_sector314 = <View style={[floor3_style.result_sector214,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='14')
        var floor_3_sector315 = <View style={[floor3_style.result_sector215,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='15')
        var floor_3_sector316 = <View style={[floor3_style.result_sector216,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='16')
        var floor_3_sector317 = <View style={[floor3_style.result_sector217,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='17')
        var floor_3_sector318 = <View style={[floor3_style.result_sector218,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='18')
        var floor_3_sector319 = <View style={[floor3_style.result_sector219,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='19')
        var floor_3_sector320 = <View style={[floor3_style.result_sector220,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='20')
        var floor_3_sector321 = <View style={[floor3_style.result_sector221,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='21')
        var floor_3_sector322 = <View style={[floor3_style.result_sector222,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='22')
        var floor_3_sector323 = <View style={[floor3_style.result_sector323,floor3_style.result_container3]}>{animated_style}{result_view_style}</View>
    }
    else if(this.state.result_line=='3') {
      if(this.state.result_sector=='0')
        var floor_3_sector41 = <View style={[floor3_style.result_sector21,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='1')
        var floor_3_sector42 = <View style={[floor3_style.result_sector22,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='2')
        var floor_3_sector43 = <View style={[floor3_style.result_sector23,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='3')
        var floor_3_sector44 = <View style={[floor3_style.result_sector24,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='4')
        var floor_3_sector45 = <View style={[floor3_style.result_sector25,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='5')
        var floor_3_sector46 = <View style={[floor3_style.result_sector26,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='6')
        var floor_3_sector47 = <View style={[floor3_style.result_sector27,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='7')
        var floor_3_sector48 = <View style={[floor3_style.result_sector28,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='8')
        var floor_3_sector49 = <View style={[floor3_style.result_sector29,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='9')
        var floor_3_sector410 = <View style={[floor3_style.result_sector210,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='10')
        var floor_3_sector411 = <View style={[floor3_style.result_sector211,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='11')
        var floor_3_sector412 = <View style={[floor3_style.result_sector212,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='12')
        var floor_3_sector413 = <View style={[floor3_style.result_sector213,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='13')
        var floor_3_sector414 = <View style={[floor3_style.result_sector214,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='14')
        var floor_3_sector415 = <View style={[floor3_style.result_sector215,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='15')
        var floor_3_sector416 = <View style={[floor3_style.result_sector216,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='16')
        var floor_3_sector417 = <View style={[floor3_style.result_sector217,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='17')
        var floor_3_sector418 = <View style={[floor3_style.result_sector218,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='18')
        var floor_3_sector419 = <View style={[floor3_style.result_sector219,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='19')
        var floor_3_sector420 = <View style={[floor3_style.result_sector220,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='20')
        var floor_3_sector421 = <View style={[floor3_style.result_sector221,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='21')
        var floor_3_sector422 = <View style={[floor3_style.result_sector222,floor3_style.result_container4]}>{animated_style}{result_view_style}</View>
    }
    else if(this.state.result_line=='4') {
      if(this.state.result_sector=='0')
        var floor_3_sector51 = <View style={[floor3_style.result_sector21,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='1')
        var floor_3_sector52 = <View style={[floor3_style.result_sector22,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='2')
        var floor_3_sector53 = <View style={[floor3_style.result_sector23,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='3')
        var floor_3_sector54 = <View style={[floor3_style.result_sector24,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='4')
        var floor_3_sector55 = <View style={[floor3_style.result_sector25,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='5')
        var floor_3_sector56 = <View style={[floor3_style.result_sector26,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='6')
        var floor_3_sector57 = <View style={[floor3_style.result_sector27,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='7')
        var floor_3_sector58 = <View style={[floor3_style.result_sector28,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='8')
        var floor_3_sector59 = <View style={[floor3_style.result_sector29,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='9')
        var floor_3_sector510 = <View style={[floor3_style.result_sector210,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='10')
        var floor_3_sector511 = <View style={[floor3_style.result_sector211,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='11')
        var floor_3_sector512 = <View style={[floor3_style.result_sector212,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='12')
        var floor_3_sector513 = <View style={[floor3_style.result_sector213,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='13')
        var floor_3_sector514 = <View style={[floor3_style.result_sector214,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='14')
        var floor_3_sector515 = <View style={[floor3_style.result_sector215,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='15')
        var floor_3_sector516 = <View style={[floor3_style.result_sector216,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='16')
        var floor_3_sector517 = <View style={[floor3_style.result_sector217,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='17')
        var floor_3_sector518 = <View style={[floor3_style.result_sector218,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='18')
        var floor_3_sector519 = <View style={[floor3_style.result_sector219,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='19')
        var floor_3_sector520 = <View style={[floor3_style.result_sector220,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='20')
        var floor_3_sector521 = <View style={[floor3_style.result_sector221,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='21')
        var floor_3_sector522 = <View style={[floor3_style.result_sector222,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='22')
        var floor_3_sector523 = <View style={[floor3_style.result_sector323,floor3_style.result_container5]}>{animated_style}{result_view_style}</View>
    }
    else if(this.state.result_line=='5') {
      if(this.state.result_sector=='0')
        var floor_3_sector61 = <View style={[floor3_style.result_sector21,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='1')
        var floor_3_sector62 = <View style={[floor3_style.result_sector22,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='2')
        var floor_3_sector63 = <View style={[floor3_style.result_sector23,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='3')
        var floor_3_sector64 = <View style={[floor3_style.result_sector24,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='4')
        var floor_3_sector65 = <View style={[floor3_style.result_sector25,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='5')
        var floor_3_sector66 = <View style={[floor3_style.result_sector26,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='6')
        var floor_3_sector67 = <View style={[floor3_style.result_sector27,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='7')
        var floor_3_sector68 = <View style={[floor3_style.result_sector28,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='8')
        var floor_3_sector69 = <View style={[floor3_style.result_sector29,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='9')
        var floor_3_sector610 = <View style={[floor3_style.result_sector210,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='10')
        var floor_3_sector611 = <View style={[floor3_style.result_sector211,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='11')
        var floor_3_sector612 = <View style={[floor3_style.result_sector212,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='12')
        var floor_3_sector613 = <View style={[floor3_style.result_sector213,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='13')
        var floor_3_sector614 = <View style={[floor3_style.result_sector214,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='14')
        var floor_3_sector615 = <View style={[floor3_style.result_sector215,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='15')
        var floor_3_sector616 = <View style={[floor3_style.result_sector216,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='16')
        var floor_3_sector617 = <View style={[floor3_style.result_sector217,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='17')
        var floor_3_sector618 = <View style={[floor3_style.result_sector218,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='18')
        var floor_3_sector619 = <View style={[floor3_style.result_sector219,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='19')
        var floor_3_sector620 = <View style={[floor3_style.result_sector220,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='20')
        var floor_3_sector621 = <View style={[floor3_style.result_sector221,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='21')
        var floor_3_sector622 = <View style={[floor3_style.result_sector222,floor3_style.result_container6]}>{animated_style}{result_view_style}</View>
    }
    else if(this.state.result_line=='6') {
      if(this.state.result_sector=='0')
        var floor_3_sector71 = <View style={[floor3_style.result_sector21,floor3_style.result_container7]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='1')
        var floor_3_sector72 = <View style={[floor3_style.result_sector22,floor3_style.result_container7]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='2')
        var floor_3_sector73 = <View style={[floor3_style.result_sector23,floor3_style.result_container7]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='3')
        var floor_3_sector74 = <View style={[floor3_style.result_sector24,floor3_style.result_container7]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='4')
        var floor_3_sector75 = <View style={[floor3_style.result_sector25,floor3_style.result_container7]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='5')
        var floor_3_sector76 = <View style={[floor3_style.result_sector26,floor3_style.result_container7]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='6')
        var floor_3_sector77 = <View style={[floor3_style.result_sector27,floor3_style.result_container7]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='7')
        var floor_3_sector78 = <View style={[floor3_style.result_sector28,floor3_style.result_container7]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='8')
        var floor_3_sector79 = <View style={[floor3_style.result_sector29,floor3_style.result_container7]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='9')
        var floor_3_sector710 = <View style={[floor3_style.result_sector210,floor3_style.result_container7]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='10')
        var floor_3_sector711 = <View style={[floor3_style.result_sector211,floor3_style.result_container7]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='11')
        var floor_3_sector712 = <View style={[floor3_style.result_sector212,floor3_style.result_container7]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='12')
        var floor_3_sector713 = <View style={[floor3_style.result_sector213,floor3_style.result_container7]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='13')
        var floor_3_sector714 = <View style={[floor3_style.result_sector214,floor3_style.result_container7]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='14')
        var floor_3_sector715 = <View style={[floor3_style.result_sector215,floor3_style.result_container7]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='15')
        var floor_3_sector716 = <View style={[floor3_style.result_sector216,floor3_style.result_container7]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='16')
        var floor_3_sector717 = <View style={[floor3_style.result_sector217,floor3_style.result_container7]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='17')
        var floor_3_sector718 = <View style={[floor3_style.result_sector218,floor3_style.result_container7]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='18')
        var floor_3_sector719 = <View style={[floor3_style.result_sector219,floor3_style.result_container7]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='19')
        var floor_3_sector720 = <View style={[floor3_style.result_sector220,floor3_style.result_container7]}>{animated_style}{result_view_style}</View>
    }
    else if(this.state.result_line=='7') {
      if(this.state.result_sector=='0')
        var floor_3_sector81 = <View style={[floor3_style.result_sector21,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='1')
        var floor_3_sector82 = <View style={[floor3_style.result_sector22,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='2')
        var floor_3_sector83 = <View style={[floor3_style.result_sector23,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='3')
        var floor_3_sector84 = <View style={[floor3_style.result_sector24,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='4')
        var floor_3_sector85 = <View style={[floor3_style.result_sector25,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='5')
        var floor_3_sector86 = <View style={[floor3_style.result_sector26,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='6')
        var floor_3_sector87 = <View style={[floor3_style.result_sector27,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='7')
        var floor_3_sector88 = <View style={[floor3_style.result_sector28,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='8')
        var floor_3_sector89 = <View style={[floor3_style.result_sector29,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='9')
        var floor_3_sector810 = <View style={[floor3_style.result_sector210,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='10')
        var floor_3_sector811 = <View style={[floor3_style.result_sector211,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='11')
        var floor_3_sector812 = <View style={[floor3_style.result_sector212,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='12')
        var floor_3_sector813 = <View style={[floor3_style.result_sector213,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='13')
        var floor_3_sector814 = <View style={[floor3_style.result_sector214,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='14')
        var floor_3_sector815 = <View style={[floor3_style.result_sector215,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='15')
        var floor_3_sector816 = <View style={[floor3_style.result_sector216,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='16')
        var floor_3_sector817 = <View style={[floor3_style.result_sector217,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='17')
        var floor_3_sector818 = <View style={[floor3_style.result_sector218,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='18')
        var floor_3_sector819 = <View style={[floor3_style.result_sector219,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='19')
        var floor_3_sector820 = <View style={[floor3_style.result_sector820,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='20')
        var floor_3_sector821 = <View style={[floor3_style.result_sector821,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='21')
        var floor_3_sector822 = <View style={[floor3_style.result_sector822,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='22')
        var floor_3_sector823 = <View style={[floor3_style.result_sector823,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='23')
        var floor_3_sector824 = <View style={[floor3_style.result_sector824,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
      else if(this.state.result_sector=='24')
        var floor_3_sector825 = <View style={[floor3_style.result_sector825,floor3_style.result_container8]}>{animated_style}{result_view_style}</View>
  }

return (
  <View style={{flex:1, backgroundColor:'#2a2a2a'}}>
  <View style={{width:screen_width, height:screen_height/30, backgroundColor:'#215d5d', alignItems:'center'}}>
    <Text style={{color:'#33a7a6'}}> 아래로 당기면 새로고침 됩니다. </Text>
  </View>
      <View style={{backgroundColor:'#2A2A2A'}}>
        <Spinner visible={this.state.loading_visible}/>
        <Image source={require('../image/03F.png')}
               style={{width:screen_width, height:screen_height/1.45, position:'absolute', top:0}}
               resizeMode= { 'stretch' }/>
               {/* 1번째 라인 */}
                 {floor_3_sector11}
                 {floor_3_sector12}
                 {floor_3_sector13}
                 {floor_3_sector14}
                 {floor_3_sector15}
                 {floor_3_sector16}
                 {floor_3_sector17}
                 {floor_3_sector18}
                 {floor_3_sector19}
                 {floor_3_sector110}
                 {floor_3_sector111}
                 {floor_3_sector112}
                 {floor_3_sector113}
                 {floor_3_sector114}
                 {floor_3_sector115}
                 {floor_3_sector116}
                 {floor_3_sector117}
                 {floor_3_sector118}
                 {floor_3_sector119}
                 {floor_3_sector120}
                 {floor_3_sector121}
                 {floor_3_sector122}
                 {floor_3_sector123}
                 {floor_3_sector124}
                 {floor_3_sector125}

                 {floor_3_sector21}
                 {floor_3_sector22}
                 {floor_3_sector23}
                 {floor_3_sector24}
                 {floor_3_sector25}
                 {floor_3_sector26}
                 {floor_3_sector27}
                 {floor_3_sector28}
                 {floor_3_sector29}
                 {floor_3_sector210}
                 {floor_3_sector211}
                 {floor_3_sector212}
                 {floor_3_sector213}
                 {floor_3_sector214}
                 {floor_3_sector215}
                 {floor_3_sector216}
                 {floor_3_sector217}
                 {floor_3_sector218}
                 {floor_3_sector219}
                 {floor_3_sector220}
                 {floor_3_sector221}
                 {floor_3_sector222}

                 {floor_3_sector31}
                 {floor_3_sector32}
                 {floor_3_sector33}
                 {floor_3_sector34}
                 {floor_3_sector35}
                 {floor_3_sector36}
                 {floor_3_sector37}
                 {floor_3_sector38}
                 {floor_3_sector39}
                 {floor_3_sector310}
                 {floor_3_sector311}
                 {floor_3_sector312}
                 {floor_3_sector313}
                 {floor_3_sector314}
                 {floor_3_sector315}
                 {floor_3_sector316}
                 {floor_3_sector317}
                 {floor_3_sector318}
                 {floor_3_sector319}
                 {floor_3_sector320}
                 {floor_3_sector321}
                 {floor_3_sector322}
                 {floor_3_sector323}

                 {floor_3_sector41}
                 {floor_3_sector42}
                 {floor_3_sector43}
                 {floor_3_sector44}
                 {floor_3_sector45}
                 {floor_3_sector46}
                 {floor_3_sector47}
                 {floor_3_sector48}
                 {floor_3_sector49}
                 {floor_3_sector410}
                 {floor_3_sector411}
                 {floor_3_sector412}
                 {floor_3_sector413}
                 {floor_3_sector414}
                 {floor_3_sector415}
                 {floor_3_sector416}
                 {floor_3_sector417}
                 {floor_3_sector418}
                 {floor_3_sector419}
                 {floor_3_sector420}
                 {floor_3_sector421}
                 {floor_3_sector422}

                 {floor_3_sector51}
                 {floor_3_sector52}
                 {floor_3_sector53}
                 {floor_3_sector54}
                 {floor_3_sector55}
                 {floor_3_sector56}
                 {floor_3_sector57}
                 {floor_3_sector58}
                 {floor_3_sector59}
                 {floor_3_sector510}
                 {floor_3_sector511}
                 {floor_3_sector512}
                 {floor_3_sector513}
                 {floor_3_sector514}
                 {floor_3_sector515}
                 {floor_3_sector516}
                 {floor_3_sector517}
                 {floor_3_sector518}
                 {floor_3_sector519}
                 {floor_3_sector520}
                 {floor_3_sector521}
                 {floor_3_sector522}
                 {floor_3_sector523}

                 {floor_3_sector61}
                 {floor_3_sector62}
                 {floor_3_sector63}
                 {floor_3_sector64}
                 {floor_3_sector65}
                 {floor_3_sector66}
                 {floor_3_sector67}
                 {floor_3_sector68}
                 {floor_3_sector69}
                 {floor_3_sector610}
                 {floor_3_sector611}
                 {floor_3_sector612}
                 {floor_3_sector613}
                 {floor_3_sector614}
                 {floor_3_sector615}
                 {floor_3_sector616}
                 {floor_3_sector617}
                 {floor_3_sector618}
                 {floor_3_sector619}
                 {floor_3_sector620}
                 {floor_3_sector621}
                 {floor_3_sector622}

                 {floor_3_sector71}
                 {floor_3_sector72}
                 {floor_3_sector73}
                 {floor_3_sector74}
                 {floor_3_sector75}
                 {floor_3_sector76}
                 {floor_3_sector77}
                 {floor_3_sector78}
                 {floor_3_sector79}
                 {floor_3_sector710}
                 {floor_3_sector711}
                 {floor_3_sector712}
                 {floor_3_sector713}
                 {floor_3_sector714}
                 {floor_3_sector715}
                 {floor_3_sector716}
                 {floor_3_sector717}
                 {floor_3_sector718}
                 {floor_3_sector719}
                 {floor_3_sector720}

                 {floor_3_sector81}
                 {floor_3_sector82}
                 {floor_3_sector83}
                 {floor_3_sector84}
                 {floor_3_sector85}
                 {floor_3_sector86}
                 {floor_3_sector87}
                 {floor_3_sector88}
                 {floor_3_sector89}
                 {floor_3_sector810}
                 {floor_3_sector811}
                 {floor_3_sector812}
                 {floor_3_sector813}
                 {floor_3_sector814}
                 {floor_3_sector815}
                 {floor_3_sector816}
                 {floor_3_sector817}
                 {floor_3_sector818}
                 {floor_3_sector819}
                 {floor_3_sector820}
                 {floor_3_sector821}
                 {floor_3_sector822}
                 {floor_3_sector823}
                 {floor_3_sector824}
                 {floor_3_sector825}

                 {floor_3_handi1}
                 {floor_3_handi2}
                 {floor_3_handi3}
                 {floor_3_handi4}
                 {floor_3_handi5}
                 {floor_3_handi6}
                 {floor_3_handi7}
                 {floor_3_handi8}
                 {floor_3_handi9}
                 {floor_3_handi10}

                 {/* 길 안내 애니메이션  */}
                 <View style={{position:'absolute',left:0, top:0, width:screen_width, height: screen_height}}>
                   <Svg height={screen_height} width={screen_width}>
                     <Path d={this.state.path} fill="none" stroke="rgb(0,255,255)" strokeWidth="5"/>
                  </Svg>
                 </View>

                 {/* Refresh 리스트 뷰 */}
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
         dataSource={this.state.dataSource}
            renderRow={(rowData) => <View style={{width:screen_width, height:screen_height/1.45,backgroundColor:'rgba(0,0,0,0)'}}></View>}
         >
      </ListView>
      </View>
      <View style={{position:'absolute',bottom:0,backgroundColor:'red', width:screen_width, height:screen_height/12}}>
        <TouchableHighlight onPress={this.req_park.bind(this)} style={{flex:1, backgroundColor:'#01FDFE', alignItems:'center',justifyContent: 'center'}}>
          <Text style={{color:'black', fontSize:screen_height/1000*30}}>{this.state.search_btn}</Text>
        </TouchableHighlight>
      </View>

</View>
    );
  }
}

export default Floor3;
