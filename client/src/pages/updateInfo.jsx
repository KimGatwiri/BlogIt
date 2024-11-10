import React, { useEffect } from "react";

function updateInfo() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [emailAddress, setemailAddress] = useState("");
  const user = usesuserstore((state) => {
    state.user;
  });
  useEffect(() => {
    setfirstName;
  });
}

export default updateInfo;
