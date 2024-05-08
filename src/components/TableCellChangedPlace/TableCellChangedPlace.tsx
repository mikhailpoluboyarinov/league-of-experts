import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { SvgIcon, TableCell } from "@mui/material";
import { FC } from "react";
import { customColors } from "../../styles/colors";

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
      userPositionDifferent > 0 ? customColors.green : customColors.red;
    icon =
      userPositionDifferent > 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;
  }

  return (
    <TableCell align="center" style={{ backgroundColor: backgroundColor }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ marginRight: "4px" }}>
          {Math.abs(userPositionPreviousGameDay - index)}
        </span>
        {icon && (
          <SvgIcon component={icon.type} style={{ fontSize: "large" }} />
        )}
      </div>
    </TableCell>
  );
};
