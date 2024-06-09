import { FC } from "react";
import { Avatar, TableCell } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { CUSTOM_COLORS } from "../../styles/colors";
import StarIcon from "@mui/icons-material/Star";

interface TableCellNameAvatarProps {
  name: string;
  isWinner: boolean;
  avatar: string;
  winnerCount: number;
}

export const TableCellNameAvatar: FC<TableCellNameAvatarProps> = ({
  name,
  isWinner,
  avatar,
  winnerCount,
}) => {
  const stars = Array(Math.min(winnerCount, 5))
    .fill(null)
    .map((_, index) => (
      <StarIcon
        key={index}
        style={{
          color: CUSTOM_COLORS.gold,
          fontSize: "medium",
          position: "absolute",
          top: `${index * 4}px`,
          left: "-4px",
          zIndex: "1",
        }}
      />
    ));

  return (
    <>
      <TableCell style={{ width: "17%", padding: '4px 8px' }}>
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
              src={avatar}
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
