import { FC } from "react";
import { Avatar, TableCell } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { CUSTOM_COLORS } from "../../styles/colors";

interface TableCellNameAvatarProps {
  name: string;
  isWinner: boolean;
  avatar: string;
}

export const TableCellNameAvatar: FC<TableCellNameAvatarProps> = ({
  name,
  isWinner,
  avatar,
}) => {
  return (
    <>
      <TableCell align="center">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
          }}
        >
          <Avatar alt={name} src={avatar} style={{ marginRight: "8px" }} />
          <p style={{ marginRight: "4px" }}>{name}</p>
          {isWinner ? (
            <EmojiEventsIcon
              style={{ color: CUSTOM_COLORS.gold, fontSize: "large" }}
            />
          ) : (
            ""
          )}
        </div>
      </TableCell>
    </>
  );
};
