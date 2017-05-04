import React, { Component, } from 'react'
import {
    StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	TouchableHighlight,
	Animated,
    Dimensions
} from 'react-native'

//화면 비율
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

var server_ip = '192.168.1.108';

class SlidableTabBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTopic:0,
    }
  }

  select_topic(index) {
    this.setState({selectedTopic:index});
  }

  renderCenterView(thisView, index) {
    if(this.state.selectedTopic===index) {
      return(
        <View key={index} style={{flex:1}}>
          {thisView}
        </View>
      );
    }
  }

  renderTabBarOption(floor,title,color,index) {
    return (
      <TouchableHighlight
        onPress={() => this.select_topic(index)}
        key={index}
        underlayColor='white'>
        <View key={index} style={[styles.tabBarOption, {backgroundColor:'black', borderColor: color}]}>
					<Text key={index} style={{letterSpacing: 3, color: (this.state.selectedTopic === index)? '#01FDFE': 'white'}}>
                      <Text key={index} style={{fontSize:deviceHeight/1000*35}}>{floor} </Text>
                      {title}
                    </Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={{flex:1}}>
				{/*Tab Bar*/}
				<View style={{flexDirection:'row'}}>
					<ScrollView
						automaticallyAdjustContentInsets={false}
						horizontal={true}
						bounces={false}
						showsHorizontalScrollIndicator={false}
						style={styles.tabBar}>
						{this.props.children.map((child, i) => this.renderTabBarOption(child.props.floor, child.props.title, child.props.color, i))}
					</ScrollView>
				</View>

				{/*Main Content*/}
				<View style={{flex:1}}>
					{this.props.children.map((child, i) => this.renderCenterView(child, i))}
				</View>

			</View>
    )
  }
}

var styles = StyleSheet.create({
	tabBarOption: {
		justifyContent: 'center',
		paddingLeft:23,
		paddingRight:23,
		paddingBottom:10,
		paddingTop:9,
		borderBottomWidth:0,
        borderBottomColor:'black'
	},
	tabBar: {
		position: 'relative',
        width:deviceWidth,
	},
	tabBarSwipeIcon: {
		paddingLeft: 2,
		paddingRight: 2,
		position: 'absolute',
		right: 0,
		height: 43,
		width:28,
		justifyContent: 'center',
		backgroundColor: '#EEEDE7',
	},
});

export default SlidableTabBar
