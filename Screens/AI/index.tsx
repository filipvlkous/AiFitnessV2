import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import AnimationWithImperativeApi from "./loading";
import ModalRecepie from "./modalRecepie";
import { MemoizedChildComponent } from "./messages/All/memoComponent";
import BotMsg from "./messages/All/InitAll";
import {
  fetchOneRecepie,
  fetchRecepiesForDay,
  getOneMeal,
} from "../../Server/recepies";
import UserMsg from "./messages/User/userMsg";
import BotMessage from "./messages/All/ChosenMealRecepie";
import Init from "./messages/Init";
import SingleRecepie from "./messages/Single/InitSingle";
import BotOneMeal from "./messages/Single/RespSingle";
import SafeAreView from "../../components/SafeAreView";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/testStore";

export default function AIScreenIndex() {
  const user = useSelector(
    (state: RootState) => state.counterReducer.currentUser?.data
  );
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState({ key: "", value: "" });
  const [test, setTest] = useState<any[]>([
    {
      user: "INIT",
      click: false,
    },
  ]);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleChangeUser = (index: number) => {
    const updatedTest = [...test]; // Create a copy of the original array
    updatedTest[index].click = true; // Update the user property of the second object
    setTest(updatedTest); // Update the state with the modified array
  };

  const addToMap = (str: string, text: string) => {
    setTest([
      ...test,
      {
        user: "USER",
        msg: text,
      },
      {
        user: str,
        click: false,
      },
    ]);
  };

  const handleRecipeSelection = (key: string, value: string) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
    setSelectedRecipe({ key, value });
    setModal(true);
  };

  const CloseModal = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
    setModal(!modal);
  };

  const fetchPaymentSheetParams = async (index: number) => {
    const init = setLoading(true);
    try {
      await fetchRecepiesForDay()
        .then((data) => {
          if (data != undefined) {
            const updatedTest = [...test]; // Create a copy of the original array
            updatedTest[index].click = true;
            setTest([...updatedTest, { user: "BOTRECEPIES", recepies: data }]);
          }
        })
        .then(() => {
          setLoading(false);
        });
    } catch (error) {}
  };

  const generateRecepie = async (
    recepie: string,
    keyText: string,
    options: string
  ) => {
    setLoading(true);

    const respond = await fetchOneRecepie(recepie, keyText, options);
    if (respond != undefined) {
      setTest([
        ...test,
        {
          key: keyText,
          option: options,
          user: "USER",
          msg: "I wanna have recepie for:",
        },
        { text: respond, option: keyText, user: "BOT" },
      ]);
    }
    setLoading(false);
  };

  const generateOneMeal = async (meal: string, index: number) => {
    setLoading(true);

    try {
      const respond = await getOneMeal(meal);
      if (respond != undefined) {
        handleChangeUser(index);

        setTest([
          ...test,
          {
            meal: meal,
            user: "USER",
            msg: "Vygenerujte mi recept pro:",
          },
          {
            option: meal,
            user: "BOTONEMEAL",
            text: respond,
          },
        ]);
      }
    } catch (error) {
      Alert.alert("Vyskytla se chyba, opakujte pozdeji");
    } finally {
      setLoading(false);
    }
  };

  const restart = () => {
    setTest([
      {
        user: "INIT",
        click: false,
      },
    ]);
  };

  return (
    <ScrollView
      style={{ backgroundColor: "#FFFEFC" }}
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
      onContentSizeChange={() =>
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }
    >
      <SafeAreView style={{ paddingBottom: 50 }}>
        <Text style={styles.HeaderText}>Generátor receptů</Text>

        <View style={{ height: "100%" }}>
          {[...test.entries()].map(([key, value], index) => {
            switch (value.user) {
              case "INIT":
                return (
                  <Init
                    click={value.click}
                    key={index}
                    dayRecepies={() => {
                      handleChangeUser(index);
                      addToMap("INITBOT", "Porsím o jídelní plán na den. ");
                    }}
                    singleRecepies={() => {
                      handleChangeUser(index);
                      addToMap("SINGLEINIT", "Prosím o jeden recept.");
                    }}
                  />
                );

              case "USER":
                return <UserMsg key={index} value={value} />;

              case "SINGLEINIT":
                return (
                  <SingleRecepie
                    restart={() => restart()}
                    click={value.click}
                    key={index}
                    generateOneMeal={(meal: string) =>
                      generateOneMeal(meal, index)
                    }
                  />
                );

              case "BOTONEMEAL":
                return <BotOneMeal key={index} value={value} />;

              case "BOTRECEPIES":
                return (
                  <View key={index}>
                    <Text style={styles.H2Text}>Jídelníček na celý den:</Text>
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      endFillColor="#000"
                      overScrollMode="never"
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          paddingTop: 15,
                        }}
                      >
                        {[...value.recepies.entries()].map(
                          ([key, value], index) => (
                            <View key={index}>
                              <MemoizedChildComponent
                                index={index}
                                keyValue={key}
                                value={value.join(" ")}
                                setModal={() =>
                                  handleRecipeSelection(key, value.join(" "))
                                }
                              />
                            </View>
                          )
                        )}
                      </View>
                    </ScrollView>
                  </View>
                );

              case "INITBOT":
                return (
                  <BotMsg
                    restart={() => restart()}
                    click={value.click}
                    key={index}
                    fetchRecipe={() => fetchPaymentSheetParams(index)}
                    loading={loading}
                  />
                );

              case "BOT":
                return <BotMessage key={index} value={value} />;

              default:
                return null;
            }
          })}
        </View>

        {modal ? (
          <ModalRecepie
            heightVal={test.length}
            onChildData={(dataFromChild: string) =>
              generateRecepie(
                selectedRecipe.value,
                selectedRecipe.key,
                dataFromChild
              )
            } // Pass the callback function to the child as a prop
            closeModal={CloseModal}
            visible={modal}
            selectedRecepie={selectedRecipe}
          />
        ) : null}
      </SafeAreView>
      {loading ? <AnimationWithImperativeApi heightVal={test.length} /> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  HeaderText: {
    fontSize: 30,
    paddingLeft: 20,
    fontFamily: "Inter-SemiBold",
  },
  H2Text: {
    fontSize: 20,
    paddingLeft: 20,
    paddingTop: 10,
    fontFamily: "Inter-SemiBold",
  },
});
