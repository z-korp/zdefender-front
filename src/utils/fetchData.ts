import { shortString } from 'starknet';

export const fetchData = async (graphSdk: any): Promise<{ stage: number; score: number; player: string }[]> => {
  try {
    const { data } = await graphSdk.getFinishedGames();
    console.log('Data', data);
    if (data && data.gameModels && data.gameModels.edges) {
      const gameModelsWithKeys: any[] = [];
      console.log('gamemodels before', data.gameModels.edges);
      data.gameModels.edges.forEach((edge: any) => {
        console.log('edge', edge.node);
        if (edge && edge.node?.score !== undefined && edge.node?.over && edge.node?.name && edge.node?.id) {
          console.log(`Edge: ${JSON.stringify(edge.node)}`);
          gameModelsWithKeys.push({
            score: edge.node?.score,
            over: edge.node?.over, // Changed 'level' to 'stage' to match the return type
            name: shortString.decodeShortString(edge.node?.name),
            id: edge.node?.id,
          });
        }
      });

      //console.log('gameComponentsWithKeys', gameComponentsWithKeys);
      return gameModelsWithKeys;
    } else {
      return []; // Return an empty array if the conditions are not met
    }
  } catch (error) {
    console.error('Error fetching games:', error);
    return []; // Return an empty array in case of an error
  }
};
