const QuestionDifficulty = {
    VERY_EASY: "VERY_EASY",
    EASY: "EASY",
    MEDIUM: "MEDIUM",
    HARD: "HARD",
    VERY_HARD: "VERY_HARD",
    EXTREMELY_HARD: "EXTREMELY_HARD",
    IMPOSSIBLE: "IMPOSSIBLE",

    toString(value) {
        switch (value) {
          case this.VERY_EASY:
            return "Nagyon könnyű";
          case this.EASY:
            return "Könnyű";
          case this.MEDIUM:
            return "Közepes";
          case this.HARD:
            return "Nehéz";
          case this.VERY_HARD:
            return "Nagyon nehéz";
          case this.EXTREMELY_HARD:
            return "Extrém";
          case this.IMPOSSIBLE:
            return "Lehetetlen";
        }
      }
  };
  
  export default QuestionDifficulty;