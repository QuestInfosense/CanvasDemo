import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  CameraRoll,
  ScrollView,
  Modal,
  TouchableHighlight,
  PanResponder,
  WebView,
  Animated
} from 'react-native';

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import ImagePicker from 'react-native-image-picker';
import ViewShot from "react-native-view-shot";
import {captureRef, captureScreen} from "react-native-view-shot";
import {ColorPicker} from 'react-native-color-picker';
import PopupDialog from 'react-native-popup-dialog';
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
import Image from 'react-native-remote-svg';
import PinchZoomView from 'react-native-pinch-zoom-view';

import Svg, {
  ClipPath,
  Defs,
  Polygon,
  Circle,
  Rect,
  Polyline,
  Line
} from 'react-native-svg';

export default class example extends Component {
  constructor(props) {
    super(props)

    this.state = {
      example: 0,
      color: '#FF0000',
      thickness: 5,
      message: '',
      avatarSource: null,
      videoSource: null,
      isColorPickerVisible: false,
      isThiknessPickerVisible: false,
      isStickerPickerVisible: false,
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      RadorComponentArray: new Array(),
      isShapepickerVisible: false,
      RadorShapeArray: new Array(),
      shapeColor: '#000000'
    };
  }

  setColorPickerVisible(visible) {
    this.setState({isColorPickerVisible: visible});
  }

  setColor(colorFromColorPicker) {
    this.setState({color: colorFromColorPicker, isColorPickerVisible: false});
  }

  setThickNessPIckerVisible(visible) {
    this.setState({isThiknessPickerVisible: visible});
  }

  setSelectionColorOFThickNess(thickness) {
    this.setState({thickness: thickness, isThiknessPickerVisible: false});
  }

  getThickNessBgColor(thickness) {
    if (this.state.thickness == thickness) {
      return '#C1C1C1'
    } else {
      return '#ffffff'
    }
  }

  setStickerPickerVisible(visible) {
    this.setState({isStickerPickerVisible: visible});
  }

  setPenColorTransparent() {
    this.setState({color: 'rgba(255,255,255,0.0)'});
  }

  setSticker(src, key) {
    this.setStickerPickerVisible(false)
    let tempRadorComponentArray = [...this.state.RadorComponentArray];
    tempRadorComponentArray[this.state.RadorComponentArray.length] = <RanderViewComponent action={() => this.setPenColorTransparent()} imgstickerSrc={src} key={key}/>
    this.setState({RadorComponentArray: tempRadorComponentArray, color: 'rgba(255,255,255,0.0)'});
  }

  setShapePickerVisible(visible) {
    this.setState({isShapepickerVisible: visible});
  }

  setShape(type, key) {
    this.setShapePickerVisible(false);
    let tempRadorShapeArray = [...this.state.RadorShapeArray];
    tempRadorShapeArray[this.state.RadorShapeArray.length] = <ShapesComponent componentType={type} colorOfStrock={this.state.shapeColor} key={key}/>
    this.setState({RadorShapeArray: tempRadorShapeArray, color: 'rgba(255,255,255,0.0)'});

  }

