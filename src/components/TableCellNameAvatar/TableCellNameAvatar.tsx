import { FC } from "react";
import { Avatar, TableCell } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { CUSTOM_COLORS } from "../../styles/colors";
import StarIcon from "@mui/icons-material/Star";
import { UserId } from "../../domains/User";

interface TableCellNameAvatarProps {
  id: UserId;
  name: string;
  isWinner: boolean;
  avatar: string;
  winnerCount: number;
}

export const TableCellNameAvatar: FC<TableCellNameAvatarProps> = ({
  id,
  name,
  isWinner,
  avatar,
  winnerCount,
}) => {
  const starsPositions = [
    [{ left: "-4px", top: "0px" }],
    [
      { left: "-4px", top: "4px" },
      { right: "4px", top: "0px" },
    ],
    [
      { left: "-4px", top: "4px" },
      { right: "4px", top: "0px" },
      { left: "12px", top: `-8px` },
    ],
    [
      { left: "-4px", top: "4px" },
      { right: "4px", top: "0px" },
      { left: "12px", top: "-8px" },
      { left: "-8px", top: "16px" },
    ],
    [
      { left: "-4px", top: "4px" },
      { right: "4px", top: "0px" },
      { left: "12px", top: "-8px" },
      { left: "-8px", top: "16px" },
      { right: "2px", top: "18px" },
    ],
  ];

  const stars = Array(Math.min(winnerCount, 5))
    .fill(null)
    .map((_, index) => (
      <StarIcon
        key={index}
        style={{
          color: CUSTOM_COLORS.gold,
          fontSize: "medium",
          position: "absolute",
          ...starsPositions[index][index],
          zIndex: "1",
        }}
      />
    ));

  let photoUrl = "";

  try {
    photoUrl = require(`../../images/${id}.jpg`);
  } catch (error) {
    photoUrl = require(`../../images/unknownUser.jpg`);
  }

  return (
    <>
      <TableCell style={{ width: "17%", padding: "4px 8px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
          }}
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            {stars}
            <Avatar
              alt={name}
              src={photoUrl || ""}
              style={{
                marginRight: "8px",
                boxShadow: isWinner
                  ? `inset 0 0 0 2px ${CUSTOM_COLORS.gold}`
                  : `none`,
                boxSizing: "border-box",
              }}
            />
          </div>
          <div
            style={{ display: "flex", alignItems: "center", minWidth: "51px" }}
          >
            <p style={{ marginRight: "4px", textAlign: "left" }}>{name}</p>
            {isWinner ? (
              <EmojiEventsIcon
                style={{
                  color: CUSTOM_COLORS.gold,
                  fontSize: "large",
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </TableCell>
    </>
  );
};
