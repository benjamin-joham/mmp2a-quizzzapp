let mixAnswers =  (answersArray) => {
    let mixedArray=[]
    mixedArray[0] = 'A: ' + answersArray[0] // correct
    mixedArray[1]= 'C: ' + answersArray[1]
    mixedArray[2]= 'B: ' + answersArray[2]
    mixedArray[3] = 'D: ' + answersArray[3]
  
    let rand = Math.floor((Math.random() * 3))
    mixedArray[0] = 'A: ' + answersArray[rand]
    switch (rand) {
      case 1:
      mixedArray[1] = 'C: ' + answersArray[0]
        break
      case 2:
      mixedArray[2] = 'B: ' + answersArray[0]
        break
      case 3:
      mixedArray[3] = 'D: ' + answersArray[0]
        break
      default:
        break
    }
      return mixedArray  
  }

  export default mixAnswers