const QuestionGroupType = {
    STORY: "STORY",
    INFINITE: "INFINITE",

    toString(value) {
        switch (value) {
          case this.STORY:
            return "Story";
          case this.INFINITE:
            return "Végtelen";
        }
      }
};

export default QuestionGroupType;