import { ToggleButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface LikeButtonProps {
  checked: boolean;
  clickHandler: () => void;
}

function LikeButton({ checked, clickHandler }: LikeButtonProps) {
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
        clickHandler();
      }}
    >
      <FontAwesomeIcon icon={faHeart} />
    </ToggleButton>
  );
}

export default LikeButton;
