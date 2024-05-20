import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { SvgIcon, TableCell } from "@mui/material";
import { FC } from "react";
import { CUSTOM_COLORS } from "../../styles/colors";

interface TableCellChangedPlaceProps {
  userPositionPreviousGameDay: number;
  index: number;
}

export const TableCellChangedPlace: FC<TableCellChangedPlaceProps> = ({
  userPositionPreviousGameDay,
  index,
}) => {
  const userPositionDifferent = userPositionPreviousGameDay - index;
  let backgroundColor = "transparent";
  let icon = null;

  if (userPositionDifferent !== 0) {
    backgroundColor =
      userPositionDifferent > 0 ? CUSTOM_COLORS.green : CUSTOM_COLORS.red;
    icon =
      userPositionDifferent > 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;
  }

  return (
    <TableCell
      align="center"
      style={{ backgroundColor: backgroundColor, padding: "4px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon && (
          <SvgIcon component={icon.type} style={{ fontSize: "large" }} />
        )}
        <span>
          {Math.abs(userPositionPreviousGameDay - index) !== 0
            ? Math.abs(userPositionPreviousGameDay - index)
            : ""}
        </span>
      </div>
    </TableCell>
  );
};
