import {useAiScores} from "./useAiScores";
import {Prediction} from "../domains/Prediction";
import {Result} from "../domains/Result";
import {calculatePredictionResult} from "../domains/GameRules/helpers/calculatePredictionResult";
import {calculatePredictionResultScore} from "../domains/GameRules/helpers/calculatePredictionResultScore";
import {calculatePariScore} from "../domains/GameRules/helpers/calculatePariScore";

type Params = {
    predictions: Prediction[];
    results: Result[];
};

export const useCalculatePariScores = ({ predictions, results}: Params): number => {
    let pariScoreTotal = 0;

    const aiScores = useAiScores({ predictions, results })
    const predictionsWithPari = predictions.filter(prediction => prediction.isPari);

    predictionsWithPari.forEach(prediction => {
        const resultMatch = results.find((result) => {
            return result.matchId === prediction.matchId;
        });

        if (!resultMatch) {
            return;
        }

        const predictionResult = calculatePredictionResult({
            prediction: prediction,
            result: resultMatch,
        });

        const score = calculatePredictionResultScore({
            predictionResult: predictionResult,
        });

        pariScoreTotal += calculatePariScore({
            userScore: score,
            aiScore: aiScores[prediction.matchId],
        });
    })

    return pariScoreTotal;
}