  setShapeColor(shapeColor) {
    this.setState({shapeColor: shapeColor});
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      // maxWidth: 500,
      // maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {
          uri: response.uri
        };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({avatarSource: source});
      }
    });
  }

  save() {
    this.refs.viewShot.capture().then(uri => {
      console.log("do something with ", uri);
      ToastAndroid.show('Image Saved', ToastAndroid.SHORT);
      CameraRoll.saveToCameraRoll(uri);
    });
  }

  render() {

    return (<View style={{
        flex: 1,
        flexDirection: 'column'
      }}>

      <ViewShot style={{
          flex: 1
        }} ref="viewShot" options={{
          format: "jpg",
          quality: 1.0
        }}>

        <View style={{
            flex: 1
          }}>

          <View style={{
              flex: 1
            }}>
            <Image style={{
                flex: 1
              }} source={this.state.avatarSource}/>
          </View>

          <View style={{
              position: 'absolute',
              justifyContent: 'center'
            }}>
            <SketchCanvas style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                flex: 1
              }} strokeColor={this.state.color} strokeWidth={this.state.thickness}/>
          </View>

          <View style={{
              position: 'absolute',
              justifyContent: 'center'
            }}>
            {this.state.RadorComponentArray}
          </View>

          <View style={{
              position: 'absolute',
              justifyContent: 'center'
            }}>

            {this.state.RadorShapeArray}

          </View>

          <View style={{
              position: 'absolute',
              justifyContent: 'center'
            }}>
            <Svg height="100" width="100">
              <Line x1="0" y1="0" x2="50" y2="100" stroke="red" strokeWidth="2"/>
            </Svg>
          </View>

          {/* <View style={{
              position: 'absolute',
              justifyContent: 'center'
            }}>
            <Svg
                height= "100"
                width= "100"
            >
                <Polyline
                    points="10,10 20,12 30,20 40,60 60,70 95,90"
                    fill="none"
                    stroke="black"
                    strokeWidth="3"
                />
            </Svg>
          </View> */
          }

        </View>
      </ViewShot>

      <Modal style={{
          flex: 1
        }} animationType="slide" transparent={true} visible={this.state.isColorPickerVisible} onRequestClose={() => {
          this.setColorPickerVisible(false);
        }}>

        <View style={{
            flex: 1,
            padding: 15,
            backgroundColor: '#212021'
          }}>
          <Text style={{
              color: 'white'
            }}>Tap on circle to select the color</Text>
          <ColorPicker oldColor={this.state.color} onColorSelected={color => this.setColor(color)} style={{
              flex: 1
            }}/>
        </View>

      </Modal>

      <Modal animationType="slide" transparent={true} visible={this.state.isThiknessPickerVisible} onRequestClose={() => {
          this.setThickNessPIckerVisible(false);
        }}>

        <View style={{
            flex: 0.8,
            backgroundColor: 'rgba(52,52,52,0.2)'
          }}>
          <TouchableOpacity style={{
              flex: 1
            }} onPress={() => this.setThickNessPIckerVisible(false)}/>
        </View>

        <View style={{
            flex: 0.3,
            backgroundColor: 'white',
            elevation: 10
          }}>
          <TouchableOpacity style={styles.thicknessTouchStyle} onPress={() => this.setSelectionColorOFThickNess(1)}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: this.getThickNessBgColor(1)
              }}>
              <View style={{
                  height: 1,
                  backgroundColor: 'black',
                  marginLeft: 10,
                  marginRight: 10
                }}/>
            </View>

          </TouchableOpacity>
          <TouchableOpacity style={styles.thicknessTouchStyle} onPress={() => this.setSelectionColorOFThickNess(3)}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: this.getThickNessBgColor(3)
              }}>
              <View style={{
                  height: 3,
                  backgroundColor: 'black',
                  marginLeft: 10,
                  marginRight: 10
                }}/>
            </View>

          </TouchableOpacity>
          <TouchableOpacity style={styles.thicknessTouchStyle} onPress={() => this.setSelectionColorOFThickNess(5)}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: this.getThickNessBgColor(5)
              }}>
              <View style={{
                  height: 5,
                  backgroundColor: 'black',
                  marginLeft: 10,
                  marginRight: 10
                }}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.thicknessTouchStyle} onPress={() => this.setSelectionColorOFThickNess(8)}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: this.getThickNessBgColor(8)
              }}>
              <View style={{
                  height: 8,
                  backgroundColor: 'black',
                  marginLeft: 10,
                  marginRight: 10
                }}/>
            </View>
          </TouchableOpacity>
        </View>

      </Modal>

      <Modal animationType="slide" transparent={true} visible={this.state.isStickerPickerVisible} onRequestClose={() => {
          this.setStickerPickerVisible(false);
        }}>

        <View style={{
            flex: 0.85,
            backgroundColor: 'rgba(52,52,52,0.2)'
          }}>
          <TouchableOpacity style={{
              flex: 1
            }} onPress={() => this.setStickerPickerVisible(false)}/>
        </View>

        <View style={{
            flex: 0.15,
            backgroundColor: 'white',
            elevation: 20
          }}>
          <ScrollView horizontal={true}>

            <TouchableOpacity style={{
                height: 100,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center'
              }} onPress={() => this.setSticker('http://52.66.31.106/svg/Bombafrontal.svg', 1)}>

              <Image style={{
                  height: 75,
                  width: 75,
                  justifyContent: 'center',
                  alignItems: 'center'
                }} source={{
                  uri: 'http://52.66.31.106/svg/Bombafrontal.svg'
                }}/>

            </TouchableOpacity>

            <TouchableOpacity style={{
                height: 100,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center'
              }} onPress={() => this.setSticker('http://52.66.31.106/svg/bombaperspectiva.svg', 1)}>

              <Image style={{
                  height: 75,
                  width: 75,
                  justifyContent: 'center',
                  alignItems: 'center'
                }} source={{
                  uri: 'http://52.66.31.106/svg/bombaperspectiva.svg'
                }}/>

            </TouchableOpacity>

            <TouchableOpacity style={{
                height: 100,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center'
              }} onPress={() => this.setSticker('http://52.66.31.106/svg/bordillo.svg', 1)}>

              <Image style={{
                  height: 75,
                  width: 75,
                  justifyContent: 'center',
                  alignItems: 'center'
                }} source={{
                  uri: 'http://52.66.31.106/svg/bordillo.svg'
                }}/>

            </TouchableOpacity>

            <TouchableOpacity style={{
                height: 100,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center'
              }} onPress={() => this.setSticker('http://52.66.31.106/svg/cisterna.svg', 1)}>

              <Image style={{
                  height: 75,
                  width: 75,
                  justifyContent: 'center',
                  alignItems: 'center'
                }} source={{
                  uri: 'http://52.66.31.106/svg/cisterna.svg'
                }}/>

            </TouchableOpacity>

            <TouchableOpacity style={{
                height: 100,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center'
              }} onPress={() => this.setSticker('http://52.66.31.106/svg/columnas.svg', 1)}>

              <Image style={{
                  height: 75,
                  width: 75,
                  justifyContent: 'center',
                  alignItems: 'center'
                }} source={{
                  uri: 'http://52.66.31.106/svg/columnas.svg'
                }}/>

            </TouchableOpacity>

            <TouchableOpacity style={{
                height: 100,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center'
              }} onPress={() => this.setSticker('http://52.66.31.106/svg/mixerperspectiva.svg', 1)}>

              <Image style={{
                  height: 75,
                  width: 75,
                  justifyContent: 'center',
                  alignItems: 'center'
                }} source={{
                  uri: 'http://52.66.31.106/svg/mixerperspectiva.svg'
                }}/>

            </TouchableOpacity>

          </ScrollView>
        </View>

      </Modal>

      <Modal animationType="slide" transparent={true} visible={this.state.isShapepickerVisible} onRequestClose={() => {
          this.setShapePickerVisible(false);
        }}>

        <View style={{
            flex: 0.85,
            backgroundColor: 'rgba(52,52,52,1.0)'
          }}>
          {/* <TouchableOpacity style={{
              flex: 1
            }} onPress={() => this.setShapePickerVisible(false)}/> */
          }
          <Text style={{
              color: 'white'
            }}>Tap on circle to select the color</Text>
          <ColorPicker oldColor={this.state.shapeColor} onColorSelected={shapeColor => this.setShapeColor(shapeColor)} style={{
              flex: 1
            }}/>
        </View>

        <View style={{
            flex: 0.15,
            backgroundColor: 'white',
            elevation: 20
          }}>
          <ScrollView horizontal={true}>

            <TouchableOpacity style={{
                height: 100,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center'
              }} onPress={() => this.setShape('1', this.state.RadorShapeArray.length)}>

              <Svg height="60" width="60">
                <Circle cx="30" cy="30" r="25" fill="transparent" strokeWidth="3" stroke={this.state.shapeColor}/>
              </Svg>

            </TouchableOpacity>

            <TouchableOpacity style={{
                height: 100,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center'
              }} onPress={() => this.setShape('2', this.state.RadorShapeArray.length)}>

              <Svg height="60" width="105">
                <Rect x="15" y="5" width="75" height="50" fill="transparent" strokeWidth="3" stroke={this.state.shapeColor}/>
              </Svg>

            </TouchableOpacity>

            <TouchableOpacity style={{
                height: 100,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center'
              }} onPress={() => this.setShape('3', this.state.RadorShapeArray.length)}>

              <Svg height="100" width="100">
                <Rect x="25" y="25" width="50" height="50" fill="transparent" strokeWidth="3" stroke={this.state.shapeColor}/>
              </Svg>

            </TouchableOpacity>

          </ScrollView>
        </View>

      </Modal>

      <View style={{
          flexDirection: 'row',
          backgroundColor: 'rgba(0, 0, 0,1.0)',
          justifyContent: 'center',
          elevation: 20
        }}>
        <ScrollView horizontal={true}>

          <TouchableOpacity style={styles.bottomNavigationContainerStyle} onPress={this.selectPhotoTapped.bind(this)}>
            <Image style={{
                width: 34,
                height: 34
              }} source={{
                uri: 'asset:/camera.png'
              }}/>
            <Text style={styles.bottomNavigationTextColor}>
              Picture
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomNavigationContainerStyle} onPress={() => {
              this.setColorPickerVisible(true);
            }}>
            <Image style={{
                width: 35,
                height: 35
              }} source={{
                uri: 'asset:/color.png'
              }}/>
            <Text style={styles.bottomNavigationTextColor}>
              Color
            </Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomNavigationContainerStyle} onPress={() => {
              this.setThickNessPIckerVisible(true);
            }}>
            <Image style={{
                width: 33,
                height: 35
              }} source={{
                uri: 'asset:/width.png'
              }}/>
            <Text style={styles.bottomNavigationTextColor}>
              Lines
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomNavigationContainerStyle} onPress={() => this.setStickerPickerVisible(true)}>
            <Image style={{
                width: 33,
                height: 35,
                marginLeft: 10,
                marginRight: 10
              }} source={{
                uri: 'asset:/sticker.png'
              }}/>
            <Text style={styles.bottomNavigationTextColor}>
              Sticker
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomNavigationContainerStyle} onPress={() => this.setShapePickerVisible(true)}>
            <Image style={{
                width: 33,
                height: 35,
                marginLeft: 10,
                marginRight: 10
              }} source={{
                uri: 'asset:/shapes.png'
              }}/>
            <Text style={styles.bottomNavigationTextColor}>
              Shapes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomNavigationContainerStyle} onPress={() => this.save()}>
            <Image style={{
                width: 33,
                height: 35,
                marginLeft: 10,
                marginRight: 10
              }} source={{
                uri: 'asset:/save.png'
              }}/>
            <Text style={styles.bottomNavigationTextColor}>
              Save Picture
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </View>);
  }
}

class RanderViewComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      imgstickerSrc: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({imgstickerSrc: nextProps.imgstickerSrc})
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      // Initially, set the value of x and y to 0 (the center of the screen)
      onPanResponderGrant: (e, gestureState) => {
        // Set the initial value to the current state
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
        Animated.spring(this.state.scale, {
          toValue: 1.1,
          friction: 3
        }).start();
        this.props.action();
      },

      // When we drag/pan the object, set the delate to the states pan position
      onPanResponderMove: Animated.event([
        null, {
          dx: this.state.pan.x,
          dy: this.state.pan.y
        }
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        Animated.spring(this.state.scale, {
          toValue: 1,
          friction: 3
        }).start();
      }
    });
  }

  render() {

    let rotate = '0deg';

    // Destructure the value of pan from the state
    let {pan} = this.state;

    let {scale} = this.state;

    // Calculate the x and y transform from the pan value
    let [translateX, translateY] = [pan.x, pan.y];

    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    let imageStyle = {
      transform: [{
          translateX
        }, {
          translateY
        }, {
          rotate
        }, {
          scale
        }]
    };
    return (<PinchZoomView style={{
        padding: 10
      }}>
      <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>

        <Image source={{
            uri: this.props.imgstickerSrc
          }}/>

      </Animated.View>
    </PinchZoomView>);
  }
}

class ShapesComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      componentType: '',
      colorOfStrock: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({componentType: nextProps.componentType, colorOfStrock: nextProps.colorOfStrock})
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      // Initially, set the value of x and y to 0 (the center of the screen)
      onPanResponderGrant: (e, gestureState) => {
        // Set the initial value to the current state
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
        Animated.spring(this.state.scale, {
          toValue: 1.1,
          friction: 3
        }).start();
      },

      // When we drag/pan the object, set the delate to the states pan position
      onPanResponderMove: Animated.event([
        null, {
          dx: this.state.pan.x,
          dy: this.state.pan.y
        }
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        Animated.spring(this.state.scale, {
          toValue: 1,
          friction: 3
        }).start();
      }
    });
  }

  render() {

    let rotate = '0deg';

    // Destructure the value of pan from the state
    let {pan} = this.state;

    let {scale} = this.state;

    // Calculate the x and y transform from the pan value
    let [translateX, translateY] = [pan.x, pan.y];

    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    let imageStyle = {
      transform: [{
          translateX
        }, {
          translateY
        }, {
          rotate
        }, {
          scale
        }]
    };

    const ShapeCircle = <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
      <Svg height="100" width="100">
        <Circle cx="50" cy="50" r="45" fill="transparent" strokeWidth="3" stroke={this.props.colorOfStrock}/>
      </Svg>

    </Animated.View>;

    const ShapeRectange = <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
      <Svg height="100" width="150">
        <Rect x="25" y="5" width="120" height="50" fill="transparent" strokeWidth="3" stroke={this.props.colorOfStrock}/>
      </Svg>
    </Animated.View>;

    const ShapeSquare = <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
      <Svg height="70" width="70">
        <Rect x="25" y="25" width="35" height="35" fill="transparent" strokeWidth="3" stroke={this.props.colorOfStrock}/>
      </Svg>
    </Animated.View>;

    let shape;
    switch (this.props.componentType) {
      case '1':
        shape = ShapeCircle;
        break;
      case '2':
        shape = ShapeRectange;
        break;
      case '3':
        shape = ShapeSquare;
        break;
      default:
        shape = ShapeCircle;
        break;
    }
    return (<View>
      <PinchZoomView style={{
          padding: 10
        }}>{shape}</PinchZoomView>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column'
  },
  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39579A'
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: '#39579A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  bottomNavigationTextColor: {
    fontSize: 10,
    color: 'white',
    marginTop: 2,
    fontWeight: 'bold'
  },
  bottomNavigationContainerStyle: {
    marginTop: 3,
    marginBottom: 3,
    alignItems: 'center',
    width: 80
  },
  thicknessTouchStyle: {
    height: 5,
    flex: 1,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('example', () => example);
