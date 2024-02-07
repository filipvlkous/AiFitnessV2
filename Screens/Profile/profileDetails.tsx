import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store/testStore";
import SexSelect from "../LogRegister/Register/steps/SexSelect";
import Milk from "../../assets/Milk.png";
import Brokoli from "../../assets/Brocoli.png";
import Burger from "../../assets/Burger.png";
import Weight from "../../assets/Weight.png";
import Shoes from "../../assets/Shoes.png";
import Scale from "../../assets/Scale.png";
import FoodBuble from "../LogRegister/Register/steps/StepThree/foodBuble";
import SliderSelect from "../LogRegister/Register/steps/StepTwo/SliderSelect";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ProfileStackType } from "../../types/navigatorTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Button from "../../components/ButtonDark";
import { updateUserDetails } from "../../Server/register";
import ButtonLoading from "../../components/ButtonDarkLoading";
import { fetchUser } from "../../redux/actions/testLoginUser";

export default function ProfileDetails({
  navigation,
  route,
}: NativeStackScreenProps<ProfileStackType>) {
  const insets = useSafeAreaInsets();
  const state = useSelector(
    (state: RootState) => state.counterReducer.currentUser
  );
  const [diet, setDiet] = useState<string>("");
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [aim, setAim] = useState<string>("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (state != undefined) {
      setDiet(state.data.diet);
      setAllergies(state.data.allergies);
      setAim(state.data.aim);
      setWeight(state.data.weight);
      setHeight(state.data.height);
    }
  }, []);
  const changeFood = (food: string) => {
    setDiet(food);
  };
  const changeAim = (food: string) => {
    setAim(food);
  };

  const saveChanges = async () => {
    if (
      diet != state?.data.diet ||
      height != state?.data.height ||
      weight != state.data.weight ||
      allergies != state.data.allergies ||
      aim != state.data.aim
    ) {
      setLoading(true);
      try {
        await updateUserDetails({ diet, height, weight, allergies, aim });
        dispatch(fetchUser());
      } catch (error) {
        console.log(error);
        Alert.alert("Nastala chyba.");
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert("Žádné změny nebyly provedeny.");
    }
  };

  const handleTextChange = useCallback(
    (newText: string) => {
      if (newText === ",") return;
      if (newText.length > text.length && newText.includes(",")) {
        const updatedArr = [...allergies, text];
        setAllergies(updatedArr);
        setText("");
        return;
      }
      setText(newText);
    },
    [allergies, text]
  );

  const deleteArr = useCallback((index: number) => {
    setAllergies((prevArr) => {
      const updatedArr = [...prevArr];
      updatedArr.splice(index, 1);
      return updatedArr;
    });
  }, []);

  const commonSetter = (
    numb: number,
    funct: React.Dispatch<React.SetStateAction<number>>
  ) => {
    funct(Math.floor(numb));
  };
  return (
    <ScrollView>
      <View
        style={{
          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingBottom: 25,
          position: "relative",
        }}
      >
        <TouchableOpacity
          style={{ position: "absolute", zIndex: 15, top: 37 }}
          onPress={() => navigation.goBack()}
        >
          <Text>
            <Icon name="chevron-left" size={50} color="#47646A" />
          </Text>
        </TouchableOpacity>
        <Text style={styles.HeadText}>Detaily uživatele</Text>

        <View style={{ paddingVertical: 40, paddingHorizontal: 20 }}>
          <Text
            style={[
              styles.TextStyle,
              { paddingVertical: 20, paddingTop: 0, fontSize: 27 },
            ]}
          >
            {state?.data.name}
          </Text>

          <SliderSelect
            valu={weight}
            name="Váha:"
            number={weight}
            setDispatch={(val) => commonSetter(val, setWeight)}
            min={30}
            max={250}
            val="Kg"
          />

          <SliderSelect
            valu={height}
            name="Výška:"
            number={height}
            setDispatch={(val) => commonSetter(val, setHeight)}
            min={80}
            max={240}
            val="cm"
          />
          <Text style={styles.TextStyle}>Dietní preference a omezení</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingVertical: 20,
            }}
          >
            <SexSelect
              ThisSex={Burger}
              selectedSex={diet as string}
              onSexSelect={() => changeFood("Maso")}
              sex={"Maso"}
            />
            <SexSelect
              ThisSex={Brokoli}
              selectedSex={diet as string}
              onSexSelect={() => changeFood("Vegan")}
              sex={"Vegan"}
            />
            <SexSelect
              ThisSex={Milk}
              selectedSex={diet as string}
              onSexSelect={() => changeFood("Vegetarian")}
              sex={"Vegetarian"}
            />
          </View>

          <Text
            style={{
              fontSize: 20,
              fontFamily: "Inter-SemiBold",
              paddingVertical: 10,
            }}
          >
            Potravinové alergie a intolerance?
          </Text>
          <FoodBuble list={allergies} deleteArr={deleteArr} />

          <View style={{ width: "100%", gap: 10, paddingTop: 10 }}>
            <TextInput
              style={styles.InputStyle}
              placeholder="Napiš jídlo anglicky a zmáčkni čárku"
              onChangeText={handleTextChange}
              value={text}
            />
          </View>

          <Text style={styles.TextStyle}>Your Goal</Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 30,
              paddingTop: 20,
            }}
          >
            <SexSelect
              ThisSex={Weight}
              selectedSex={aim as string}
              onSexSelect={() => changeAim("Nabrat váhu")}
              sex={"Nabrat váhu"}
            />
            <SexSelect
              ThisSex={Shoes}
              selectedSex={aim as string}
              onSexSelect={() => changeAim("Udržet váhu")}
              sex={"Udržet váhu"}
            />
            <SexSelect
              ThisSex={Scale}
              selectedSex={aim as string}
              onSexSelect={() => changeAim("Shodit váhu")}
              sex={"Shodit váhu"}
            />
          </View>

          {!loading ? (
            <Button
              onPress={saveChanges}
              title="Uložit změny"
              style={{ marginTop: 30 }}
            />
          ) : (
            <ButtonLoading style={{ marginTop: 30 }} />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    display: "flex",
    alignContent: "center",
    height: "100%",
    flex: 1,
  },
  HeadText: {
    fontSize: 26,
    fontFamily: "Inter-Bold",
    textAlign: "center",
    width: "100%",
  },
  InnerCointainer: {
    justifyContent: "space-between",
    height: "100%",
    alignItems: "center",
    marginHorizontal: 40,
  },
  InputStyle: {
    width: "100%",
    fontSize: 18,
    color: "#8b8b8b",
    fontFamily: "Inter-Regular",
    borderBottomWidth: 2,
    borderBottomColor: "#d5e3e7",
  },
  TextStyle: {
    fontSize: 20,
    paddingTop: 30,
    fontFamily: "Inter-Bold",
  },
});
