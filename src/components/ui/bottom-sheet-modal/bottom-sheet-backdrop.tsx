import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";

type BackdropProps = BottomSheetBackdropProps;

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export function BottomSheetBackdrop({
  animatedIndex,
  style,
  ...props
}: BackdropProps) {
  const animatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: `rgba(0,0,0, ${interpolate(
        animatedIndex.value,
        [-1, 0],
        [0, 0.2],
        Extrapolation.CLAMP
      )})`,
    }),
    []
  );

  const blurViewProps = useAnimatedProps(() => {
    return {
      intensity: interpolate(
        animatedIndex.value,
        [-1, 0],
        [0, 5],
        Extrapolation.CLAMP
      ),
    };
  });

  return (
    <AnimatedBlurView
      animatedProps={blurViewProps}
      style={[animatedStyle, style]}
      {...props}
    />
  );
}
