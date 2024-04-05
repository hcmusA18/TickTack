class RecSysService {
  private static instance: RecSysService | null = null;

  private constructor() {
    // do something
  }

  static getInstance(): RecSysService {
    if (RecSysService.instance === null) {
      RecSysService.instance = new RecSysService();
    }
    return RecSysService.instance;
  }

  getRecommendation = async (userId: string) => {
    try {
      const retrievalReq = await fetch(
        "http://localhost:8501/v1/models/retrieval:predict",
        {
          method: "post",
          body: JSON.stringify({
            instances: [userId],
          }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":
              "http://localhost:5173, http://localhost:8501",
          },
          redirect: "follow",
        },
      );

      const retrivalVideoId = (await retrievalReq.json()).predictions[0]
        .output_2;

      const rankingReq = await fetch(
        "http://localhost:8501/v1/models/ranking:predict",
        {
          method: "post",
          body: JSON.stringify({
            inputs: {
              user_id: Array.from({ length: retrivalVideoId.length }, () => {
                return "98";
              }),
              video_id: retrivalVideoId,
            },
          }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":
              "http://localhost:5173, http://localhost:8501",
          },
          redirect: "follow",
        },
      );

      const ranking = (await rankingReq.json()).outputs.map(
        (r: number[]) => r[0],
      );

      // sort the recommendation by ranking
      const sortedRecommendation = retrivalVideoId
        .map((id: string, index: number) => {
          return {
            videoId: id,
            rank: ranking[index],
          };
        })
        .sort((a: { rank: number }, b: { rank: number }) => b.rank - a.rank);

      return sortedRecommendation.map((r: { videoId: string }) => r.videoId);
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
}

export default RecSysService;
