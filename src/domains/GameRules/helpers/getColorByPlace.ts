import { CUSTOM_COLORS} from "../../../styles/colors";

export const getColorByPlace = (total: number, current: number) => {
    if (current === 1) {
        return CUSTOM_COLORS.green;
    } else if (current === 2) {
        return CUSTOM_COLORS.lightGreen;
    } else if (current === 3) {
        return CUSTOM_COLORS.lightGreen;
    }

    if (total - current < 2) {
        return CUSTOM_COLORS.red
    }

    return CUSTOM_COLORS.gold
}