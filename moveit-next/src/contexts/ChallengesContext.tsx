import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenge.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completedChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])


    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const rendomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[rendomChallengeIndex];

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('novo desafio', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }
    }


    function resetChallenge() {
        setActiveChallenge(null)
    };

    function completedChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(currentExperience + 1);

    }

    return (
        <ChallengeContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completedChallenge,
            }}
        >
            {children}
        </ChallengeContext.Provider>
    )
}