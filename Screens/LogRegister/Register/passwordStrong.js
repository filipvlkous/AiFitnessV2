import { useState } from "react";
import zxcvbn from "zxcvbn";

export default function PasswordStrong({ password }) {
  const strength = zxcvbn(password);

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
  });

  setPasswordStrength({
    score: strength.score,
    feedback: strength.feedback.warning || strength.feedback.suggestions[0],
  });

  return passwordStrength;
}
