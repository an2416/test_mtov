import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Dimensions,
    ScrollView,
    TouchableHighlight,
    Animated,
    ListView,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';

import NavBar, {NavGroup, NavButton, NavButtonText, NavTitle} from 'react-native-nav';
import Spinner from 'react-native-loading-spinner-overlay'; // 로딩 화면
import Beacons from 'react-native-beacons-android';
import Modal from 'react-native-simple-modal'; // 모달
//import Floor3 from './android_component/floor3.js';
import Floor4 from './android_component/floor4.js';
import Floor5 from './android_component/floor5.js';
import Floor6 from './android_component/floor6.js';

var Floor3 = require('./android_component/floor3.js').default;

var server_ip = '192.168.1.104';

// 52.79.195.188
// 192.168.1.104

//화면 비율
var screen_height = Dimensions.get('window').height;
var screen_width = Dimensions.get('window').width;

var SlidableTabBar = require('./SlidableTabBar').default;

//import SearchBar from 'react-native-searchbar';
import Icon from 'react-native-vector-icons/FontAwesome';


class iot_smart_parking extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // this._handleResults = this._handleResults.bind(this);
        // this._handleChangeText = this._handleChangeText.bind(this);
        // this._handleonSubmitEditing = this._handleonSubmitEditing.bind(this);
        // //this._closeSearch=this._closeSearch.bind(this);

        // mtov uuid a0fabefc-b1f5-4836-8328-7c5412fff9c4
        // emart uuid e2c56db5-dffb-48d2-b060-d0f5a71096e0
        this.state = {
            floor3_state: '(자리)', //192
            floor4_state: '(자리)', //277
            floor5_state: '(자리)', // 277
            floor6_state: '(자리)', // 268
            results: [],
            loading_visible: false,
            exit_modal:false,
            search_array:ds.cloneWithRows(['']),
            place:'죽전 이마트',
            uuidRef:'e2c56db5-dffb-48d2-b060-d0f5a71096e0',
        }
    }

    // _selectPlace(place) {
    //   this.setState({place : place, exit_modal:false}, function() {
    //     this.searchBar.hide();
    //     fetch("http://" + server_ip + ":3000/mobile/select_place", {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({place: place})
    //     }).then((response) => response.json()).then((responseData) => {
    //         this.setState({loading_visible: false})
    //     }).catch((error) => {
    //         this.setState({
    //             loading_visible: false
    //         }, function() {
    //             alert(error);
    //             throw(error);
    //         });
    //     });
    //   })
    // }

    // _closeSearch(aa) {
    //   console.log('close :   '+aa);
    //   this.setState({exit_modal:false})
    // }
    //
    // _openSearch() {
    //   this.setState({exit_modal:true},function() {
    //     this.searchBar.show();
    //   })
    // }
    //
    // _handlegetValue(text) {
    //     console.log('getValue : ' + text);
    // }
    //
    // _handleonSubmitEditing() {
    //   var text = this.searchBar.getValue();
    //     console.log('onSubmitEditing : ' + text);
    //     fetch("http://" + server_ip + ":3000/mobile/search_place", {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({text: text})
    //     }).then((response) => response.json()).then((responseData) => {
    //         this.setState({loading_visible: false})
    //     }).catch((error) => {
    //         this.setState({
    //             loading_visible: false
    //         }, function() {
    //             alert(error);
    //             throw(error);
    //         });
    //     });
    // }
    //
    // _handleSearch(text) {
    //   console.log('Search text : ' + text)
    // }
    //
    // _handleResults(results) {
    //     console.log('handle results : ' + results);
    //     this.setState({results});
    // }
    // _handleChangeText(text) {
    //     console.log('text : ' + text)
    //     if (text != '') {
    //         fetch("http://" + server_ip + ":3000/mobile/search_place", {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({text: text})
    //         }).then((response) => response.json()).then((responseData) => {
    //             this.setState({loading_visible: false},function() {
    //               this.setState({search_array:this.state.search_array.cloneWithRows(responseData.result)})
    //             })
    //         }).catch((error) => {
    //             this.setState({
    //                 loading_visible: false
    //             }, function() {
    //                 alert(error);
    //                 throw(error);
    //             });
    //         });
    //     }
    // }
    componentWillMount() {
      Beacons.detectIBeacons();

      const uuid = this.state.uuidRef;
      Beacons.startRangingBeaconsInRegion('REGION1',uuid)
        .then(() => console.log('Beacons ranging started succesfully'))
        .catch(error => console.log(`Beacons ranging not started, error: ${error}`));
    }

    componentWillUnMount(){
      this.beaconsDidRange = null;
    }

    componentDidMount() {
      this.beaconsDidRange = DeviceEventEmitter.addListener('beaconsDidRange',(data) => {
        for(var i = 0; i<data.beacons.length; i++) {
          console.log(JSON.stringify(data.beacons[i]));
          if(data.beacons[i].minor==1 && data.beacons[i].proximity=="immediate") { // immediate near far
            this.foo.select_topic(0);
          }
          else if(data.beacons[i].minor==2 && data.beacons[i].proximity=="immediate") { // immediate near far
            this.foo.select_topic(1);
          }
          else if(data.beacons[i].minor==3 && data.beacons[i].proximity=="immediate") { // immediate near far
            this.foo.select_topic(2);
          }
          else if(data.beacons[i].minor==4 && data.beacons[i].proximity=="immediate") { // immediate near far
            this.foo.select_topic(3);
          }
        }
      })
        fetch("http://" + server_ip + ":3000/mobile/floor_state", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        }).then((response) => response.json()).then((responseData) => {
            this.setState({
                floor3_state: '(' + responseData.floor3 + '자리)',
                floor4_state: '(' + responseData.floor4 + '자리)',
                floor5_state: '(' + responseData.floor5 + '자리)',
                floor6_state: '(' + responseData.floor6 + '자리)'
            })
        }).catch((error) => {
            this.setState({
                loading_visible: false
            }, function() {
                alert(error);
                throw(error);
            });
        });
    }

    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <Spinner visible={this.state.loading_visible}/>
                <NavBar style={styles}>
                    {/*상태바*/}
                    <StatusBar backgroundColor="black" barStyle="light-content"/>
                    <NavGroup>
                        <NavButton>
                            <NavButtonText></NavButtonText>
                        </NavButton>
                    </NavGroup>
                    <NavTitle style={{
                        color: 'black',
                        fontSize: screen_height / 1000 *30,
                        marginLeft: -(screen_width / 30)
                    }}>
                        {this.state.place}
                    </NavTitle>
                    <NavGroup>
                        <NavButton>

                        </NavButton>
                    </NavGroup>
                </NavBar>


                <SlidableTabBar ref={(foo) => { this.foo = foo; }}>
                    <Floor3 floor={'3F'} title={this.state.floor3_state} navigator={this.props.navigator}/>
                    <Floor4 floor={'4F'} title={this.state.floor4_state} navigator={this.props.navigator}/>
                    <Floor5 floor={'5F'} title={this.state.floor5_state} navigator={this.props.navigator}/>
                    <Floor6 floor={'6F'} title={this.state.floor6_state} navigator={this.props.navigator}/>
                </SlidableTabBar>

                <Modal
                       offset={this.state.offset}
                       open={this.state.exit_modal}
                       modalDidOpen={() => this.setState({loading_visible:false})}
                       modalDidClose={() => this.setState({exit_modal: false})}
                       overlayBackground={'rgba(0, 0, 0, 0.75)'}
                       containerStyle={{
                         alignItems:'center'
                       }}
                       modalStyle={{
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        width:screen_width/1.05,
                        height:screen_height,
                        marginTop:screen_height/3.45,
                       }}

                       style={{alignItems: 'center'}}>

                       <ListView
                          dataSource={this.state.search_array}
                          initialListSize={20}
                          pageSize={30}
                          enableEmptySections={true}
                          renderHeader={(rowId)=><View style={{backgroundColor:'black', height:screen_height/100,width:screen_width/1.4}}></View>}
                          renderRow={(rowData) => <View style={{marginLeft:screen_width/35}}>
                                                   <TouchableHighlight
                                                     onPress={()=>this._selectPlace(rowData.building_name)} >
                                                     <Text style={{color:'white',fontSize:screen_height/1000*25, marginTop:screen_height/100,marginBottom:screen_height/100}}>{rowData.building_name}</Text>
                                                   </TouchableHighlight>
                                                 </View>
                           }
                          renderSeparator={(sectionId, rowId) => <View key={rowId} style={[styles.separator,{backgroundColor:'black'}]} />}
                          />
                    </Modal>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    navBar: {
        backgroundColor: 'white',
        height: screen_height / 15
    },
    separator: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: 'black',
    },
});

AppRegistry.registerComponent('iot_smart_parking', () => iot_smart_parking);
