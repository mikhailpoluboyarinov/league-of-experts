import {PredictionResult} from "../index";
import {CUSTOM_COLORS} from "../../../styles/colors";
import {notReachable} from "../../../utils/notReachable";

export const getColorByPredictionResult = (predictionResult: PredictionResult) => {
    switch (predictionResult.type) {
        case "group":
            switch (predictionResult.matchState.type) {
                case "fail":
                    return CUSTOM_COLORS.red;
                case "exact_score":
                    return CUSTOM_COLORS.purple;
                case "exact_difference":
                    return CUSTOM_COLORS.green;
                case "match_outcome":
                    return CUSTOM_COLORS.lightGreen;
                default:
                    return notReachable(predictionResult.matchState);
            }
        case "play_off":
            switch (predictionResult.matchState.type) {
                case "fail":
                    return CUSTOM_COLORS.red;
                case "match_outcome":
                    return CUSTOM_COLORS.lightGreen;
                case "exact_score":
                    if (!predictionResult.extraState) {
                        return CUSTOM_COLORS.purple;
                    }

                    switch (predictionResult.extraState.type) {
                        case "fail":
                            return CUSTOM_COLORS.purple;
                        case "success_extra":
                            return CUSTOM_COLORS.extraPurple;
                        default:
                            return notReachable(predictionResult.extraState);
                    }
                case "exact_difference":
                    if (!predictionResult.extraState) {
                        return CUSTOM_COLORS.green;
                    }

                    switch (predictionResult.extraState.type) {
                        case "fail":
                            return CUSTOM_COLORS.green;
                        case "success_extra":
                            return CUSTOM_COLORS.extraGreen;
                        default:
                            return notReachable(predictionResult.extraState);
                    }
                default:
                    return notReachable(predictionResult.matchState);
            }
    }
};