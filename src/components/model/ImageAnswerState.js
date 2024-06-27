const ImageAnswerState = {
    PENDING: "PENDING",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",

    toString(value) {
        switch (value) { 
          case this.PENDING:
            return "Folyamatban";
          case this.APPROVED:
            return "Elfogadva";
          case this.REJECTED:
            return "Elutasítva";
        }
        }   
    };

    export default ImageAnswerState;