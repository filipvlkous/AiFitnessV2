import db from "../../initFirebase";

export const changeWord = (data: db.firestore.DocumentData) => {
  switch (data.option) {
    case "Breakfast":
      data.option = "Snídaně";
      data.image = "dinnerMenu.png";

      break;
    case "Lunch":
      data.option = "Oběd";
      data.image = "dinnerMenu.png";

      break;
    case "Dinner":
      data.option = "Večeře";
      data.image = "dinnerMenu.png";
      break;
    case "Snack":
      data.option = "Svačina";
      break;

    case "Pantry recepie":
      data.image = "pantryItem.png";
      break;
    default:
      break;
  }
};
