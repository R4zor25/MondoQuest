const QuestionDifficulty = {
    TEXT: "TEXT",
    IMAGE: "IMAGE",
    VIDEO: "VIDEO",
    AUDIO: "AUDIO",
    GIF: "GIF",

    toString(value) {
        switch (value) {
          case this.TEXT:
            return "Szöveg";
          case this.IMAGE:
            return "Kép";
          case this.VIDEO:
            return "Video";
          case this.AUDIO:
            return "Hang";
          case this.GIF:
            return "GIF";
        }
      }
};

export default QuestionDifficulty;