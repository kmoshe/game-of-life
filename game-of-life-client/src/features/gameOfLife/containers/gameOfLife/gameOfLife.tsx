import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { useGetFirstGenerationQuery, useGetNextGenerationQuery } from '../../api/gameOfLifeApi';
import StyledCell from '../../components/cell/Cell';
import { GenerationWrapper, GenerationBody } from '../../components/generationWrapper/GenerationWrapper';
import GenerationRow from '../../components/generationRow/GenerationRow';
import { Generation } from '../../models/generation';

const GameOfLife = () => {
    const [generation, setGeneration] = useState<Generation | undefined>(undefined);
    const { data: firstGeneration, isLoading: isFirstGenerationLoading, isSuccess } = useGetFirstGenerationQuery({
        rows: 50, 
        columns: 50
    });

    useEffect(() => {
        setGeneration(firstGeneration);
    }, [firstGeneration])
    const [getNextGeneration, { isLoading: isNextGenerationLoading } ] = useGetNextGenerationQuery();

    const startGenerations = async () => {
        if (generation) {
            const response = await getNextGeneration({ generation }, { pollingInterval: 3000 });
            setGeneration(response.)
        }
    }
    return (
        <>
            <GenerationWrapper>
                <GenerationBody>
                    {generation?.map((generationRow, rowIndex) => 
                        (<GenerationRow key={rowIndex}>{generationRow.map((cellStatus, columnIndex) => <StyledCell key={`${rowIndex}_${columnIndex}`} status={cellStatus} />)}</GenerationRow>)
                    )}
                </GenerationBody>
            </GenerationWrapper>
            <input type='button' value='Start the game of life'></input>
        </>
    );
}

export default GameOfLife;