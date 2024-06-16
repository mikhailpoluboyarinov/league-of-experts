import {calculatePredictionResult} from "../domains/GameRules/helpers/calculatePredictionResult";
import {calculatePredictionResultScore} from "../domains/GameRules/helpers/calculatePredictionResultScore";
import { MatchId } from "../domains/Match";
import {Prediction} from "../domains/Prediction";
import {Result} from "../domains/Result";

type Params = {
    predictions: Prediction[];
    results: Result[];
};

export const useAiScores = ({ predictions, results }: Params): Record<MatchId, number> => {
    const aiPredictions = predictions.filter((prediction) => {
        return prediction.isAIPrediction;
    });

    const scores = aiPredictions.reduce(
        (scores, prediction) => {
            const result = results.find((result) => {
                return result.matchId === prediction.matchId;
            });

            if (!result) {
                return scores;
            }

            const predictionResult = calculatePredictionResult({
                prediction,
                result,
            });

            const predictionResultScore = calculatePredictionResultScore({
                predictionResult,
            });

            scores[prediction.matchId] = predictionResultScore;
            return scores;
        },
        {} as Record<MatchId, number>,
    );

    return scores
}