const Player = require("../model/playerModel");
const HighScore = require("../model/highScoreModel");

const {
  getAllPlayers,
  getRandomPlayers,
  getHighScore,
  updateHighScore,
} = require("../controllers/playerController");

jest.mock("../model/playerModel");
jest.mock("../model/highScoreModel");

describe("playerController", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe("getAllPlayers", () => {
    it("should return all players", async () => {
      const mockPlayers = [{ player_name: "LeBron James" }];
      Player.findAll.mockResolvedValue(mockPlayers);

      await getAllPlayers(req, res);

      expect(Player.findAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockPlayers);
    });

    it("should handle errors", async () => {
      Player.findAll.mockRejectedValue(new Error("DB error"));

      await getAllPlayers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
    });
  });

  describe("getRandomPlayers", () => {
    it("should return two random players", async () => {
      const mockPlayers = [{ player_name: "A" }, { player_name: "B" }];
      Player.findAll.mockResolvedValue(mockPlayers);

      await getRandomPlayers(req, res);

      expect(Player.findAll).toHaveBeenCalledWith({
        order: expect.anything(),
        limit: 2,
      });
      expect(res.json).toHaveBeenCalledWith(mockPlayers);
    });

    it("should handle errors", async () => {
      Player.findAll.mockRejectedValue(new Error("Random error"));

      await getRandomPlayers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Random error" });
    });
  });

  describe("getHighScore", () => {
    beforeEach(() => {
      req.params = { game_type: "3ptpercent" };
      req.userId = 42;
    });

    it("should return the user high score", async () => {
      const mockScore = { user_id: 42, game_type: "3ptpercent", score: 10 };
      HighScore.findOne.mockResolvedValue(mockScore);

      await getHighScore(req, res);

      expect(HighScore.findOne).toHaveBeenCalledWith({
        where: { user_id: 42, game_type: "3ptpercent" },
      });
      expect(res.json).toHaveBeenCalledWith(mockScore);
    });

    it("should return default score if not found", async () => {
      HighScore.findOne.mockResolvedValue(null);

      await getHighScore(req, res);

      expect(res.json).toHaveBeenCalledWith({
        game_type: "3ptpercent",
        score: 0,
      });
    });

    it("should handle errors", async () => {
      HighScore.findOne.mockRejectedValue(new Error("HS error"));

      await getHighScore(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "HS error" });
    });
  });

  describe("updateHighScore", () => {
    beforeEach(() => {
      req.body = { game_type: "3ptpercent", score: 15 };
      req.userId = 7;
    });

    it("should create a new high score if not exists", async () => {
      const mockHighScore = { score: 15, save: jest.fn() };
      HighScore.findOrCreate.mockResolvedValue([mockHighScore, true]);

      await updateHighScore(req, res);

      expect(HighScore.findOrCreate).toHaveBeenCalledWith({
        where: { user_id: 7, game_type: "3ptpercent" },
        defaults: { score: 15 },
      });
      expect(res.json).toHaveBeenCalledWith(mockHighScore);
    });

    it("should update high score if new score is higher", async () => {
      const mockHighScore = { score: 10, save: jest.fn() };
      HighScore.findOrCreate.mockResolvedValue([mockHighScore, false]);

      await updateHighScore(req, res);

      expect(mockHighScore.score).toBe(15);
      expect(mockHighScore.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockHighScore);
    });

    it("should not update if new score is lower", async () => {
      const mockHighScore = { score: 20, save: jest.fn() };
      HighScore.findOrCreate.mockResolvedValue([mockHighScore, false]);

      await updateHighScore(req, res);

      expect(mockHighScore.save).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockHighScore);
    });

    it("should handle errors", async () => {
      HighScore.findOrCreate.mockRejectedValue(new Error("Update error"));

      await updateHighScore(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Update error" });
    });
  });
});
