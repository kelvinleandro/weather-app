import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

const Loader = () => {
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    const loopAnimation = () => {
      if (animation.current) {
        animation.current.play(93, 160);
      }
    };

    loopAnimation();

    const interval = setInterval(() => {
      loopAnimation();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        loop={false}
        style={styles.animation}
        source={require("@/assets/loader.json")}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#303968",
  },
  animation: {
    width: 250,
    height: 250,
  },
});
