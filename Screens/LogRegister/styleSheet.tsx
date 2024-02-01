import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  errors: {
    color: "red",
    fontFamily: "Inter-SemiBold",
    paddingBottom: 2,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  coolinput: {
    flexDirection: "column",
    width: "100%",
    position: "relative",
    maxWidth: 240,
  },
  ButtonContainer: {
    paddingTop: 30,
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  ErrorContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
