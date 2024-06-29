import {useAiScores} from "./useAiScores";
import {Prediction} from "../domains/Prediction";
import {Result} from "../domains/Result";
import {calculatePredictionResult} from "../domains/GameRules/helpers/calculatePredictionResult";
import {calculatePredictionResultScore} from "../domains/GameRules/helpers/calculatePredictionResultScore";
import {calculatePariScoreGroup} from "../domains/GameRules/helpers/calculatePariScoreGroup";
import {calculatePariScorePlayOff} from "../domains/GameRules/helpers/calculatePariScorePlayOff";
import {notReachable} from "../utils/notReachable";

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

        let pariScore = 0;

        switch (prediction.type){
            case "group":
                pariScore = calculatePariScoreGroup({
                    userScore: score,
                    aiScore: aiScores[prediction.matchId],
                })
                break
            case "play_off":
                pariScore = calculatePariScorePlayOff({
                    userScore: score,
                    aiScore: aiScores[prediction.matchId],
                })
                break
            default:
                notReachable(prediction)
        }

        pariScoreTotal += pariScore;
    })

    return pariScoreTotal;
}