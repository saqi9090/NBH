import React from 'react'
import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Svg, { G, Circle } from 'react-native-svg'
import { Fonts } from '../../global';
// import { globalStyles } from '../../global/globalStyles'

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const ImageLoader = ({
    percentage = 100,
    raduis = 17,
    strokeWidth = 3,
    duration = 1000,
    color = "white",
    delay = 500,
    textColor,
    max = 100,
    toggleBTN }) => {
    const halfCircle = raduis + strokeWidth;
    const circuleCurcumtance = 2 * Math.PI * raduis;
    const circleRef = React.useRef()
    const inputRef = React.useRef()


    //animation 

    const animationValue = React.useRef(new Animated.Value(0)).current;



    const animation = (toValue) => {
        return Animated.timing(animationValue, {
            toValue,
            duration,
            delay,
            useNativeDriver: true
        }).start(() => {
            animation(toValue === 0 ? percentage : 0)
        });
    };

    React.useEffect(() => {
        if (toggleBTN) {

            animation(percentage)

            animationValue.addListener((v) => {


                if (circleRef?.current) {
                    const maxPerc = (100 * v.value) / max;
                    const strokeDashoffset =
                        circuleCurcumtance - (circuleCurcumtance * maxPerc) / 100;
                    circleRef.current.setNativeProps({
                        strokeDashoffset,
                    })
                }

                if (inputRef?.current) {
                    inputRef.current.setNativeProps({
                        text: `${Math.round(v.value)}`
                    })

                }
            })
            return () => {
                animationValue.removeAllListeners();
            }
        }

    }, [max, percentage, toggleBTN])

    return (

        <View >


            <View>
                <Svg width={raduis * 2} height={raduis * 2} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
                    <G rotation='-90' origin={`${halfCircle},${halfCircle}`}>
                        <Circle
                            cx='50%'
                            cy='50%'
                            stroke={color}
                            strokeWidth={strokeWidth}
                            r={raduis}
                            fill="transparent"
                            // opacity={0.3}
                            strokeOpacity={0.2}
                        />
                        <AnimatedCircle
                            ref={circleRef}
                            cx='50%'
                            cy='50%'
                            stroke={color}
                            strokeWidth={strokeWidth}
                            r={raduis}
                            fill="transparent"
                            strokeDasharray={circuleCurcumtance}
                            strokeDashoffset={circuleCurcumtance}
                            strokeLinecap="round"
                        />
                    </G>
                </Svg>


                <AnimatedInput
                    ref={inputRef}
                    underlineColorAndroid="transparent"
                    editable={false}
                    defaultValue="0"
                    style={
                        [
                            StyleSheet.absoluteFillObject, {
                                fontSize: raduis / 2, color: textColor ?? color
                            },
                            { fontFamily: Fonts.MEDIUM, textAlign: "center" }
                        ]
                    }

                />


            </View>





        </View>


    )
}

export default ImageLoader

