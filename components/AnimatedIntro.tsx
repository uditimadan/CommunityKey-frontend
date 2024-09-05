import Colors from '@/constants/Colors';
import { memo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import Svg, { Path } from 'react-native-svg';

const content = [
  {
    title: "A Futuristic Living!",
    bg: Colors.blue_app,
    fontColor: Colors.yellow_app,
  },
  {
    title: "Stay Secure",
    bg: Colors.yellow_app,
    fontColor: Colors.blue_app,
  },
  {
    title: "Stay Connected",
    bg: Colors.blue_app,
    fontColor: Colors.yellow_app,
  },
  {
    title: 'CommunityKey.',
    bg: Colors.yellow_app,
    fontColor: Colors.blue_app,
  },
];

const AnimatedIntro = () => {
  const { width } = useWindowDimensions();
  const keyWidth = 34;
  const half = width / 2 - keyWidth / 2;

  const currentX = useSharedValue(half);
  const currentIndex = useSharedValue(0);
  const isAtStart = useSharedValue(true);
  const labelWidth = useSharedValue(0);
  const canGoToNext = useSharedValue(false);
  const didPlay = useSharedValue(false);

  const newColorIndex = useDerivedValue(() => {
    if (!isAtStart.value) {
      return (currentIndex.value + 1) % content.length;
    }
    return currentIndex.value;
  }, [currentIndex]);

  const keyColor = useDerivedValue(() => {
    return interpolateColor(
      currentX.value,
      [half, half + labelWidth.value / 2],
      [content[newColorIndex.value].fontColor, content[currentIndex.value].fontColor],
      'RGB'
    );
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        currentX.value,
        [half, half + labelWidth.value / 2],
        [content[newColorIndex.value].fontColor, content[currentIndex.value].fontColor],
        'RGB'
      ),
      transform: [
        {
          translateX: interpolate(
            currentX.value,
            [half, half + labelWidth.value / 2],
            [half + 4, half - labelWidth.value / 2]
          ),
        },
      ],
    };
  }, [currentIndex, currentX]);

  const keyStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: currentX.value }],
    };
  });

  const mask = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        currentX.value,
        [half, half + labelWidth.value / 2],
        [content[newColorIndex.value].bg, content[currentIndex.value].bg],
        'RGB'
      ),
      transform: [{ translateX: currentX.value }],
      width: width / 1.5,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
    }),
    [currentIndex, currentX, labelWidth]
  );

  const style1 = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      currentX.value,
      [half, half + labelWidth.value / 2],
      [content[newColorIndex.value].bg, content[currentIndex.value].bg],
      'RGB'
    ),
    opacity: interpolate(1, [1, 0], [1, 0, 0, 0, 0, 0, 0]),
    transform: [
      {
        translateX: interpolate(1, [1, 0], [0, -width * 2, -width, -width, -width, -width, -width]),
      },
    ],
  }));

  const text = useDerivedValue(() => {
    const index = currentIndex.value;
    return content[index].title;
  }, [currentIndex]);

  useAnimatedReaction(
    () => labelWidth.value,
    (newWidth) => {
      currentX.value = withDelay(
        1000,
        withTiming(
          half + newWidth / 2,
          {
            duration: 800,
          },
          (finished) => {
            if (finished) {
              canGoToNext.value = true;
              isAtStart.value = false;
            }
          }
        )
      );
    },
    [labelWidth, currentX, half]
  );

  useAnimatedReaction(
    () => canGoToNext.value,
    (next) => {
      if (next) {
        canGoToNext.value = false;
        currentX.value = withDelay(
          1000,
          withTiming(
            half,
            {
              duration: 800,
            },
            (finished) => {
              if (finished) {
                currentIndex.value = (currentIndex.value + 1) % content.length;
                isAtStart.value = true;
                didPlay.value = false;
              }
            }
          )
        );
      }
    },
    [currentX, labelWidth]
  );

  return (
    <Animated.View style={[styles.wrapper, style1]}>
      <Animated.View style={[styles.content]}>
        <Animated.View style={[styles.mask, mask]} />
        <ReText
          onLayout={(e) => {
            labelWidth.value = e.nativeEvent.layout.width + 4;
          }}
          style={[styles.title, textStyle]}
          text={text}
        />
        <Animated.View style={[styles.keyWrapper, keyStyle]}>
          <Svg width="34" height="34" viewBox="0 0 34 34">
            <Path
              d="M20,3c-4.4,0-8,3.6-8,8c0,1.4,0.4,2.8,1,4L3,25v6h6v-4h4v-4h4l4-4c1.2,0.6,2.6,1,4,1c4.4,0,8-3.6,8-8S24.4,3,20,3z M22,13 c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S23.1,13,22,13z"
              //fill={content[currentIndex.value].fontColor}
              fill={keyColor.value}
            />
          </Svg>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  mask: {
    zIndex: 1,
    position: 'absolute',
    left: '0%',
    height: 44,
  },
  keyWrapper: {
    position: 'absolute',
    left: '0%',
    zIndex: 10,
  },
  titleText: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    left: '0%',
    position: 'absolute',
  },
  content: {
    marginTop: 300,
  },
});

export default memo(AnimatedIntro);