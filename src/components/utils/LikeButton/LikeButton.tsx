import { ToggleButton } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function LikeButton() {
  const [checked, setChecked] = useState(false);
  return (
    <ToggleButton
      className="upvote__button"
      id="toggle-check"
      type="checkbox"
      variant="outline-success"
      checked={checked}
      value="1"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setChecked(!checked);
      }}
    >
      {"0 "}
      <FontAwesomeIcon icon={faHeart} />
    </ToggleButton>
  );
}

export default LikeButton;
